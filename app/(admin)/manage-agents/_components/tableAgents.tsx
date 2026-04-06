import { Trash2 } from "lucide-react";
import { IAgent } from "@/services/agent/agent.interface";

interface TableAgentsProps {
  data: IAgent[];
  search: string;
  onDelete?: (id: string) => void;
}

const LEVEL_MAP: Record<string, string> = {
  LEVEL_1: "N1",
  LEVEL_2: "N2",
  LEVEL_3: "N3",
};

const LEVEL_STYLES: Record<string, string> = {
  N1: "bg-green-300/20 text-green-700 border-green-300/50",
  N2: "bg-blue-300/20 text-blue-700 border-blue-300/50",
  N3: "bg-teal-300/20 text-teal-700 border-teal-300/50",
};

const GROUP_STYLES: Record<string, string> = {
  BI: "bg-orange-300/20 text-orange-700 ring-orange-300/30",
  Finanças: "bg-green-300/20 text-green-700 ring-green-300/30",
  Geral: "bg-blue-300/20 text-blue-700 ring-blue-300/30",
};

const STATUS_COLORS: Record<string, string> = {
  ONLINE: "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]",
  BUSY: "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]",
  AWAY: "bg-orange-500",
  OFFLINE: "bg-gray-300",
};

export function TableAgents({ data, search, onDelete }: TableAgentsProps) {
  const filtered = data.filter(
    (agent) =>
      agent.user.name.toLowerCase().includes(search.toLowerCase()) ||
      agent.user.email.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="w-full">
      <table className="w-full text-left border-separate border-spacing-0">
        <thead>
          <tr className="bg-white-300">
            <th className="px-6 py-4 text-[11px] uppercase tracking-wider font-bold text-gray-400 border-b border-gray-100">
              Atendente
            </th>
            <th className="px-6 py-4 text-[11px] uppercase tracking-wider font-bold text-gray-400 border-b border-gray-100">
              Email
            </th>
            <th className="px-6 py-4 text-[11px] uppercase tracking-wider font-bold text-gray-400 border-b border-gray-100">
              Grupo
            </th>
            <th className="px-6 py-4 text-[11px] uppercase tracking-wider font-bold text-gray-400 border-b border-gray-100">
              Nível
            </th>
            <th className="px-6 py-4 text-[11px] uppercase tracking-wider font-bold text-gray-400 border-b border-gray-100 text-right">
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {filtered.map((agent) => {
            const displayLevel =
              LEVEL_MAP[agent.supportLevel] ?? agent.supportLevel;
            const levelStyle =
              LEVEL_STYLES[displayLevel] ??
              "bg-gray-100 text-gray-600 border-gray-200";
            const statusStyle =
              STATUS_COLORS[agent.user.chatStatus] ?? STATUS_COLORS.OFFLINE;

            return (
              <tr
                key={agent.id}
                className="group hover:bg-teal-50/50 transition-colors"
              >
                <td className="px-6 py-4 text-nowrap">
                  <div className="flex items-center gap-3">
                    {/* Bolinha de Status opcional, já que você tem os estilos prontos */}
                    <div
                      className={`w-2 h-2 rounded-full flex-shrink-0 ${statusStyle}`}
                    />
                    <span className="text-sm font-semibold text-black-base leading-tight">
                      {agent.user.name}
                    </span>
                  </div>
                </td>

                {/* COLUNA DE EMAIL SEPARADA */}
                <td className="px-6 py-4 text-nowrap">
                  <span className="text-xs text-gray-500 font-ibm-plex">
                    {agent.user.email}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-bold ring-1 ring-inset ${GROUP_STYLES[agent.group] ?? "bg-gray-100 text-gray-600 ring-gray-200"}`}
                  >
                    {agent.group || "GERAL"}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${levelStyle}`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    {displayLevel}
                  </span>
                </td>

                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => onDelete?.(agent.id)}
                    className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-300/10 transition-all cursor-pointer"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {filtered.length === 0 && (
        <div className="py-20 text-center text-gray-400 text-sm">
          Nenhum atendente encontrado.
        </div>
      )}
    </div>
  );
}
