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
        <div style={styles.container}>
            <h1>Login</h1>

            <form onSubmit={handleLogin} style={styles.form}>

                {/* Campo de email */}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={styles.input}
                />

                {/* Campo de senha */}
                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={styles.input}
                />

                {/* Exibição de erro */}
                {error && (
                    <span style={styles.error}>{error}</span>
                )}

                {/* Botão com estado de loading */}
                <button type="submit" disabled={loading} style={styles.button}>
                    {loading ? "Entrando..." : "Entrar"}
                </button>

            </form>
        </div>
    );
}

// Estilos simples (evita inline bagunçado)
const styles = {
    container: {
        maxWidth: "400px",
        margin: "80px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        textAlign: "center" as const,
    },
    form: {
        display: "flex",
        flexDirection: "column" as const,
        gap: "12px",
    },
    input: {
        padding: "10px",
        borderRadius: "6px",
        border: "1px solid #ccc",
    },
    button: {
        padding: "10px",
        borderRadius: "6px",
        border: "none",
        backgroundColor: "#0070f3",
        color: "#fff",
        cursor: "pointer",
    },
    error: {
        color: "red",
        fontSize: "14px",
    },
};