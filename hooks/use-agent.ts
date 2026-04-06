import { useState, useEffect, useCallback } from "react";
import { toast } from 'sonner';

//service
import { create, remove } from "@/services/user/user.service";
import { getAll } from "@/services/agent/agent.service";

//component
import { IAgent } from "@/services/agent/agent.interface";

//interface
import { IUserCreateRequest } from "@/services/user/user.interface";

export function useAgent(currentPage: number, limit: number) {
  const [agents, setAgents] = useState<IAgent[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const loadAgents = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getAll(currentPage, limit);
      setAgents(response.agents ?? []); 
      
      setTotalItems(response.total);
      setTotalPages(Math.ceil(response.total / limit));
    } catch (error) {
      console.error("Erro ao carregar agentes:", error);
      setAgents([]);
    } finally {
      setLoading(false);
    }
  }, [currentPage, limit]);

  useEffect(() => {
    loadAgents();
  }, [loadAgents]);

  const handleCreate = useCallback(
    async (data: IUserCreateRequest) => {
      try {
        await create(data);
        await loadAgents();
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
      loading: 'Removendo atendente...',
      success: () => {
        loadAgents(); // Recarrega a tabela
        return 'Atendente removido com sucesso!';
      },
      error: (err) => {
        console.error(err);
        return 'Erro ao tentar excluir o atendente.';
      },
    });
  },
  [remove, loadAgents],
);
  return {
    agents,
    loading,
    totalItems,
    totalPages,
    handleDelete,
    handleCreate,
    refresh: loadAgents,
  };
}
