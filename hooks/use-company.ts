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
                qr: (item as any).qr || null, // type assertion
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
                const { company, qr } = await createCompany(data); // now includes QR

                // Add the new company directly to state (optional: avoids full reload)
                setCompanies((prev) => [
                    { ...company, qr }, // include QR in table
                    ...prev,
                ]);

                toast.success("Empresa criada com sucesso!");
            } catch (error) {
                console.error("Erro ao criar empresa:", error);
                toast.error("Erro ao criar empresa.");
                throw error;
            }
        },
        [],
    );


    const handleDelete = useCallback(
        async (id: string) => {

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
