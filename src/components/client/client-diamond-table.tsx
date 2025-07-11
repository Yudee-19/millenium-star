// src/components/client/client-diamond-table.tsx
"use client";

import React from "react";
import { ClientDiamond } from "@/types/client/diamond";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ClientDiamondTableProps {
    diamonds: ClientDiamond[];
    loading: boolean;
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export function ClientDiamondTable({
    diamonds,
    loading,
    currentPage,
    totalPages,
    onPageChange,
}: ClientDiamondTableProps) {
    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (diamonds.length === 0) {
        return (
            <div className="flex items-center justify-center h-64 text-gray-500">
                No diamonds found matching your criteria.
            </div>
        );
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("en-US").format(price);
    };

    return (
        <div className="space-y-4">
            <div className="rounded-lg border border-gray-200 bg-white">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-50">
                            <TableHead className="text-xs font-medium text-gray-700">
                                Stone ID
                            </TableHead>
                            <TableHead className="text-xs font-medium text-gray-700">
                                Shape
                            </TableHead>
                            <TableHead className="text-xs font-medium text-gray-700">
                                Carat
                            </TableHead>
                            <TableHead className="text-xs font-medium text-gray-700">
                                Color
                            </TableHead>
                            <TableHead className="text-xs font-medium text-gray-700">
                                Clarity
                            </TableHead>
                            <TableHead className="text-xs font-medium text-gray-700">
                                Cut
                            </TableHead>
                            <TableHead className="text-xs font-medium text-gray-700">
                                Polish
                            </TableHead>
                            <TableHead className="text-xs font-medium text-gray-700">
                                Symmetry
                            </TableHead>
                            <TableHead className="text-xs font-medium text-gray-700">
                                Fluorescence
                            </TableHead>
                            <TableHead className="text-xs font-medium text-gray-700">
                                Lab
                            </TableHead>
                            <TableHead className="text-xs font-medium text-gray-700">
                                Certificate
                            </TableHead>
                            <TableHead className="text-xs font-medium text-gray-700">
                                Price
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {diamonds.map((diamond) => (
                            <TableRow
                                key={diamond._id}
                                className="hover:bg-gray-50"
                            >
                                <TableCell className="text-sm">
                                    {diamond._id.slice(-8)}
                                </TableCell>
                                <TableCell className="text-sm">
                                    {diamond.shape || "N/A"}
                                </TableCell>
                                <TableCell className="text-sm">
                                    {diamond.carat}
                                </TableCell>
                                <TableCell className="text-sm">
                                    {diamond.color}
                                </TableCell>
                                <TableCell className="text-sm">
                                    {diamond.clarity}
                                </TableCell>
                                <TableCell className="text-sm">
                                    {diamond.cut}
                                </TableCell>
                                <TableCell className="text-sm">
                                    {diamond.polish}
                                </TableCell>
                                <TableCell className="text-sm">
                                    {diamond.symmetry}
                                </TableCell>
                                <TableCell className="text-sm">
                                    {diamond.fluorescence}
                                </TableCell>
                                <TableCell className="text-sm">
                                    {diamond.lab || "N/A"}
                                </TableCell>
                                <TableCell className="text-sm font-mono">
                                    {diamond.certificateNumber}
                                </TableCell>
                                <TableCell className="text-sm font-semibold">
                                    {formatPrice(diamond.price)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-2">
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage <= 1}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>

                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        const page = i + 1;
                        return (
                            <Button
                                key={page}
                                variant={
                                    currentPage === page ? "default" : "outline"
                                }
                                size="sm"
                                onClick={() => onPageChange(page)}
                                className="w-8"
                            >
                                {page}
                            </Button>
                        );
                    })}

                    {totalPages > 5 && (
                        <>
                            <span className="text-sm text-gray-500">...</span>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onPageChange(totalPages)}
                                className="w-8"
                            >
                                {totalPages}
                            </Button>
                        </>
                    )}

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage >= totalPages}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>

                <div className="text-sm text-gray-500">
                    Page {currentPage} of {totalPages}
                </div>
            </div>
        </div>
    );
}
