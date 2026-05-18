import LineChart from "./components/lineChart"
import PieChart from "./components/pieChart"
import BarChart from "./components/barChart"

export default function Page() {
  return (
    <div className="py-10 px-15">
      <header className="mb-10">
        <h1 className="title-2 text-left">
          Dashboard Admin
        </h1>
      </header>

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
