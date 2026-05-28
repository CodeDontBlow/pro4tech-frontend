import type { ColumnsType } from "antd/es/table";
import { IAgentPerformance } from "@/services/dashboard/dashboard.interface";

export const getAgentPerformanceColumns = (): ColumnsType<IAgentPerformance> => [
  {
    title: "Agente",
    dataIndex: "agentName",
    key: "agentName",
    width: 220,
    fixed: "left",
    render: (value) => (
      <span className="text-sm font-semibold text-black-base">
        {value}
      </span>
    ),
  },
  {
    title: "Tickets Fechados",
    dataIndex: "closedCount",
    key: "closedCount",
    width: 140,
    align: "center",
    render: (value) => (
      <span className="text-sm font-mono text-black-700">
        {value}
      </span>
    ),
  },
  // {
  //   title: "Média 1ª Resposta",
  //   dataIndex: "avgFirstResponseLabel",
  //   key: "avgFirstResponseLabel",
  //   width: 160,
  //   align: "center",
  //   render: (value) => (
  //     <span className="text-sm font-mono text-black-700/60">
  //       {value}
  //     </span>
  //   ),
  // },
  {
    title: "Tempo de Resolução",
    dataIndex: "avgResolutionLabel",
    key: "avgResolutionLabel",
    width: 180,
    align: "center",
    render: (value, record) => {
      
      const hasNoTickets = record.closedCount === 0 && value === "00:00";
      return (
        <span className="text-sm font-mono font-semibold text-gray-600">
          {hasNoTickets ? "-" : value}
        </span>
      );
    },
  },
  {
    title: "Avaliação Média",
    dataIndex: "ratingAverage",
    key: "ratingAverage",
    width: 150,
    align: "center",
    render: (value: number | null) => {
      if (value !== null) {
        return (
          <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 px-2.5  rounded-md font-semibold font-mono text-xs border border-amber-200">
            {value.toFixed(1)}
          </span>
        );
      }
      return <span className="text-xs text-black-700/40 italic">Sem notas</span>;
    },
  },
];