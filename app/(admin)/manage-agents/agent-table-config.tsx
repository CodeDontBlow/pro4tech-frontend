import { Trash2 } from "lucide-react";
import { IAgent } from "@/services/agent/agent.interface";
import { Column, Action } from "@/app/components/ui/table";

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

export const getAgentTableConfig = (
  agents: IAgent[],
  handleDelete: (id: string) => void,
) => {
  const searchFn = (item: IAgent, searchText: string) => {
    return (
      item.user.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.user.email.toLowerCase().includes(searchText.toLowerCase())
    );
  };
  const columns: Column<IAgent>[] = [
    {
      key: "user",
      label: "Atendente",
      render: (value, item) => {
        return (
          <span className="text-sm font-semibold text-black-base">
            {item.user.name}
          </span>
        );
      },
    },
    {
      key: "user",
      label: "Email",
      render: (value, item) => (
        <span className="text-xs text-black-700/60">{item.user.email}</span>
      ),
    },
    {
      key: "supportLevel",
      label: "Nível",
      width: "w-32",
      render: (value) => {
        const displayLevel = LEVEL_MAP[String(value)] ?? String(value);
        const levelStyle =
          LEVEL_STYLES[displayLevel] ||
          "bg-white-300 text-black-base border border-white-700";

        return (
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${levelStyle}`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            {displayLevel}
          </span>
        );
      },
    },
  ];

  const actions: Action<IAgent>[] = [
    {
      label: "Deletar",
      icon: Trash2,
      onClick: (agent) => handleDelete(agent.id),
      variant: "danger",
    },
  ];

  return { columns, actions, searchFn };
};
