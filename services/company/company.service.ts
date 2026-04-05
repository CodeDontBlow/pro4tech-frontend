import { api } from "../api";

export async function registerCompany(data: any) {
  const response = await api.post("/company/register", data);
  return response.data;
}
