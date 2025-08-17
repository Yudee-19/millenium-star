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
import { ChevronLeft, ChevronRight, Diamond } from "lucide-react";
import { useRouter } from "next/navigation";
import { DiamondImage } from "../diamond-image";

interface PaginationData {
    currentPage: number;
    totalPages: number;
    totalRecords: number;
    recordsPerPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}

interface ClientDiamondTableProps {
    diamonds: ClientDiamond[];
    loading: boolean;
    pagination: PaginationData;
    onPageChange: (page: number) => void;
}

export function ClientDiamondTable({
    diamonds,
    loading,
    pagination,
    onPageChange,
}: ClientDiamondTableProps) {
    const router = useRouter();
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

    const renderPaginationButtons = () => {
        const buttons = [];
        const { currentPage, totalPages } = pagination;

        // Show first page
        if (currentPage > 3) {
            buttons.push(
                <Button
                    key={1}
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(1)}
                    className="w-8"
                >
                    1
                </Button>
            );

            if (currentPage > 4) {
                buttons.push(
                    <span key="dots1" className="text-sm text-gray-500">
                        ...
                    </span>
                );
            }
        }

        // Show pages around current page
        for (
            let i = Math.max(1, currentPage - 2);
            i <= Math.min(totalPages, currentPage + 2);
            i++
        ) {
            buttons.push(
                <Button
                    key={i}
                    variant={currentPage === i ? "default" : "outline"}
                    size="sm"
                    onClick={() => onPageChange(i)}
                    className="w-8"
                >
                    {i}
                </Button>
            );
        }

        // Show last page
        if (currentPage < totalPages - 2) {
            if (currentPage < totalPages - 3) {
                buttons.push(
                    <span key="dots2" className="text-sm text-gray-500">
                        ...
                    </span>
                );
            }

            buttons.push(
                <Button
                    key={totalPages}
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(totalPages)}
                    className="w-8"
                >
                    {totalPages}
                </Button>
            );
        }

        return buttons;
    };

    return (
        <div className="space-y-4">
            {/* Results Summary */}
            <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                    Showing{" "}
                    {(pagination.currentPage - 1) * pagination.recordsPerPage +
                        1}
                    -
                    {Math.min(
                        pagination.currentPage * pagination.recordsPerPage,
                        pagination.totalRecords
                    )}{" "}
                    of {pagination.totalRecords} diamonds
                </div>
                <div className="text-sm text-gray-600">
                    Page {pagination.currentPage} of {pagination.totalPages}
                </div>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white overflow-scroll">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-200">
                            <TableHead className="text-xs font-medium text-gray-700 text-left pl-3">
                                Img.
                            </TableHead>
                            <TableHead className="text-xs font-medium text-gray-700 text-center">
                                Diamond Id.
                            </TableHead>
                            <TableHead className="text-xs font-medium text-gray-700 text-center">
                                Shape
                            </TableHead>
                            <TableHead className="text-xs font-medium  text-gray-700 text-center">
                                Color
                            </TableHead>
                            <TableHead className="text-xs font-medium text-gray-700 text-center">
                                Clarity
                            </TableHead>
                            <TableHead className="text-xs font-medium text-gray-700 text-center">
                                Cut
                            </TableHead>
                            <TableHead className="text-xs font-medium text-gray-700 text-center">
                                Polish
                            </TableHead>
                            <TableHead className="text-xs font-medium text-gray-700 text-center">
                                Symmetry
                            </TableHead>
                            <TableHead className="text-xs font-medium text-gray-700 text-center">
                                Fluorescence
                            </TableHead>
                            <TableHead className="text-xs font-medium text-gray-700 text-center">
                                Lab
                            </TableHead>
                            {/* <TableHead className="text-xs font-medium text-gray-700 text-center">
                                Stone Id
                            </TableHead> */}
                            <TableHead className="text-xs font-medium text-gray-700 text-center">
                                Price
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {diamonds.map((diamond: any) => (
                            <TableRow
                                key={diamond._id}
                                className="hover:bg-gray-50 hover:cursor-pointer text-center odd:bg-white even:bg-gray-100"
                                onClick={() =>
                                    router.push(`/${diamond.certificateNumber}`)
                                }
                            >
                                <TableCell className="text-sm font-mono">
                                    <DiamondImage
                                        certificateNumber={diamond._id}
                                        size={60}
                                    />
                                </TableCell>
                                <TableCell className="text-sm font-mono">
                                    {diamond.certificateNumber ||
                                        diamond["CERT-NO"] ||
                                        "-"}
                                </TableCell>
                                <TableCell className="text-sm">
                                    {diamond.shape || diamond["Shape"] || "-"}
                                </TableCell>
                                <TableCell className="text-sm ">
                                    {diamond.color || diamond["Color"] || "-"}
                                </TableCell>
                                <TableCell className="text-sm">
                                    {diamond.clarity ||
                                        diamond["Clarity"] ||
                                        "-"}
                                </TableCell>
                                <TableCell className="text-sm">
                                    {diamond.cut || diamond["Cut"] || "-"}
                                </TableCell>
                                <TableCell className="text-sm">
                                    {diamond.polish || diamond["Polish"] || "-"}
                                </TableCell>
                                <TableCell className="text-sm">
                                    {diamond.symmetry || diamond["sym"] || "-"}
                                </TableCell>
                                <TableCell className="text-sm">
                                    {diamond.fluorescence ||
                                        diamond["FLOU"] ||
                                        "-"}
                                </TableCell>
                                <TableCell className="text-sm">
                                    {diamond.lab || diamond["LAB"] || "-"}
                                </TableCell>
                                {/* <TableCell className="text-sm">
                                    {diamond._id.slice(-8)}
                                </TableCell> */}
                                <TableCell className="text-sm font-semibold">
                                    {"$ " + formatPrice(diamond.price) || "-"}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-2 pb-15">
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onPageChange(pagination.currentPage - 1)}
                        disabled={!pagination.hasPrevPage}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>

                    {renderPaginationButtons()}

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onPageChange(pagination.currentPage + 1)}
                        disabled={!pagination.hasNextPage}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>

                <div className="text-sm text-gray-500">
                    Total: {pagination.totalRecords} diamonds
                </div>
            </div>
        </div>
    );
}
