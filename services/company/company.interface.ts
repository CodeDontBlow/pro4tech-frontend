export interface ICompany {
  id: string;
  cnpj: string;
  name: string;
  contactName: string;
  contactEmail: string;
  qr?: {
    id: string;
    image: string;
  } | null;
}

export interface ICompanyResponse {
  data: {
    id: string;
    cnpj: string;
    name: string;
    contactName: string;
    contactEmail: string;
    qr?: {
      id: string;
      image: string;
    } | null;
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
  qr?: {
    id: string;
    image: string;
  } | null;
}