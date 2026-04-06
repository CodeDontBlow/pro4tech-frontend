"use client";

import { useState } from "react";
import Button1 from "@/app/components/ui/button-1";
import { CompanyForm } from "./company-form";
import { useCompanies } from "@/hooks/useCompanies";
import { CreateCompanyDTO } from "@/services/company/company.types";

export default function Page() {
  return (
    <h1 className="flex justify-center text-blue-600 text-4xl">
      Manage Companies
    </h1>
  );
}
