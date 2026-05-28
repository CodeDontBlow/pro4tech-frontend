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

export default function Page() {
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState("");
  const limit = 8;

  const {
    desempenhoAgentes,
    loading,
    totalItems,
    totalPages,
  } = useDashboard();

  return (
    <div className="px-4 md:px-10 lg:px-16 py-6 md:py-9 h-screen flex flex-col bg-white-300 overflow-hidden">

      <div className="flex flex-col justify-between mb-4 shrink-0">
        <h1 className="font-martel font-bold text-[42px] leading-12.5 text-start mb-5">
          Desempenho da Equipe
        </h1>

      <main className="flex-1 flex flex-col min-h-0 bg-white-300 rounded-lg border border-white-700 overflow-hidden">
        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <Loading />
          </div>
        ) : (
          <div className="flex-1 min-h-0">
            <Table
              size="middle"
              dataSource={desempenhoAgentes || []}
              columns={getAgentPerformanceColumns()}
              rowKey="id"
              pagination={false}
              tableLayout="fixed"
              sticky
              scroll={{ x: 720, y: "calc(100vh - 360px)" }}
            />
          </div>
        )}

        {!loading && (
          <footer className="px-4 md:px-6 py-4 border-t border-white-700 bg-white-300 shrink-0">
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
    </div>
  );
}
