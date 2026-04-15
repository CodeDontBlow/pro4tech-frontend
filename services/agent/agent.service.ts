import { IAgentResponse } from "./agent.interface";
import { api } from "../api";
import { SupportLevel } from "./agent.type";

export async function getAll(
  page = 1,
  limit = 10,
  supportLevel?: SupportLevel,
): Promise<IAgentResponse> {
  const response = await api.get("/agent", {
    params: {
      page,
      limit,
      isActive: true,
      ...(supportLevel && { supportLevel }),
    },
  });
  return response.data;
}
