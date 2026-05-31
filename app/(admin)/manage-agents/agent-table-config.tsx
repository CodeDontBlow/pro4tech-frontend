import { Trash2, Pencil } from "lucide-react";
import type { ColumnsType } from "antd/es/table";
import { IAgent } from "@/services/agent/agent.interface";

const LEVEL_MAP: Record<string, string> = {
  LEVEL_1: "N1",
  LEVEL_2: "N2",
  LEVEL_3: "N3",
};

const LEVEL_STYLES: Record<string, string> = {
  N1: "bg-teal-50 text-teal-700 border border-teal-300",
  N2: "bg-blue-50 text-blue-700 border border-blue-300",
  N3: "bg-green-50 text-green-700 border border-green-300",
};

export const getAgentColumns = (
  onDelete: (id: string) => void,
  onEdit: (agent: any) => void,
): ColumnsType<IAgent> => [
  {
    title: "Atendente",
    dataIndex: ["user", "name"],
    key: "user.name",
    width: 220,
    fixed: "left",
    render: (_, record) => (
      <span className="text-sm font-semibold text-black-base">
        {record.user?.name}
      </span>
    ),
  },
  {
    title: "Email",
    dataIndex: ["user", "email"],
    key: "user.email",
    width: 260,
    render: (_, record) => (
      <span className="text-xs text-black-700/60">{record.user?.email}</span>
    ),
  },
  {
    title: "Nível",
    dataIndex: "supportLevel",
    key: "agent.supportLevel",
    width: 140,
    render: (value) => {
      const displayLevel = LEVEL_MAP[String(value)] ?? String(value);
      const levelStyle =
        LEVEL_STYLES[displayLevel] ||
        "bg-white-300 text-black-base border border-white-700";

      return (
        <span
          className={`inline-flex items-center gap-1.5 rounded-full text-sm px-2 font-bold ${levelStyle}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-current" />
          {displayLevel}
        </span>
      );
    },
  },
  {
    title: "Ações",
    key: "actions",
    align: "right",
    width: 120,
    fixed: "right",
    render: (_, record) => (
      <div className="flex items-center justify-end gap-4">

        <button
          type="button"
          onClick={() => onEdit(record)}
          className="cursor-pointer rounded-lg text-black-700/50 hover:text-green-500 hover:bg-green-50 transition-all"
          title="Editar"
        >
          <Pencil size={16} />
        </button>
      
      <button
        type="button"
        onClick={() => onDelete(record.id)}
        className="cursor-pointer rounded-lg text-black-700/50 hover:text-red-500 hover:bg-red-50 transition-all"
        title="Excluir"
      >
        <Trash2 size={16} />
      </button>
      </div>
    ),
  },
];
