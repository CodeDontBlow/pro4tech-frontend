"use client";
import { useState } from "react";
import { Plus } from "lucide-react";

// components
import { SearchButton } from "@/app/components/ui/searchButton";
import { ModalAddAgent } from "@/app/(admin)/manage-agents/_components/modalAddAgent";
import { Loading } from "@/app/components/layout/loading";
import { Pagination } from "@/app/components/ui/pagination";
import { TableAgents } from "@/app/(admin)/manage-agents/_components/tableAgents";

// hook
import { useAgent } from "@/hooks/use-agent";

export default function Page() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const limit = 8;

  const {
    agents,
    loading,
    totalItems,
    totalPages,
    handleDelete,
    handleCreate,
    refresh,
  } = useAgent(currentPage, limit);

  return (
    // bg-gray-50 cria o contraste necessário com os cards brancos
    <div className="px-8 md:px-16 py-8 h-screen flex flex-col bg-gray-50">
      
      {/* Container Centralizador para não espalhar demais em telas UltraWide */}
      <div className="max-w-[1600px] w-full mx-auto flex flex-col h-full">
        
        {/* HEADER */}
        <header className="mb-6">
          <h1 className="font-martel text-start font-bold text-[40px] text-black-base mb-6">
            Atendentes
          </h1>

          {/* Card de Filtros */}
          <div className="bg-white-300 p-5 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <SearchButton onSearch={setSearch} />
              
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 bg-green-700 text-white-300 px-6 py-2.5 rounded-xl hover:bg-green-base transition-all font-ibm-plex font-semibold text-base cursor-pointer shadow-sm shadow-green-700/20"
              >
                <Plus size={20} />
                Adicionar Atendente
              </button>
            </div>
          </div>
        </header>

        {/* ÁREA DA TABELA */}
        <main className="flex-1 flex flex-col min-h-0"> 
          {loading ? (
            <div className="flex-1 flex items-center justify-center">
              <Loading />
            </div>
          ) : (
            <div className="flex flex-col h-full bg-white-300 rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              {/* O container da tabela agora controla o scroll interno se houver muitos dados */}
              <div className="flex-1 overflow-auto">
                <TableAgents 
                  data={agents} 
                  search={search} 
                  onDelete={handleDelete} 
                />
              </div>

              {/* PAGINAÇÃO: Acoplada ao card da tabela para um visual mais limpo */}
              <footer className="px-6 py-4 border-t border-gray-100 bg-white-300">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalItems={totalItems}
                  itemsPerPage={limit}
                  onPageChange={setCurrentPage}
                />
              </footer>
            </div>
          )}
        </main>
      </div>

      <ModalAddAgent
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreate}
        onSuccess={refresh}
      />
    </div>
  );
}