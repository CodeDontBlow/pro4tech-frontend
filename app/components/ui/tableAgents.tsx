interface Agent {
  id: number;
  name: string;
  email: string;
  group: string;
  supportLevel: string;
}

interface TableAgentsProps {
  data: Agent[];
  search: string;
}

const LEVEL_COLORS: Record<string, { bg: string; text: string }> = {
  N1: { bg: "var(--green-300)", text: "var(--teal-700)" },
  N2: { bg: "var(--blue-300)", text: "var(--blue-700)" },
  N3: { bg: "var(--teal-300)", text: "var(--teal-700)" },
};

const GROUP_COLORS: Record<string, { bg: string; text: string }> = {
  "Suporte Técnico": { bg: "var(--orange-300)", text: "var(--orange-700)" },
  Atendimento: { bg: "var(--green-300)", text: "var(--green-700)" },
  Infraestrutura: { bg: "var(--blue-300)", text: "var(--blue-700)" },
};

export function TableAgents({ data, search }: TableAgentsProps) {
  const filtered = data.filter((agent) =>
    agent.name.toLowerCase().includes(search.toLowerCase()) ||
    agent.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="font-ibm-plex">
     <table className="w-full text-left border-separate border-spacing-0">
  <thead>
    <tr className="bg-white-500">
      <th className="px-4 py-3 text-sm font-medium text-black-300 rounded-tl-xl">Nome</th>
      <th className="px-4 py-3 text-sm font-medium text-black-300">Email</th>
      <th className="px-4 py-3 text-sm font-medium text-black-300">Grupo de Suporte</th>
      <th className="px-4 py-3 text-sm font-medium text-black-300 rounded-tr-xl">Nível de Suporte</th>
    </tr>
  </thead>
        <tbody>
          {filtered.map((agent) => {
            const lvl = LEVEL_COLORS[agent.supportLevel] ?? { bg: "var(--beige-300)", text: "var(--black-300)" };
            const grp = GROUP_COLORS[agent.group] ?? { bg: "var(--beige-300)", text: "var(--black-300)" };
            return (
              <tr
                key={agent.id}
                className="border-b border-white-700 hover:bg-white-500 transition-colors"
              >
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
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: lvl.text }} />
                    {agent.supportLevel}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}