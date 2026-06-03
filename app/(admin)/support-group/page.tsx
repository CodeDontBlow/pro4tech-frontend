"use client";
import { useState } from "react";
import { ChevronDown, Plus } from "lucide-react";
import { useSupportGroup } from "@/hooks/use-support-group";

//components
import { Loading } from "@/app/components/layout/loading";
import { Button } from "@/app/components/ui/button";
import { Pagination } from "@/app/components/ui/pagination";
import { Modal } from "@/app/components/ui/modal";
import { Table } from "antd";
import { getSupportGroupColumns } from "./support-group-table-config";

export default function Page() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ name: "", description: "" });
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loadingModal, setLoadingModal] = useState(false);
  const [error, setError] = useState("");
  
  const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);
  const limit = 10;

  const {
    supportGroups,
    loading,
    totalItems,
    totalPages,
    handleDelete,
    handleCreate,
    handleUpdate,
    refresh,
  } = useSupportGroup(currentPage, limit);

  function toggleRowExpansion(id: string) {
    setExpandedRowKeys((prev) =>
      prev.includes(id) ? prev.filter((key) => key !== id) : [...prev, id],
    );
  }

  function onEdit(record: any) {
    setSelectedId(record.id);
    setForm({ name: record.name, description: record.description });
    setIsModalOpen(true);
  }

  function handleOpenAddModal() {
    setSelectedId(null);
    setForm({ name: "", description: "" }); 
    setIsModalOpen(true); 
  }

  async function handleSubmit() {
    setLoadingModal(true);
    setError("");
    try {
      if (selectedId) {
        await handleUpdate(selectedId, form);
      } else {    
        await handleCreate({
          ...form,
          isActive: true,
        });
      }
      await refresh();
      setIsModalOpen(false);
      setForm({ name: "", description: "" });
    } catch (err: any) {
      const message = err.response?.data?.message;
      setError(
        Array.isArray(message) ? message[0] : "Erro ao criar grupo de suporte.",
      );
    } finally {
      setLoadingModal(false);
    }
  }

  return (
    <div className="px-4 md:px-10 lg:px-16 py-6 md:py-9 h-screen flex flex-col bg-white-300 overflow-hidden">
      <div className="flex flex-col justify-between mb-4 shrink-0">
        <h1 className="font-martel font-bold text-[42px] leading-12.5 text-start mb-5">
          Grupos de Suporte
        </h1>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-4">
          
          <Button
            onClick={handleOpenAddModal}
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
          <div className="flex-1 overflow-auto min-h-0">
            <Table
              size="middle"
              dataSource={supportGroups}
              columns={getSupportGroupColumns(handleDelete, onEdit)}
              rowKey="id"
              pagination={false}
              tableLayout="fixed"
              sticky
              scroll={{ x: 720 }}
              expandable={{
                expandedRowKeys,
                expandedRowRender: (record) => (
                  <div className="text-sm text-black-300 leading-relaxed">
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
        title={selectedId ? "Editar Grupo" : "Novo Grupo"}
        description={selectedId ? "Altere os dados do grupo" : "Preencha os dados para criar o grupo"}
        onSubmit={handleSubmit}
        submitLabel={selectedId ? "Salvar" : "Criar"}
        loading={loadingModal}
      >
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-black-300 uppercase tracking-wide">
            Nome
          </label>
          <input
            name="name"
            type="text"
            placeholder="Nome do grupo de suporte"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            className="w-full px-4 py-2.5 rounded-xl border border-white-700 bg-white text-sm text-black-base placeholder:text-black-300/50 focus:outline-none focus:border-green-500 transition-colors"
          />
        </div>

        <div className="flex flex-col gap-1.5 mt-4">
          <label className="text-xs font-semibold text-black-300 uppercase tracking-wide">
            Descrição
          </label>
          <div className="flex items-center rounded-xl border border-white-700 bg-white focus-within:border-green-500 transition-colors overflow-hidden">
            <textarea
              name="description"
              placeholder="Descrição do grupo de suporte"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              required
              rows={3}
              className="flex-1 px-4 py-2.5 text-sm text-black-base placeholder:text-black-300/50 bg-white focus:outline-none resize-none"
            />
          </div>
        </div>
        {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
      </Modal>
    </div>
  );
}