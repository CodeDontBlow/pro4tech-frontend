import { useState, useEffect, useCallback } from "react";
import { toast } from 'sonner';

//service
import { getAll } from "@/services/company/company.service";

//component
import { CompanyTableItem } from "@/app/components/ui/company/tableCompanies";

//interface
import { ICompanyCreateRequest, ICompanyResponse } from "@/services/company/company.interface";
import { createCompany } from "@/services/company/company.service";
import { IUserCreateRequest } from "@/services/user/user.interface";
import { remove } from "@/services/company/company.service";


export function useCompany(currentPage: number, limit: number) {
    const [companies, setCompanies] = useState<CompanyTableItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    const loadCompanies = useCallback(async () => {
        try {
            setLoading(true);
            const response = await getAll(currentPage, limit);

            const formatted = response.data.map((item) => ({
                id: item.id,
                cnpj: item.cnpj,
                name: item.name,
                contactName: item.contactName,
                contactEmail: item.contactEmail,
            }));

            setCompanies(formatted);
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
                await createCompany(data);
                await loadCompanies();
            } catch (error) {
                console.error("Erro ao criar empresa:", error);
                throw error;
            }
        },
        [loadCompanies],
    );

    const handleDelete = useCallback(
        async (id: string) => {
            // 1. Opcional: Aqui você ainda pode usar o seu ModalConfirm que criamos
            // Se o usuário confirmar no Modal, aí você dispara o código abaixo:

            toast.promise(remove(id), {
                loading: 'Removendo empresa...',
                success: () => {
                    loadCompanies(); // Recarrega a tabela
                    return 'Empresa removida com sucesso!';
                },
                error: (err) => {
                    console.error(err);
                    return 'Erro ao tentar excluir empresa.';
                },
            });
        },
        [remove, loadCompanies],
    );
    return {
        companies,
        loading,
        totalItems,
        totalPages,
        handleDelete,
        handleCreate,
        refresh: loadCompanies,
    };
}
