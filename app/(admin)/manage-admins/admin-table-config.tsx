import { Trash2 } from "lucide-react";
import type { ColumnsType } from "antd/es/table";
import { IAdmin } from "@/services/admin/admin.interface";

export const getAdminColumns = (
  onDelete: (id: string) => void,
): ColumnsType<IAdmin> => [
    {
      title: "Administrador",
      dataIndex: ["name"],
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
      title: "Email",
      dataIndex: ["email"],
      key: "email",
      width: 260,
      render: (_, record) => (
        <span className="text-xs text-black-700/60">{record.email}</span>
      ),
    },
    {
      title: "Ações",
      key: "actions",
      align: "right",
      width: 100,
      fixed: "right",
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
