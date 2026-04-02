"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/app/services/auth.service";
import { Footer } from "@/app/components/layout/footer";
import { InputField } from "@/app/components/ui/inputField";

export default function LoginPage() {
    const router = useRouter(); // controla navegação

    // estados pra controlar inputs
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Estado de loading
    const [loading, setLoading] = useState(false);

    // Estado pra mensagens de erro
    const [error, setError] = useState<string | null>(null);

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();

        // Evita múltiplos envios
        if (loading) return;

        setLoading(true);
        setError(null);

        // validação simples antes de enviar
        if (!email || !password) {
            setError("Preencha todos os campos.");
            setLoading(false);
            return;
        }

        try {
            // chamada -> api
            const data = await login(email, password);

            //em produção, o ideal é usar cookie HttpOnly 
            localStorage.setItem("token", data.access_token);


            // Redirecionamento (melhor que alert)
            router.push("/page");

        } catch (err: any) {

            // tratamento seguro de erro
            const message =
                err?.response?.data?.message ||
                "Erro ao fazer login. Tente novamente.";

            setError(message);

        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="min-h-screen flex flex-col">


            <main className="flex-1 flex items-center justify-center bg-[var(--white-base)] px-4">

                <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border border-[var(--white-700)]">

                    {/* Título */}
                    <h1 className="title-1 text-[var(--black-base)] mb-6">
                        Entrar
                    </h1>

                    <form onSubmit={handleLogin} className="flex flex-col gap-4">


                        {/* Email */}
                        <div className="flex flex-col text-left">
                            <InputField
                                label="Email"
                                type="email"
                                placeholder="Digite seu email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                error={error && !email ? error : ""}
                            />

                        </div>

                        {/* Senha */}
                        <div className="flex flex-col text-left">
                            <InputField
                                label="Senha"
                                type="password"
                                placeholder="Digite sua senha"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                error={error && !password ? error : ""}
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

                </div>
            </main>

            {/* FOOTER */}
            <Footer />
        </div>
    );
}