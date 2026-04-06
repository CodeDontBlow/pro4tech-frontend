import { api } from "../api";
import { CreateCompanyDTO, UpdateCompanyDTO } from "./company.types";

export async function registerCompany(data: any) {
    const response = await api.post("/company/register", data);
    return response.data;
}
