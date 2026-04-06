interface ICompany {
  id: string;
  cnpj: string;
  name: string;
  contactName: string;
  contactEmail: string;
}

export interface ICompanyResponse {
  data: {
    id: string;
    cnpj: string;
    name: string;
    contactName: string;
    contactEmail: string;
  }[];
  meta: {
    total: number;
    page: number;
    limit: number;
    lastPage: number;
  };
}

export interface ICompanyCreateRequest {
  cnpj: string;
  name: string;
  contactName: string;
  contactEmail: string;
}