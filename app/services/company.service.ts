import { api } from "./api";

// POST criar empresa (admin)
export async function createCompany(data: { name: string }) {
    const response = await api.post("/company/register", data);
    return response.data;
}

// GET listar empresas
export async function listCompanies() {
    const response = await api.get("/company");
    return response.data;
}

// PATCH atualizar empresa
export async function updateCompany(id: string, data: { name?: string }) {
    const response = await api.patch(`/company/${id}`, data);
    return response.data;
}

// DELETE empresa
export async function deleteCompany(id: string) {
    const response = await api.delete(`/company/${id}`);
    return response.data;
}