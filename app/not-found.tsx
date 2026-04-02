import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Not Found',
    description: 'The page you are looking for does not exist.',
}

export default function GlobalNotFound() {
    return (
        <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-gradient-to-b from-[var(--white-300)] to-[var(--beige-300)]">

            {/*<div className="relative w-full max-w-[220px] h-[220px] mb-6 error-img">
                <Image
                    src="/orbi/orbi-dead.png"
                    alt="Página não encontrada"
                    fill
                    className="object-contain"
                    quality={90}
                    sizes="(max-width: 768px) 150px, 220px"
                />
            </div> */}

            <div className="flex flex-col gap-2 mb-6">
                <h1 className="title-error text-[var(--red-700)] drop-shadow-lg">404</h1>
                <p className="message-error">Ops! A página que você procura não foi encontrada.</p>
            </div>

            <Link href="/" className="back-button">
                Voltar para a Home
            </Link>

        </section>
    )
}