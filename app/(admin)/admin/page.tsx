export default function Home() {
    return (
        <div className="min-h-screen flex flex-col bg-[var(--white-base)] px-4 py-6 items-start text-left">
            <h1 className="title-1 mb-2">Bem-vindo Admin!</h1>
            <p className="text-base max-w-4xl">
                Visualização dos chamados abertos, de acordo com grupo e nível de suporte que você foi cadastrado.
            </p>
        </div>
    );
}