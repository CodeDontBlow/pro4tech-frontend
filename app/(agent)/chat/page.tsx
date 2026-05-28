'use client'

import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import { io, Socket } from "socket.io-client";
import { ArrowLeftRight, Paperclip, Send } from "lucide-react";
import Speechbubble from "./components/speechbubble/speechbubble";
import { InputField } from "@/app/components/ui/inputField";
import { Button } from "@/app/components/ui/button";
import { api } from "@/services/api";
import { decodeToken } from "@/utils/decode-token";
import { ITicket } from "@/services/ticket/ticket.interface";
import { Modal } from "@/app/components/ui/modal";
import { useSupportGroup } from "@/hooks/use-support-group";
import FilePreview from "./components/filePreview";
import {
  uploadChatAttachments,
  UploadedAttachment,
} from "@/services/upload/upload.service";

type ChatMessage = {
  id: string;
  ticketId: string;
  senderId: string;
  senderRole: "CLIENT" | "AGENT" | "ADMIN";
  content: string;
  attachments?: UploadedAttachment[];
  createdAt: string;
  editedAt?: string | null;
  deletedAt?: string | null;
};

export const dynamic = "force-dynamic";

export default function Page() {
  const MAX_MESSAGE_LENGTH = 2000;
  const DISPLAY_RANGE = 500;
  const FILES_LIMIT = 5;

  const router = useRouter();
  const searchParams = useSearchParams();
  const ticketId = searchParams.get("id");

  const [ticket, setTicket] = useState<ITicket | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [messageInput, setMessageInput] = useState("");
  const [fileInput, setFileInput] = useState<File[]>([]);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [currentAgentId, setCurrentAgentId] = useState<string | null>(null);
  const socketRef = useRef<Socket | null>(null);

  const [openModal, setOpenModal] = useState(false);
  const [loadingClose, setLoadingClose] = useState(false);
  const [openEscalateModal, setOpenEscalateModal] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const { supportGroups } = useSupportGroup(1, 100);

  const [escalationMode, setEscalationMode] = useState<
    "GROUP" | "LEVEL"
  >("GROUP");
  const [supportGroupId, setSupportGroupId] = useState("");
  const [supportLevel, setSupportLevel] = useState("");
  const [escalateComment, setEscalateComment] = useState("");

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const handleMessageInput = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value.slice(0, MAX_MESSAGE_LENGTH);
    if (text.length <= MAX_MESSAGE_LENGTH) {
      setMessageInput(text);
    }
  };

  const handleRemoveFile = (index: number): void => {
    setFileInput((prev) => prev?.filter((_, i) => i !== index));
  };

  const handleAddFiles = (files: File[]): void => {
    setFileInput((prev) => [...prev, ...files].slice(0, FILES_LIMIT));
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const token = Cookies.get("token") || localStorage.getItem("token");
    if (!token) {
      return;
    }

    setAuthToken(token);

    try {
      const user = decodeToken(token);
      setCurrentAgentId(user.sub);
    } catch {
      setCurrentAgentId(null);
    }
  }, []);

  useEffect(() => {
    if (!ticketId) {
      return;
    }

    const fetchTicket = async () => {
      try {
        const response = await api.get(`/tickets/${ticketId}`);
        setTicket(response.data);
      } catch (err) {
        console.error("Erro ao carregar ticket", err);
        router.replace("/tickets");
      }
    };

    fetchTicket();
  }, [ticketId, router]);

  useEffect(() => {
    if (!ticket || !currentAgentId) {
      return;
    }

    if (!ticket.agentId || ticket.agentId !== currentAgentId) {
      router.replace("/tickets");
    }
  }, [ticket, currentAgentId, router]);

  useEffect(() => {
    if (!ticketId || !authToken || !ticket?.agentId) {
      return;
    }

    if (currentAgentId && ticket.agentId !== currentAgentId) {
      return;
    }

    const baseUrl = api.defaults.baseURL;
    if (!baseUrl) {
      console.error("API base URL nao configurada para socket");
      return;
    }

    const socket = io(`${baseUrl}/chat`, {
      auth: { token: authToken },
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      socket.emit("joinRoom", { ticketId });
    });

    socket.on("chatHistory", (history: ChatMessage[]) => {
      setMessages(history);
    });

    socket.on("newMessage", (message: ChatMessage) => {
      setMessages((prev) => [...prev, message]);
    });

    socket.on("updatedMessage", (message: ChatMessage) => {
      setMessages((prev) =>
        prev.map((item) => (item.id === message.id ? message : item)),
      );
    });

    socket.on("deletedMessage", (message: ChatMessage) => {
      setMessages((prev) =>
        prev.map((item) => (item.id === message.id ? message : item)),
      );
    });

    socket.on("socketError", (payload: { message?: string }) => {
      console.error(payload?.message ?? "Erro no socket");
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [ticketId, authToken, ticket?.agentId, currentAgentId]);

  const orderedMessages = useMemo(() => {
    return [...messages].sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    );
  }, [messages]);

  const isClosed = ticket?.status === "CLOSED" || ticket?.status === "RESOLVED";

  const handleSend = () => {
    if (!ticketId) {
      return;
    }

    if (isClosed) {
      return;
    }

    const content = messageInput.trim();
    if (!content) {
      return;
    }

    socketRef.current?.emit("sendMessage", {
      ticketId,
      content,
    });

    setMessageInput("");
  };

  const handleSendFiles = async () => {
    if (!ticketId || fileInput.length === 0 || isClosed) {
      return;
    }

    setIsUploading(true);

    try {
      const attachments = await uploadChatAttachments(ticketId, fileInput);
      const content = messageInput.trim();

      socketRef.current?.emit("sendMessage", {
        ticketId,
        content: content.length ? content : undefined,
        attachments,
      });

      setMessageInput("");
      setFileInput([]);
    } catch (error) {
      console.error("Erro ao enviar anexos", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleCloseTicket = async () => {
    if (!ticketId) return;

    try {
      setLoadingClose(true);

      await api.patch(`/tickets/${ticketId}`, { status: "RESOLVED" });

      socketRef.current?.disconnect();
      socketRef.current = null;
      setMessages([]);

      await new Promise((r) => setTimeout(r, 150));
      router.push("/tickets");
    } catch (err) {
      console.error("Erro ao concluir ticket", err);
    } finally {
      setLoadingClose(false);
      setOpenModal(false);
    }
  };

  const handleEscalateTicket = async () => {
    if (!ticketId) return;

    try {
      const payload = {
        targetGroupId: escalationMode === "GROUP" ? supportGroupId || undefined : undefined,
        targetSupportLevel: escalationMode === "LEVEL" ? supportLevel || undefined : undefined,
        comment: escalateComment,
      };
      await api.patch(`/tickets/${ticketId}/escalate`, payload);

      socketRef.current?.disconnect();
      socketRef.current = null;
      setMessages([]);

      setOpenEscalateModal(false);
      router.push("/tickets");
    } catch (err) {
      console.error("Erro em escalar ticket", err);
      alert("Não foi possível realizar o escalonamento.");
    }
  };

  return (
    <div className="h-screen flex flex-col items-center  bg-white-base relative">
      <header className="bg-white-500 w-full p-4 flex justify-between shadow-sm/15 z-1">
        <h4 className="text-1 align-middle flex items-center">
          {ticket?.client?.name ?? "Cliente"}
        </h4>

        {!isClosed && (
          <div className="flex gap-1.5">
            <Button
              label="Concluir"
              className="bg-black-300!"
              onClick={() => setOpenModal(true)}
            />
            <Button
              label="Escalonar"
              className="bg-blue-base!"
              onClick={() => setOpenEscalateModal(true)}
            />
          </div>
        )}
      </header>
      <Modal
        isOpen={!isClosed && openModal}
        onClose={() => setOpenModal(false)}
        title="Resolver Chamado"
        description="Você está prestes a resolver este chamado, fechando a conexão entre o cliente e o suporte oferecido pelo Orbita!"
        onSubmit={handleCloseTicket}
        loading={loadingClose}
        submitLabel="Resolver"
        cancelLabel="Cancelar"
        variant="danger"
      >
        <div className="flex flex-col gap-3 text-sm text-black-300">
          <p>Antes de resolver o chamado, certifique-se de que:</p>

          <ul className="list-disc pl-5 space-y-1">
            <li>O problema do cliente foi devidamente solucionado.</li>
            <li>
              O cliente aprovou o encerramento do chamado ou se ausentou por
              tempo suficiente após a solução.
            </li>
            <li>
              O cliente não possui mais nenhuma dúvida referente ao problema
              tratado.
            </li>
          </ul>
        </div>
      </Modal>
      <Modal
        isOpen={!isClosed && openEscalateModal}
        onClose={() => setOpenEscalateModal(false)}
        title="Escalonar Chamado"
        description={
          escalationMode === "GROUP"
            ? "Encaminhe o chamado atual para outro Grupo de Atendimento caso seu conhecimento na sua área não seja necessário/útil para tratar do problema."
            : "Encaminhe o chamado atual para outro Nível de Atendimento caso seu conhecimento na sua área não seja necessário/útil para tratar do problema.."
        }
        onSubmit={handleEscalateTicket}
        submitLabel="Confirmar"
        cancelLabel="Cancelar"
        variant="default"
      >
        <div className="flex flex-col gap-4 py-2 text-sm text-black-300">
          <div className="flex justify-between items-center bg-gray-50 p-2 rounded-md border border-gray-200">
            <span className="text-xs font-medium text-black-400">
              Tipo de Escalonamento:{" "}
              <strong className="text-blue-base">
                {escalationMode === "GROUP"
                  ? "Por Equipe/Grupo"
                  : "Por Nível Técnico"}
              </strong>
            </span>
            <button
              type="button"
              onClick={() =>
                setEscalationMode((prev) =>
                  prev === "GROUP" ? "LEVEL" : "GROUP",
                )
              }
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold bg-blue-base text-white rounded hover:bg-blue-600 transition-colors"
            >
              <ArrowLeftRight size={14} />
              Alternar
            </button>
          </div>

          {escalationMode === "GROUP" ? (
            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-black-500">
                Grupo de Suporte
              </label>
              <select
                className="w-full p-2.5 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={supportGroupId}
                onChange={(e) => setSupportGroupId(e.target.value)}
              >
                <option value="">Selecione</option>
                {supportGroups?.map((group: any) => (
                  <option key={group.id} value={group.id}>
                    {group.name}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-black-500">
                Nível de Suporte
              </label>
              <select
                className="w-full p-2.5 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={supportLevel}
                onChange={(e) => setSupportLevel(e.target.value)}
              >
                <option value="">Selecione</option>
                <option value="LEVEL_1">Nível 1 (LEVEL_1)</option>
                <option value="LEVEL_2">Nível 2 (LEVEL_2)</option>
                <option value="LEVEL_3">Nível 3 (LEVEL_3)</option>
              </select>
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label className="font-semibold text-black-500">
              Motivo do Escalonamento
            </label>
            <textarea
              placeholder="Digite o contexto para o próximo atendente."
              className="w-full p-2.5 bg-white border border-gray-300 rounded-md min-h-[80px] focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
              value={escalateComment}
              onChange={(e) => setEscalateComment(e.target.value)}
            />
          </div>
        </div>
      </Modal>

      <section className="w-full flex-1 overflow-y-auto overflow-x-hidden flex justify-center z-0">
        <section className="px-2 py-6 flex flex-col gap-1.5 max-w-3xl w-full">
          <div>
            <h6 className="label-2">Você está atendendo</h6>
            <h2 className="subtitle-2">
              {ticket?.client?.name ?? "Cliente"}
            </h2>
            <p className="text-2 mb-6 mt-1">
              Funcionário da empresa{" "}
              <b className="text-blue-700">
                {ticket?.company?.name ?? "Empresa"}
              </b>{" "}
              com problema em{" "}
              <b className="text-blue-700">
                {ticket?.subject?.name ?? "Assunto"}
              </b>
            </p>

            {(ticket?.escalationCount ?? 0) > 0 && (
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-md mb-6">
                <p className="text-blue-900">
                  Este chamado já foi escalado{" "}
                  <strong>{ticket?.escalationCount}</strong> vezes.
                </p>
                <p className="text-sm text-gray-700 mt-1">
                  Último atendente:{" "}
                  <strong>
                    {ticket?.lastAgent?.user?.name ?? "Não identificado"}
                  </strong>
                </p>
                {ticket?.lastEscalationComment && (
                  <p className="text-sm italic text-gray-600 mt-2 border-t border-blue-100 pt-2">
                    Motivo: "{ticket.lastEscalationComment}"
                  </p>
                )}
              </div>
            )}
          </div>

          {orderedMessages.map((message) => (
            <Speechbubble
              key={message.id}
              sender={message.senderId === currentAgentId}
              date={message.createdAt}
              message={message.deletedAt ? "Mensagem removida" : message.content}
              attachments={message.deletedAt ? [] : message.attachments}
            />
          ))}

          <div ref={chatEndRef}></div>
        </section>
      </section>

      {isClosed ? (
        <header className="bg-white-base w-full px-4 py-3 flex items-center justify-center">
          <div className="bg-white-500 rounded-full px-4 py-2">
            <p className="label-2 text-black-300 text-center">
              Este chamado foi encerrado.
            </p>
          </div>
        </header>
      ) : (
        <header className="bg-white-base w-full px-4 py-3 flex items-center gap-3">
          <input
            type="file"
            multiple
            className="hidden"
            id="fileInput"
            onChange={(e) => {
              const files = Array.from(e.target.files ?? []);
              handleAddFiles(files);
              e.target.value = "";
            }}
          />
          <label
            className=" aspect-square! rounded-lg! bg-white-500 text-black-300/50 h-full flex justify-center items-center cursor-pointer! hover:bg-teal-500 hover:text-beige-300 transition"
            htmlFor="fileInput"
          >
            <Paperclip />
          </label>

          <InputField
            placeholder="Digite sua mensagem"
            className={`bg-white-300 ${
              messageInput.length < MAX_MESSAGE_LENGTH
                ? "focus:ring-[var(--blue-300)]!"
                : "focus:ring-0!"
            }`}
            value={messageInput}
            onChange={(e) => handleMessageInput(e)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSend();
              }
            }}
          />

          {messageInput.length >= MAX_MESSAGE_LENGTH - DISPLAY_RANGE && (
            <div
              className="text-red-base w-10"
              style={{
                filter: `saturate(${(messageInput.length - (MAX_MESSAGE_LENGTH - DISPLAY_RANGE)) / DISPLAY_RANGE})`,
              }}
            >
              <p className="label-2 font-bold text-[12px]! text-red-base">
                {messageInput.length}
              </p>

              <div className="bg-white-700 h-1 rounded-full w-full inset-shadow/50 overflow-hidden">
                <div
                  className="bg-red-base h-1 rounded-full transition-all duration-200 min-w-[1px]"
                  style={{
                    width: `${((messageInput.length - (MAX_MESSAGE_LENGTH - DISPLAY_RANGE)) / DISPLAY_RANGE) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          )}

          <Button
            icon={Send}
            type="button"
            className={`rounded-full! aspect-square! ${
              messageInput.length < MAX_MESSAGE_LENGTH
                ? "!bg-blue-base"
                : "!bg-red-500 animate-pulse"
            }`}
            onClick={handleSend}
          />
        </header>
      )}

      {!isClosed && (
        <FilePreview
          files={fileInput}
          onCancel={() => setFileInput([])}
          onSubmit={handleSendFiles}
          removeFile={handleRemoveFile}
          filesLimit={FILES_LIMIT}
          isSubmitting={isUploading}
        />
      )}
    </div>
  );
}
