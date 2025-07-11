// src/services/client-api.ts
import {
    ClientDiamond,
    ClientFilters,
    FilterOptions,
} from "@/types/client/diamond";

const API_BASE_URL = "http://localhost:5000/api";

interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
    count?: number;
}

class ClientDiamondAPI {
    async searchDiamonds(
        filters: ClientFilters = {}
    ): Promise<ClientDiamond[]> {
        const params = new URLSearchParams();

        // Add filter parameters
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== "") {
                if (Array.isArray(value)) {
                    value.forEach((v) => params.append(key, v.toString()));
                } else {
                    params.append(key, value.toString());
                }
            }
        });

        const response = await fetch(
            `${API_BASE_URL}/diamonds/search?${params}`
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: ApiResponse<ClientDiamond[]> = await response.json();

        if (!result.success) {
            throw new Error(result.message || "Failed to fetch diamonds");
        }

        return result.data;
    }

    async getFilterOptions(): Promise<FilterOptions> {
        const response = await fetch(`${API_BASE_URL}/diamonds/filter-options`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: ApiResponse<FilterOptions> = await response.json();

        if (!result.success) {
            throw new Error(result.message || "Failed to fetch filter options");
        }

        return result.data;
    }

    async getAllDiamonds(): Promise<ClientDiamond[]> {
        const response = await fetch(`${API_BASE_URL}/diamonds/all`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: ApiResponse<ClientDiamond[]> = await response.json();

        if (!result.success) {
            throw new Error(result.message || "Failed to fetch diamonds");
        }

        return result.data;
    }
}

export const clientDiamondAPI = new ClientDiamondAPI();
