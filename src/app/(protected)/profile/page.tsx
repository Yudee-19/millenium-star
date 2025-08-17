"use client";

import { InventoryGuard } from "@/components/auth/routeGuard";
import { UserStatusHandler } from "@/components/auth/statusGuard";
import Container from "@/components/ui/container";
import { useAuth } from "@/hooks/useAuth";
import {
    User,
    Mail,
    Phone,
    MapPin,
    Building,
    Globe,
    Calendar,
    CheckCircle,
    XCircle,
    Clock,
    CreditCard,
    Briefcase,
} from "lucide-react";
import React, { useEffect, useState } from "react";

interface UserProfile {
    _id: string;
    username: string;
    email: string;
    role: "USER" | "ADMIN";
    status: "DEFAULT" | "PENDING" | "APPROVED" | "REJECTED";
    customerData?: {
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
            companyName?: string;
            businessType?: string;
            vatNumber?: string;
            websiteUrl?: string;
        };
        submittedAt: string;
    };
    quotations: Array<{
        quotationId: string;
        carat: number;
        noOfPieces: number;
        quotePrice: number;
        status: "PENDING" | "APPROVED" | "REJECTED";
        submittedAt: string;
    }>;
    createdAt: string;
    updatedAt: string;
}

const ProfilePage = () => {
    const { user: authUser, isAuthenticated } = useAuth();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
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
                    throw new Error("Failed to fetch profile");
                }

                const data = await response.json();
                if (data.success) {
                    console.log("Profile data:", data.data.user);
                    setProfile(data.data.user);
                } else {
                    throw new Error(data.message || "Failed to fetch profile");
                }
            } catch (err) {
                setError(
                    err instanceof Error ? err.message : "An error occurred"
                );
            } finally {
                setLoading(false);
            }
        };

        if (isAuthenticated() && profile === null) {
            fetchProfile();
        }
    }, [isAuthenticated]);

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "APPROVED":
                return <CheckCircle className="h-5 w-5 text-green-500" />;
            case "REJECTED":
                return <XCircle className="h-5 w-5 text-red-500" />;
            case "PENDING":
                return <Clock className="h-5 w-5 text-yellow-500" />;
            default:
                return <Clock className="h-5 w-5 text-gray-400" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "APPROVED":
                return "text-green-600 bg-green-50 border-green-200";
            case "REJECTED":
                return "text-red-600 bg-red-50 border-red-200";
            case "PENDING":
                return "text-yellow-600 bg-yellow-50 border-yellow-200";
            default:
                return "text-gray-600 bg-gray-50 border-gray-200";
        }
    };

    if (loading) {
        return (
            <InventoryGuard>
                <UserStatusHandler>
                    <div className="min-h-screen bg-gray-50 py-12">
                        <Container className="max-w-4xl">
                            <div className="bg-white rounded-lg shadow-sm p-8">
                                <div className="animate-pulse">
                                    <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-8"></div>
                                    <div className="space-y-4">
                                        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                                        <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                                        <div className="h-4 bg-gray-200 rounded w-1/4 mt-6"></div>
                                        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                                    </div>
                                </div>
                            </div>
                        </Container>
                    </div>
                </UserStatusHandler>
            </InventoryGuard>
        );
    }

    if (error) {
        return (
            <InventoryGuard>
                <UserStatusHandler>
                    <div className="min-h-screen bg-gray-50 py-12">
                        <Container className="max-w-4xl">
                            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                                <div className="text-red-600 mb-4">
                                    <XCircle className="h-12 w-12 mx-auto" />
                                </div>
                                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                    Error Loading Profile
                                </h2>
                                <p className="text-gray-600">{error}</p>
                            </div>
                        </Container>
                    </div>
                </UserStatusHandler>
            </InventoryGuard>
        );
    }

    if (!profile) {
        return (
            <InventoryGuard>
                <UserStatusHandler>
                    <div className="min-h-screen bg-gray-50 py-12">
                        <Container className="max-w-4xl">
                            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                                <p className="text-gray-600">
                                    No profile data available
                                </p>
                            </div>
                        </Container>
                    </div>
                </UserStatusHandler>
            </InventoryGuard>
        );
    }

    return (
        <InventoryGuard>
            <UserStatusHandler>
                <div className="min-h-screen bg-gray-50 py-12">
                    <Container className="max-w-4xl">
                        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                            {/* Header */}
                            <div className="bg-white px-8 py-6 border-b border-gray-200">
                                <h1 className="text-3xl font-playfair font-semibold text-center text-gray-900">
                                    MY ACCOUNT
                                </h1>
                            </div>

                            {/* Content */}
                            <div className="px-8 py-8">
                                {/* Account Information Card */}
                                <div className="bg-gray-50 rounded-lg p-6 mb-8">
                                    <h2 className="text-xl font-semibold text-gray-900 mb-6">
                                        Account Information
                                    </h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                User Name
                                            </label>
                                            <div className="flex items-center space-x-3">
                                                <User className="h-5 w-5 text-gray-400" />
                                                <span className="text-gray-900 text-lg">
                                                    {profile.username}
                                                </span>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Email ID
                                            </label>
                                            <div className="flex items-center space-x-3">
                                                <Mail className="h-5 w-5 text-gray-400" />
                                                <span className="text-gray-900 text-lg">
                                                    {profile.email}
                                                </span>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Account Status
                                            </label>
                                            <div className="flex items-center space-x-3">
                                                {getStatusIcon(profile.status)}
                                                <span
                                                    className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                                                        profile.status
                                                    )}`}
                                                >
                                                    {profile.status}
                                                </span>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Role
                                            </label>
                                            <div className="flex items-center space-x-3">
                                                <Building className="h-5 w-5 text-gray-400" />
                                                <span className="text-gray-900 text-lg">
                                                    {profile.role}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Personal & Business Information */}
                                {profile.customerData && (
                                    <div className="space-y-8">
                                        {/* Personal Information Card */}
                                        <div className="bg-blue-50 rounded-lg p-6">
                                            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                                                <User className="h-5 w-5 mr-2 text-blue-600" />
                                                Personal Information
                                            </h2>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Full Name
                                                    </label>
                                                    <p className="text-gray-900 text-lg font-medium">
                                                        {
                                                            profile.customerData
                                                                .firstName
                                                        }{" "}
                                                        {
                                                            profile.customerData
                                                                .lastName
                                                        }
                                                    </p>
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Phone Number
                                                    </label>
                                                    <div className="flex items-center space-x-2">
                                                        <Phone className="h-4 w-4 text-gray-400" />
                                                        <p className="text-gray-900 text-lg">
                                                            {
                                                                profile
                                                                    .customerData
                                                                    .countryCode
                                                            }{" "}
                                                            {
                                                                profile
                                                                    .customerData
                                                                    .phoneNumber
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Address Information Card */}
                                        <div className="bg-green-50 rounded-lg p-6">
                                            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                                                <MapPin className="h-5 w-5 mr-2 text-green-600" />
                                                Address Information
                                            </h2>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Complete Address
                                                </label>
                                                <div className="bg-white rounded-md p-4 border border-green-200">
                                                    <p className="text-gray-900 leading-relaxed">
                                                        <span className="block font-medium">
                                                            {
                                                                profile
                                                                    .customerData
                                                                    .address
                                                                    .street
                                                            }
                                                        </span>
                                                        <span className="block">
                                                            {
                                                                profile
                                                                    .customerData
                                                                    .address
                                                                    .city
                                                            }
                                                            ,{" "}
                                                            {
                                                                profile
                                                                    .customerData
                                                                    .address
                                                                    .state
                                                            }{" "}
                                                            {
                                                                profile
                                                                    .customerData
                                                                    .address
                                                                    .postalCode
                                                            }
                                                        </span>
                                                        <span className="block font-medium text-gray-700">
                                                            {
                                                                profile
                                                                    .customerData
                                                                    .address
                                                                    .country
                                                            }
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Business Information Card */}
                                        <div className="bg-purple-50 rounded-lg p-6">
                                            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                                                <Briefcase className="h-5 w-5 mr-2 text-purple-600" />
                                                Business Information
                                            </h2>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                {profile.customerData
                                                    .businessInfo
                                                    ?.companyName && (
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                            Millenium Star
                                                        </label>
                                                        <div className="flex items-center space-x-2">
                                                            <Building className="h-4 w-4 text-gray-400" />
                                                            <p className="text-gray-900 text-lg font-medium">
                                                                {
                                                                    profile
                                                                        .customerData
                                                                        .businessInfo
                                                                        .companyName
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                )}

                                                {profile.customerData
                                                    .businessInfo
                                                    ?.businessType && (
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                            Business Type
                                                        </label>
                                                        <p className="text-gray-900 text-lg">
                                                            {
                                                                profile
                                                                    .customerData
                                                                    .businessInfo
                                                                    .businessType
                                                            }
                                                        </p>
                                                    </div>
                                                )}

                                                {profile.customerData
                                                    .businessInfo
                                                    ?.vatNumber && (
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                            VAT/Tax Number
                                                        </label>
                                                        <div className="flex items-center space-x-2">
                                                            <CreditCard className="h-4 w-4 text-gray-400" />
                                                            <p className="text-gray-900 text-lg font-mono">
                                                                {
                                                                    profile
                                                                        .customerData
                                                                        .businessInfo
                                                                        .vatNumber
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                )}

                                                {profile.customerData
                                                    .businessInfo
                                                    ?.websiteUrl && (
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                            Website
                                                        </label>
                                                        <div className="flex items-center space-x-2">
                                                            <Globe className="h-4 w-4 text-gray-400" />
                                                            <a
                                                                href={
                                                                    profile
                                                                        .customerData
                                                                        .businessInfo
                                                                        .websiteUrl
                                                                }
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-blue-600 hover:text-blue-800 underline"
                                                            >
                                                                {
                                                                    profile
                                                                        .customerData
                                                                        .businessInfo
                                                                        .websiteUrl
                                                                }
                                                            </a>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* KYC Submission Date */}
                                            <div className="mt-6 pt-4 border-t border-purple-200">
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    KYC Submitted On
                                                </label>
                                                <div className="flex items-center space-x-2">
                                                    <Calendar className="h-4 w-4 text-gray-400" />
                                                    <p className="text-gray-900">
                                                        {new Date(
                                                            profile.customerData.submittedAt
                                                        ).toLocaleDateString(
                                                            "en-US",
                                                            {
                                                                year: "numeric",
                                                                month: "long",
                                                                day: "numeric",
                                                                hour: "2-digit",
                                                                minute: "2-digit",
                                                            }
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Show message if no customer data */}
                                {!profile.customerData && (
                                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
                                        <Clock className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                            Complete Your Profile
                                        </h3>
                                        <p className="text-gray-600">
                                            Please complete your KYC
                                            verification to access all features
                                            and view your complete profile
                                            information.
                                        </p>
                                    </div>
                                )}

                                {/* Quotations Section */}
                                {profile.quotations &&
                                    profile.quotations.length > 0 && (
                                        <div className="border-t border-gray-200 pt-8 mt-8">
                                            <h2 className="text-xl font-semibold text-gray-900 mb-6">
                                                My Quotations
                                            </h2>

                                            <div className="space-y-4">
                                                {profile.quotations.map(
                                                    (quotation) => (
                                                        <div
                                                            key={
                                                                quotation.quotationId
                                                            }
                                                            className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                                                        >
                                                            <div className="flex items-center justify-between mb-2">
                                                                <span className="text-sm font-medium text-gray-700">
                                                                    Quotation
                                                                    ID:{" "}
                                                                    {
                                                                        quotation.quotationId
                                                                    }
                                                                </span>
                                                                <div className="flex items-center space-x-2">
                                                                    {getStatusIcon(
                                                                        quotation.status
                                                                    )}
                                                                    <span
                                                                        className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(
                                                                            quotation.status
                                                                        )}`}
                                                                    >
                                                                        {
                                                                            quotation.status
                                                                        }
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                                                <div>
                                                                    <span className="text-gray-600">
                                                                        Carat:
                                                                    </span>
                                                                    <span className="ml-2 font-medium">
                                                                        {
                                                                            quotation.carat
                                                                        }
                                                                    </span>
                                                                </div>
                                                                <div>
                                                                    <span className="text-gray-600">
                                                                        Pieces:
                                                                    </span>
                                                                    <span className="ml-2 font-medium">
                                                                        {
                                                                            quotation.noOfPieces
                                                                        }
                                                                    </span>
                                                                </div>
                                                                <div>
                                                                    <span className="text-gray-600">
                                                                        Quote
                                                                        Price:
                                                                    </span>
                                                                    <span className="ml-2 font-medium">
                                                                        $
                                                                        {quotation.quotePrice.toLocaleString()}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="mt-2 text-xs text-gray-500">
                                                                Submitted:{" "}
                                                                {new Date(
                                                                    quotation.submittedAt
                                                                ).toLocaleDateString()}
                                                            </div>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    )}

                                {/* Account Details */}
                                <div className="border-t border-gray-200 pt-8 mt-8">
                                    <h2 className="text-xl font-semibold text-gray-900 mb-6">
                                        Account Timeline
                                    </h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="bg-gray-50 rounded-lg p-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Member Since
                                            </label>
                                            <div className="flex items-center space-x-2">
                                                <Calendar className="h-4 w-4 text-gray-400" />
                                                <p className="text-gray-900 font-medium">
                                                    {new Date(
                                                        profile.createdAt
                                                    ).toLocaleDateString(
                                                        "en-US",
                                                        {
                                                            year: "numeric",
                                                            month: "long",
                                                            day: "numeric",
                                                        }
                                                    )}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="bg-gray-50 rounded-lg p-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Last Updated
                                            </label>
                                            <div className="flex items-center space-x-2">
                                                <Calendar className="h-4 w-4 text-gray-400" />
                                                <p className="text-gray-900 font-medium">
                                                    {new Date(
                                                        profile.updatedAt
                                                    ).toLocaleDateString(
                                                        "en-US",
                                                        {
                                                            year: "numeric",
                                                            month: "long",
                                                            day: "numeric",
                                                        }
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Container>
                </div>
            </UserStatusHandler>
        </InventoryGuard>
    );
};

export default ProfilePage;
