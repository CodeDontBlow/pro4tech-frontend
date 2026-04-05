'use client'
import { useState, useEffect } from "react";
import { ModalAddAgent } from "@/app/components/ui/modalAddAgent";


const agentsData = [
  {
    id: 1,
    name: "João Silva",
    email: "joao@gmail.com",
    group: "Suporte Técnico",
    supportLevel: "N1"
  },
  {
    id: 2,
    name: "Maria Oliveira",
    email: "maria@gmail.com",
    group: "Suporte Técnico",
    supportLevel: "N2"
  },
  {
    id: 3,
    name: "Carlos Santos",
    email: "carlor@gmail.com",
    group: "Suporte Técnico",
    supportLevel: "N3"
  },
    {
    id: 4,
    name: "João Silva",
    email: "joao@gmail.com",
    group: "Suporte Técnico",
    supportLevel: "N1"
  },
  {
    id: 5,
    name: "Maria Oliveira",
    email: "maria@gmail.com",
    group: "Suporte Técnico",
    supportLevel: "N2"
  },
  {
    id: 6,
    name: "Carlos Santos",
    email: "carlor@gmail.com",
    group: "Atendimento",
    supportLevel: "N3"
  },
   {
    id: 7,
    name: "Carlos Santos",
    email: "carlor@gmail.com",
    group: "Suporte Técnico",
    supportLevel: "N3"
  },
   {
    id: 8,
    name: "Carlos Santos",
    email: "carlor@gmail.com",
    group: "Suporte Técnico",
    supportLevel: "N3"
  },
    {
    id: 9,
    name: "Carlos Santos",
    email: "carlor@gmail.com",
    group: "Infraestrutura",
    supportLevel: "N3"
  },
    {
    id: 10,
    name: "Carlos Santos",
    email: "carlor@gmail.com",
    group: "Infraestrutura",
    supportLevel: "N3"
  },
  
  
  
  

];

//components
import { Loading } from "@/app/components/layout/loading";
import { Pagination } from "@/app/components/ui/pagination";
import { TableAgents } from "@/app/components/ui/tableAgents";

//services
import { getAll } from "@/services/user/user.service"; 

export default function Page() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function loadAgents() {
      try {
        setLoading(true); 
        const data = await getAll('agent');
        setAgents(data);
      } catch (error) {
        console.error("Erro ao carregar atendentes:", error);
      } finally {
        setLoading(false); 
      }
    }

    loadAgents();
  }, []);

  return (
    <div className="px-16 py-14 min-h-screen flex flex-col bg-white-base">
      <div className="flex flex-col justify-between  mb-4">
        <h1 className="font-martel font-bold text-[42px] leading-12.5 text-start mb-2">
          Atendentes
        </h1>

        <div className="flex items-center justify-between gap-4">
          <input
            type="text"
            placeholder="Buscar atendente..."
            onChange={(e) => setSearch(e.target.value)}
            className="w-80 px-4 py-2 text-sm text-black-base bg-white-500 
                      border border-white-700 rounded-xl outline-none
                      focus:border-green-700 transition-colors placeholder:text-black-300"
          />
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-green-700 text-white-base px-9 py-2.5 rounded-xl
                      hover:bg-green-500 font-ibm-plex text-lg leading-6 
                      transition-colors cursor-pointer">
            Adicionar Atendente
          </button>
        </div>
      </div>

     <div className="flex-1">
      {loading ? (
        <Loading />
      ) : (
        <>
      <TableAgents data={agentsData} search={search} />
     <div className="w-full mt-6">
        <Pagination
          currentPage={1}
          totalPages={5}
          totalItems={45}
          itemsPerPage={10}
          onPageChange={() => {}}
        />
      </div>
    </>
  )}
</div>

      <ModalAddAgent 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}