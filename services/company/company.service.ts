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
    try {
        const response = await api.delete(`/company/${id}`); // singular "company"
        return response.data;
    } catch (error: any) {
        console.error("Failed to delete company:", error.response?.status, error.response?.data);
        throw error;
    }
}