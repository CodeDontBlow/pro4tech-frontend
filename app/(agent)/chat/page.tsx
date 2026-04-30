'use client'

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import { io, Socket } from "socket.io-client";
import Speechbubble from "./components/speechbubble/speechbubble";
import { InputField } from "@/app/components/ui/inputField";
import { Button } from "@/app/components/ui/button";
import { Send } from "lucide-react";
import { api } from "@/services/api";
import { decodeToken } from "@/utils/decode-token";
import { ITicket } from "@/services/ticket/ticket.interface";

type ChatMessage = {
    id: string;
    ticketId: string;
    senderId: string;
    senderRole: "CLIENT" | "AGENT" | "ADMIN";
    content: string;
    createdAt: string;
    editedAt?: string | null;
    deletedAt?: string | null;
};

export default function Page() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const ticketId = searchParams.get("id");

    const [ticket, setTicket] = useState<ITicket | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [messageInput, setMessageInput] = useState("");
    const [authToken, setAuthToken] = useState<string | null>(null);
    const [currentAgentId, setCurrentAgentId] = useState<string | null>(null);
    const socketRef = useRef<Socket | null>(null);

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
                prev.map((item) => (item.id === message.id ? message : item))
            );
        });

        socket.on("deletedMessage", (message: ChatMessage) => {
            setMessages((prev) =>
                prev.map((item) => (item.id === message.id ? message : item))
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
                new Date(a.createdAt).getTime() -
                new Date(b.createdAt).getTime()
        );
    }, [messages]);

    const handleSend = () => {
        if (!ticketId) {
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

    const handleCloseTicket = async () => {
        if (!ticketId) {
            return;
        }

        try {
            await api.patch(`/tickets/${ticketId}`, { status: "CLOSED" });
            socketRef.current?.disconnect();
            socketRef.current = null;
            setMessages([]);
            router.push("/tickets");
        } catch (err) {
            console.error("Erro ao concluir ticket", err);
        }
    };

    return(
        <div className="h-screen flex flex-col items-center bg-white-base">
            <header className="bg-white-500 w-full p-4 flex justify-between shadow-md/15">
                <h4 className='text-1 align-middle flex items-center'>
                    {ticket?.client?.name ?? "Cliente"}
                </h4>

                <div className="flex gap-1.5">
                    <Button
                        label='Concluir'
                        className="bg-black-300!"
                        onClick={handleCloseTicket}
                    />
                </div>
            </header>

            <section className="w-full flex-1 overflow-y-auto flex justify-center">
                <section className="px-2 py-6 flex flex-col gap-1.5 max-w-3xl w-full">
                    <div>
                        <h6 className="label-2">
                            Você está atendendo
                        </h6>
                        <h2 className="subtitle-2">
                            {ticket?.client?.name ?? "Cliente"}
                        </h2>
                        <p className="text-2 mb-6 mt-1">
                            Funcionário da empresa{' '}
                            <b className="text-blue-700">
                                {ticket?.company?.name ?? "Empresa"}
                            </b>{' '}
                            com problema em{' '}
                            <b className="text-blue-700">
                                {ticket?.subject?.name ?? "Assunto"}
                            </b>
                        </p>
                    </div>

                    {orderedMessages.map((message) => (
                        <Speechbubble
                            key={message.id}
                            sender={message.senderId === currentAgentId}
                            message={
                                message.deletedAt
                                    ? "Mensagem removida"
                                    : message.content
                            }
                        />
                    ))}
                    <br />
                </section>
            </section>

            <header className="bg-white-500 w-full px-4 py-3 flex items-center gap-2.5 shadow-[0_-2px_8px_rgba(0,0,0,0.15)]">
                <InputField
                    placeholder="Digite sua mensagem"
                    className="bg-white-base focus:ring-[var(--blue-300)]!"
                    value={messageInput}
                    onChange={(event) => setMessageInput(event.target.value)}
                />

                <Button
                    icon={Send}
                    type="button"
                    className="bg-blue-base! rounded-full! aspect-square!"
                    onClick={handleSend}
                />
            </header>
        </div>
    )
}