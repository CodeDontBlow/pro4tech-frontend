"use client";
import { useState } from "react";

// components
import { SearchButton } from "@/app/components/ui/searchButton";
import { ModalAddAgent } from "@/app/components/ui/agent/modalAddAgent";
import { Loading } from "@/app/components/layout/loading";
import { Pagination } from "@/app/components/ui/pagination";
import { Plus } from "lucide-react";
import { TableAgents } from "@/app/components/ui/agent/tableAgents";

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
    <div className="px-16 py-9 min-h-screen flex flex-col bg-white-base">
      <div className="flex flex-col justify-between mb-4">
        <h1 className="font-martel font-bold text-[42px] leading-12.5 text-start mb-5">
          Atendentes
        </h1>

        <div className="flex items-center justify-between gap-4">
          <SearchButton onSearch={setSearch} />

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-green-700 text-white-base px-6 py-2.5 rounded-xl hover:bg-green-500 font-ibm-plex text-lg leading-6 transition-colors cursor-pointer"
          >
            <Plus size={18} />
            Adicionar
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-between">
        {loading ? (
          <Loading />
        ) : (
          <>
            <TableAgents
              data={agents}
              search={search}
              onDelete={handleDelete}
            />

            <div className="w-full py-6 bg-white-base">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                itemsPerPage={limit}
                onPageChange={setCurrentPage}
              />
            </div>
          </>
        )}
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
