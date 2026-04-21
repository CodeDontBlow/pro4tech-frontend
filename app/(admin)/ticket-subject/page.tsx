"use client";

import { useState } from "react";
import { AxiosError } from "axios";
import { Plus } from "lucide-react";
import { Table } from "antd";
import { useTicketSubject } from "@/hooks/use-ticket-subject";

import { Button } from "@/app/components/ui/button";
import { Loading } from "@/app/components/layout/loading";
import { Pagination } from "@/app/components/ui/pagination";
import { Modal } from "@/app/components/ui/modal";
import { getTicketSubjectColumns } from "./ticket-subject-table-config";

export default function Page() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ name: "" });
  const [loadingModal, setLoadingModal] = useState(false);
  const [error, setError] = useState("");
  const limit = 8;

  const {
    ticketSubjects,
    loading,
    totalItems,
    totalPages,
    handleCreate,
    handleDelete,
    refresh,
  } = useTicketSubject(currentPage, limit);

  async function handleSubmit() {
    setLoadingModal(true);
    setError("");

    try {
      await handleCreate({
        name: form.name.trim(),
      });

      refresh();
      setIsModalOpen(false);
      setForm({ name: "" });
    } catch (error: unknown) {
      const message = (error as AxiosError<{ message?: string | string[] }>)
        .response?.data?.message;
      setError(Array.isArray(message) ? message[0] : "Erro ao criar assunto.");
    } finally {
      setLoadingModal(false);
    }
  }

  return (
    <div className="px-4 md:px-10 lg:px-16 py-6 md:py-9 h-screen flex flex-col bg-white-300 overflow-hidden">
      <div className="flex flex-col justify-between mb-4 shrink-0">
        <h1 className="font-martel font-bold text-[42px] leading-12.5 text-start mb-5">
          Tickets
        </h1>

        <div className="flex items-center justify-end gap-4">
          <Button
            onClick={() => setIsModalOpen(true)}
            label="Adicionar"
            icon={Plus}
            variant="primary"
            size="md"
          />
        </div>
      </div>

      <main className="flex-1 flex flex-col min-h-0 bg-white-300 rounded-lg border border-white-700 overflow-hidden">
        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <Loading />
          </div>
        ) : (
          <div className="flex-1 min-h-0">
            <Table
              size="middle"
              dataSource={ticketSubjects}
              columns={getTicketSubjectColumns(handleDelete)}
              rowKey="id"
              pagination={false}
              tableLayout="fixed"
              sticky
              scroll={{ x: 480, y: "calc(100vh - 360px)" }}
            />
          </div>
        )}

        {!loading && (
          <footer className="px-4 md:px-6 py-4 border-t border-white-700 bg-white-300 shrink-0">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              itemsPerPage={limit}
              onPageChange={setCurrentPage}
            />
          </footer>
        )}
      </main>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Novo Assunto"
        description="Preencha os dados para cadastrar o assunto do chamado"
        onSubmit={handleSubmit}
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
            onChange={(e) => setForm({ name: e.target.value })}
            required
            className="w-full px-4 py-2.5 rounded-xl border border-white-700 bg-white text-sm text-black-base placeholder:text-black-300/50 focus:outline-none focus:border-green-500 transition-colors"
          />
        </div>

        {error && <p className="text-xs text-red-500">{error}</p>}
      </Modal>
    </div>
  );
}
