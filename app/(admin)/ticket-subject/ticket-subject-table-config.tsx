import { Trash2 } from "lucide-react";
import type { ColumnsType } from "antd/es/table";
import { ITicketSubject } from "@/services/ticket-subject/ticket-subject.interface";

export const getTicketSubjectColumns = (
  onDelete: (id: string) => void,
): ColumnsType<ITicketSubject> => [
  {
    title: "Assunto",
    dataIndex: "name",
    key: "name",
    render: (value: string) => (
      <span className="text-sm font-semibold text-black-base">{value}</span>
    ),
  },
  {
    title: "Ações",
    key: "actions",
    align: "right",
    width: 100,
    render: (_, record) => (
      <button
        type="button"
        onClick={() => onDelete(record.id)}
        className="cursor-pointer p-2 rounded-lg text-black-700/50 hover:text-red-500 hover:bg-red-50 transition-all"
        title="Excluir"
      >
        <Trash2 size={16} />
      </button>
    ),
  },
];
