import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { ITicket } from "@/services/ticket/ticket.interface";
import { ISupportGroupSummary } from "@/services/support-group/support-group.interface";

export default function useTicket() {
    const [tickets, setTickets] = useState<ITicket[]>([]);
    const [groups, setGroups] = useState<ISupportGroupSummary[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchTickets = async () => { 
        try{
            const res = await api.get('/tickets')
            const closedStatus = ['RESOLVED', 'CLOSED']

            const openedTickets = res.data.data.filter(
                (ticket: ITicket) => !closedStatus.includes(ticket.status)
            )

            setTickets(openedTickets)
        }
        catch(err) {
            console.log('Erro ao ler Tickets' + err)
            setTickets([])
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchTickets()
    }, [])

    useEffect(() => {
        const uniqueGroup = Array.from(
            new Map(
                tickets.map((ticket) => [ticket.supportGroupId, ticket.supportGroup])
            ).values()
        )
        setGroups(uniqueGroup)
    }, [tickets])

    return { tickets, groups, loading, fetchTickets }
}