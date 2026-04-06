import { IAgentResponse } from "./agent.interface";
import { api } from "../api";

export async function getAll(
  page = 1,
  limit = 10,
): Promise<IAgentResponse> {
  const response = await api.get("/agent", {
    params: {
      page,
      limit,
      isActive: true,
    },
  });
  return response.data;
}
