"use client"    
import GroupTable from "./components/groupTable";

export default function Page() {
    const tickets = [
        {
            id: "1",
            subject: "Problema com o computador",
            company: 'Mercado Livre',
            date: '10/10/2023',
            agent: 'Rafael Gomes'
        },
        {
            id: "2",
            subject: "Dúvida sobre o sistema",
            company: 'Magazine Luiza'
        },
        {
            id: "3",
            subject: "Problema com o carro virando rápido demais",
            company: 'Uber'
        },
        {
            id: "4",
            subject: "Vídeos não exibem mais dislikes",
            company: 'Youtube'

        }
    ]


    return (
        <div className="py-10 px-15">
            <header className="mb-10">
                <h1 className="title-2 text-left">
                    Chamados
                </h1>
                <p className="text-2 text-left">
                    Visualização dos chamados abertos, de acordo com grupo e nível de suporte que você foi cadastrado.
                </p>
            </header>

            <section className="flex flex-col gap-10">
                <GroupTable 
                    title="Chamados Encaminhados"
                    description="Clique em um dos chamados abertos do seu grupo de atendimento abaixo para atribuí-lo a você."
                    tickets={tickets}
                    onlineAgents={2}
                />
            </section>
            
        
        </div>
    );
}
