"use client";
import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { create, remove } from "@/services/user/user.service";
import { getAll } from "@/services/admin/admin.service";
import { IAdmin } from "@/services/admin/admin.interface";
import { IUserCreateRequest } from "@/services/user/user.interface";

export function useAdmin(currentPage: number, limit: number) {
  const [admins, setAdmins] = useState<IAdmin[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const loadAdmins = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getAll(currentPage, limit);

      setAdmins(response.data ?? []);
      setTotalItems(response.meta.total);
      setTotalPages(response.meta.lastPage);
    } catch (error) {
      console.error("Erro ao carregar administradores:", error);
      setAdmins([]);
    } finally {
      setLoading(false);
    }
  }, [currentPage, limit]);

  useEffect(() => {
    loadAdmins();
  }, [loadAdmins]);

  const handleCreate = useCallback(
    async (data: IUserCreateRequest) => {
      try {
        await create(data);
        toast.success("Administrador criado com sucesso!");
      } catch (error) {
        console.error("Erro ao criar administrador:", error);
        throw error;
      }
    },
    [loadAdmins],
  );

  const handleDelete = useCallback(
    async (id: string) => {
      toast.promise(remove(id), {
        loading: "Removendo administrador...",
        success: () => {
          loadAdmins();
          return "Administrador removido com sucesso!";
        },
        error: (err) => {
          console.error(err);
          return "Erro ao tentar excluir o administrador.";
        },
      });
    },
    [loadAdmins],
  );

  return {
    admins,
    loading,
    totalItems,
    totalPages,
    handleDelete,
    handleCreate,
    refresh: loadAdmins,
  };
}
