import { useCallback, useEffect, useState } from "react";
import { api } from "@/services/api";
import { ITicket } from "@/services/ticket/ticket.interface";
import { ISupportGroupSummary } from "@/services/support-group/support-group.interface";

const POLL_INTERVAL_MS = 15000;
const DEFAULT_LIMIT = 100;

export default function useTicket() {
    const [tickets, setTickets] = useState<ITicket[]>([]);
    const [groups, setGroups] = useState<ISupportGroupSummary[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchTickets = useCallback(async (options?: { silent?: boolean }) => {
        const silent = options?.silent ?? false;

        if (!silent) {
            setLoading(true);
        }

        try {
            const res = await api.get('/tickets', {
                params: {
                    limit: DEFAULT_LIMIT,
                },
            });
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
            if (!silent) {
                setLoading(false)
            }
        }
    }, [])

    useEffect(() => {
        fetchTickets()
    }, [fetchTickets])

    useEffect(() => {
        const intervalId = setInterval(() => {
            fetchTickets({ silent: true })
        }, POLL_INTERVAL_MS)

        return () => clearInterval(intervalId)
    }, [fetchTickets])

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