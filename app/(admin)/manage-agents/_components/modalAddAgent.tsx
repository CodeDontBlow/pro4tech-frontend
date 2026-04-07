"use client";
import { useState } from "react";
import { Modal } from "@/components/ui/modal";

interface ModalAddAgentProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  onCreate: (data: any) => Promise<void>;
}

export function ModalAddAgent({
  isOpen,
  onClose,
  onSuccess,
  onCreate,
}: ModalAddAgentProps) {
  const [form, setForm] = useState({ name: "", emailPrefix: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit() {
    setLoading(true);
    setError("");
    try {
      const { emailPrefix, ...restOfForm } = form;

      await onCreate({
        ...restOfForm,
        email: `${emailPrefix}@pro4tech.com`,
        role: "AGENT",
      });

      onSuccess?.();
      onClose();
      setForm({ name: "", emailPrefix: "", password: "" });
    } catch (err: any) {
      const message = err.response?.data?.message;
      setError(
        Array.isArray(message) ? message[0] : "Erro ao criar atendente.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Novo Atendente"
      description="Preencha os dados para criar o acesso"
      onSubmit={handleSubmit}
      submitLabel="Criar"
      loading={loading}
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
          onChange={handleChange}
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
            name="emailPrefix"
            type="text"
            placeholder="Nome do e-mail"
            value={form.emailPrefix}
            onChange={handleChange}
            required
            className="flex-1 px-4 py-2.5 text-sm text-black-base placeholder:text-black-300/50 bg-white focus:outline-none"
          />
          <span className="px-3 py-2.5 text-sm text-black-300/60 border-l border-white-700 bg-white-700/30 select-none whitespace-nowrap">
            @pro4tech.com
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-black-300 uppercase tracking-wide">
          Senha
        </label>
        <input
          name="password"
          type="password"
          placeholder="••••••••"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full px-4 py-2.5 rounded-xl border border-white-700 bg-white text-sm text-black-base placeholder:text-black-300/50 focus:outline-none focus:border-green-500 transition-colors"
        />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </Modal>
  );
}
