import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

export interface User {
    _id: string;
    username: string;
    email: string;
    status: "DEFAULT" | "PENDING" | "APPROVED" | "REJECTED";
    role: "USER" | "ADMIN";
    kyc?: {
        firstName: string;
        lastName: string;
        dateOfBirth: string;
        phoneNumber: string;
        address: {
            street: string;
            city: string;
            state: string;
            zipCode: string;
            country: string;
        };
        businessInfo?: {
            companyName: string;
            businessType: string;
            registrationNumber: string;
        };
        submittedAt: string;
    };
    createdAt: string;
    updatedAt: string;
}

interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
}

export const useAuth = () => {
    const [authState, setAuthState] = useState<AuthState>({
        user: null,
        loading: true,
        error: null,
    });
    const router = useRouter();

    const fetchUserProfile = useCallback(async () => {
        try {
            setAuthState((prev) => ({ ...prev, loading: true, error: null }));

            const response = await fetch(
                "https://diamond-inventory.onrender.com/api/users/profile",
                {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                if (response.status === 401) {
                    // User not authenticated
                    setAuthState({ user: null, loading: false, error: null });
                    return;
                }
                throw new Error(
                    `Failed to fetch user profile: ${response.status}`
                );
            }

            const result = await response.json();

            if (result.success && result.data?.user) {
                setAuthState({
                    user: result.data.user,
                    loading: false,
                    error: null,
                });
            } else {
                throw new Error("Invalid response format");
            }
        } catch (error) {
            console.error("Error fetching user profile:", error);
            setAuthState({
                user: null,
                loading: false,
                error:
                    error instanceof Error
                        ? error.message
                        : "Authentication failed",
            });
        }
    }, []);

    const logout = useCallback(async () => {
        try {
            await fetch(
                "https://diamond-inventory.onrender.com/api/users/logout",
                {
                    method: "POST",
                    credentials: "include",
                }
            );
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            // Clear local state regardless of logout API success
            setAuthState({ user: null, loading: false, error: null });
            localStorage.removeItem("user");
            router.push("/");
        }
    }, [router]);

    // Check for existing session on mount
    useEffect(() => {
        fetchUserProfile();
    }, [fetchUserProfile]);

    // Helper functions for permission checking
    const isAuthenticated = () => !!authState.user;

    const isAdmin = () => authState.user?.role === "ADMIN";

    const isApprovedUser = () =>
        authState.user?.role === "USER" &&
        authState.user?.status === "APPROVED";

    const hasStatus = (status: User["status"]) =>
        authState.user?.status === status;

    const hasRole = (role: User["role"]) => authState.user?.role === role;

    return {
        user: authState.user,
        loading: authState.loading,
        error: authState.error,
        isAuthenticated,
        isAdmin,
        isApprovedUser,
        hasStatus,
        hasRole,
        logout,
        refetchUser: fetchUserProfile,
    };
};
