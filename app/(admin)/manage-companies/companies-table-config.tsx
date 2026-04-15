import { Trash2 } from "lucide-react";
import type { ColumnsType } from "antd/es/table";
import { ICompany } from "@/services/company/company.interface";

const formatCnpj = (value: string) => {
  const digits = value.replace(/\D/g, "");
  if (digits.length !== 14) return value;
  return digits.replace(
    /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
    "$1.$2.$3/$4-$5",
  );
};

export const getColumns = (
  onDelete: (id: string) => void,
): ColumnsType<ICompany> => [
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
    title: "CNPJ",
    dataIndex: "cnpj",
    key: "cnpj",
    width: 160,
    render: (_, record) => (
      <span className="text-xs text-black-base">
        {formatCnpj(record.cnpj)}
      </span>
    ),
  },
  {
    title: "Contato",
    dataIndex: "contactName",
    key: "contactName",
    width: 200,
    render: (_, record) => (
      <span className="text-xs text-black-base">{record.contactName}</span>
    ),
  },
  {
    title: "Email",
    dataIndex: "contactEmail",
    key: "contactEmail",
    width: 260,
    render: (_, record) => (
      <span className="text-xs text-black-700/60">
        {record.contactEmail}
      </span>
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