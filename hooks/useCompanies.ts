import { useEffect, useState } from "react";
import { getCompanies } from "@/services/company/company.service";

export function useCompanies() {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);

    async function fetchCompanies() {
        try {
            const data = await getCompanies();
            setCompanies(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCompanies();
    }, []);

    return { companies, loading, refetch: fetchCompanies };
}