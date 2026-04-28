"use client"    
import { useEffect, useState } from "react"
import { api } from "@/services/api"
import GroupTable from "./components/groupTable"
import { ITicket } from "@/services/ticket/ticket.interface"
import { ISupportGroupSummary } from "@/services/support-group/support-group.interface"

export default function Page() {
    const [tickets, setTickets] = useState<ITicket[]>([]);
    const [groups, setGroups] = useState<ISupportGroupSummary[]>([]);

    useEffect(() => {
        api.get('/tickets')
            .then((res) => {
                const closedStatus = ['RESOLVED', 'CLOSED']
                const openedTickets = res.data.data.filter((ticket) => !closedStatus.includes(ticket.status))
                setTickets(openedTickets)
            })
            .catch((err) => console.log('Erro ao ler Tickets' + err));
    }, [])

    useEffect(() => {
        const uniqueGroup = Array.from(
            new Map(
                tickets.map((ticket) => [ticket.supportGroupId, ticket.supportGroup])
            ).values()
        )
        console.log(tickets)
        setGroups(uniqueGroup)
    }, [tickets])

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
                        title={`Chamados - ${group.name}`}
                        description="Clique em um dos chamados abertos do seu grupo de atendimento abaixo para atribuí-lo a você."
                        tickets={tickets.filter((ticket) => ticket.supportGroup.id === group.id)}
                        onlineAgents={2}
                        key={group.name}
                    />
                ))}
            </section>
            
        
        </div>
    );
}
