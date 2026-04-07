"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/services/auth/auth.service";
import { Footer } from "@/app/components/layout/footer";
import { InputField } from "@/app/components/ui/inputField";
import { decodeToken } from "@/utils/decode-token";
import Cookies from "js-cookie";

//types
import type { TokenPayload } from "@/utils/decode-token";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    if (loading) return;

    setLoading(true);
    setError(null);

    if (!email || !password) {
      setError("Preencha todos os campos.");
      setLoading(false);
      return;
    }

    try {
      const data = await login(email, password);
      const token = data.access_token;

      const decoded: TokenPayload = decodeToken(token);

      const role = decoded.role?.toUpperCase() as TokenPayload["role"];

      if (!role) {
        throw new Error("Cargo não encontrado no token.");
      }

      Cookies.set("token", token, { expires: 7, path: "/", sameSite: "lax" });
      Cookies.set("user_role", role, {
        expires: 7,
        path: "/",
        sameSite: "lax",
      });

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      const path = role === "ADMIN" ? "/admin-profile" : "/profile";

      console.log(`Login sucesso! Role: ${role} -> Indo para: ${path}`);
      router.push(path);
    } catch (err: any) {
      console.error("Erro no login:", err);
      const message =
        err?.response?.data?.message ||
        "Erro ao fazer login. Verifique suas credenciais.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex items-center justify-center bg-[var(--white-base)] px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border border-[var(--white-700)]">
          <h1 className="title-1 text-[var(--black-base)] mb-6 text-center">
            Entrar
          </h1>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <InputField
              label="Email"
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={error && !email ? error : ""}
            />

            <InputField
              label="Senha"
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={error && !password ? error : ""}
            />

            {error && (
              <span className="text-sm text-[var(--red-base)] text-center font-medium">
                {error}
              </span>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 py-3 rounded-lg bg-[var(--green-base)] text-white font-semibold hover:bg-[var(--green-700)] transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
