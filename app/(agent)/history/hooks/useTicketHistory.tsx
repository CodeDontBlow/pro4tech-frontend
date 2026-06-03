import { useCallback, useEffect, useMemo, useState } from "react"
import Cookies from "js-cookie"
import { api } from "@/services/api"
import { ITicket } from "@/services/ticket/ticket.interface"
import { decodeToken } from "@/utils/decode-token"

const POLL_INTERVAL_MS = 15000
const STATUS_CLOSED = "CLOSED"
const STATUS_RESOLVED = "RESOLVED"

type TicketHistoryParams = {
  closedPage: number
  resolvedPage: number
  limit: number
}

export default function useTicketHistory({
  closedPage,
  resolvedPage,
  limit,
}: TicketHistoryParams) {
  const [closedTickets, setClosedTickets] = useState<ITicket[]>([])
  const [resolvedTickets, setResolvedTickets] = useState<ITicket[]>([])
  const [closedTotalItems, setClosedTotalItems] = useState(0)
  const [resolvedTotalItems, setResolvedTotalItems] = useState(0)
  const [closedTotalPages, setClosedTotalPages] = useState(1)
  const [resolvedTotalPages, setResolvedTotalPages] = useState(1)
  const [loading, setLoading] = useState<boolean>(true)

  const agentId = useMemo(() => {
    if (typeof window === "undefined") {
      return null
    }

    const token = Cookies.get("token") || localStorage.getItem("token")
    if (!token) {
      return null
    }

    try {
      return decodeToken(token).sub
    } catch {
      return null
    }
  }, [])

  const fetchTickets = useCallback(
    async (options?: { silent?: boolean }) => {
      const silent = options?.silent ?? false

      if (!agentId) {
        if (!silent) {
          setLoading(false)
        }
        setClosedTickets([])
        setResolvedTickets([])
        setClosedTotalItems(0)
        setResolvedTotalItems(0)
        setClosedTotalPages(1)
        setResolvedTotalPages(1)
        return
      }

      if (!silent) {
        setLoading(true)
      }

      try {
        const [closedResponse, resolvedResponse] = await Promise.all([
          api.get("/tickets", {
            params: {
              agentId,
              includeArchived: true,
              limit,
              page: closedPage,
              status: STATUS_CLOSED,
            },
          }),
          api.get("/tickets", {
            params: {
              agentId,
              includeArchived: true,
              limit,
              page: resolvedPage,
              status: STATUS_RESOLVED,
            },
          }),
        ])

        setClosedTickets(closedResponse.data.data ?? [])
        setResolvedTickets(resolvedResponse.data.data ?? [])
        setClosedTotalItems(closedResponse.data.meta?.total ?? 0)
        setResolvedTotalItems(resolvedResponse.data.meta?.total ?? 0)
        setClosedTotalPages(closedResponse.data.meta?.lastPage ?? 1)
        setResolvedTotalPages(resolvedResponse.data.meta?.lastPage ?? 1)
      } catch (err) {
        console.log("Erro ao ler historico de tickets", err)
        setClosedTickets([])
        setResolvedTickets([])
        setClosedTotalItems(0)
        setResolvedTotalItems(0)
        setClosedTotalPages(1)
        setResolvedTotalPages(1)
      } finally {
        if (!silent) {
          setLoading(false)
        }
      }
    },
    [agentId, closedPage, resolvedPage, limit]
  )

  useEffect(() => {
    fetchTickets()
  }, [fetchTickets])

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchTickets({ silent: true })
    }, POLL_INTERVAL_MS)

    return () => clearInterval(intervalId)
  }, [fetchTickets])

  return {
    closedTickets,
    resolvedTickets,
    closedTotalItems,
    resolvedTotalItems,
    closedTotalPages,
    resolvedTotalPages,
    loading,
  }
}
