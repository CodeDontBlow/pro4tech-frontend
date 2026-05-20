import { IAdminResponse } from "./admin.interface";
import { api } from "../api";

export async function getAll(
  page = 1,
  limit = 10,
): Promise<IAdminResponse> {
  const response = await api.get("/admin", {
    params: {
      page,
      limit,
    },
  });
  console.log("AdminService.getAll response:", response);
  return response.data;
}
