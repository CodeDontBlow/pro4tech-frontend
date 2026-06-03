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

export async function update(
  id: string,
  data: { supportLevel?: SupportLevel; supportGroupId?: string; canAnswer?: boolean },
): Promise<any> {
  const response = await api.patch(`/agent/${id}`, data);
  return response.data;
}
