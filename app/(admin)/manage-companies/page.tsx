"use client";

import { useState } from "react";
import Button1 from "@/app/components/ui/button-1";
import { CompanyForm } from "./company-form";
import { useCompanies } from "@/hooks/useCompanies";
import { CreateCompanyDTO } from "@/services/company/company.types";

export default function Page() {
  const { companies, loading } = useCompanies();
  const [showForm, setShowForm] = useState(false);

  function handleAddCompany(data: CreateCompanyDTO) {
    console.log("Dados enviados:", data);
    // aqui chamaria createCompany(data)
    setShowForm(false);
  }

  if (loading) return <p>Carregando...</p>;

  return (
    <main className="px-6 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
          Empresas cadastradas:
        </h1>

        <Button1 onClick={() => setShowForm(true)}>
          Adicionar empresa
        </Button1>
      </div>

      {showForm && <CompanyForm onSubmit={handleAddCompany} />}

      <div>
        {companies.map((company: any) => (
          <div key={company.id}>
            <p>{company.name}</p>
          </div>
        ))}
      </div>
    </main>
  );
}