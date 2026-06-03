import { Footer } from "@/app/components/layout/footer";
import Link from "next/link";

export default function Page() {
    return (
        <div className="h-screen flex flex-col px-4 md:px-10 py-8 bg-[var(--white-base)] overflow-y-auto">
            <header className="mb-8">
                <div className="relative flex items-center justify-center">
                    <Link
                        href="/"
                        className="absolute left-0 flex items-center gap-3"
                    >
                        <i className="bi bi-arrow-left text-3xl text-[var(--teal-700)] hover:text-[var(--black-700)] transition-colors"></i>
                    </Link>

                    <h1 className="text-5xl font-semibold text-[var(--teal-700)] text-center">
                        Termos de Uso
                    </h1>
                </div>
            </header>

            <section className="flex-1">
                <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-md border border-[var(--beige-700)] p-8 md:p-12">
                    <h3 className="subtitle-2 text-left text-[var(--teal-700)] !font-semibold"> 1. Aceitação dos Termos</h3>
                    <p className="label-1 text-left">
                        Ao acessar e utilizar o <b>Orbita</b>, o usuário concorda em cumprir estes Termos e Condições de Uso.
                        <br />
                        O acesso é restrito a usuários autorizados pela <b>Pro4Tech</b> e deve ser utilizado exclusivamente para fins operacionais da plataforma.
                    </p>

                    <h3 className="subtitle-2 text-left text-[var(--teal-700)] !font-semibold"> 2. Finalidade do Sistema</h3>
                    <p className="label-1 text-left">
                        O <b>Orbita</b> é uma plataforma de atendimento via chat estruturado, destinada ao suporte e gestão de interações entre clientes, atendentes e administradores.
                    </p>

                    <h3 className="subtitle-2 text-left text-[var(--teal-700)] !font-semibold"> 3. Responsabilidades do Usuário</h3>
                    <p className="label-1 text-left">Os usuários se comprometem a utilizar o <b>Orbita</b> de forma responsável e adequada ao seu papel na plataforma.
                        <br /> Isso inclui:
                    </p>
                    <ul className="label-1 text-left">
                        <li>Garantir que as informações fornecidas sejam verdadeiras e atualizadas;</li>
                        <li>Utilizar a plataforma exclusivamente para fins relacionados ao atendimento e suporte;</li>
                        <li>Manter a confidencialidade das credenciais de acesso;</li>
                        <li>Não tentar acessar dados, conversas ou funcionalidades fora do seu nível de permissão;</li>
                    </ul>

                    <h3 className="subtitle-2 text-left text-[var(--teal-700)] !font-semibold"> 4. Responsabilidades da Equipe de Desenvolvimento</h3>
                    <p className="label-1 text-left">
                        Por se tratar de um projeto acadêmico, a <b>Equipe Code Don't Blow</b> não se responsabiliza por danos diretos ou indiretos decorrentes do uso indevido do sistema.
                        <br />
                        O ambiente pode conter limitações e funcionalidades em desenvolvimento.
                    </p>

                    <h3 className="subtitle-2 text-left text-[var(--teal-700)] !font-semibold"> 5. Alterações e Atualizações</h3>
                    <p className="label-1 text-left">
                        A <b>Pro4Tech</b> e a <b>Equipe Code Don't Blow</b> poderão atualizar o <b>Orbita</b> e estes Termos a qualquer momento, visando melhorias de segurança, desempenho e experiência do usuário.
                        <br />
                        O uso contínuo da plataforma implica na aceitação das versões atualizadas.
                    </p>

                    <h3 className="subtitle-2 text-left text-[var(--teal-700)] !font-semibold"> 6. Encerramento de Acesso</h3>
                    <p className="label-1 text-left">
                        A <b>Pro4Tech</b> reserva-se o direito de suspender ou encerrar o acesso de usuários que violem estes Termos, utilizem a plataforma de forma indevida ou comprometam a segurança do <b>Orbita</b>.
                    </p>
                </div>
            </section >
            <Footer />
        </div >
    );
}