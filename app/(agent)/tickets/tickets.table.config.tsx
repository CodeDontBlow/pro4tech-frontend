import type { ColumnsType } from "antd/es/table";

export const getColumns = (onAssign: (ticketId: string) => void, ): ColumnsType<any> => [
    {
        title: "ID",
        dataIndex: "id",
        key: "id",
        width: 25,
        align: "center",
        render: (_, record) => (
            <span className="text-sm label-2 font-semibold text-black-base">
                {record.ticketNumber}
            </span>
        ),
    },
    {
        title: "Assunto do Chamado",
        dataIndex: "subject",
        ellipsis: true,
        key: "subject",
        width: 250,
        render: (_, record) => (
            <span className="label-2 text-black-base">
                {record.subject.name}
            </span>
        ),
    },
    {
        title: "Status",
        dataIndex: "status",
        key: "status",
        align: 'center',
        ellipsis: true,
        width: 70,
        render: (_, record) => {
            const status: string = record.status.toLowerCase()
            
            if(status === "opened") {
                return (
                    <div className="label-2 truncate px-2 py-1 rounded text-black-300">
                        Aberto
                    </div>
                )
            }
            if(status === "escalated") {
                return (
                    <div className="label-2 truncate px-2 py-1 rounded text-white-300 bg-teal-300">
                        Escalonado
                    </div>
                )
            }
            if(status === "reopened") {
                return (
                    <div className="label-2 truncate px-2 py-1 rounded text-white-300 bg-green-300">
                        Reaberto
                    </div>
                )
            }

        }
    },
    {
        title: "Empresa",
        dataIndex: "company",
        key: "company",
        ellipsis: true,
        width: 50,
        render: (_, record) => (
            <span className="label-2 text-black-base">
                {record.company.name}
            </span>
        ),
    },
    {
        title: "Solicitado em",
        dataIndex: "date",
        key: "date",
        ellipsis: true,
        width: 60,
        align: 'center',
        render: (_, record) => {
            const toDate = new Date(record.createdAt)

            const month = toDate.getMonth()
            const day = toDate.getDate()
            const hours = toDate.getHours()
            const minutes = toDate.getMinutes()

            const stringDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`

            return(
                <span className="label-2 text-black-base">
                    {stringDate}
                </span>
            )
        }
    },
    {
        title: "Atribuído à",
        dataIndex: "agent",
        key: "agent",
        ellipsis: true,
        width: 50,
        render: (_, record) => {
            if(record.agent) {
                return (
                    <span className="label-2 text-black-base">
                        {record.agent.user?.name ?? record.agent.id}                            
                    </span>
                )
            }
            return(
                <button
                    onClick={(event) => {
                        event.stopPropagation()
                        onAssign(record.id)
                    }}
                    className="px-3 py-1.5 text-sm bg-white-500 text-black-base rounded-md cursor-pointer hover:bg-blue-base hover:text-white-300 hover:scale-103 transition-all"
                >
                    Atribuir a mim
                </button>
            )
        },
    },

]