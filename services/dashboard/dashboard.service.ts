import { api } from "../api";
import { IDashboardOverviewResponse } from "./dashboard.interface";

export async function getAllOverview(): Promise<IDashboardOverviewResponse> {
    const response = await api.get("/dashboard/overview");
    return response.data;
}