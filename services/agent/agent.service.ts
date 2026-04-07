import { IAgentResponse } from "./agent.interface";
import { api } from "../api";

export type SupportLevel = "LEVEL_1" | "LEVEL_2" | "LEVEL_3" | "";

export async function getAll(
  page = 1,
  limit = 10,
  supportLevel?: SupportLevel, // Opcional
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
