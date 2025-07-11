// src/hooks/client/use-client-diamonds.ts
import { useState, useEffect } from "react";
import {
    ClientDiamond,
    ClientFilters,
    FilterOptions,
} from "@/types/client/diamond";
import { clientDiamondAPI } from "@/services/client-api";

interface UseClientDiamondsReturn {
    diamonds: ClientDiamond[];
    filterOptions: FilterOptions;
    loading: boolean;
    error: string | null;
    searchDiamonds: (filters: ClientFilters) => Promise<void>;
    resetFilters: () => Promise<void>;
}

export function useClientDiamonds(): UseClientDiamondsReturn {
    const [diamonds, setDiamonds] = useState<ClientDiamond[]>([]);
    const [filterOptions, setFilterOptions] = useState<FilterOptions>({
        colors: [],
        clarities: [],
        cuts: [],
        polishes: [],
        symmetries: [],
        fluorescences: [],
        shapes: [],
        labs: [],
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadInitialData = async () => {
        try {
            setLoading(true);
            setError(null);

            const [diamondsData, filterOptionsData] = await Promise.all([
                clientDiamondAPI.getAllDiamonds(),
                clientDiamondAPI.getFilterOptions(),
            ]);

            setDiamonds(diamondsData);
            setFilterOptions(filterOptionsData);
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "An unknown error occurred"
            );
        } finally {
            setLoading(false);
        }
    };

    const searchDiamonds = async (filters: ClientFilters) => {
        try {
            setLoading(true);
            setError(null);

            const results = await clientDiamondAPI.searchDiamonds(filters);
            setDiamonds(results);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Search failed");
        } finally {
            setLoading(false);
        }
    };

    const resetFilters = async () => {
        await loadInitialData();
    };

    useEffect(() => {
        loadInitialData();
    }, []);

    return {
        diamonds,
        filterOptions,
        loading,
        error,
        searchDiamonds,
        resetFilters,
    };
}
