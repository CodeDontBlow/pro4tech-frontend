import { useState, useCallback, useEffect } from "react";
import { toast } from "sonner";
import { getAll, create, remove, update } from "@/services/company/company.service";
import { ICompany, ICompanyCreateRequest } from "@/services/company/company.interface";

export function useCompany(currentPage: number, limit: number) {
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const loadCompanies = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getAll(currentPage, limit);
      setCompanies(response.data ?? []);
      setTotalItems(response.meta.total);
      setTotalPages(response.meta.lastPage);
    } catch (error) {
      console.error("Erro ao carregar empresas:", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, limit]);

  useEffect(() => {
    loadCompanies();
  }, [loadCompanies]);

    const handleCreate = useCallback(
      async (data: ICompanyCreateRequest) => {
        try {
        const company = await create(data); 
        setCompanies((prev) => [company, ...prev]);
        toast.success("Empresa criada com sucesso!");
        return company;
        } catch (error) {
        console.error("Erro ao criar empresa:", error);
        toast.error("Erro ao criar empresa.");
        throw error;
        }
      },
      [],
    );
    const handleUpdate = useCallback(
    async (id: string, data: Partial<ICompanyCreateRequest>) => {
      try {
      await update(id, data);
      await loadCompanies(); 
      toast.success("Empresa atualizada com sucesso!");
      } catch (error) {
      console.error("Erro ao atualizar empresa:", error);
      toast.error("Erro ao atualizar empresa.");
      throw error;
      }
    },
    [loadCompanies],
  );

  const handleDelete = useCallback(
    async (id: string) => {
      toast.promise(remove(id), {
        loading: "Removendo empresa...",
        success: () => {
          loadCompanies();
          return "Empresa removida com sucesso!";
        },
        error: (err) => {
          console.error(err);
          return "Erro ao tentar excluir empresa.";
        },
      });
    },
    [loadCompanies],
  );

  return {
    companies,
    loading,
    totalItems,
    totalPages,
    handleDelete,
    handleCreate,
    handleUpdate,
    refresh: loadCompanies,
  };
}