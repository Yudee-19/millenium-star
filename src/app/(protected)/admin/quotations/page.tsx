"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Check, X, RefreshCw, Eye } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Container from "@/components/ui/container";
import { toast } from "sonner";
import { AdminGuard } from "@/components/auth/routeGuard";

type TabType = "pending" | "approved" | "rejected";

interface Quotation {
    quotationId: string;
    carat: number;
    noOfPieces: number;
    quotePrice: number;
    status: "PENDING" | "APPROVED" | "REJECTED";
    submittedAt: string;
    username?: string;
    email?: string;
    rejectionReason?: string;
}

interface AdminQuotation {
    userId: string;
    username: string;
    email: string;
    quotations: Quotation[];
}

const QuotationsPageContent = () => {
    const { isAdmin, loading: authLoading } = useAuth();

    const [adminQuotations, setAdminQuotations] = useState<AdminQuotation[]>(
        []
    );
    const [activeTab, setActiveTab] = useState<TabType>("pending");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [actionLoading, setActionLoading] = useState<string | null>(null);

    // Fetch quotations from API
    // The useCallback hook is used to memoize the function.
    // By removing isAdmin from the dependency array, the function is not re-created
    // when isAdmin changes, preventing the useEffect from re-running unnecessarily.
    const fetchQuotations = useCallback(async () => {
        if (!isAdmin) {
            setLoading(false); // Make sure to set loading to false if not admin
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(
                "https://diamond-inventory.onrender.com/api/quotations",
                {
                    credentials: "include",
                }
            );
            const data = await res.json();
            if (data.data && data.data.users) {
                setAdminQuotations(data.data.users);
            } else {
                setAdminQuotations([]);
            }
        } catch (err: any) {
            setError("Failed to fetch quotations.");
        } finally {
            setLoading(false);
        }
    }, []); // Empty dependency array means this function is created only once.

    // This useEffect now depends only on authLoading.
    // It will run once when authLoading becomes false, triggering the fetch.
    useEffect(() => {
        if (!authLoading) {
            fetchQuotations();
        }
    }, [authLoading, fetchQuotations]); // Keep fetchQuotations here to satisfy the linter, but it won't cause re-runs because it's memoized.

    // Accept/Reject quotation
    const handleAction = async (
        quotationId: string,
        action: "approve" | "reject"
    ) => {
        setActionLoading(quotationId);
        try {
            if (action === "approve") {
                const res = await fetch(
                    `https://diamond-inventory.onrender.com/api/quotations/${quotationId}/approve`,
                    {
                        method: "POST",
                        credentials: "include",
                    }
                );
                const data = await res.json();
                if (res.ok) {
                    toast.success("Quotation approved successfully");
                } else {
                    toast.error(data.message || "Failed to approve quotation");
                }
            } else {
                // Prompt for rejection reason

                const res = await fetch(
                    `https://diamond-inventory.onrender.com/api/quotations/${quotationId}/reject`,
                    {
                        method: "POST",
                        credentials: "include",
                        headers: { "Content-Type": "application/json" },
                    }
                );
                const data = await res.json();
                if (res.ok) {
                    toast.success("Quotation rejected successfully");
                } else {
                    toast.error(data.message || "Failed to reject quotation");
                }
            }
            // After a successful action, re-fetch the data to update the UI
            await fetchQuotations();
        } catch (err: any) {
            toast.error("Action failed.");
        } finally {
            setActionLoading(null);
        }
    };

    const formatDate = (dateString: string) =>
        new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });

    // Flatten quotations for table
    const getFilteredQuotations = useCallback(() => {
        const allQuotes = adminQuotations.flatMap((user) =>
            user.quotations.map((q) => ({
                ...q,
                username: user.username,
                email: user.email,
            }))
        );
        switch (activeTab) {
            case "approved":
                return allQuotes.filter((q) => q.status === "APPROVED");
            case "rejected":
                return allQuotes.filter((q) => q.status === "REJECTED");
            case "pending":
            default:
                return allQuotes.filter((q) => q.status === "PENDING");
        }
    }, [adminQuotations, activeTab]); // Memoize this function to avoid re-creation

    if (authLoading || loading) {
        return <div className="text-center p-12">Loading...</div>;
    }

    if (error) {
        return (
            <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        );
    }

    const filtered = getFilteredQuotations();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Quotations Management</h1>
                <Button
                    onClick={fetchQuotations}
                    variant="outline"
                    disabled={loading}
                >
                    <RefreshCw
                        className={`mr-2 h-4 w-4 ${
                            loading ? "animate-spin" : ""
                        }`}
                    />
                    Refresh
                </Button>
            </div>
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
                <Button
                    variant={activeTab === "pending" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setActiveTab("pending")}
                >
                    Pending
                </Button>
                <Button
                    variant={activeTab === "approved" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setActiveTab("approved")}
                >
                    Approved
                </Button>
                <Button
                    variant={activeTab === "rejected" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setActiveTab("rejected")}
                >
                    Rejected
                </Button>
            </div>
            <div className="rounded-lg border bg-white shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>User</TableHead>
                            <TableHead>Carat</TableHead>
                            <TableHead>Pieces</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Submitted</TableHead>
                            {activeTab === "pending" && (
                                <TableHead className="text-center">
                                    Actions
                                </TableHead>
                            )}
                            {activeTab === "rejected" && (
                                <TableHead>Reason</TableHead>
                            )}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filtered.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={
                                        activeTab === "pending"
                                            ? 6
                                            : activeTab === "rejected"
                                            ? 6
                                            : 5
                                    }
                                    className="text-center py-12 text-gray-500"
                                >
                                    <Eye className="mx-auto h-8 w-8 text-gray-300" />
                                    <span>No quotations found.</span>
                                </TableCell>
                            </TableRow>
                        ) : (
                            filtered.map((q) => (
                                <TableRow key={q.quotationId}>
                                    <TableCell>
                                        {q.username} ({q.email})
                                    </TableCell>
                                    <TableCell>{q.carat}</TableCell>
                                    <TableCell>{q.noOfPieces}</TableCell>
                                    <TableCell>
                                        ${q.quotePrice.toLocaleString()}
                                    </TableCell>
                                    <TableCell>
                                        {formatDate(q.submittedAt)}
                                    </TableCell>
                                    {activeTab === "pending" && (
                                        <TableCell className="text-center">
                                            <div className="flex items-center justify-center space-x-2">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() =>
                                                        handleAction(
                                                            q.quotationId,
                                                            "approve"
                                                        )
                                                    }
                                                    disabled={
                                                        actionLoading ===
                                                        q.quotationId
                                                    }
                                                >
                                                    <Check className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() =>
                                                        handleAction(
                                                            q.quotationId,
                                                            "reject"
                                                        )
                                                    }
                                                    disabled={
                                                        actionLoading ===
                                                        q.quotationId
                                                    }
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    )}
                                    {activeTab === "rejected" && (
                                        <TableCell>
                                            {q.rejectionReason || "-"}
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

const QuotationsPage = () => {
    return (
        <AdminGuard>
            <Container className="min-h-screen py-8">
                <QuotationsPageContent />
            </Container>
        </AdminGuard>
    );
};

export default QuotationsPage;
