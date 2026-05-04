import { IAdminResponse } from "./admin.interface";
import { api } from "../api";

export async function getAll(
  page = 1,
  limit = 10,
): Promise<IAdminResponse> {
  const response = await api.get("/user/me", {
    params: {
      page,
      limit,
    },
  });
  return response.data;
}
