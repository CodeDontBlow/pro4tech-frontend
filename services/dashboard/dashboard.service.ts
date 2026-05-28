import { api } from "../api";
import { IDashboardAgentsResponse, IDashboardOverviewResponse } from "./dashboard.interface";

const BASE_URL = "/dashboard";

export async function getAllOverview(): Promise<IDashboardOverviewResponse> {
    const response = await api.get(`${BASE_URL}/overview`);
    return response.data;
}

export async function getAllDesempenhoAgentes(
    periodDays?: number,
    name?: string,
    page?: number,
    limit?: number
): Promise<IDashboardAgentsResponse> {
    const params = new URLSearchParams();

    if (periodDays) params.append("periodDays", String(periodDays));
    if (name)        params.append("name", name);
    if (page)        params.append("page", String(page));
    if (limit)       params.append("limit", String(limit));

    const query = params.toString();
    const url = query ? `${BASE_URL}/agents?${query}` : `${BASE_URL}/agents`;
    console.log("🔍 URL gerada:", url); 

    const response = await api.get(url);
    return response.data;
}

export async function getAllDesempenhoEmpresas(
  periodDays?: number,
  name?: string,
  page?: number,
  limit?: number
): Promise<any> {
  const params = new URLSearchParams();

  if (periodDays) params.append("periodDays", String(periodDays));
  if (name)        params.append("name", name);
  if (page)        params.append("page", String(page));
  if (limit)       params.append("limit", String(limit));

  const query = params.toString();
  const url = query ? `${BASE_URL}/companies?${query}` : `${BASE_URL}/companies`;

  const response = await api.get(url);
  return response.data;
}

export async function getAllMetricas(periodDays?: number): Promise<any> {
    const params = new URLSearchParams();

    if (periodDays) params.append("periodDays", String(periodDays));

    const query = params.toString();
    const url = query ? `${BASE_URL}/metrics?${query}` : `${BASE_URL}/metrics`;
    const response = await api.get(url);
    return response.data;
}