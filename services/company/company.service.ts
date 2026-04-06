import { ICompanyResponse } from "./company.interface";
import { api } from "../api";

export async function getAll(
    page = 1,
    limit = 10,
): Promise<ICompanyResponse> {
    const response = await api.get("/company", {
        params: {
            page,
            limit,
            isActive: true,
        },
    });
    return response.data;
}

export async function createCompany(data: {
    cnpj: string;
    name: string;
    contactName: string;
    contactEmail: string;
}) {
    const response = await api.post("/company/register", data);
    return response.data;
}


export async function remove(id: string) {
    const response = await api.delete(`/companies/${id}`);
    return response.data;
}