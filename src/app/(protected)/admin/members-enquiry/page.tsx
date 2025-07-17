"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Check, X, Eye } from "lucide-react";
import { toast } from "sonner";

import { AdminGuard } from "@/components/auth/routeGuard";
import { SiteHeader } from "@/components/layout/site-header";
import Container from "@/components/ui/container";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

interface Quotation {
    quotationId: string;
    carat: number;
    noOfPieces: number;
    quotePrice: number;
    status: "PENDING" | "APPROVED" | "REJECTED";
    submittedAt: string;
}

interface CustomerData {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    countryCode: string;
    address: {
        street: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
    };
    businessInfo: {
        companyName: string;
        businessType: string;
        vatNumber: string;
        websiteUrl?: string;
    };
    submittedAt: string;
}

interface User {
    _id: string;
    username: string;
    email: string;
    password: string;
    status: "DEFAULT" | "PENDING" | "APPROVED" | "REJECTED";
    role: "USER" | "ADMIN";
    quotations?: Quotation[];
    customerData?: CustomerData;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

type TabType = "pending" | "rejected" | "approved";

export default function MembersEnquiry() {
    const [activeTab, setActiveTab] = useState<TabType>("pending");
    const [pendingUsers, setPendingUsers] = useState<User[]>([]);
    const [approvedUsers, setApprovedUsers] = useState<User[]>([]);
    const [rejectedUsers, setRejectedUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState<string | null>(null);

    const { user, logout } = useAuth();
    const router = useRouter();

    // Fetch pending users using the specific KYC pending endpoint
    const fetchPendingUsers = async () => {
        try {
            const response = await fetch(
                "https://diamond-inventory.onrender.com/api/users/customer-data-pending",
                {
                    credentials: "include",
                }
            );
            const data = await response.json();
            console.log("Pending Users Data:", data);

            if (data.success) {
                setPendingUsers(data.data || []);
            } else {
                toast.error("Failed to fetch pending users");
            }
        } catch (error) {
            console.error("Error fetching pending users:", error);
            toast.error("Error fetching pending users");
        }
    };

    // Fetch all users and filter by status on client side
    const fetchAllUsers = async () => {
        try {
            // Fetch multiple pages to get all users
            let allUsers: User[] = [];
            let currentPage = 1;
            let totalPages = 1;

            do {
                const response = await fetch(
                    `https://diamond-inventory.onrender.com/api/users?page=${currentPage}&limit=50`,
                    {
                        credentials: "include",
                    }
                );
                const data = await response.json();
                console.log("All Users Data:", data);

                if (data.success) {
                    allUsers = [...allUsers, ...data.data];
                    totalPages = data.pagination.totalPages;
                    currentPage++;
                } else {
                    toast.error("Failed to fetch users");
                    break;
                }
            } while (currentPage <= totalPages);

            // Filter users by status on client side
            const approved = allUsers.filter(
                (user) => user.status === "APPROVED" && user.customerData
            );
            console.log("Approved Users:", approved);
            const rejected = allUsers.filter(
                (user) => user.status === "REJECTED" && user.customerData
            );
            console.log("Rejected Users:", rejected);

            setApprovedUsers(approved);
            setRejectedUsers(rejected);
        } catch (error) {
            console.error("Error fetching all users:", error);
            toast.error("Error fetching users");
        }
    };

    // Approve user
    const handleApprove = async (userId: string) => {
        setActionLoading(userId);
        try {
            const response = await fetch(
                `https://diamond-inventory.onrender.com/api/users/${userId}/approve-customer-data`,
                {
                    method: "POST",
                    credentials: "include",
                }
            );
            const data = await response.json();

            if (data.success) {
                toast.success("User approved successfully");
                // Refresh all user lists
                await Promise.all([fetchPendingUsers(), fetchAllUsers()]);
            } else {
                toast.error(data.message || "Failed to approve user");
            }
        } catch (error) {
            console.error("Error approving user:", error);
            toast.error("Error approving user");
        } finally {
            setActionLoading(null);
        }
    };

    // Reject user
    const handleReject = async (userId: string) => {
        setActionLoading(userId);
        try {
            const response = await fetch(
                `https://diamond-inventory.onrender.com/api/users/${userId}/reject-customer-data`,
                {
                    method: "POST",
                    credentials: "include",
                }
            );
            const data = await response.json();

            if (data.success) {
                toast.success("User rejected successfully");
                // Refresh all user lists
                await Promise.all([fetchPendingUsers(), fetchAllUsers()]);
            } else {
                toast.error(data.message || "Failed to reject user");
            }
        } catch (error) {
            console.error("Error rejecting user:", error);
            toast.error("Error rejecting user");
        } finally {
            setActionLoading(null);
        }
    };

    // Format date
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString();
    };

    // Load data on component mount
    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            await Promise.all([fetchPendingUsers(), fetchAllUsers()]);
            setLoading(false);
        };

