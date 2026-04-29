export interface ICompany {
  id: string;
  cnpj: string;
  name: string;
  contactName: string;
  contactEmail: string;
  accessCode?: string;
  isActive?: boolean ;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
}

export interface ICompanyResponse {
  data: ICompany[];
  meta: {
    total: number;
    page: number;
    limit: number;
    lastPage: number;
  };
}

export type ICompanyCreateRequest = Omit<ICompany, "id">;
export type ICompanyUpdateRequest = Partial<ICompanyCreateRequest> & { id: string };
export type ICompanySummary = Pick<ICompany, "id" | "name">
