"use client"

import { Table } from "antd"
import { Loading } from "@/app/components/layout/loading"
import { getHistoryColumns } from "./history.table.config"
import useTicketHistory from "./hooks/useTicketHistory"
import { Pagination } from "@/app/components/ui/pagination"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function Page() {
  const router = useRouter()
  const [resolvedPage, setResolvedPage] = useState(1)
  const [closedPage, setClosedPage] = useState(1)
  const itemsPerPage = 5

  const handleOpenChat = (ticketId: string) => {
    router.push(`/chat?id=${ticketId}`)
  }

  const {
    closedTickets,
    resolvedTickets,
    closedTotalItems,
    resolvedTotalItems,
    closedTotalPages,
    resolvedTotalPages,
    loading,
  } = useTicketHistory({ closedPage, resolvedPage, limit: itemsPerPage })

  useEffect(() => {
    if (closedPage > closedTotalPages) {
      setClosedPage(closedTotalPages)
    }
  }, [closedPage, closedTotalPages])

  useEffect(() => {
    if (resolvedPage > resolvedTotalPages) {
      setResolvedPage(resolvedTotalPages)
    }
  }, [resolvedPage, resolvedTotalPages])

  return (
    <div className="py-10 px-15">
      <header className="mb-8">
        <h1 className="title-2 text-left">Histórico</h1>
        <p className="text-2 text-left">
          Visualização dos chamados que foram atendidos por você.
        </p>
      </header>

      <section className="flex flex-col gap-10">
        <div className="flex flex-col gap-3">
          <h2 className="subtitle-2 text-left">Chamados Finalizados</h2>
          <div className="flex flex-col bg-white-300 rounded-lg border border-white-700 overflow-hidden">
            {loading ? (
              <div className="flex-1 flex items-center justify-center py-10">
                <Loading />
              </div>
            ) : (
              <div>
                <Table
                  className="history-table"
                  size="middle"
                  dataSource={resolvedTickets}
                  columns={getHistoryColumns("resolved", handleOpenChat)}
                  rowKey="id"
                  pagination={false}
                  tableLayout="fixed"
                />
              </div>
            )}
            {!loading && resolvedTotalItems > 0 && (
              <footer className="px-4 md:px-6 py-4 border-t border-white-700 bg-white-300 shrink-0">
                <Pagination
                  currentPage={resolvedPage}
                  totalPages={resolvedTotalPages}
                  totalItems={resolvedTotalItems}
                  itemsPerPage={itemsPerPage}
                  onPageChange={setResolvedPage}
                />
              </footer>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="subtitle-2 text-left">Chamados Encerrados</h2>
          <div className="flex flex-col bg-white-300 rounded-lg border border-white-700 overflow-hidden">
            {loading ? (
              <div className=" flex py-10">
                <Loading />
              </div>
            ) : (
              <div>
                <Table
                  className="history-table"
                  size="middle"
                  dataSource={closedTickets}
                  columns={getHistoryColumns("closed", handleOpenChat)}
                  rowKey="id"
                  pagination={false}
                  tableLayout="fixed"
                />
              </div>
            )}
            {!loading && closedTotalItems > 0 && (
              <footer className="px-4 md:px-6 py-4 border-t border-white-700 bg-white-300 shrink-0">
                <Pagination
                  currentPage={closedPage}
                  totalPages={closedTotalPages}
                  totalItems={closedTotalItems}
                  itemsPerPage={itemsPerPage}
                  onPageChange={setClosedPage}
                />
              </footer>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
