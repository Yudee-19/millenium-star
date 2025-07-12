// src/hooks/client/use-client-diamonds.ts
import { useState, useEffect } from "react";
import {
    ClientDiamond,
    ClientFilters,
    FilterOptions,
} from "@/types/client/diamond";
import { clientDiamondAPI } from "@/services/client-api";

interface PaginationData {
    currentPage: number;
    totalPages: number;
    totalRecords: number;
    recordsPerPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}

interface UseClientDiamondsReturn {
    diamonds: ClientDiamond[];
    filterOptions: FilterOptions;
    pagination: PaginationData;
    loading: boolean;
    error: string | null;
    searchDiamonds: (filters: ClientFilters, page?: number) => Promise<void>;
    resetFilters: () => Promise<void>;
    currentFilters: ClientFilters;
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
    const [pagination, setPagination] = useState<PaginationData>({
        currentPage: 1,
        totalPages: 1,
        totalRecords: 0,
        recordsPerPage: 20,
        hasNextPage: false,
        hasPrevPage: false,
    });
    const [currentFilters, setCurrentFilters] = useState<ClientFilters>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadInitialData = async () => {
        try {
            setLoading(true);
            setError(null);

            const [diamondsResponse, filterOptionsData] = await Promise.all([
                clientDiamondAPI.searchDiamonds({}, 1, 20), // Use search with pagination
                clientDiamondAPI.getFilterOptions(),
            ]);

            setDiamonds(diamondsResponse.data);
            setPagination(diamondsResponse.pagination);
            setFilterOptions(filterOptionsData);
            setCurrentFilters({});
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "An unknown error occurred"
            );
        } finally {
            setLoading(false);
        }
    };

    const searchDiamonds = async (filters: ClientFilters, page: number = 1) => {
        try {
            setLoading(true);
            setError(null);

            const results = await clientDiamondAPI.searchDiamonds(
                filters,
                page,
                20
            );

            setDiamonds(results.data);
            setPagination(results.pagination);
            setCurrentFilters(filters);
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
        pagination,
        loading,
        error,
        searchDiamonds,
        resetFilters,
        currentFilters,
    };
}
