import { Pencil, Trash2 } from "lucide-react";
import type { ColumnsType } from "antd/es/table";
import { IStandardMessage } from "@/services/standard-message/standard-message.interface";

export const getStandardMessageColumns = (
  onEdit: (message: IStandardMessage) => void,
  onDelete: (id: string) => void,
): ColumnsType<IStandardMessage> => [
  {
    title: "Trigger",
    dataIndex: "trigger",
    key: "trigger",
    width: 160,
    render: (value: string) => (
      <span className="text-sm font-semibold text-teal-base">{value}</span>
    ),
  },
  {
    title: "Titulo",
    dataIndex: "title",
    key: "title",
    render: (value: string) => (
      <span className="text-sm font-semibold text-black-base">{value}</span>
    ),
  },
  {
    title: "Ações",
    key: "actions",
    align: "right",
    width: 140,
    render: (_, record) => (
      <div className="flex items-center justify-end gap-4">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onEdit(record);
          }}
          className="cursor-pointer rounded-lg text-black-700/50 hover:text-blue-500 hover:bg-blue-50 transition-all"
          title="Editar"
        >
          <Pencil size={16} />
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(record.id);
          }}
          className="cursor-pointer rounded-lg text-black-700/50 hover:text-red-500 hover:bg-red-50 transition-all"
          title="Excluir"
        >
          <Trash2 size={16} />
        </button>
      </div>
    ),
  },
];
