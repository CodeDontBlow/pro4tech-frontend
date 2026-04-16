"use client";
import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { create, remove } from "@/services/user/user.service";
import { getAll } from "@/services/agent/agent.service";
import { SupportLevel } from "@/services/agent/agent.type";
import { IAgent } from "@/services/agent/agent.interface";
import { IUserCreateRequest } from "@/services/user/user.interface";

export function useAgent(currentPage: number, limit: number) {
  const [agents, setAgents] = useState<IAgent[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [supportLevel, setSupportLevel] = useState<SupportLevel>("");

  const loadAgents = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getAll(currentPage, limit, supportLevel);

      setAgents(response.agents ?? []);
      setTotalItems(response.total);
      setTotalPages(Math.ceil(response.total / limit));
    } catch (error) {
      console.error("Erro ao carregar agentes:", error);
      setAgents([]);
    } finally {
      setLoading(false);
    }
  }, [currentPage, limit, supportLevel]);

  useEffect(() => {
    loadAgents();
  }, [loadAgents]);

  const handleCreate = useCallback(
    async (data: IUserCreateRequest) => {
      try {
        await create(data);
        toast.success("Atendente criado com sucesso!");
      } catch (error) {
        console.error("Erro ao criar agente:", error);
        throw error;
      }
    },
    [loadAgents],
  );

  const handleDelete = useCallback(
    async (id: string) => {
      toast.promise(remove(id), {
        loading: "Removendo atendente...",
        success: () => {
          loadAgents();
          return "Atendente removido com sucesso!";
        },
        error: (err) => {
          console.error(err);
          return "Erro ao tentar excluir o atendente.";
        },
      });
    },
    [loadAgents],
  );

  return {
    agents,
    loading,
    totalItems,
    totalPages,
    supportLevel,
    setSupportLevel,
    handleDelete,
    handleCreate,
    refresh: loadAgents,
  };
}
