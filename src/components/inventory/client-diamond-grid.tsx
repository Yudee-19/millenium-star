"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ClientDiamond } from "@/types/client/diamond";
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

interface ClientDiamondGridProps {
    diamonds: ClientDiamond[];
    loading: boolean;
    pagination: PaginationData;
    onPageChange: (page: number) => void;
}

export function ClientDiamondGrid({
    diamonds,
    loading,
    pagination,
    onPageChange,
}: ClientDiamondGridProps) {
    const router = useRouter();
    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, index) => (
                    <Card key={index} className="animate-pulse">
                        <CardContent className="p-4">
                            <div className="aspect-square bg-gray-200 rounded-lg mb-3"></div>
                            <div className="space-y-2">
                                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                                <div className="h-6 bg-gray-200 rounded w-full"></div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    }

    if (diamonds.length === 0) {
        return (
            <div className="flex items-center justify-center h-64 text-gray-500">
                <div className="text-center">
                    <div className="text-4xl mb-4">💎</div>
                    <p className="text-lg font-medium">No diamonds found</p>
                    <p className="text-sm">Try adjusting your filters</p>
                </div>
            </div>
        );
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(price);
    };

    const getCutGrade = (cut: string) => {
        const cutMap: { [key: string]: string } = {
            EX: "Excellent",
            VG: "Very Good",
            G: "Good",
            F: "Fair",
            P: "Poor",
        };
        return cutMap[cut] || cut;
    };

    const getCutColor = (cut: string) => {
        const colorMap: { [key: string]: string } = {
            EX: "bg-green-100 text-green-800",
            VG: "bg-blue-100 text-blue-800",
            G: "bg-yellow-100 text-yellow-800",
            F: "bg-orange-100 text-orange-800",
            P: "bg-red-100 text-red-800",
        };
        return colorMap[cut] || "bg-gray-100 text-gray-800";
    };

    const renderPaginationButtons = () => {
        const buttons = [];
        const { currentPage, totalPages } = pagination;

        // Previous button
        buttons.push(
            <Button
                key="prev"
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={!pagination.hasPrevPage}
                className="mr-2"
            >
                Previous
            </Button>
        );

        // Page numbers (simplified for grid view)
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                buttons.push(
                    <Button
                        key={i}
                        variant={currentPage === i ? "default" : "outline"}
                        size="sm"
                        onClick={() => onPageChange(i)}
                        className="mx-1"
                    >
                        {i}
                    </Button>
                );
            }
        } else {
            // Show first page, current page area, and last page
            buttons.push(
                <Button
                    key={1}
                    variant={currentPage === 1 ? "default" : "outline"}
                    size="sm"
                    onClick={() => onPageChange(1)}
                    className="mx-1"
                >
                    1
                </Button>
            );

            if (currentPage > 3) {
                buttons.push(
                    <span key="dots1" className="mx-2 text-gray-500">
                        ...
                    </span>
                );
            }

            for (
                let i = Math.max(2, currentPage - 1);
                i <= Math.min(totalPages - 1, currentPage + 1);
                i++
            ) {
                buttons.push(
                    <Button
                        key={i}
                        variant={currentPage === i ? "default" : "outline"}
                        size="sm"
                        onClick={() => onPageChange(i)}
                        className="mx-1"
                    >
                        {i}
                    </Button>
                );
            }

            if (currentPage < totalPages - 2) {
                buttons.push(
                    <span key="dots2" className="mx-2 text-gray-500">
                        ...
                    </span>
                );
            }

            if (totalPages > 1) {
                buttons.push(
                    <Button
                        key={totalPages}
                        variant={
                            currentPage === totalPages ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => onPageChange(totalPages)}
                        className="mx-1"
                    >
                        {totalPages}
                    </Button>
                );
            }
        }

        // Next button
        buttons.push(
            <Button
                key="next"
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={!pagination.hasNextPage}
                className="ml-2"
            >
                Next
            </Button>
        );

        return buttons;
    };

    return (
        <div className="space-y-6">
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

            {/* Diamond Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {diamonds.map((diamond: any) => (
                    <Card
                        key={diamond._id}
                        className="hover:shadow-lg cursor-pointer transition-shadow duration-200 border h-fit border-gray-200"
                        onClick={() =>
                            router.push(`/${diamond.certificateNumber}`)
                        }
                    >
                        <CardContent className="p-4">
                            {/* Image Placeholder */}
                            <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-3 flex items-center justify-center">
                                <DiamondImage
                                    certificateNumber={diamond._id}
                                    className="w-full aspect-square object-cover"
                                />
                            </div>

                            {/* Diamond Details */}
                            <div className="space-y-2">
                                {/* Color and Clarity */}
                                <div className="flex justify-between items-center">
                                    <div className="text-sm font-medium text-gray-700">
                                        Color:{" "}
                                        <span className="font-bold">
                                            {diamond.color ||
                                                diamond["Color"] ||
                                                "-"}
                                        </span>
                                    </div>
                                    <div className="text-sm font-medium text-gray-700">
                                        {" "}
                                        <span className="font-bold">
                                            {diamond.shape ||
                                                diamond["Shape"] ||
                                                "-"}
                                        </span>
                                    </div>
                                </div>
                                {/* Cut Grade */}
                                {/* <div className="flex justify-center">
                                    <Badge
                                        className={`text-xs ${getCutColor(
                                            diamond.cut || diamond["Cut"] || ""
                                        )}`}
                                    >
                                        {getCutGrade(
                                            diamond.cut || diamond["Cut"] || "-"
                                        )}
                                    </Badge>
                                </div> */}

                                {/* Price */}
                                <div className="text-center">
                                    <div className="text-lg font-bold text-gray-900">
                                        {formatPrice(diamond.price || 0)}
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                {/* <div className="flex gap-2 pt-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="flex-1 text-xs"
                                    >
                                        View Product
                                    </Button>
                                    <Button
                                        variant="default"
                                        size="sm"
                                        className="flex-1 text-xs bg-blue-600 hover:bg-blue-700"
                                    >
                                        Contact Seller
                                    </Button>
                                </div> */}

                                {/* Certificate Info */}
                                <div className="text-xs text-gray-500 text-center pt-1">
                                    ID: {diamond.certificateNumber}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between pt-4 pb-15">
                <div className="text-sm text-gray-500">
                    Total: {pagination.totalRecords} diamonds
                </div>
                <div className="flex items-center">
                    {renderPaginationButtons()}
                </div>
            </div>
        </div>
    );
}
