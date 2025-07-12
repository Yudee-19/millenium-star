"use client";

import React, { useState } from "react";
import { ClientFilterSidebar } from "@/components/client/client-filter-sidebar";
import { ClientDiamondTable } from "@/components/client/client-diamond-table";
import { ClientDiamondGrid } from "@/components/client/client-diamond-grid";
import { AppliedFilters } from "@/components/client/applied-filters";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClientFilters } from "@/types/client/diamond";
import { useClientDiamonds } from "@/hooks/client/use-client-diamonds";
import { Download, Grid3X3, Table as TableIcon } from "lucide-react";

export default function ClientPage() {
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

    const handleSearch = async () => {
        const searchFilters = {
            ...filters,
            searchTerm: searchTerm || filters.searchTerm,
        };

        await searchDiamonds(searchFilters, 1);
    };

    const handleReset = async () => {
        setFilters({});
        setSearchTerm("");
        await resetFilters();
    };

    const handleFiltersChange = (newFilters: ClientFilters) => {
        setFilters(newFilters);
    };

    const handlePageChange = async (page: number) => {
        await searchDiamonds(currentFilters, page);
    };

    // Handle removing individual filters - updated for max-only filters
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
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-8">
                        <h1 className="text-2xl font-bold font-playfair text-gray-900">
                            DIAMOND ELITE
                        </h1>
                        <nav className="flex space-x-6">
                            <Button
                                variant="ghost"
                                className="text-gray-600 hover:text-gray-900"
                            >
                                Inventory
                            </Button>
                            <Button
                                variant="ghost"
                                className="text-gray-600 hover:text-gray-900"
                            >
                                Offer Enquiry
                            </Button>
                            <Button
                                variant="ghost"
                                className="text-gray-600 hover:text-gray-900"
                            >
                                Member Enquiry
                            </Button>
                            <Button
                                variant="ghost"
                                className="text-gray-600 hover:text-gray-900"
                            >
                                My Account
                            </Button>
                        </nav>
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        className="bg-gray-900 hover:bg-gray-900 text-white hover:text-white rounded-full space-x-2 flex justify-center"
                    >
                        <div className="h-5 w-5 bg-white/50 hover:bg-white/50 rounded-full"></div>
                        John Doe
                    </Button>
                </div>
            </header>

            <div className="flex">
                {/* Filter Sidebar */}
                <ClientFilterSidebar
                    filters={filters}
                    onFiltersChange={handleFiltersChange}
                    filterOptions={filterOptions}
                    onSearch={handleSearch}
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
                                        e.key === "Enter" && handleSearch()
                                    }
                                    className="w-96"
                                />
                                <Button
                                    onClick={handleSearch}
                                    disabled={loading}
                                >
                                    Search
                                </Button>
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Button variant="outline" onClick={exportData}>
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
    );
}
