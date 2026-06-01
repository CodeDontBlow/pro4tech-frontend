"use client"

import { Table } from "antd"
import { Loading } from "@/app/components/layout/loading"
import { SearchButton } from "@/app/components/ui/searchButton"
import { FilterSelect } from "@/app/components/ui/filterSelect"
import { getHistoryColumns } from "./history.table.config"
import useTicketHistory from "./hooks/useTicketHistory"
import { Pagination } from "@/app/components/ui/pagination"
import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { useCompany } from "@/hooks/use-company"
import { useTicketSubject } from "@/hooks/use-ticket-subject"

const HISTORY_TABLE_MIN_WIDTH = 1050

export default function Page() {
  const router = useRouter()
  const [resolvedPage, setResolvedPage] = useState(1)
  const [closedPage, setClosedPage] = useState(1)
  const itemsPerPage = 5
  const [searchLabel, setSearchLabel] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("")
  const [selectedCompany, setSelectedCompany] = useState("")
  const [selectedDateRange, setSelectedDateRange] = useState("")
  const { ticketSubjects } = useTicketSubject(1, 200, "")
  const { companies } = useCompany(1, 200)

  const subjectOptions = useMemo(
    () => [
      { value: "", label: "Todos os assuntos" },
      ...ticketSubjects.map((subject) => ({
        value: subject.id,
        label: subject.name,
      })),
    ],
    [ticketSubjects]
  )

  const companyOptions = useMemo(
    () => [
      { value: "", label: "Todas as empresas" },
      ...companies.map((company) => ({
        value: company.id,
        label: company.name,
      })),
    ],
    [companies]
  )

  const dateOptions = useMemo(
    () => [
      { value: "", label: "Todas as datas" },
      { value: "30", label: "30 dias" },
      { value: "7", label: "7 dias" },
    ],
    []
  )

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

  const normalizedSearch = searchLabel.trim().toLowerCase()

  const isTicketInRange = (ticket: any, variant: "resolved" | "closed") => {
    if (!selectedDateRange) {
      return true
    }

    const days = Number(selectedDateRange)
    if (!days || Number.isNaN(days)) {
      return true
    }

    const endDateValue =
      variant === "resolved"
        ? ticket.updatedAt
        : ticket.closedAt ?? ticket.updatedAt

    if (!endDateValue) {
      return false
    }

    const endDate = new Date(endDateValue)
    if (Number.isNaN(endDate.getTime())) {
      return false
    }

    const now = new Date()
    const diffMs = now.getTime() - endDate.getTime()
    const diffDays = diffMs / (1000 * 60 * 60 * 24)

    return diffDays <= days
  }

  const matchesSearch = (ticket: any) => {
    if (!normalizedSearch) {
      return true
    }

    const ticketNumber = ticket.ticketNumber?.toString() ?? ""
    const subjectName = ticket.subject?.name ?? ""
    const companyName = ticket.company?.name ?? ""

    const haystack = `${ticketNumber} ${subjectName} ${companyName}`
      .toLowerCase()
      .trim()

    return haystack.includes(normalizedSearch)
  }

  const matchesSubject = (ticket: any) =>
    !selectedSubject || ticket.subjectId === selectedSubject

  const matchesCompany = (ticket: any) =>
    !selectedCompany || ticket.companyId === selectedCompany

  const filteredResolvedTickets = useMemo(
    () =>
      resolvedTickets.filter(
        (ticket) =>
          matchesSearch(ticket) &&
          matchesSubject(ticket) &&
          matchesCompany(ticket) &&
          isTicketInRange(ticket, "resolved")
      ),
    [
      resolvedTickets,
      normalizedSearch,
      selectedSubject,
      selectedCompany,
      selectedDateRange,
    ]
  )

  const filteredClosedTickets = useMemo(
    () =>
      closedTickets.filter(
        (ticket) =>
          matchesSearch(ticket) &&
          matchesSubject(ticket) &&
          matchesCompany(ticket) &&
          isTicketInRange(ticket, "closed")
      ),
    [
      closedTickets,
      normalizedSearch,
      selectedSubject,
      selectedCompany,
      selectedDateRange,
    ]
  )

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
        <div className="mt-6 flex flex-col gap-3 lg:flex-row lg:items-left lg:justify-between lg:gap-22">
          <div className="flex w-full lg:min-w-[220px]">
            <SearchButton onSearch={setSearchLabel} />
          </div>
          <div className="flex w-full  lg:min-w-[320px]">
            <FilterSelect
              options={subjectOptions}
              value={selectedSubject}
              onChange={setSelectedSubject}
            />
          </div>
          <div className="flex w-full  lg:min-w-[220px]">
            <FilterSelect
              options={companyOptions}
              value={selectedCompany}
              onChange={setSelectedCompany}
            />
          </div>
          <div className="flex w-full  lg:min-w-[200px]">
            <FilterSelect
              options={dateOptions}
              value={selectedDateRange}
              onChange={setSelectedDateRange}
            />
          </div>
        </div>
      </header>

      <section className="flex flex-col gap-10">
        <div className="flex flex-col gap-3">
          <h2 className="subtitle-2 text-left">Chamados Resolvidos</h2>
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
                  dataSource={filteredResolvedTickets}
                  columns={getHistoryColumns("resolved", handleOpenChat)}
                  rowKey="id"
                  pagination={false}
                  tableLayout="fixed"
                  scroll={{ x: HISTORY_TABLE_MIN_WIDTH }}
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
                  dataSource={filteredClosedTickets}
                  columns={getHistoryColumns("closed", handleOpenChat)}
                  rowKey="id"
                  pagination={false}
                  tableLayout="fixed"
                  scroll={{ x: HISTORY_TABLE_MIN_WIDTH }}
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
