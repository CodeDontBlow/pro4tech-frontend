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
    <div className="py-10 px-15">
      <header className="mb-10">
        <h1 className="title-2 text-left">
          Dashboard
        </h1>
      </header>

      <main>
        <section className="mb-10">
          <h2 className="text-start text-xl font-semibold text-black-base mb-4">Tickets</h2>
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
      </main>



      <LineChart 
        period={['dom', 'seg', 'ter','qua','qui','sex','sab']}
        values={[3,5,2,7,5,1,3]}
        dataName="Dias"
        chartTitle="Volume por dia"
        colors={['#5da']}
      />

      <PieChart 
        period={['dom', 'seg', 'ter','qua','qui','sex','sab']}
        values={[5,3,2,7,2,1,3]}
        dataName="Dias"
        chartTitle="Volume por dia"
        colors={['var(--red-500)']}
        width={400}
        height={400}
        filled={false}
      />

      <BarChart 
        period={['dom', 'seg', 'ter','qua','qui','sex','sab']}
        values={[3,5,2,7,5,1,3]}
        dataName="Dias"
        chartTitle="Volume por dia"
        colors={['#5da']}
        width={400}
        height={300}
      />

    </div>
  )
}