        loadData();
    }, []);

    // Helper function to render user table rows
    const renderUserRows = (users: User[], showActions: boolean = false) => {
        if (users.length === 0) {
            return (
                <TableRow>
                    <TableCell
                        colSpan={showActions ? 11 : 10}
                        className="text-center py-8 text-gray-500"
                    >
                        No users found
                    </TableCell>
                </TableRow>
            );
        }

        return users.map((user, index) => (
            <TableRow key={user._id} className="hover:bg-gray-50">
                <TableCell className="text-center">{index + 1}</TableCell>
                <TableCell className="text-center font-mono">
                    {user._id.slice(-8)}
                </TableCell>
                <TableCell className="text-center">
                    {user.customerData
                        ? `${user.customerData.firstName} ${
                              user.customerData.lastName
                          }${
                              user.customerData.businessInfo?.companyName
                                  ? ` (${user.customerData.businessInfo.companyName})`
                                  : ""
                          }`
                        : "N/A"}
                </TableCell>
                <TableCell className="text-center">
                    {user.customerData?.businessInfo?.vatNumber || "N/A"}
                </TableCell>
                <TableCell className="text-center">{user.username}</TableCell>
                <TableCell className="text-center">{user.email}</TableCell>
                <TableCell className="text-center">
                    {user.customerData?.countryCode &&
                    user.customerData?.phoneNumber
                        ? `${user.customerData.countryCode} ${user.customerData.phoneNumber}`
                        : "N/A"}
                </TableCell>
                <TableCell className="text-center">
                    {user.customerData?.businessInfo?.companyName || "N/A"}
                </TableCell>
                <TableCell className="text-center">
                    {user.customerData?.businessInfo?.vatNumber || "N/A"}
                </TableCell>
                <TableCell className="text-center">
                    {user.customerData?.businessInfo?.vatNumber || "N/A"}
                </TableCell>
                {showActions && (
                    <TableCell className="text-center">
                        <div className="flex items-center justify-center space-x-2">
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleApprove(user._id)}
                                disabled={actionLoading === user._id}
                                className="text-green-600 hover:text-green-700 hover:bg-green-50 border-green-200"
                            >
                                <Check className="h-4 w-4 mr-1" />
                                {actionLoading === user._id ? "..." : "Approve"}
                            </Button>
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleReject(user._id)}
                                disabled={actionLoading === user._id}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                            >
                                <X className="h-4 w-4 mr-1" />
                                {actionLoading === user._id ? "..." : "Reject"}
                            </Button>
                        </div>
                    </TableCell>
                )}
            </TableRow>
        ));
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-lg">Loading...</div>
            </div>
        );
    }

    return (
        <AdminGuard>
            <Container>
                <div className="space-y-6">
                    <header className="bg-white border-b border-gray-200 px-6 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-8">
                                <h1 className="text-2xl font-bold font-playfair text-gray-900">
                                    MILLENNIUM&nbsp;STAR
                                </h1>
                                <nav className="flex space-x-6">
                                    <a href="/inventory">
                                        <Button
                                            variant="ghost"
                                            className="text-gray-600 hover:text-gray-900"
                                        >
                                            Inventory
                                        </Button>
                                    </a>

                                    {/* Show Admin link only for ADMIN users */}
                                    {user?.role === "ADMIN" && (
                                        <a href="/admin">
                                            <Button
                                                variant="ghost"
                                                className="text-gray-600 hover:text-gray-900"
                                            >
                                                Admin Dashboard
                                            </Button>
                                        </a>
                                    )}

                                    {user?.role === "ADMIN" && (
                                        <Button
                                            variant="ghost"
                                            className="text-gray-600 hover:text-gray-900"
                                            onClick={() =>
                                                router.push(
                                                    "/admin/members-enquiry"
                                                )
                                            }
                                        >
                                            Member Enquiry
                                        </Button>
                                    )}
                                </nav>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                className="bg-gray-900 hover:bg-gray-900 text-white hover:text-white rounded-full space-x-2 flex justify-center"
                            >
                                <div className="h-5 w-5 bg-white/50 hover:bg-white/50 rounded-full"></div>
                                {user?.username || "User"}
                            </Button>
                        </div>
                    </header>

                    {/* Tabs */}
                    <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
                        <Button
                            variant={
                                activeTab === "pending" ? "default" : "ghost"
                            }
                            size="sm"
                            onClick={() => setActiveTab("pending")}
                            className={`${
                                activeTab === "pending"
                                    ? "bg-gray-900 text-white"
                                    : "text-gray-600 hover:text-gray-900"
                            }`}
                        >
                            Waiting Authorization ({pendingUsers.length})
                        </Button>
                        <Button
                            variant={
                                activeTab === "approved" ? "default" : "ghost"
                            }
                            size="sm"
                            onClick={() => setActiveTab("approved")}
                            className={`${
                                activeTab === "approved"
                                    ? "bg-green-600 text-white"
                                    : "text-gray-600 hover:text-gray-900"
                            }`}
                        >
                            Authorized Members ({approvedUsers.length})
                        </Button>
                        <Button
                            variant={
                                activeTab === "rejected" ? "default" : "ghost"
                            }
                            size="sm"
                            onClick={() => setActiveTab("rejected")}
                            className={`${
                                activeTab === "rejected"
                                    ? "bg-red-600 text-white"
                                    : "text-gray-600 hover:text-gray-900"
                            }`}
                        >
                            Rejected Members ({rejectedUsers.length})
                        </Button>
                    </div>

                    {/* Table */}
                    <div className="rounded-lg border bg-white">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gray-50">
                                    <TableHead className="text-center">
                                        Sr.
                                    </TableHead>
                                    <TableHead className="text-center">
                                        ID (Password)
                                    </TableHead>
                                    <TableHead className="text-center">
                                        Name (Company)
                                    </TableHead>
                                    <TableHead className="text-center">
                                        VAT Number
                                    </TableHead>
                                    <TableHead className="text-center">
                                        Username
                                    </TableHead>
                                    <TableHead className="text-center">
                                        Email Address
                                    </TableHead>
                                    <TableHead className="text-center">
                                        Phone Number
                                    </TableHead>
                                    <TableHead className="text-center">
                                        Company Name
                                    </TableHead>
                                    <TableHead className="text-center">
                                        Business Type
                                    </TableHead>
                                    <TableHead className="text-center">
                                        TAX Number
                                    </TableHead>
                                    {activeTab === "pending" && (
                                        <TableHead className="text-center">
                                            Actions
                                        </TableHead>
                                    )}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {activeTab === "pending" &&
                                    renderUserRows(pendingUsers, true)}
                                {activeTab === "approved" &&
                                    renderUserRows(approvedUsers, false)}
                                {activeTab === "rejected" &&
                                    renderUserRows(rejectedUsers, false)}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Status Badge */}
                    <div className="flex justify-between items-center text-sm text-gray-600">
                        <div>
                            {activeTab === "pending" &&
                                `Showing ${pendingUsers.length} pending users`}
                            {activeTab === "approved" &&
                                `Showing ${approvedUsers.length} approved users`}
                            {activeTab === "rejected" &&
                                `Showing ${rejectedUsers.length} rejected users`}
                        </div>
                        <div className="text-xs text-gray-500">
                            Last updated: {new Date().toLocaleTimeString()}
                        </div>
                    </div>
                </div>
            </Container>
        </AdminGuard>
    );
}
