// src/app/client/page.tsx
"use client";

import React, { useState } from "react";
import { ClientFilterSidebar } from "@/components/client/client-filter-sidebar";
import { ClientDiamondTable } from "@/components/client/client-diamond-table";
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
        loading,
        error,
        searchDiamonds,
        resetFilters,
    } = useClientDiamonds();

    const [filters, setFilters] = useState<ClientFilters>({});
    const [searchTerm, setSearchTerm] = useState("");
    const [view, setView] = useState<"table" | "grid">("table");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 100;

    const totalPages = Math.ceil(diamonds.length / itemsPerPage);
    const paginatedDiamonds = diamonds.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleSearch = async () => {
        const searchFilters = {
            ...filters,
            searchTerm: searchTerm || filters.searchTerm,
        };

        await searchDiamonds(searchFilters);
        setCurrentPage(1);
    };

    const handleReset = async () => {
        setFilters({});
        setSearchTerm("");
        setCurrentPage(1);
        await resetFilters();
    };

    const handleFiltersChange = (newFilters: ClientFilters) => {
        setFilters(newFilters);
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
                        className="bg-gray-900 hover:bg-gray-900 text-white  hover:text-white rounded-full space-x-2 flex justify-center"
                    >
                        <div className="h-5 w-5 bg-white/50 hover:bg-white/50  rounded-full"></div>
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

                    {/* Results Summary */}
                    <div className="mb-4">
                        <p className="text-sm text-gray-600">
                            Showing {paginatedDiamonds.length} of{" "}
                            {diamonds.length} diamonds
                            {Object.keys(filters).length > 0 && " (filtered)"}
                        </p>
                    </div>

                    {/* Diamond Table */}
                    <ClientDiamondTable
                        diamonds={paginatedDiamonds}
                        loading={loading}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </div>
            </div>
        </div>
    );
}
