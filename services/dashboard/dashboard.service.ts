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
    const response = await api.get(`${BASE_URL}/agents`);
    return response.data;
}

export async function getAllDesempenhoEmpresas(
    periodDays?: number,
    name?: string,
    page?: number,
    limit?: number
): Promise<any> {
    const response = await api.get(`${BASE_URL}/companies`);
    return response.data;
}

export async function getAllMetricas(periodDays?: number): Promise<any> {
    const response = await api.get(`${BASE_URL}/quality`);
    return response.data;
}