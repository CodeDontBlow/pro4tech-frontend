"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/app/services/auth.service";

export default function LoginPage() {
    const router = useRouter(); // controla navegação

    // Estados para controlar os inputs
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Estado de loading (para UX)
    const [loading, setLoading] = useState(false);

    // Estado para mensagens de erro
    const [error, setError] = useState<string | null>(null);

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();

        // Evita múltiplos envios
        if (loading) return;

        setLoading(true);
        setError(null);

        // Validação simples antes de enviar
        if (!email || !password) {
            setError("Preencha todos os campos.");
            setLoading(false);
            return;
        }

        try {
            // Chamada para API
            const data = await login(email, password);

            // ⚠️ Em produção, o ideal é usar cookie HttpOnly (mais seguro)
            localStorage.setItem("token", data.access_token);


            // Redirecionamento (melhor que alert)
            router.push("/page");

        } catch (err: any) {

            // Tratamento seguro de erro
            const message =
                err?.response?.data?.message ||
                "Erro ao fazer login. Tente novamente.";

            setError(message);

        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--white-base)] px-4">

            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border border-[var(--white-700)]">

                {/* Título */}
                <h1 className="title-2 text-[var(--black-base)] mb-6">
                    Entrar
                </h1>

                <form onSubmit={handleLogin} className="flex flex-col gap-4">

                    {/* Email */}
                    <div className="flex flex-col text-left">
                        <label className="label-1 mb-1">Email</label>
                        <input
                            type="email"
                            placeholder="seu@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="p-3 rounded-lg border border-[var(--white-700)] focus:outline-none focus:ring-2 focus:ring-[var(--green-base)] transition"
                        />
                    </div>

                    {/* Senha */}
                    <div className="flex flex-col text-left">
                        <label className="label-1 mb-1">Senha</label>
                        <input
                            type="password"
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="p-3 rounded-lg border border-[var(--white-700)] focus:outline-none focus:ring-2 focus:ring-[var(--green-base)] transition"
                        />
                    </div>

                    {/* Erro */}
                    {error && (
                        <span className="text-sm text-[var(--red-base)]">
                            {error}
                        </span>
                    )}

                    {/* Botão */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-2 py-3 rounded-lg bg-[var(--green-base)] text-white font-semibold hover:bg-[var(--green-700)] transition disabled:opacity-50"
                    >
                        {loading ? "Entrando..." : "Entrar"}
                    </button>

                </form>

                {/* Rodapé */}
                <p className="text-2 mt-6 text-[var(--black-300)]">
                    Não tem conta?{" "}
                    <span className="text-[var(--green-base)] cursor-pointer hover:underline">
                        Criar conta
                    </span>
                </p>

            </div>
        </div>
    );
}