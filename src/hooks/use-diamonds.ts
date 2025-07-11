import { useState, useEffect } from "react";
import { DiamondType } from "@/lib/validations/diamond-schema";

interface UseDiamondsReturn {
    diamonds: DiamondType[];
    loading: boolean;
    error: string | null;
    refetch: () => void;
}

export function useDiamonds(): UseDiamondsReturn {
    const [diamonds, setDiamonds] = useState<DiamondType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchDiamonds = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch(
                "http://localhost:5000/api/diamonds/all"
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data.data);
            setDiamonds(data.data as DiamondType[]);
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "An unknown error occurred"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDiamonds();
    }, []);

    return {
        diamonds,
        loading,
        error,
        refetch: fetchDiamonds,
    };
}
