"use client";
import { useState } from "react";
import { Plus } from "lucide-react";

import { SearchButton } from "@/app/components/ui/searchButton";
import { ModalAddAgent } from "@/app/(admin)/manage-agents/_components/modalAddAgent";
import { Loading } from "@/app/components/layout/loading";
import { Pagination } from "@/app/components/ui/pagination";
import { TableAgents } from "@/app/(admin)/manage-agents/_components/tableAgents";
import { FilterSelect } from "@/app/components/ui/filterSelect";
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
    supportLevel,
    setSupportLevel,
  } = useAgent(currentPage, limit);

  return (
    <div className="px-4 md:px-10 lg:px-16 py-6 md:py-8 h-screen flex flex-col bg-gray-50 overflow-hidden">
      <div className="max-w-[1600px] w-full mx-auto flex flex-col h-full min-w-0">
        <header className="mb-6 flex-shrink-0">
          <h1 className="font-martel text-start font-bold text-3xl md:text-[40px] text-black-base mb-6">
            Atendentes
          </h1>

          <div className="bg-white-300 p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-sm">
         
            <div className="flex flex-col sm:flex-row justify-between items-stretch md:items-center gap-4">
              
              {/* FILTROS */}
              <div className="flex flex-row items-center gap-2 md:gap-4 flex-1 min-w-0">
                <SearchButton onSearch={setSearch} />
                <div className="flex-1 sm:flex-none">
                  <FilterSelect
                    value={supportLevel}
                    onChange={(val) => {
                      setSupportLevel(val);
                      setCurrentPage(1);
                    }}
                  />
                </div>
              </div>

      
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center justify-center gap-2 bg-green-700 text-white-300 px-6 py-3 md:py-2.5 rounded-xl hover:bg-green-base transition-all font-ibm-plex font-semibold text-base cursor-pointer shadow-sm w-full sm:w-auto flex-shrink-0"
              >
                <Plus size={20} />
                <span>Adicionar</span>
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 flex flex-col min-h-0 min-w-0">
          {loading ? (
            <div className="flex-1 flex items-center justify-center">
              <Loading />
            </div>
          ) : (
            <div className="flex flex-col h-full bg-white-300 rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="flex-1 overflow-auto custom-scrollbar">
                <TableAgents
                  data={agents}
                  search={search}
                  onDelete={handleDelete}
                />
              </div>

              <footer className="px-4 md:px-6 py-4 border-t border-gray-100 bg-white-300">
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