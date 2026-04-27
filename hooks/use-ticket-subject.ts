"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import {
  create,
  getAll,
  remove,
  update,
} from "@/services/ticket-subject/ticket-subject.service";
import {
  ITicketSubject,
  ITicketSubjectCreateRequest,
  ITicketSubjectUpdateRequest,
} from "@/services/ticket-subject/ticket-subject.interface";

export function useTicketSubject(
  currentPage: number,
  limit: number,
  searchName: string,
) {
  const [ticketSubjects, setTicketSubjects] = useState<ITicketSubject[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const loadTicketSubjects = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getAll(currentPage, limit, searchName);

      setTicketSubjects(response.data ?? []);
      setTotalItems(response.meta.total);
      setTotalPages(response.meta.lastPage);
    } catch (error) {
      console.error("Erro ao carregar assuntos de chamado:", error);
      setTicketSubjects([]);
    } finally {
      setLoading(false);
    }
  }, [currentPage, limit, searchName]);

  useEffect(() => {
    loadTicketSubjects();
  }, [loadTicketSubjects]);

  const handleCreate = useCallback(
    async (data: ITicketSubjectCreateRequest) => {
      try {
        await create(data);
        toast.success("Assunto criado com sucesso!");
      } catch (error) {
        console.error("Erro ao criar assunto:", error);
        throw error;
      }
    },
    [],
  );

  const handleDelete = useCallback(
    async (id: string) => {
      toast.promise(remove(id), {
        loading: "Removendo assunto...",
        success: () => {
          loadTicketSubjects();
          return "Assunto removido com sucesso!";
        },
        error: (err) => {
          console.error(err);
          return "Erro ao tentar excluir o assunto.";
        },
      });
    },
    [loadTicketSubjects],
  );

  const handleUpdate = useCallback(
    async (id: string, data: ITicketSubjectUpdateRequest) => {
      try {
        await update(id, data);
        toast.success("Assunto atualizado com sucesso!");
      } catch (error) {
        console.error("Erro ao atualizar assunto:", error);
        throw error;
      }
    },
    [],
  );

  return {
    ticketSubjects,
    loading,
    totalItems,
    totalPages,
    handleCreate,
    handleUpdate,
    handleDelete,
    refresh: loadTicketSubjects,
  };
}
