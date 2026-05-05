"use client"    
import useTicket from "./hooks/useTicket"
import GroupTable from "./components/groupTable"

export default function Page() {
    const { tickets, groups, loading, fetchTickets } = useTicket()

    return (
        <div className="py-10 px-15">
            <header className="mb-10">
                <h1 className="title-2 text-left" onClick={() => {console.log(tickets, groups)}}>
                    Chamados
                </h1>
                <p className="text-2 text-left">
                    Visualização dos chamados abertos, de acordo com grupo e nível de suporte que você foi cadastrado.
                </p>
            </header>

            <section className="flex flex-col gap-10">
                {groups.map((group) => (
                    <GroupTable 
                        group={group}
                        tickets={tickets.filter((ticket) => ticket.supportGroup.id === group.id)}
                        description="Clique em um dos chamados abertos do seu grupo de atendimento abaixo para atribuí-lo a você."
                        onAssign={fetchTickets}
                        key={group.name}
                    />
                ))}
            </section>
        
        </div>
    );
}
