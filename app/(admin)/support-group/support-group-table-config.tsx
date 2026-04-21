import { Trash2 } from "lucide-react";
import type { ColumnsType } from "antd/es/table";
import  { ISupportGroup } from "@/services/support-group/support-group.interface";

export const getSupportGroupColumns = (
  onDelete: (id: string) => void,
): ColumnsType<ISupportGroup  > => [
  {
    title: "Nome",
    dataIndex: "name",
    key: "name",
    width: 220,
    fixed: "left",
    render: (_, record) => (
      <span className="text-sm font-semibold text-black-base">
        {record.name}
      </span>
    ),
  },
  {
    title: "Descrição",
    dataIndex: "description",
    key: "description",
    width: 160,
    render: (_, record) => (
      <span className="text-xs text-black-base">
        {record.description}
      </span>
    ),
  },
  {
    title: "Status",
    dataIndex: "isActive",
    key: "isActive",
    width: 120,
    render: (_, record) => (
      <span className="text-xs text-black-base">
        {record.isActive}
      </span>
    ),
  },
  {
    title: "Ações",
    key: "actions",
    align: "right",
    width: 140,
    fixed: "right",
    render: (_, record) => (
      <div className="flex items-center justify-end gap-1">
        <button
          type="button"
          onClick={() => onDelete(record.id)}
          className="cursor-pointer p-2 rounded-lg text-black-700/50 hover:text-red-500 hover:bg-red-50 transition-all"
          title="Excluir"
        >
          <Trash2 size={16} />
        </button>
      </div>
    ),
  },
];