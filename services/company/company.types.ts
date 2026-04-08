export type CreateCompanyDTO = {
    cnpj: string;
    name: string;
    contactName?: string;
    contactEmail?: string;
};

export type UpdateCompanyDTO = {
    name?: string;
    contactName?: string;
    contactEmail?: string;
};