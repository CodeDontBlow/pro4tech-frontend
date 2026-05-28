"use client";
import { 
  IDashboardOverviewResponse, 
  IAgentPerformance,
} from "@/services/dashboard/dashboard.interface";
import { 
  getAllDesempenhoAgentes, getAllOverview } from "@/services/dashboard/dashboard.service";
import { useCallback, useEffect, useState } from "react";

export function useDashboard(
  name?: string,
  periodDays?: number,
  page?: number,
  limit?: number
) {
  const [overview, setOverview] = useState<IDashboardOverviewResponse | null>(null);
  const [desempenhoAgentes, setDesempenhoAgentes] = useState<IAgentPerformance[] | null>(null);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const loadDesempenhoAgentes = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getAllDesempenhoAgentes(periodDays, name, page, limit);
      setDesempenhoAgentes(response.data);
      setTotalItems(response.meta.total);
      setTotalPages(response.meta.lastPage);
      console.log("Dados do dashboard carregados:", response);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
      setDesempenhoAgentes(null);
    } finally {
      setLoading(false);
    }
  }, [name, periodDays, page, limit]); 

  useEffect(() => {
    loadDesempenhoAgentes();
  }, [loadDesempenhoAgentes]);

  const loadOverview = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getAllOverview();
      setOverview(data);
      console.log("Dados do dashboard carregados:", data);
    } catch (error) {
      console.error("Erro ao carregar dados do dashboard:", error);
      setOverview(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadOverview();
  }, [loadOverview]);

  return {
    overview,
    desempenhoAgentes,
    loading,
    totalItems,
    totalPages,
  };  
}
