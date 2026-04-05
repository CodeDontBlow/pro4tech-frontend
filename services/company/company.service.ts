import { api } from "../api";
import { CreateCompanyDTO, UpdateCompanyDTO } from "./company.types";

export async function getCompanies(
    page: number = 1,
    limit: number = 10,
    search?: string
) {
    try {
        // Monta os params de forma segura
        const params: Record<string, any> = {
            page: Number(page) || 1,
            limit: Number(limit) || 10,
        };

        if (search && search.trim() !== "") {
            params.search = search.trim();
        }

        const response = await api.get("/company", { params });
        return response.data;
    } catch (error: any) {
        console.error("Erro ao buscar empresas:", error);

        // Retorna padrão para evitar crash na UI
        return {
            data: [],
            total: 0,
            page: Number(page) || 1,
            limit: Number(limit) || 10,
        };
    }
}

export async function createCompany(data: CreateCompanyDTO) {
    const response = await api.post("/company/register", data);
    return response.data;
}

export async function updateCompany(id: string, data: UpdateCompanyDTO) {
    const response = await api.patch(`/company/${id}`, data);
    return response.data;
}

export async function deleteCompany(id: string) {
    const response = await api.delete(`/company/${id}`);
    return response.data;
}
