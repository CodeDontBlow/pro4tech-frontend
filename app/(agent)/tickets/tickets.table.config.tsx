import type { ColumnsType } from "antd/es/table";

export const getColumns = (onAssign: () => void): ColumnsType<any> => [
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
        width: 50,
        render: (_, record) => (
            <span className="text-sm font-regular text-black-base">
                {record.createdAt}
            </span>
        ),
    },
    {
        title: "Atribuído à",
        dataIndex: "agent",
        key: "agent",
        width: 50,
        render: (_, record) => {
            if(record.agent) {
                return (
                    <span className="text-sm font-regular text-black-base">
                        {record.agent}
                    </span>
                )
            }
            return(
                <button
                    onClick={onAssign}
                    className="px-3 py-1.5 text-sm bg-white-500 text-black-base rounded-md cursor-pointer hover:bg-blue-base hover:text-white-300 hover:scale-103 transition-all"
                >
                    Atribuir a mim
                </button>
            )
        },
    },

]