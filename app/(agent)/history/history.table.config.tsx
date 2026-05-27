import type { ColumnsType } from "antd/es/table"
import { ITicket } from "@/services/ticket/ticket.interface"

const formatDateTime = (value?: string | null) => {
  if (!value) {
    return "-"
  }

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return "-"
  }

  const month = (date.getMonth() + 1).toString().padStart(2, "0")
  const day = date.getDate().toString().padStart(2, "0")
  const hours = date.getHours().toString().padStart(2, "0")
  const minutes = date.getMinutes().toString().padStart(2, "0")

  return `${day}/${month} ${hours}:${minutes}`
}

type HistoryColumnsVariant = "resolved" | "closed"

const getEndDate = (record: ITicket, variant: HistoryColumnsVariant) => {
  if (variant === "resolved") {
    return record.updatedAt
  }

  return record.closedAt ?? record.updatedAt
}

const getEndLabel = (variant: HistoryColumnsVariant) =>
  variant === "resolved" ? "Finalizado em" : "Encerrado em"

export const getHistoryColumns = (
  variant: HistoryColumnsVariant,
  onOpenChat: (ticketId: string) => void
): ColumnsType<ITicket> => [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    width: 60,
    align: "center",
    render: (_, record) => (
      <span className="text-sm font-semibold text-black-base">
        {record.ticketNumber}
      </span>
    ),
  },
  {
    title: "Assunto do Chamado",
    dataIndex: "subject",
    key: "subject",
    ellipsis: true,
    width: 450,
    render: (_, record) => (
      <span className="text-sm font-regular text-black-base">
        {record.subject.name}
      </span>
    ),
  },
  {
    title: "Empresa",
    dataIndex: "company",
    key: "company",
    ellipsis: true,
    width: 150,
    align: "left",
    render: (_, record) => (
      <span className="text-sm font-regular text-black-base text-left">
        {record.company.name}
      </span>
    ),
  },
  {
    title: "Solicitado em",
    dataIndex: "createdAt",
    key: "createdAt",
    width: 150,
    align: "left",
    render: (_, record) => (
      <span className="text-sm font-regular text-black-base text-left">
        {formatDateTime(record.createdAt)}
      </span>
    ),
  },
  {
    title: `${getEndLabel(variant)}`,
    dataIndex: "closedAt",
    key: "closedAt",
    width: 150,
    align: "left",
    render: (_, record) => (
      <span className="text-sm font-regular text-black-base text-left">
        {formatDateTime(getEndDate(record, variant))}
      </span>
    ),
  },
  {
    title: "Chat",
    key: "chat",
    width: 90,
    align: "left",
    render: (_, record) => (
      <button
        type="button"
        onClick={() => onOpenChat(record.id)}
        className="px-3 py-1.5 text-sm bg-white-500 text-black-base rounded-md cursor-pointer hover:bg-blue-base hover:text-white-300 hover:scale-103 transition-all"
      >
        Ver chat
      </button>
    ),
  },
]
