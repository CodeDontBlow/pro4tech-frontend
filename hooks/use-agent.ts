import { useState, useEffect, useCallback } from "react";
import { toast } from 'sonner';

//service
import { create, remove } from "@/services/user/user.service";
import { getAll } from "@/services/agent/agent.service";

//component
import { AgentTableItem } from "@/app/components/ui/agent/tableAgents";

//interface
import { IUserCreateRequest } from "@/services/user/user.interface";

export function useAgent(currentPage: number, limit: number) {
  const [agents, setAgents] = useState<AgentTableItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const loadAgents = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getAll(currentPage, limit);

      const formatted = response.agents.map((item) => ({
        id: item.id,
        name: item.user.name,
        email: item.user.email,
        supportLevel: item.supportLevel,
        group: "Geral",
      }));

      setAgents(formatted);
      setTotalItems(response.total);
      setTotalPages(Math.ceil(response.total / limit));
    } catch (error) {
      console.error("Erro ao carregar agentes:", error);
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
    // 1. Opcional: Aqui você ainda pode usar o seu ModalConfirm que criamos
    // Se o usuário confirmar no Modal, aí você dispara o código abaixo:

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
