import { Trash2 } from "lucide-react";

export interface CompanyTableItem {
  id: string;
  cnpj: string;
  name: string;
  contactName: string;
  contactEmail: string;
}

interface TableCompaniesProps {
  data: CompanyTableItem[];
  search: string;
  onDelete?: (id: string) => void;
}


export function TableCompanies({ data, search, onDelete }: TableCompaniesProps) {
  const filtered = data.filter(
    (company) =>
      company.name.toLowerCase().includes(search.toLowerCase()) ||
      company.cnpj.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="font-ibm-plex w-full overflow-x-auto">
      <table className="w-full text-left border-separate border-spacing-0 min-w-[600px]">
        <thead>
          <tr className="bg-white-500">
            <th className="px-4 py-3 text-sm font-medium text-black-300 rounded-tl-xl">
              CNPJ
            </th>
            <th className="px-4 py-3 text-sm font-medium text-black-300">
              Nome
            </th>
            <th className="px-4 py-3 text-sm font-medium text-black-300">
              Contato
            </th>
            <th className="px-4 py-3 text-sm font-medium text-black-300">
              Email Contato
            </th>
            <th className="px-4 py-3 text-sm font-medium text-black-300 rounded-tr-xl text-right">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((company) => {
            return (
              <tr key={company.cnpj}>
                <td className="px-4 py-3.5 text-sm font-medium text-black-base">
                  {company.cnpj}
                </td>
                <td className="px-4 py-3.5 text-sm font-medium text-black-base">
                  {company.name}
                </td>
                <td className="px-4 py-3.5 text-sm text-black-300">
                  {company.contactName}
                </td>
                <td className="px-4 py-3.5 text-sm text-black-300">
                  {company.contactEmail}
                </td>
                <td className="px-4 py-3.5 text-right">
                  <button
                    onClick={() => onDelete?.(company.id)}
                    className="cursor-pointer p-1.5 rounded-md text-black-300 hover:text-red-600 hover:bg-red-50 transition-colors">
                    <Trash2 size={15} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div >
  );
}
