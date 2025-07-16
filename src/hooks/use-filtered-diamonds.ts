import { useState, useEffect, useCallback } from "react";
import { DiamondType } from "@/lib/validations/diamond-schema";

const API_BASE_URL = "https://diamond-inventory.onrender.com/api";

interface FilteredDiamondsReturn {
    diamonds: DiamondType[];
    loading: boolean;
    error: string | null;
    totalCount: number;
    pageCount: number;
    refetch: () => void;
    paginationMeta: {
        currentPage: number;
        totalPages: number;
        totalRecords: number;
        recordsPerPage: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
    } | null;
}

export function useFilteredDiamonds(
    apiEndpoint: string
): FilteredDiamondsReturn {
    const [diamonds, setDiamonds] = useState<DiamondType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [totalCount, setTotalCount] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [paginationMeta, setPaginationMeta] = useState<{
        currentPage: number;
        totalPages: number;
        totalRecords: number;
        recordsPerPage: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
    } | null>(null);

    const fetchDiamonds = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            console.log(`🔍 Fetching filtered diamonds from: ${apiEndpoint}`);

            const response = await fetch(`${API_BASE_URL}/${apiEndpoint}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            if (!result.success) {
                throw new Error(result.error || "Failed to fetch diamonds");
            }

            setDiamonds(result.data as DiamondType[]);
            setTotalCount(result.count || result.pagination?.totalRecords || 0);

            // Set pagination metadata from API response
            if (result.pagination) {
                setPaginationMeta(result.pagination);
                setPageCount(result.pagination.totalPages);
            } else {
                // Fallback for older API responses
                setPageCount(Math.ceil((result.count || 0) / 10));
            }
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "An unknown error occurred"
            );
        } finally {
            setLoading(false);
        }
    }, [apiEndpoint]);

    const refetch = useCallback(() => {
        fetchDiamonds();
    }, [fetchDiamonds]);

    useEffect(() => {
        if (apiEndpoint) {
            fetchDiamonds();
        }
    }, [fetchDiamonds, apiEndpoint]);

    return {
        diamonds,
        loading,
        error,
        totalCount,
        pageCount,
        refetch,
        paginationMeta,
    };
}
