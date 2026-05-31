"use client";
import { useState } from "react";

//components
import { SearchButton } from "@/app/components/ui/searchButton";
import { FilterSelect } from "@/app/components/ui/filterSelect";
import { Loading } from "@/app/components/layout/loading";
import { Pagination } from "@/app/components/ui/pagination";
import { Table } from "antd";

//config table
import { getAgentPerformanceColumns } from "./agent-perfomance-table-config";
import { useDashboard } from "@/hooks/use-dashboard";

const options = [
  { value: "", label: "Todos" },
  { value: "30", label: "30 dias" },
  { value: "7", label: "7 dias" },
];

export default function Page() {
  const [currentPage, setCurrentPage] = useState(1);
  const [name, setName] = useState("");
  const [periodDays, setPeriodDays] = useState<number | undefined>(30);
  const limit = 10;

  const { desempenhoAgentes,loading,totalItems,totalPages} = 
    useDashboard(name, periodDays, currentPage, limit);

   function handleSearch(value: string) { 
    setName(value);
    setCurrentPage(1);
  }

  function handlePeriodChange(value: number) {
    setPeriodDays(value);
    setCurrentPage(1);
  }

  return (
    <div className="px-4 md:px-10 lg:px-16 py-6 md:py-9 flex flex-col bg-white-300" style={{ height: "100dvh" }}>
  <header className="mb-4 shrink-0">
    <h1 className="font-martel font-bold text-[42px] leading-12.5 text-start mb-5">
      Desempenho da Equipe
    </h1>
    <div className="flex gap-2 items-center">
      <SearchButton onSearch={handleSearch} />
      <FilterSelect
        options={options}
        value={periodDays?.toString() || ""}
        onChange={handlePeriodChange}
      />
    </div>
  </header>

  <main className="flex-1 flex flex-col min-h-0 rounded-lg border border-white-700 overflow-hidden">
    {loading ? (
      <div className="flex-1 flex items-center justify-center">
        <Loading />
      </div>
    ) : (
       <div className="flex-1 overflow-auto min-h-0">  
      <Table
        size="middle"
        dataSource={desempenhoAgentes || []}
        columns={getAgentPerformanceColumns()}
        rowKey="agentId"
        pagination={false}
        tableLayout="fixed"
        scroll={{ x: 720 }} 
      />
    </div>
    )}

    {!loading && (
      <footer className="px-4 md:px-6 py-4 border-t border-white-700 shrink-0">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={limit}
          onPageChange={setCurrentPage}
        />
      </footer>
    )}
  </main>
</div>
  );  
}