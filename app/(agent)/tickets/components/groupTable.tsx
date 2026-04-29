'use client'

import { Table } from "antd"
import { getColumns } from "../tickets.table.config"
import { api } from "@/services/api"
import { useState, useEffect } from "react"
import { ISupportGroupSummary } from "@/services/support-group/support-group.interface"
import { useRouter } from "next/navigation"

interface GroupTableProps {
    group: ISupportGroupSummary,
    tickets: any[],
    description: string,
    onAssign: () => void,
}

export default function Page({group, tickets, description, onAssign}: GroupTableProps) {
    const [onlineAgents, setOnlineAgents] = useState(0)
    const [notAssignedTickets, setNotAssignedTickets] = useState(0)
    const router = useRouter()

    // Atribui um chamado a si mesmo e da refetch nos tickets
    const handleAssign = async (id: string) => {
        try{
            await api.patch(`/tickets/${id}/assign-self`, {})
            onAssign()
            router.push(`chat?id=${group.id}`)
        }
        catch(err: any) {
            console.error('Erro ao atribuir o atendente', err)
        } 
    }

    useEffect(() => {
        const countNotAssigned = tickets.filter(ticket => !ticket.agent).length
        setNotAssignedTickets(countNotAssigned)
    }, [tickets])

    // Checa quantos atendentes do grupo estão disponíveis
    useEffect(() => {
        const fetchOnlineAgents = async () => {
            try {
                const response = await api.get(`/support-groups/me/agents/availability-summary?supportGroupId=${group.id}`)
                setOnlineAgents(response.data.totalUniqueAvailableAgents)
            } catch (err) {
                console.error('Erro ao buscar agentes online', err)
            }
        }

        fetchOnlineAgents()
    }, [group.id])

    return(
        <section className="">
            <header className="">
                <div className="flex items-center gap-3">
                    <h2 className="subtitle-2 text-left"> 
                        {group.name} 
                    </h2>

                    {/* Chamados abertos disponíveis */}
                    <span className="relative px-4 label-2 bg-orange-base text-white-300 rounded-full font-bold">
                        {notAssignedTickets > 0 && (
                            notAssignedTickets
                        )}

                        <span className="absolute h-full w-full bg-orange-base rounded-full inline-flex left-0 opacity-50 animate-ping [animation-duration:4000ms]" > </span>
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <h6 className="text-2 text-left"> Atendentes Disponíveis </h6>
                    <span className="label-2 text-xs! bg-green-700 text-white-300 rounded-full w-5 h-5 flex items-center justify-center font-bold text-sm!">
                        {onlineAgents}
                    </span>
                </div>
            </header>

            <p className="text-left text-2 my-5">
                {description}
            </p>

            <Table
                size="medium"
                dataSource={tickets}
                columns={getColumns(handleAssign)}
                rowKey="id"
                pagination={false}
                tableLayout="fixed"
                sticky
            />
        </section>
    )
}