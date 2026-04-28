import { Table } from "antd"
import { getColumns } from "../tickets.table.config"

interface GroupTableProps {
    title: string,
    description: string,
    tickets: any[],
    onlineAgents: number,
}

export default function Page({title, description, tickets, onlineAgents}: GroupTableProps) {

    const handleAssign = () => {
        
    }

    return(
        <section className="">
            <header className="">
                <div className="flex items-center gap-3">
                    <h2 className="subtitle-2 text-left"> 
                        {title} 
                    </h2>

                    {/* Chamados abertos disponíveis */}
                    <span className="px-4 label-2 bg-orange-base text-white-300 rounded-full font-bold">
                        {tickets.length}
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <h6 className="text-2 text-left"> Atendentes Disponíveis </h6>
                    <span className="label-2 bg-green-700 text-white-300 rounded-full w-5 h-5 flex items-center justify-center font-bold text-sm!">
                        {onlineAgents}
                    </span>
                </div>
            </header>

            <p className="text-left text-2 my-5">
                {description}
            </p>

            <Table
                size="medium"
                dataSource={tickets}
                columns={getColumns(handleAssign)}
                rowKey="id"
                pagination={false}
                tableLayout="fixed"
                sticky
            />
        </section>
    )
}