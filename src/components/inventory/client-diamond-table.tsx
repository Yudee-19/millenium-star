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
import { useRouter } from "next/navigation";
import { DiamondImage } from "../diamond-image";
import { ClientTableColumnHeader } from "./client-table-column-header";
import { ClientPagination } from "./client-pagination";

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
    onPageSizeChange?: (pageSize: number) => void;
    onSortChange?: (sorting: { id: string; desc: boolean }[]) => void;
    currentSorting?: { id: string; desc: boolean }[];
}

export function ClientDiamondTable({
    diamonds,
    loading,
    pagination,
    onPageChange,
    onPageSizeChange,
    onSortChange,
    currentSorting = [],
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

    return (
        <div className="space-y-4">
            <div className="rounded-lg border border-gray-200 bg-white overflow-scroll">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-200">
                            <TableHead className="text-xs font-medium text-gray-700 text-left pl-3">
                                <ClientTableColumnHeader
                                    title="Img."
                                    canSort={false}
                                />
                            </TableHead>
                            <TableHead className="text-xs font-medium text-gray-700 text-center">
                                <ClientTableColumnHeader
                                    title="Diamond Id."
                                    sortKey="certificateNumber"
                                    currentSorting={currentSorting}
                                    onSortChange={onSortChange}
                                />
                            </TableHead>
                            <TableHead className="text-xs font-medium text-gray-700 text-center">
                                <ClientTableColumnHeader
                                    title="Shape"
                                    sortKey="shape"
                                    currentSorting={currentSorting}
                                    onSortChange={onSortChange}
                                />
                            </TableHead>
                            <TableHead className="text-xs font-medium  text-gray-700 text-center">
                                <ClientTableColumnHeader
                                    title="Color"
                                    sortKey="color"
                                    currentSorting={currentSorting}
                                    onSortChange={onSortChange}
                                />
                            </TableHead>
                            <TableHead className="text-xs font-medium text-gray-700 text-center">
                                <ClientTableColumnHeader
                                    title="Clarity"
                                    sortKey="clarity"
                                    currentSorting={currentSorting}
                                    onSortChange={onSortChange}
                                />
                            </TableHead>
                            <TableHead className="text-xs font-medium text-gray-700 text-center">
                                <ClientTableColumnHeader
                                    title="Cut"
                                    sortKey="cut"
                                    currentSorting={currentSorting}
                                    onSortChange={onSortChange}
                                />
                            </TableHead>
                            <TableHead className="text-xs font-medium text-gray-700 text-center">
                                <ClientTableColumnHeader
                                    title="Size (in ct.)"
                                    sortKey="size"
                                    currentSorting={currentSorting}
                                    onSortChange={onSortChange}
                                />
                            </TableHead>
                            <TableHead className="text-xs font-medium text-gray-700 text-center">
                                <ClientTableColumnHeader
                                    title="Polish"
                                    sortKey="polish"
                                    currentSorting={currentSorting}
                                    onSortChange={onSortChange}
                                />
                            </TableHead>
                            <TableHead className="text-xs font-medium text-gray-700 text-center">
                                <ClientTableColumnHeader
                                    title="Symmetry"
                                    sortKey="symmetry"
                                    currentSorting={currentSorting}
                                    onSortChange={onSortChange}
                                />
                            </TableHead>
                            <TableHead className="text-xs font-medium text-gray-700 text-center">
                                <ClientTableColumnHeader
                                    title="Fluorescence"
                                    sortKey="fluorescenceColor"
                                    currentSorting={currentSorting}
                                    onSortChange={onSortChange}
                                />
                            </TableHead>
                            <TableHead className="text-xs font-medium text-gray-700 text-center">
                                <ClientTableColumnHeader
                                    title="Lab"
                                    sortKey="laboratory"
                                    currentSorting={currentSorting}
                                    onSortChange={onSortChange}
                                />
                            </TableHead>
                            <TableHead className="text-xs font-medium text-gray-700 text-center">
                                <ClientTableColumnHeader
                                    title="Price"
                                    sortKey="price"
                                    currentSorting={currentSorting}
                                    onSortChange={onSortChange}
                                />
                            </TableHead>
                            <TableHead className="text-xs font-medium text-gray-700 text-center">
                                <ClientTableColumnHeader
                                    title="Rap List"
                                    sortKey="rapList"
                                    currentSorting={currentSorting}
                                    onSortChange={onSortChange}
                                />
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {diamonds.map((diamond: ClientDiamond) => (
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
                                    {diamond.certificateNumber || "-"}
                                </TableCell>
                                <TableCell className="text-sm">
                                    {diamond.shape || "-"}
                                </TableCell>
                                <TableCell className="text-sm ">
                                    {diamond.color || "-"}
                                </TableCell>
                                <TableCell className="text-sm">
                                    {diamond.clarity || "-"}
                                </TableCell>
                                <TableCell className="text-sm">
                                    {diamond.cut || "-"}
                                </TableCell>
                                <TableCell className="text-sm">
                                    {diamond.size || "-"}
                                </TableCell>
                                <TableCell className="text-sm">
                                    {diamond.polish || "-"}
                                </TableCell>
                                <TableCell className="text-sm">
                                    {diamond.symmetry || "-"}
                                </TableCell>
                                <TableCell className="text-sm">
                                    {diamond.fluorescenceColor || "-"}
                                </TableCell>
                                <TableCell className="text-sm">
                                    {diamond.laboratory || "-"}
                                </TableCell>
                                <TableCell className="text-sm font-semibold">
                                    {"$ " + formatPrice(diamond.price) || "-"}
                                </TableCell>
                                <TableCell className="text-sm font-semibold">
                                    {"$ " + formatPrice(diamond.rapList) || "-"}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <ClientPagination
                pagination={pagination}
                onPageChange={onPageChange}
                onPageSizeChange={onPageSizeChange}
                pageSizeOptions={[10, 20, 30, 50, 100]}
            />
        </div>
    );
}
