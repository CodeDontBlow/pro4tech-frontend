"use client";

import { useState } from "react";
import { AxiosError } from "axios";
import { ChevronDown, Plus, Search } from "lucide-react";
import { Table } from "antd";
import { useTicketSubject } from "@/hooks/use-ticket-subject";
import { ITicketSubject } from "@/services/ticket-subject/ticket-subject.interface";

import { Button } from "@/app/components/ui/button";
import { Pagination } from "@/app/components/ui/pagination";
import { Modal } from "@/app/components/ui/modal";
import { getTicketSubjectColumns } from "./ticket-subject-table-config";

export default function Page() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingSubjectId, setEditingSubjectId] = useState<string | null>(null);
  const [searchName, setSearchName] = useState("");
  const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);
  const [form, setForm] = useState({ name: "", description: "" });
  const [loadingModal, setLoadingModal] = useState(false);
  const [error, setError] = useState("");
  const limit = 8;

  const {
    ticketSubjects,
    loading,
    totalItems,
    totalPages,
    handleCreate,
    handleUpdate,
    handleDelete,
    refresh,
  } = useTicketSubject(currentPage, limit, searchName);

  const isInitialLoading = loading && ticketSubjects.length === 0 && totalItems === 0;

  function toggleRowExpansion(id: string) {
    setExpandedRowKeys((prev) =>
      prev.includes(id) ? prev.filter((key) => key !== id) : [...prev, id],
    );
  }

  function resetForm() {
    setForm({ name: "", description: "" });
    setError("");
    setEditingSubjectId(null);
  }

  function openCreateModal() {
    resetForm();
    setIsCreateModalOpen(true);
  }

  function openEditModal(subject: ITicketSubject) {
    setForm({
      name: subject.name ?? "",
      description: subject.description ?? "",
    });
    setError("");
    setEditingSubjectId(subject.id);
    setIsEditModalOpen(true);
  }

  async function handleCreateSubmit() {
    setLoadingModal(true);
    setError("");

    try {
      await handleCreate({
        name: form.name.trim(),
        description: form.description.trim(),
      });

      await refresh();
      setIsCreateModalOpen(false);
      resetForm();
    } catch (error: unknown) {
      const message = (error as AxiosError<{ message?: string | string[] }>)
        .response?.data?.message;
      setError(Array.isArray(message) ? message[0] : "Erro ao criar assunto.");
    } finally {
      setLoadingModal(false);
    }
  }

  async function handleEditSubmit() {
    if (!editingSubjectId) {
      return;
    }

    setLoadingModal(true);
    setError("");

    try {
      await handleUpdate(editingSubjectId, {
        name: form.name.trim(),
        description: form.description.trim(),
      });

      await refresh();
      setIsEditModalOpen(false);
      resetForm();
    } catch (error: unknown) {
      const message = (error as AxiosError<{ message?: string | string[] }>)
        .response?.data?.message;
      setError(
        Array.isArray(message) ? message[0] : "Erro ao atualizar assunto.",
      );
    } finally {
      setLoadingModal(false);
    }
  }

  return (
    <div className="px-4 md:px-10 lg:px-16 py-6 md:py-9 h-screen flex flex-col bg-white-300 overflow-hidden">
      <div className="flex flex-col justify-between mb-4 shrink-0">
        <h1 className="font-martel font-bold text-[42px] leading-12.5 text-start mb-5">
          Assuntos dos Chamados
        </h1>

        <div className="flex items-center justify-end gap-4">
          <div className="relative w-full sm:w-[320px]">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-black-300"
            />
            <input
              type="text"
              value={searchName}
              onChange={(e) => {
                setCurrentPage(1);
                setSearchName(e.target.value);
              }}
              placeholder="Pesquisar por nome do assunto"
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
            <div className="flex-1 min-h-0">
              <Table
                size="middle"
                dataSource={ticketSubjects}
                columns={getTicketSubjectColumns(openEditModal, handleDelete)}
                rowKey="id"
                expandable={{
                  expandedRowKeys,
                  expandedRowRender: (record) => (
                    <div className="px-2 py-1 text-sm text-black-300 leading-relaxed">
                      <p className="font-semibold text-black-base mb-1">Descrição</p>
                      <p>{record.description?.trim() || "Sem descrição cadastrada."}</p>
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
                scroll={{ x: 480, y: "calc(100vh - 360px)" }}
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
        title="Novo Assunto"
        description="Preencha os dados para cadastrar o assunto do chamado"
        onSubmit={handleCreateSubmit}
        submitLabel="Criar"
        loading={loadingModal}
      >
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-black-300 uppercase tracking-wide">
            Nome do assunto
          </label>
          <input
            name="name"
            type="text"
            placeholder="Ex.: Financeiro"
            value={form.name}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, name: e.target.value }))
            }
            required
            className="w-full px-4 py-2.5 rounded-xl border border-white-700 bg-white text-sm text-black-base placeholder:text-black-300/50 focus:outline-none focus:border-green-500 transition-colors"
          />

          <label className="text-xs font-semibold text-black-300 uppercase tracking-wide mt-2">
            Descrição do assunto
          </label>
          <textarea
            name="description"
            placeholder="Ex.: Questões relacionadas a pagamentos, faturas e boletos."
            value={form.description}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, description: e.target.value }))
            }
            required
            rows={3}
            className="w-full px-4 py-2.5 rounded-xl border border-white-700 bg-white text-sm text-black-base placeholder:text-black-300/50 focus:outline-none focus:border-green-500 transition-colors resize-none"
          />
        </div>

        {error && <p className="text-xs text-red-500">{error}</p>}
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          resetForm();
        }}
        title="Editar Assunto"
        description="Atualize os dados do assunto do chamado"
        onSubmit={handleEditSubmit}
        submitLabel="Salvar"
        loading={loadingModal}
      >
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-black-300 uppercase tracking-wide">
            Nome do assunto
          </label>
          <input
            name="name"
            type="text"
            placeholder="Ex.: Financeiro"
            value={form.name}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, name: e.target.value }))
            }
            required
            className="w-full px-4 py-2.5 rounded-xl border border-white-700 bg-white text-sm text-black-base placeholder:text-black-300/50 focus:outline-none focus:border-green-500 transition-colors"
          />

          <label className="text-xs font-semibold text-black-300 uppercase tracking-wide mt-2">
            Descrição do assunto
          </label>
          <textarea
            name="description"
            placeholder="Ex.: Questões relacionadas a pagamentos, faturas e boletos."
            value={form.description}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, description: e.target.value }))
            }
            required
            rows={3}
            className="w-full px-4 py-2.5 rounded-xl border border-white-700 bg-white text-sm text-black-base placeholder:text-black-300/50 focus:outline-none focus:border-green-500 transition-colors resize-none"
          />
        </div>

        {error && <p className="text-xs text-red-500">{error}</p>}
      </Modal>
    </div>
  );
}
