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
import { Badge } from "../ui/badge";

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
                            {/* Shape Header */}
                            <TableHead className="text-xs font-medium text-gray-700 text-center">
                                <ClientTableColumnHeader
                                    title="Shape"
                                    sortKey="shape"
                                    currentSorting={currentSorting}
                                    onSortChange={onSortChange}
                                />
                            </TableHead>
                            {/* CertficateNumber Header */}
                            <TableHead className="text-xs font-medium text-gray-700 text-center">
                                <ClientTableColumnHeader
                                    title="Diamond Id."
                                    sortKey="certificateNumber"
                                    currentSorting={currentSorting}
                                    onSortChange={onSortChange}
                                />
                            </TableHead>
                            {/* Size Header */}
                            <TableHead className="text-xs font-medium text-gray-700 text-center">
                                <ClientTableColumnHeader
                                    title="Size (in ct.)"
                                    sortKey="size"
                                    currentSorting={currentSorting}
                                    onSortChange={onSortChange}
                                />
                            </TableHead>
                            {/* Color Header */}
                            <TableHead className="text-xs font-medium  text-gray-700 text-center">
                                <ClientTableColumnHeader
                                    title="Color"
                                    sortKey="color"
                                    currentSorting={currentSorting}
                                    onSortChange={onSortChange}
                                />
                            </TableHead>
                            {/* Clarity Header */}
                            <TableHead className="text-xs font-medium text-gray-700 text-center">
                                <ClientTableColumnHeader
                                    title="Clarity"
                                    sortKey="clarity"
                                    currentSorting={currentSorting}
                                    onSortChange={onSortChange}
                                />
                            </TableHead>
                            {/* Cut Header */}
                            <TableHead className="text-xs font-medium text-gray-700 text-center">
                                <ClientTableColumnHeader
                                    title="Cut"
                                    sortKey="cut"
                                    currentSorting={currentSorting}
                                    onSortChange={onSortChange}
                                />
                            </TableHead>
                            {/* Symmetry Header */}
                            <TableHead className="text-xs font-medium text-gray-700 text-center">
                                <ClientTableColumnHeader
                                    title="Symmetry"
                                    sortKey="symmetry"
                                    currentSorting={currentSorting}
                                    onSortChange={onSortChange}
                                />
                            </TableHead>
                            {/* Polish Header */}
                            <TableHead className="text-xs font-medium text-gray-700 text-center">
                                <ClientTableColumnHeader
                                    title="Polish"
                                    sortKey="polish"
                                    currentSorting={currentSorting}
                                    onSortChange={onSortChange}
                                />
                            </TableHead>
                            {/* Fluorescence Header */}
                            <TableHead className="text-xs font-medium text-gray-700 text-center">
                                <ClientTableColumnHeader
                                    title="Fluo. Intensity"
                                    sortKey="fluorescenceIntensity"
                                    currentSorting={currentSorting}
                                    onSortChange={onSortChange}
                                />
                            </TableHead>
                            {/* Laboratory Header */}
                            <TableHead className="text-xs font-medium text-gray-700 text-center">
                                <ClientTableColumnHeader
                                    title="Lab"
                                    sortKey="laboratory"
                                    currentSorting={currentSorting}
                                    onSortChange={onSortChange}
                                />
                            </TableHead>
                            {/* Table Header */}
                            <TableHead className="text-xs font-medium text-gray-700 text-center">
                                <ClientTableColumnHeader
                                    title="Table"
                                    sortKey="table"
                                    currentSorting={currentSorting}
                                    onSortChange={onSortChange}
                                />
                            </TableHead>
                            {/* Total Depth Header */}
                            <TableHead className="text-xs font-medium text-gray-700 text-center">
                                <ClientTableColumnHeader
                                    title="Total Depth"
                                    sortKey="totalDepth"
                                    currentSorting={currentSorting}
                                    onSortChange={onSortChange}
                                />
                            </TableHead>
                            {/* RapList Header */}
                            <TableHead className="text-xs font-medium text-gray-700 text-center">
                                <ClientTableColumnHeader
                                    title="Rap List"
                                    sortKey="rapList"
                                    currentSorting={currentSorting}
                                    onSortChange={onSortChange}
                                />
                            </TableHead>
                            {/* Discount Header */}
                            <TableHead className="text-xs font-medium text-gray-700 text-center">
                                <ClientTableColumnHeader
                                    title="Discount"
                                    sortKey="discount"
                                    currentSorting={currentSorting}
                                    onSortChange={onSortChange}
                                />
                            </TableHead>
                            {/* Price per Carat Header */}
                            <TableHead className="text-xs font-medium text-gray-700 text-center">
                                <ClientTableColumnHeader
                                    title="Price/Ct."
                                    sortKey="pricePerCarat"
                                    currentSorting={currentSorting}
                                    onSortChange={onSortChange}
                                />
                            </TableHead>
                            {/* Length Header */}
                            <TableHead className="text-xs font-medium text-gray-700 text-center">
                                <ClientTableColumnHeader
                                    title="Length"
                                    sortKey="length"
                                    currentSorting={currentSorting}
                                    onSortChange={onSortChange}
                                />
                            </TableHead>
                            {/* Width Header */}
                            <TableHead className="text-xs font-medium text-gray-700 text-center">
                                <ClientTableColumnHeader
                                    title="Width"
                                    sortKey="width"
                                    currentSorting={currentSorting}
                                    onSortChange={onSortChange}
                                />
                            </TableHead>
                            {/* Total depth Header */}
                            <TableHead className="text-xs font-medium text-gray-700 text-center">
                                <ClientTableColumnHeader
                                    title="Total Depth"
                                    sortKey="totalDepth"
                                    currentSorting={currentSorting}
                                    onSortChange={onSortChange}
                                />
                            </TableHead>
                            {/* Price Header */}
                            <TableHead className="text-xs font-medium text-gray-700 text-center">
                                <ClientTableColumnHeader
                                    title="Price"
                                    sortKey="price"
                                    currentSorting={currentSorting}
                                    onSortChange={onSortChange}
                                />
                            </TableHead>
                            {/* Availability Header */}
                            <TableHead className="text-xs font-medium text-gray-700 text-center">
                                <ClientTableColumnHeader
                                    title="Availability"
                                    sortKey="isAvailable"
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
                                    <div className="aspect-square w-15 mx-auto">
                                        <DiamondImage
                                            certificateNumber={diamond._id}
                                            size={100}
                                        />
                                    </div>
                                </TableCell>
                                <TableCell className="text-sm">
                                    {diamond.shape || "-"}
                                </TableCell>
                                <TableCell className="text-sm font-mono">
                                    {diamond.certificateNumber || "-"}
                                </TableCell>
                                <TableCell className="text-sm">
                                    {diamond.size || "-"}
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
                                    {diamond.symmetry || "-"}
                                </TableCell>

                                <TableCell className="text-sm">
                                    {diamond.polish || "-"}
                                </TableCell>

                                <TableCell className="text-sm">
                                    {diamond.fluorescenceIntensity || "-"}
                                </TableCell>
                                <TableCell className="text-sm">
                                    {diamond.laboratory || "-"}
                                </TableCell>
                                <TableCell className="text-sm">
                                    {diamond.table
                                        ? diamond.table + " mm"
                                        : "-"}
                                </TableCell>
                                <TableCell className="text-sm">
                                    {diamond.measurements?.depth
                                        ? diamond.measurements.depth + " mm"
                                        : "-"}
                                </TableCell>
                                <TableCell className="text-sm font-semibold">
                                    {"$ " + formatPrice(diamond.rapList) || "-"}
                                </TableCell>
                                <TableCell className="text-sm font-semibold">
                                    {formatPrice(diamond.discount) + "%" || "-"}
                                </TableCell>
                                <TableCell className="text-sm font-semibold">
                                    {"$ " +
                                        formatPrice(diamond.pricePerCarat) ||
                                        "-"}
                                </TableCell>
                                <TableCell className="text-sm font-semibold">
                                    {diamond.measurements?.length
                                        ? diamond.measurements.length + " mm"
                                        : "-"}
                                </TableCell>
                                <TableCell className="text-sm font-semibold">
                                    {diamond.measurements?.width
                                        ? diamond.measurements.width + " mm"
                                        : "-"}
                                </TableCell>
                                <TableCell className="text-sm font-semibold">
                                    {diamond.totalDepth
                                        ? diamond.totalDepth + " %"
                                        : "-"}
                                </TableCell>

                                <TableCell className="text-sm font-semibold">
                                    {"$ " + formatPrice(diamond.price) || "-"}
                                </TableCell>
                                <TableCell className="text-sm font-semibold">
                                    {diamond.isAvailable ? (
                                        <Badge
                                            className={
                                                diamond.isAvailable == "G"
                                                    ? "bg-green-200 text-black"
                                                    : diamond.isAvailable == "S"
                                                    ? "bg-red-200 text-black"
                                                    : diamond.isAvailable == "M"
                                                    ? "bg-yellow-200 text-black"
                                                    : "bg-gray-200 text-black"
                                            }
                                        >
                                            {diamond.isAvailable == "G"
                                                ? "Available"
                                                : diamond.isAvailable == "S"
                                                ? "Sold"
                                                : diamond.isAvailable == "M"
                                                ? "Memo"
                                                : "N/A"}
                                        </Badge>
                                    ) : (
                                        "-"
                                    )}
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
