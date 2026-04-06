import { Trash2 } from "lucide-react";

export interface AgentTableItem {
  id: string;
  name: string;
  email: string;
  group: string;
  supportLevel: string;
}

interface TableAgentsProps {
  data: AgentTableItem[];
  search: string;
  onDelete?: (id: string) => void;
}

const LEVEL_MAP: Record<string, string> = {
  LEVEL_1: "N1",
  LEVEL_2: "N2",
  LEVEL_3: "N3",
};

const LEVEL_COLORS: Record<string, { bg: string; text: string }> = {
  N1: { bg: "var(--green-300)", text: "var(--teal-700)" },
  N2: { bg: "var(--blue-300)", text: "var(--blue-700)" },
  N3: { bg: "var(--teal-300)", text: "var(--teal-700)" },
};

const GROUP_COLORS: Record<string, { bg: string; text: string }> = {
  BI: { bg: "var(--orange-300)", text: "var(--orange-700)" },
  Finanças: { bg: "var(--green-300)", text: "var(--green-700)" },
  Geral: { bg: "var(--blue-300)", text: "var(--blue-700)" },
};

export function TableAgents({ data, search, onDelete }: TableAgentsProps) {
  const filtered = data.filter(
    (agent) =>
      agent.name.toLowerCase().includes(search.toLowerCase()) ||
      agent.email.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="font-ibm-plex w-full overflow-x-auto">
      <table className="w-full text-left border-separate border-spacing-0 min-w-[600px]">
        <thead>
          <tr className="bg-white-500">
            <th className="px-4 py-3 text-sm font-medium text-black-300 rounded-tl-xl">
              Nome
            </th>
            <th className="px-4 py-3 text-sm font-medium text-black-300">
              Email
            </th>
            <th className="px-4 py-3 text-sm font-medium text-black-300">
              Grupo de Suporte
            </th>
            <th className="px-4 py-3 text-sm font-medium text-black-300">
              Nível de Suporte
            </th>
            <th className="px-4 py-3 text-sm font-medium text-black-300 rounded-tr-xl text-right">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((agent) => {
            const displayLevel =
              LEVEL_MAP[agent.supportLevel] ?? agent.supportLevel;
            const lvl = LEVEL_COLORS[displayLevel] ?? {
              bg: "var(--beige-300)",
              text: "var(--black-300)",
            };

            const grp = GROUP_COLORS[agent.group] ?? {
              bg: "var(--beige-300)",
              text: "var(--black-300)",
            };

            return (
              <tr key={agent.id} className="...">
                <td className="px-4 py-3.5 text-sm font-medium text-black-base">
                  {agent.name}
                </td>
                <td className="px-4 py-3.5 text-sm text-black-300">
                  {agent.email}
                </td>
                <td className="px-4 py-3.5">
                  <span
                    className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium"
                    style={{ background: grp.bg, color: grp.text }}
                  >
                    {agent.group}
                  </span>
                </td>
                <td className="px-4 py-3.5">
                  <span
                    className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium"
                    style={{ background: lvl.bg, color: lvl.text }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: lvl.text }}
                    />
                    {displayLevel}
                  </span>
                </td>
                <td className="px-4 py-3.5 text-right">
                  <button
                    onClick={() => onDelete?.(agent.id)}
                    className="cursor-pointer p-1.5 rounded-md text-black-300 hover:text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={15} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
