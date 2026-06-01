"use client";
import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { create, remove, update as updateUser } from "@/services/user/user.service";
import { getAll, update as updateAgent } from "@/services/agent/agent.service";
import { SupportLevel } from "@/services/agent/agent.type";
import { IAgent } from "@/services/agent/agent.interface";
import { IUserCreateRequest, IUserUpdateRequest } from "@/services/user/user.interface";

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

      setAgents(response.data ?? []);
      setTotalItems(response.meta.total);
      setTotalPages(response.meta.lastPage);
    } catch (error) {
      console.error("Erro ao carregar atendentes:", error);
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

  type AgentUpdatePayload = IUserUpdateRequest & {
    supportLevel?: SupportLevel;
    supportGroupId?: string;
    canAnswer?: boolean;
  };

  const handleUpdate = useCallback(async (id: string, data: AgentUpdatePayload) => {
    try {
      const userPayload: IUserUpdateRequest = {};
      const agentPayload: {
        supportLevel?: SupportLevel;
        supportGroupId?: string;
        canAnswer?: boolean;
      } = {};

      if (data.name !== undefined) userPayload.name = data.name;
      if (data.email !== undefined) userPayload.email = data.email;
      if (data.password !== undefined && data.password !== "") userPayload.password = data.password;
      if (data.phone !== undefined) userPayload.phone = data.phone;
      if (data.avatarUrl !== undefined) userPayload.avatarUrl = data.avatarUrl;
      if (data.chatStatus !== undefined) userPayload.chatStatus = data.chatStatus;
      if (data.isActive !== undefined) userPayload.isActive = data.isActive;
      if (data.role !== undefined) userPayload.role = data.role;

      if (data.supportLevel !== undefined) agentPayload.supportLevel = data.supportLevel;
      if (data.supportGroupId !== undefined) agentPayload.supportGroupId = data.supportGroupId;
      if (data.canAnswer !== undefined) agentPayload.canAnswer = data.canAnswer;

      if (Object.keys(userPayload).length > 0) {
        await updateUser(id, userPayload);
      }

      if (Object.keys(agentPayload).length > 0) {
        await updateAgent(id, agentPayload);
      }

      toast.success("Atendente atualizado com sucesso!");
      loadAgents();
    } catch (error) {
      console.error("Erro ao atualizar agente:", error);
      throw error;
    }
  }, [loadAgents]);

  return {
    agents,
    loading,
    totalItems,
    totalPages,
    supportLevel,
    setSupportLevel,
    handleDelete,
    handleCreate,
    handleUpdate,
    refresh: loadAgents,
  };
}
