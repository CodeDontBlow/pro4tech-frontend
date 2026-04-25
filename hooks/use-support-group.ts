import { useState, useCallback, useEffect } from "react";
import { toast } from "sonner";
import { getAll, create, remove } from "@/services/support-group/support-group.service";
import { ISupportGroup, ISupportGroupCreateRequest } from "@/services/support-group/support-group.interface";

export function useSupportGroup(currentPage: number, limit: number) {
  const [supportGroups, setSupportGroups] = useState<ISupportGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const loadSupportGroups = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getAll(currentPage, limit);
      setSupportGroups(response.data ?? []);
      setTotalItems(response.meta.total);
      setTotalPages(response.meta.lastPage);
    } catch (error) {
      console.error("Erro ao carregar grupos de suporte:", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, limit]);

  useEffect(() => {
    loadSupportGroups();
  }, [loadSupportGroups]);

    const handleCreate = useCallback(
        async (data: ISupportGroupCreateRequest) => {
            try {
            const company = await create(data); 
            setSupportGroups((prev) => [company, ...prev]);
            toast.success("Grupo de suporte criado com sucesso!");
            } catch (error) {
            console.error("Erro ao criar grupo de suporte:", error);
            toast.error("Erro ao criar grupo de suporte.");
            throw error;
            }
        },
        [],
    );

  const handleDelete = useCallback(
    async (id: string) => {
      toast.promise(remove(id), {
        loading: "Removendo grupo de suporte...",
        success: () => {
          loadSupportGroups();
          return "Grupo de suporte removido com sucesso!";
        },
        error: (err) => {
          console.error(err);
          return "Erro ao tentar excluir grupo de suporte.";
        },
      });
    },
    [loadSupportGroups],
  );

  return {
    supportGroups,
    loading,
    totalItems,
    totalPages,
    handleDelete,
    handleCreate,
    refresh: loadSupportGroups,
  };
}