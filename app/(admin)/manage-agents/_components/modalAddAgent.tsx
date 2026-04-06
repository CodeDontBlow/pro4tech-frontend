"use client";
import { X } from "lucide-react";
import { useState } from "react";

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

  if (!isOpen) return null;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
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
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black-base/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white-base w-full max-w-sm rounded-2xl overflow-hidden shadow-xl animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="px-7 pt-6 pb-5 flex justify-between items-start">
          <div>
            <h2 className="font-martel text-start text-xl font-bold text-black-base">
              Novo Atendente
            </h2>
            <p className="text-sm text-black-300 mt-0.5">
              Preencha os dados para criar o acesso
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-black-300 hover:text-black-base transition-colors mt-0.5 cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Divider */}
        <div className="h-px bg-white-700 mx-7" />

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="text-start px-7 py-6 font-ibm-plex flex flex-col gap-4"
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

          {/* Actions */}
          <div className="flex gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-white-700 text-sm text-black-300 font-medium hover:bg-white-500 transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2.5 rounded-xl bg-green-500 text-white-base text-sm font-semibold hover:bg-green-700 transition-colors cursor-pointer"
            >
              {loading ? "Criando..." : "Criar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
