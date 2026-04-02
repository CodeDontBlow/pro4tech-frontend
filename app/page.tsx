"use client";

import { useRouter } from "next/navigation";

export default function LandingPage() {
    const router = useRouter();

    return (
        // Container principal ocupa a tela inteira
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[var(--white-base)] to-[var(--white-700)] px-4">

            {/* Card central */}
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-[var(--white-700)]">

                {/* Logo / Nome */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-[var(--black-base)]">
                        Bem-vindo ao <span className="text-[var(--green-base)]">Orbita</span>
                    </h1>
                    <p className="text-sm text-[var(--black-300)] mt-2">
                        O suporte da  <span className="text-[var(--orange-base)] font-bold">Pro4Tech</span> que garante a continuidade das suas operações.
                    </p>
                </div>

                {/* Botões de ação */}
                <div className="flex flex-col gap-3">

                    {/* Botão principal */}
                    <button
                        onClick={() => router.push("/login")}
                        className="w-full bg-[var(--green-base)] text-white py-3 rounded-lg font-medium hover:opacity-90 transition"
                    >
                        Entrar
                    </button>

                </div>

                {/* Rodapé */}
                <p className="text-xs text-center text-[var(--black-300)] mt-6">
                    Ao continuar, você concorda com nossos <span className="text-[var(--green-base)]"> termos de uso.</span>
                </p>
            </div>
        </main>
    );
}