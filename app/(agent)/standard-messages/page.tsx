"use client";

import { useState } from "react";
import { AxiosError } from "axios";
import { ChevronDown, Plus, Search } from "lucide-react";
import { Table } from "antd";
import { Button } from "@/app/components/ui/button";
import { Modal } from "@/app/components/ui/modal";
import { Pagination } from "@/app/components/ui/pagination";
import { useStandardMessage } from "@/hooks/use-standard-message";
import { IStandardMessage } from "@/services/standard-message/standard-message.interface";
import { getStandardMessageColumns } from "./standard-messages-table-config";

type FormState = {
  title: string;
  trigger: string;
  content: string;
};

const INITIAL_FORM: FormState = {
  title: "",
  trigger: "",
  content: "",
};

export default function Page() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [loadingModal, setLoadingModal] = useState(false);
  const [error, setError] = useState("");
  const limit = 10;

  const {
    standardMessages,
    loading,
    totalItems,
    totalPages,
    handleCreate,
    handleUpdate,
    handleDelete,
    refresh,
  } = useStandardMessage(currentPage, limit, search);

  const isInitialLoading =
    loading && standardMessages.length === 0 && totalItems === 0;

  function toggleRowExpansion(id: string) {
    setExpandedRowKeys((prev) =>
      prev.includes(id) ? prev.filter((key) => key !== id) : [...prev, id],
    );
  }

  function resetForm() {
    setForm(INITIAL_FORM);
    setError("");
    setEditingMessageId(null);
  }

  function openCreateModal() {
    resetForm();
    setIsCreateModalOpen(true);
  }

  function openEditModal(message: IStandardMessage) {
    setForm({
      title: message.title ?? "",
      trigger: message.trigger ?? "",
      content: message.content ?? "",
    });
    setError("");
    setEditingMessageId(message.id);
    setIsEditModalOpen(true);
  }

  function getErrorMessage(error: unknown, fallback: string) {
    const message = (error as AxiosError<{ message?: string | string[] }>)
      .response?.data?.message;
    return Array.isArray(message) ? message[0] : message ?? fallback;
  }

  async function handleCreateSubmit() {
    setLoadingModal(true);
    setError("");

    try {
      await handleCreate({
        title: form.title.trim(),
        trigger: form.trigger.trim(),
        content: form.content.trim(),
      });

      await refresh();
      setIsCreateModalOpen(false);
      resetForm();
    } catch (error: unknown) {
      setError(getErrorMessage(error, "Erro ao criar mensagem padrao."));
    } finally {
      setLoadingModal(false);
    }
  }

  async function handleEditSubmit() {
    if (!editingMessageId) {
      return;
    }

    setLoadingModal(true);
    setError("");

    try {
      await handleUpdate(editingMessageId, {
        title: form.title.trim(),
        trigger: form.trigger.trim(),
        content: form.content.trim(),
      });

      await refresh();
      setIsEditModalOpen(false);
      resetForm();
    } catch (error: unknown) {
      setError(getErrorMessage(error, "Erro ao atualizar mensagem padrao."));
    } finally {
      setLoadingModal(false);
    }
  }

  const formFields = (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-black-300 uppercase tracking-wide">
        Titulo
      </label>
      <input
        name="title"
        type="text"
        placeholder="Ex.: Saudacao inicial"
        value={form.title}
        onChange={(e) =>
          setForm((prev) => ({ ...prev, title: e.target.value }))
        }
        required
        className="w-full px-4 py-2.5 rounded-xl border border-white-700 bg-white text-sm text-black-base placeholder:text-black-300/50 focus:outline-none focus:border-green-500 transition-colors"
      />

      <label className="text-xs font-semibold text-black-300 uppercase tracking-wide mt-2">
        Trigger
      </label>
      <input
        name="trigger"
        type="text"
        placeholder="Ex.: /bom_dia"
        value={form.trigger}
        onChange={(e) =>
          setForm((prev) => ({ ...prev, trigger: e.target.value }))
        }
        required
        className="w-full px-4 py-2.5 rounded-xl border border-white-700 bg-white text-sm text-black-base placeholder:text-black-300/50 focus:outline-none focus:border-green-500 transition-colors"
      />

      <label className="text-xs font-semibold text-black-300 uppercase tracking-wide mt-2">
        Mensagem
      </label>
      <textarea
        name="content"
        placeholder="Ex.: Bom dia! Como posso ajudar?"
        value={form.content}
        onChange={(e) =>
          setForm((prev) => ({ ...prev, content: e.target.value }))
        }
        required
        rows={5}
        className="w-full px-4 py-2.5 rounded-xl border border-white-700 bg-white text-sm text-black-base placeholder:text-black-300/50 focus:outline-none focus:border-green-500 transition-colors resize-none"
      />
    </div>
  );

  return (
    <div className="px-4 md:px-10 lg:px-16 py-6 md:py-9 h-screen flex flex-col bg-white-300 overflow-hidden">
      <div className="flex flex-col justify-between mb-4 shrink-0">
        <h1 className="font-martel font-bold text-[42px] leading-12.5 text-start mb-5">
          Mensagens Padronizadas
        </h1>

        <div className="flex items-center justify-start gap-4">
          <div className="relative w-full sm:w-[360px]">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-black-300"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setCurrentPage(1);
                setSearch(e.target.value);
              }}
              placeholder="Pesquisar por trigger, titulo ou mensagem"
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-white-700 bg-white text-sm text-black-base placeholder:text-black-300/60 focus:outline-none focus:border-green-500 transition-colors"
            />
          </div>
          <Button
            onClick={openCreateModal}
            label="Adicionar"
            icon={Plus}
            variant="primary"
            size="md"
          />
        </div>
      </div>

      <main className="flex-1 flex flex-col min-h-0 bg-white-300 rounded-lg border border-white-700 overflow-hidden">
        {isInitialLoading ? (
          <div className="flex-1" />
        ) : (
          <>
            <div className="flex-1 overflow-auto min-h-0">
              <Table
                size="middle"
                dataSource={standardMessages}
                columns={getStandardMessageColumns(openEditModal, handleDelete)}
                rowKey="id"
                expandable={{
                  expandedRowKeys,
                  expandedRowRender: (record) => (
                    <div className="px-2 py-1 text-sm text-black-300 leading-relaxed">
                      <p className="font-semibold text-black-base mb-1">
                        Mensagem
                      </p>
                      <p className="whitespace-pre-wrap">
                        {record.content?.trim() || "Sem mensagem cadastrada."}
                      </p>
                    </div>
                  ),
                  expandIcon: ({ expanded }) => (
                    <ChevronDown
                      size={16}
                      className={`text-black-300 transition-transform ${expanded ? "rotate-180" : ""}`}
                    />
                  ),
                  onExpand: (_, record) => {
                    toggleRowExpansion(record.id);
                  },
                }}
                onRow={(record) => ({
                  onClick: () => toggleRowExpansion(record.id),
                  className: "cursor-pointer",
                })}
                pagination={false}
                tableLayout="fixed"
                sticky
                scroll={{ x: 720 }}
              />
            </div>

            <footer className="px-4 md:px-6 py-4 border-t border-white-700 bg-white-300 shrink-0">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                itemsPerPage={limit}
                onPageChange={setCurrentPage}
              />
            </footer>
          </>
        )}
      </main>

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          resetForm();
        }}
        title="Nova Mensagem"
        description="Cadastre um trigger e a mensagem que ele deve inserir no chat."
        onSubmit={handleCreateSubmit}
        submitLabel="Criar"
        loading={loadingModal}
      >
        {formFields}
        {error && <p className="text-xs text-red-500">{error}</p>}
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          resetForm();
        }}
        title="Editar Mensagem"
        description="Atualize o trigger ou o conteudo da mensagem padrao."
        onSubmit={handleEditSubmit}
        submitLabel="Salvar"
        loading={loadingModal}
      >
        {formFields}
        {error && <p className="text-xs text-red-500">{error}</p>}
      </Modal>
    </div>
  );
}
