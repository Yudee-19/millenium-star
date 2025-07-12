"use client";

import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface RouteGuardProps {
    children: React.ReactNode;
    requiredRole?: "USER" | "ADMIN";
    requiredStatus?: "DEFAULT" | "PENDING" | "APPROVED" | "REJECTED";
    fallbackPath?: string;
    loadingComponent?: React.ReactNode;
    unauthorizedComponent?: React.ReactNode;
    allowAdminBypass?: boolean; // New prop to allow admin bypass
}

const DefaultLoadingComponent = () => (
    <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
    </div>
);

const DefaultUnauthorizedComponent = ({ message }: { message: string }) => (
    <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Access Denied
            </h1>
            <p className="text-gray-600 mb-4">{message}</p>
            <button
                onClick={() => window.history.back()}
                className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
            >
                Go Back
            </button>
        </div>
    </div>
);

export const RouteGuard: React.FC<RouteGuardProps> = ({
    children,
    requiredRole,
    requiredStatus,
    fallbackPath = "/",
    loadingComponent = <DefaultLoadingComponent />,
    unauthorizedComponent,
    allowAdminBypass = false,
}) => {
    const { user, loading, isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            if (!isAuthenticated()) {
                router.push(fallbackPath);
                return;
            }

            // Admin bypass logic - if user is ADMIN and bypass is allowed, skip all checks
            if (allowAdminBypass && user?.role === "ADMIN") {
                return;
            }

            // Check role requirement
            if (requiredRole && user?.role !== requiredRole) {
                if (!unauthorizedComponent) {
                    router.push(fallbackPath);
                }
                return;
            }

            // Check status requirement
            if (requiredStatus && user?.status !== requiredStatus) {
                if (!unauthorizedComponent) {
                    router.push(fallbackPath);
                }
                return;
            }
        }
    }, [
        loading,
        user,
        isAuthenticated,
        requiredRole,
        requiredStatus,
        router,
        fallbackPath,
        unauthorizedComponent,
        allowAdminBypass,
    ]);

    if (loading) {
        return <>{loadingComponent}</>;
    }

    if (!isAuthenticated()) {
        return null; // Will redirect
    }

    // Admin bypass logic - if user is ADMIN and bypass is allowed, render children
    if (allowAdminBypass && user?.role === "ADMIN") {
        return <>{children}</>;
    }

    // Check role requirement
    if (requiredRole && user?.role !== requiredRole) {
        if (unauthorizedComponent) {
            return <>{unauthorizedComponent}</>;
        }
        return (
            <DefaultUnauthorizedComponent
                message={`This page requires ${requiredRole} role access.`}
            />
        );
    }

    // Check status requirement
    if (requiredStatus && user?.status !== requiredStatus) {
        if (unauthorizedComponent) {
            return <>{unauthorizedComponent}</>;
        }

        let statusMessage = "";
        switch (requiredStatus) {
            case "APPROVED":
                statusMessage =
                    "This page requires approved account status. Please wait for admin approval.";
                break;
            case "PENDING":
                statusMessage = "This page requires pending account status.";
                break;
            default:
                statusMessage = `This page requires ${requiredStatus} account status.`;
        }

        return <DefaultUnauthorizedComponent message={statusMessage} />;
    }

    return <>{children}</>;
};

// Specific guard components for common use cases
export const AdminGuard: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => <RouteGuard requiredRole="ADMIN">{children}</RouteGuard>;

// Updated: Allow both ADMIN users and APPROVED USER users
export const InventoryGuard: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => (
    <RouteGuard
        requiredRole="USER"
        requiredStatus="APPROVED"
        allowAdminBypass={true}
    >
        {children}
    </RouteGuard>
);

// Keeping the old component for backward compatibility, but it's now an alias
export const ApprovedUserGuard: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => <InventoryGuard>{children}</InventoryGuard>;
