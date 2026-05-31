"use client";
import LineChart from "./components/lineChart"
import PieChart from "./components/pieChart"
import BarChart from "./components/barChart"

import { MiniCardInfo } from "@/app/components/ui/mini-card-info"
import { CircleCheck, CircleDot, Loader, RefreshCw } from "lucide-react"
import { useDashboard } from "@/hooks/use-dashboard"

export default function Page() {
  const { overview } = useDashboard();

  return (    
    <div className="px-4 md:px-10 lg:px-16 py-6 md:py-9 h-screen flex flex-col bg-white-300 overflow-y-auto">
      <header className="flex flex-col justify-between mb-4 shrink-0">
        <h1 className="font-martel font-bold text-[42px] leading-12.5 text-start mb-5">
          Visão Geral
        </h1>
      </header>

      <main className="flex-1 flex flex-col gap-8">
        <section>
          <h2 className="text-start text-md font-semibold text-black-base mb-4">Tickets</h2>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            <MiniCardInfo
              title="Abertos"
              description="tickets ativos"
              value={overview?.totalOpenTickets || 0}
              icon={<CircleDot />}
            />
            <MiniCardInfo
              title="Fechados"
              description="tickets resolvidos"
              value={overview?.totalClosedTickets || 0}
              icon={<CircleCheck />}
            />
            <MiniCardInfo
              title="Progresso"
              description="tickets em andamento"
              value={overview?.totalInProgressTickets || 0}
              icon={<Loader />}
            />
            <MiniCardInfo
              title="Reabertos"
              description="tickets reabertos"
              value={overview?.totalReopenedTickets || 0}
              icon={<RefreshCw />}
            />
          </div>
        </section>

        
        <section>
          <h2 className="text-start text-md font-semibold text-black-base mb-4">Performance de Atendimento</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            <div className="bg-white-300 px-6 py-4 rounded-xl border border-white-700 flex items-center justify-between w-full shadow-sm">
              <p className="text-sm font-semibold text-black-base uppercase tracking-wider">Média de 1ª Resposta</p>
              <span className="text-2xl font-bold text-black-base font-mono">
                {overview?.avgFirstResponseLabel || "00:00"}
              </span>
            </div>

            <div className="bg-teal-base px-6 py-4 rounded-xl border border-white-700 flex items-center justify-between w-full shadow-sm">
              <p className="text-sm font-semibold text-white-300 uppercase tracking-wider">Tempo de Resolução</p>
              <span className="text-2xl font-bold text-white-300 font-mono">
                {overview?.avgResolutionLabel || "00:00"}
              </span>
            </div>
          </div>
        </section>

        
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full items-stretch">
          
          <div className="lg:col-span-2 bg-white p-4 rounded-xl border border-white-700 shadow-sm flex flex-col justify-between overflow-hidden">
            <h2 className="text-start text-md font-semibold text-black-base mb-4">Volume por Hora</h2>
            {overview?.volumeByHour ? (
              
              <div className="w-full overflow-x-auto WebkitOverflowScrolling-touch">
                <div className="min-w-[1200px]">
                  <LineChart 
                    period={overview.volumeByHour.map(h => `${h.hour}h`)}
                    values={overview.volumeByHour.map(h => h.count)}
                    dataName="Tickets"
                    colors={['var(--green-base)']}
                    width="100%"
                    height={320}
                  />
                </div>
              </div>
            ) : (
              <div className="h-[320px] flex items-center justify-center text-sm text-gray-400">
                Carregando volume por hora...
              </div>
            )}
          </div>

          
          <div className="bg-white p-4 rounded-xl border border-white-700 shadow-sm flex flex-col justify-between items-center overflow-hidden">
            <h2 className="text-start text-md font-semibold text-black-base mb-4">Distribuição de Satisfação</h2>
            {overview?.satisfactionDistribution ? (() => {
              const sortedDistribution = [...overview.satisfactionDistribution].sort((a, b) => b.score - a.score);
              const periods = sortedDistribution.map(s => {
                if (s.score === 5) return 'Muito Satisfeito';
                if (s.score === 4) return 'Satisfeito';
                if (s.score === 3) return 'Neutro';
                if (s.score === 2) return 'Insatisfeito';
                if (s.score === 1) return 'Muito Insatisfeito';
                return `Nota ${s.score}`;
              });

              const values = sortedDistribution.map(s => s.count);
              
              return (
                <div className="w-full h-full flex items-center justify-center">
                  
                  <PieChart 
                    period={periods}
                    values={values}
                    dataName="Avaliações"
                    colors={['#1D9E75', '#5da', '#F39C12', '#E67E22', '#E74C3C']} 
                    width="100%"
                    height={320}
                    filled={true} 
                  />
                </div>
              );
            })() : (
              <div className="h-[320px] flex items-center justify-center text-sm text-gray-400">
                Carregando satisfação...
              </div>
            )}
          </div>

        </section>
      </main>
    </div>
  )
}