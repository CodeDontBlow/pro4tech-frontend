import LineChart from "./components/lineChart"
import PieChart from "./components/pieChart"

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
        values={[3,5,2,7,5,1]}
        dataName="Dias"
        chartTitle="Volume por dia"
        colors={['#5da']}
      />

      <PieChart 
        period={['dom', 'seg', 'ter','qua','qui','sex','sab']}
        values={[5,3,2,7,2,1,3]}
        dataName="Dias"
        chartTitle="Volume por dia"
        colors={['#5da']}
        width={'50%'}
      />

    </div>
  )
}
