import type { ColumnsType } from "antd/es/table";
import Avatar from "@/app/components/ui/avatar";
import { ITicket } from "@/services/ticket/ticket.interface";

export const getColumns = (onAssign: (ticketId: string) => void): ColumnsType<ITicket> => [
    {
        title: "ID",
        dataIndex: "id",
        key: "id",
        width: 20,
        align: "center",
        render: (_, record) => (
            <span className="text-sm font-semibold text-black-base">
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
            <span className="text-sm font-regular text-black-base">
                {record.subject.name}
            </span>
        ),
    },
    {
        title: "Empresa",
        dataIndex: "company",
        key: "company",
        ellipsis: true,
        width: 50,
        render: (_, record) => (
            <span className="text-sm font-regular text-black-base">
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
            const toDate = record.createdAt ? new Date(record.createdAt) : null

            if (!toDate) {
                return <span className="text-sm font-regular text-black-base">-</span>
            }

            const month = toDate.getMonth()
            const day = toDate.getDate()
            const hours = toDate.getHours()
            const minutes = toDate.getMinutes()

            const stringDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`

            return(
                <span className="text-sm font-regular text-black-base">
                    {stringDate}
                </span>
            )
        }
    },
    {
        title: "Atribuído à",
        dataIndex: "agent",
        key: "agent",
        align: 'center',
        width: 35,
        render: (_, record) => {
            if(record.agent) {
                return (
                    <div className="flex justify-center items-center">
                        <Avatar
                            src={record.agent.user?.avatarUrl}
                            fallback="orbi"
                            alt={record.agent.user?.name}
                            tooltip={true}
                            className="rounded! w-8"
                        />
                    </div>
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
