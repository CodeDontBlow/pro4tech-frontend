import { ICompanyResponse, ICompanyCreateRequest } from "./company.interface";
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

export async function create(data: ICompanyCreateRequest) {
    const response = await api.post("/company/register", data);
    return response.data;
}

export async function remove(id: string) {
    const response = await api.delete(`/company/${id}`); 
    return response.data;
}

export async function update(id: string, data: Partial<ICompanyCreateRequest>) {
    const response = await api.patch(`/company/${id}`, data);
    return response.data;
}