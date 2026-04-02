"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Footer } from "@/app/components/layout/footer";

export default function LandingPage() {
    const router = useRouter();

    return (
        // Wrapper geral da página
        <div className="min-h-screen flex flex-col">

            {/* CONTEÚDO PRINCIPAL */}
            <main className="flex-1 flex items-center justify-center bg-gradient-to-br px-4">

                <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-[var(--white-700)]">

                    <div className="flex flex-col items-center text-center gap-2">

                        <div className="relative w-[160px] h-[160px] mb-2">
                            <Image
                                src="/orbi/orbi-default.png"
                                alt="Orbi"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>

                        <h1 className="text-4xl font-bold text-[var(--black-base)]">
                            Bem-vindo ao{" "}
                            <span className="text-[var(--teal-700)]">Orbita</span>
                        </h1>

                        <p className="label-1 text-[var(--black-base)] max-w-xs">
                            O suporte da{" "}
                            <span className="text-[var(--orange-base)] font-semibold">
                                Pro4Tech
                            </span>{" "}
                            que garante a continuidade das suas operações.
                        </p>
                    </div>

                    <div className="mt-4">
                        <button onClick={() => router.push("/login")}
                            className="w-full cta-button py-3 rounded-lg font-medium transition active:scale-[0.98]">
                            Entrar
                        </button>
                    </div>

                    <p className="text-sm text-center text-[var(--black-300)] mt-4">
                        Ao continuar, você concorda com nossos{" "}
                        <span
                            className="text-[var(--green-base)] cursor-pointer hover:underline"
                            onClick={() => router.push("/terms")}>
                            termos de uso
                        </span>.
                    </p>
                </div>
            </main>

            <Footer />
        </div>
    );
}