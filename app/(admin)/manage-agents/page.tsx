"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import { useAgent } from "@/hooks/use-agent";
import { uploadUserAvatar } from "@/services/upload/upload.service";

//components
import { FilterSelect } from "@/app/components/ui/filterSelect";
import { Loading } from "@/app/components/layout/loading";
import { Button } from "@/app/components/ui/button";
import { Pagination } from "@/app/components/ui/pagination";
import { Modal } from "@/app/components/ui/modal";
import { Table } from "antd";

//config table
import { getAgentColumns } from "./agent-table-config";

import { useSupportGroup } from "@/hooks/use-support-group";

export default function Page() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", supportLevel: "", supportGroupId: "" });
  const [loadingModal, setLoadingModal] = useState(false);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const limit = 8;
  const { supportGroups } = useSupportGroup(1, 100);

  const {
    agents,
    loading,
    totalItems,
    totalPages,
    handleDelete,
    handleCreate,
    handleUpdate,
    refresh,
    supportLevel,
    setSupportLevel,
  } = useAgent(currentPage, limit);

    function handleEdit(agent: any) {
    setEditingId(agent.id);
    setForm({
      name: agent.name,
      email: agent.email,
      password: "",
      supportLevel: agent.supportLevel,
      supportGroupId: agent.supportGroupId,
    });
      setAvatarFile(null);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setEditingId(null);
    setForm({ name: "", email: "", password: "", supportLevel: "", supportGroupId: "" });
    setError("");
    setAvatarFile(null);
  }

  async function handleSubmit() {
    setLoadingModal(true);
    setError("");
    try {
      
      if (editingId) {
        const updateData: any = { 
          supportLevel: form.supportLevel, 
          supportGroupId: form.supportGroupId 
        };

        if (avatarFile) {
          await uploadUserAvatar(editingId, avatarFile);
        }
            
        await handleUpdate(editingId, updateData);
      } else {
      await handleCreate({
        ...form,
        role: "AGENT",
        chatStatus: "OFFLINE",
        isActive: true,
      });
    }
      refresh();
      closeModal();
    } catch (err: any) {
      const message = err.response?.data?.message;
      setError(
        Array.isArray(message) ? message[0] : "Erro ao processar a solicitação.",
      );
    } finally {
      setLoadingModal(false);
    }
  }
  return (
    <div className="px-4 md:px-10 lg:px-16 py-6 md:py-9 h-screen flex flex-col bg-white-300 overflow-hidden">
      <div className="flex flex-col justify-between mb-4 shrink-0">
        <h1 className="font-martel font-bold text-[42px] leading-12.5 text-start mb-5">
          Atendentes
        </h1>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex-1 sm:flex-none">
            <FilterSelect
              value={supportLevel}
              onChange={(val) => {
                setSupportLevel(val);
                setCurrentPage(1);
              }}
            />
          </div>
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

          {/* TABELA */}
          {loading ? (
            <div className="flex-1 flex items-center justify-center">
              <Loading />
            </div>
          ) : (
            <div className="flex-1 min-h-0">
              <Table
                size="middle"
                dataSource={agents}
                columns={getAgentColumns(handleDelete, handleEdit)}
                rowKey="id"
                pagination={false}
                tableLayout="fixed"
                sticky
                scroll={{ x: 720, y: "calc(100vh - 360px)" }}
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
        onClose={closeModal}
        title={editingId ? "Editar Atendente" : "Novo Atendente"}
        description="Preencha os dados"
        onSubmit={handleSubmit}
        submitLabel={editingId ? "Salvar" : "Criar"}
        loading={loadingModal}
      >
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-black-300 uppercase tracking-wide">
            Nome completo
          </label>
          <input
            name="name"
            type="text"
            placeholder="Nome do atendente"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            className="w-full px-4 py-2.5 rounded-xl border border-white-700 bg-white text-sm text-black-base placeholder:text-black-300/50 focus:outline-none focus:border-green-500 transition-colors"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-black-300 uppercase tracking-wide">
            E-mail
          </label>
          <div className="flex items-center rounded-xl border border-white-700 bg-white-500 focus-within:border-green-500 focus-within:bg-white-base transition-colors overflow-hidden">
            <input
              name="email"
              type="text"
              placeholder="exemple@email.com"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              required
              className="flex-1 px-4 py-2.5 text-sm text-black-base placeholder:text-black-300/50 bg-white focus:outline-none"
            />
          </div>
        </div>
{!editingId && (
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-black-300 uppercase tracking-wide">
            Senha
          </label>
          <input
            name="password"
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required={!editingId}
            className="w-full px-4 py-2.5 rounded-xl border border-white-700 bg-white text-sm text-black-base placeholder:text-black-300/50 focus:outline-none focus:border-green-500 transition-colors"
          />
        </div>
)}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-black-300 uppercase tracking-wide">
            Avatar (opcional)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setAvatarFile(e.target.files?.[0] ?? null)}
            className="w-full px-4 py-2.5 rounded-xl border border-white-700 bg-white text-sm text-black-base placeholder:text-black-300/50 focus:outline-none focus:border-green-500 transition-colors"
          />
          {avatarFile && (
            <p className="text-xs text-black-300">{avatarFile.name}</p>
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-black-300 uppercase tracking-wide">
            Nível de Suporte
          </label>
          <select
            value={form.supportLevel}
            onChange={(e) => setForm({ ...form, supportLevel: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-white-700 bg-white text-sm text-black-base focus:outline-none focus:border-green-500 transition-colors"
          >
            <option value="">Selecione o nível</option>
            <option value="LEVEL_1">Nível 1</option>
            <option value="LEVEL_2">Nível 2</option>
            <option value="LEVEL_3">Nível 3</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-black-300 uppercase tracking-wide">
            Grupo de Suporte
          </label>
          <select
            value={form.supportGroupId}
            onChange={(e) => setForm({ ...form, supportGroupId: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-white-700 bg-white text-sm text-black-base focus:outline-none focus:border-green-500 transition-colors"
          >
            <option value="">Selecione o grupo</option>
            {supportGroups.map((group) => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
            ))} 
          </select>
        </div>
        {error && <p className="text-xs text-red-500">{error}</p>}
      </Modal>
    </div>
  );
}
