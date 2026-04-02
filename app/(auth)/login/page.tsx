"use client";

import Loading from '@/app/layout'
import { useState } from "react";
import { login } from "@/app/services/auth.service";
import { useRouter } from "next/navigation"; 

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleLogin(e: React.FormEvent) {

        e.preventDefault();
        setLoading(true);

        try {
            const data = await login(email, password);
            localStorage.setItem("token", data.access_token);

            router.push("/profile");

            alert("Login feito com sucesso!");
            console.log("JWT:", data.access_token);
        } catch (error: any) {
            console.error(error);
            alert(
                error?.response?.data?.message || "Erro ao fazer login. Backend não está pronto."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div style={{ maxWidth: "400px", margin: "50px auto" }}>
            <h1>Login</h1>
            <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? "Entrando..." : "Entrar"}
                </button>
            </form>
        </div>
    );
}