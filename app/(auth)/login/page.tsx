"use client";

import { useState } from "react";
import { login } from "@/app/services/auth.service";
import { useRouter } from "next/navigation"; 
import Cookies from "js-cookie"; 

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
            
            Cookies.set("token", data.access_token, { 
                expires: 7, 
                path: '/' 
            });

            Cookies.set("user_role", data.role, { 
                expires: 7, 
                path: '/' 
            });

            localStorage.setItem("token", data.access_token);            

            if (data.role === "ADMIN") {
                router.push("/admin-profile"); 
            } else if (data.role === "AGENT") {
                router.push("/profile"); 
            } else {
                router.push("/login"); 
            }
            
            console.log(`Login feito com sucesso como: ${data.role}`);
        } catch (error: any) {
            console.error(error);
            alert(
                error?.response?.data?.message || "Erro ao fazer login."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div style={{ maxWidth: "400px", margin: "50px auto", fontFamily: "sans-serif" }}>
            <h1>Login</h1>
            <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ padding: "8px" }}
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ padding: "8px" }}
                />
                <button 
                    type="submit" 
                    disabled={loading}
                    style={{ 
                        padding: "10px", 
                        backgroundColor: loading ? "#ccc" : "#0070f3", 
                        color: "white", 
                        border: "none", 
                        cursor: "pointer" 
                    }}
                >
                    {loading ? "Entrando..." : "Entrar"}
                </button>
            </form>
        </div>
    );
}