"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import {
  create,
  getAll,
  remove,
  update,
} from "@/services/standard-message/standard-message.service";
import {
  IStandardMessage,
  IStandardMessageCreateRequest,
  IStandardMessageUpdateRequest,
} from "@/services/standard-message/standard-message.interface";

export function useStandardMessage(
  currentPage: number,
  limit: number,
  search: string,
) {
  const [standardMessages, setStandardMessages] = useState<IStandardMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const loadStandardMessages = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getAll(currentPage, limit, search);

      setStandardMessages(response.data ?? []);
      setTotalItems(response.meta.total);
      setTotalPages(response.meta.lastPage);
    } catch (error) {
      console.error("Erro ao carregar mensagens padrao:", error);
      setStandardMessages([]);
      setTotalItems(0);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }, [currentPage, limit, search]);

  useEffect(() => {
    loadStandardMessages();
  }, [loadStandardMessages]);

  const handleCreate = useCallback(async (data: IStandardMessageCreateRequest) => {
    try {
      await create(data);
      toast.success("Mensagem padrao criada com sucesso!");
    } catch (error) {
      console.error("Erro ao criar mensagem padrao:", error);
      throw error;
    }
  }, []);

  const handleDelete = useCallback(
    async (id: string) => {
      toast.promise(remove(id), {
        loading: "Removendo mensagem padrao...",
        success: () => {
          loadStandardMessages();
          return "Mensagem padrao removida com sucesso!";
        },
        error: (err) => {
          console.error(err);
          return "Erro ao tentar excluir a mensagem padrao.";
        },
      });
    },
    [loadStandardMessages],
  );

  const handleUpdate = useCallback(
    async (id: string, data: IStandardMessageUpdateRequest) => {
      try {
        await update(id, data);
        toast.success("Mensagem padrao atualizada com sucesso!");
      } catch (error) {
        console.error("Erro ao atualizar mensagem padrao:", error);
        throw error;
      }
    },
    [],
  );

  return {
    standardMessages,
    loading,
    totalItems,
    totalPages,
    handleCreate,
    handleUpdate,
    handleDelete,
    refresh: loadStandardMessages,
  };
}
