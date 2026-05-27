"use client";
import { IDashboardOverviewResponse } from "@/services/dashboard/dashboard.interface";
import { getAllOverview } from "@/services/dashboard/dashboard.service";
import { useCallback, useEffect, useState } from "react";

export function useDashboard() {
  const [overview, setOverview] = useState<IDashboardOverviewResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const loadOverview = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getAllOverview();
      setOverview(data);
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
    loading,
    refresh: loadOverview,
  };  
}
