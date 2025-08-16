"use client";

import React, { useState } from "react";
import { ClientFilterSidebar } from "@/components/inventory/client-filter-sidebar";
import { ClientDiamondTable } from "@/components/inventory/client-diamond-table";
import { ClientDiamondGrid } from "@/components/inventory/client-diamond-grid";
import { AppliedFilters } from "@/components/inventory/applied-filters";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClientFilters } from "@/types/client/diamond";
import { useClientDiamonds } from "@/hooks/client-table/use-client-diamonds";
import { Download, Grid3X3, Table as TableIcon } from "lucide-react";
import { InventoryGuard } from "@/components/auth/routeGuard"; // Updated import
import { UserStatusHandler } from "@/components/auth/statusGuard";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import Navbar from "@/components/landing/header";

export default function ClientPage() {
    const { user } = useAuth(); // Get user for conditional rendering
    const router = useRouter();
    const {
        diamonds,
        filterOptions,
        pagination,
        loading,
        error,
        searchDiamonds,
        resetFilters,
        currentFilters,
    } = useClientDiamonds();

    const [filters, setFilters] = useState<ClientFilters>({});
    const [searchTerm, setSearchTerm] = useState("");
    const [view, setView] = useState<"table" | "grid">("table");

    const handleFiltersChange = (newFilters: ClientFilters) => {
        console.log("Filter change received:", newFilters); // Add this for debugging
        setFilters(newFilters);
    };

    const handleSearch = async (searchFilters?: ClientFilters) => {
        const filtersToUse = searchFilters || {
            ...filters,
            searchTerm: searchTerm || filters.searchTerm,
        };

        console.log("Searching with filters:", filtersToUse); // Add this for debugging
        await searchDiamonds(filtersToUse, 1);
    };

    const handleReset = async () => {
        setFilters({});
        setSearchTerm("");
        await resetFilters();
    };

    const handlePageChange = async (page: number) => {
        await searchDiamonds(currentFilters, page);
    };

    const handleRemoveFilter = (key: keyof ClientFilters, value?: string) => {
        const newFilters = { ...filters };

        if (key === "priceMax") {
            // Remove price max filter and reset min to range minimum
            delete newFilters.priceMax;
            delete newFilters.priceMin;
        } else if (key === "caratMax") {
            // Remove carat max filter and reset min to range minimum
            delete newFilters.caratMax;
            delete newFilters.caratMin;
        } else if (key === "discountMax") {
            // Remove discount max filter and reset min to range minimum
            delete newFilters.discountMax;
            delete newFilters.discountMin;
        } else if (key === "rapListMax") {
            // Remove rap list max filter and reset min to range minimum
            delete newFilters.rapListMax;
            delete newFilters.rapListMin;
        } else if (Array.isArray(newFilters[key]) && value) {
            // Remove specific value from array
            const arrayFilter = newFilters[key] as string[];
            const updatedArray = arrayFilter.filter((item) => item !== value);
            if (updatedArray.length === 0) {
                delete newFilters[key];
            } else {
                newFilters[key] = updatedArray as any;
            }
        } else {
            // Remove the entire filter
            delete newFilters[key];
        }

        setFilters(newFilters);

        // Auto-search with updated filters
        searchDiamonds(newFilters, 1);
    };

    // Handle clearing all filters
    const handleClearAllFilters = () => {
        setFilters({});
        setSearchTerm("");
        resetFilters();
    };

    const exportData = () => {
        const csvContent = diamonds
            .map((diamond) => Object.values(diamond).join(","))
            .join("\n");

        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "diamonds.csv";
        a.click();
    };

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h3 className="text-lg font-semibold text-red-600">
                        Error Loading Diamonds
                    </h3>
                    <p className="text-gray-600 mt-2">{error}</p>
                    <Button onClick={resetFilters} className="mt-4">
                        Retry
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <InventoryGuard>
            <UserStatusHandler>
                <div className="min-h-screen bg-gray-50">
                    <div className="flex">
                        {/* Filter Sidebar */}
                        <ClientFilterSidebar
                            filters={filters}
                            onFiltersChange={handleFiltersChange}
                            filterOptions={filterOptions}
                            onSearch={handleSearch} // Make sure this accepts the filters parameter
                            onReset={handleReset}
                            loading={loading}
                        />

                        {/* Main Content */}
                        <div className="flex-1 p-6">
                            {/* Top Controls */}
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center space-x-4">
                                    <Tabs
                                        value={view}
                                        onValueChange={(v) =>
                                            setView(v as "table" | "grid")
                                        }
                                    >
                                        <TabsList className="bg-gray-100">
                                            <TabsTrigger
                                                value="table"
                                                className="flex items-center space-x-2"
                                            >
                                                <TableIcon className="w-4 h-4" />
                                                <span>Table View</span>
                                            </TabsTrigger>
                                            <TabsTrigger
                                                value="grid"
                                                className="flex items-center space-x-2"
                                            >
                                                <Grid3X3 className="w-4 h-4" />
                                                <span>Grid View</span>
                                            </TabsTrigger>
                                        </TabsList>
                                    </Tabs>

                                    <div className="flex items-center space-x-2">
                                        <Input
                                            placeholder="Search by Diamond ID, Shape, Color, Clarity, etc."
                                            value={searchTerm}
                                            onChange={(e) =>
                                                setSearchTerm(e.target.value)
                                            }
                                            onKeyPress={(e) =>
                                                e.key === "Enter" &&
                                                handleSearch()
                                            }
                                            className="w-96"
                                        />
                                        <Button
                                            onClick={() => {
                                                handleSearch();
                                            }}
                                            disabled={loading}
                                        >
                                            Search
                                        </Button>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Button
                                        variant="outline"
                                        onClick={exportData}
                                    >
                                        <Download className="w-4 h-4 mr-2" />
                                        Export Current View
                                    </Button>
                                </div>
                            </div>

                            {/* Applied Filters */}
                            <AppliedFilters
                                filters={currentFilters}
                                onRemoveFilter={handleRemoveFilter}
                                onClearAll={handleClearAllFilters}
                            />

                            {/* Diamond Display - Conditional based on view */}
                            {view === "table" ? (
                                <ClientDiamondTable
                                    diamonds={diamonds}
                                    loading={loading}
                                    pagination={pagination}
                                    onPageChange={handlePageChange}
                                />
                            ) : (
                                <ClientDiamondGrid
                                    diamonds={diamonds}
                                    loading={loading}
                                    pagination={pagination}
                                    onPageChange={handlePageChange}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </UserStatusHandler>
        </InventoryGuard>
    );
}
