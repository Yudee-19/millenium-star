"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Container from "@/components/ui/container";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { RequestQuoteModal } from "@/components/modals/request-quote-modal";
import { DiamondImage } from "@/components/diamond-image";

interface Diamond {
    rapList: number;
    certificateNumber: string;
    shape: string;
    size: number;
    color: string;
    clarity: string;
    cut: string;
    polish: string;
    symmetry: string;
    fluorescence: string;
    laboratory: string;
    price: number;
    discount?: number;
    isAvailable: boolean;
    measurements?: {
        length: number;
        width: number;
        depth: number;
    };
    fancyColor: string;
    fancyColorOvertone: string;
    fancyColorIntensity: string;
    depth?: number;
    table?: number;
    girdle?: string;
    culet?: string;
    length?: number;
    width?: number;
    height?: number;
}

interface ApiResponse {
    data: Diamond[];
    totalRecords: number;
    currentPage: number;
    totalPages: number;
    recordsPerPage: number;
}

export default function DiamondDetailPage() {
    const params = useParams();
    const diamondId = params.diamondId as string;

    const [diamond, setDiamond] = useState<Diamond | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

    useEffect(() => {
        const fetchDiamond = async () => {
            try {
                setLoading(true);
                const baseURL =
                    process.env.NEXT_PUBLIC_API_BASE_URL ||
                    "https://diamond-inventory.onrender.com";
                const response = await fetch(
                    `${baseURL}/api/diamonds/search?searchTerm=${diamondId}`
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch diamond details");
                }

                const data: ApiResponse = await response.json();

                if (data.data && data.data.length > 0) {
                    setDiamond(data.data[0]);
                } else {
                    setError("Diamond not found");
                }
            } catch (err) {
                setError(
                    err instanceof Error ? err.message : "An error occurred"
                );
            } finally {
                setLoading(false);
            }
        };

        if (diamondId) {
            fetchDiamond();
        }
    }, [diamondId]);

    const handleRequestQuote = () => {
        setIsQuoteModalOpen(true);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Container>
                    <div className="py-8">
                        <Skeleton className="h-4 w-64 mb-6" />
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <Skeleton className="h-96 w-full" />
                            <div className="space-y-4">
                                <Skeleton className="h-8 w-48" />
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-6 w-24" />
                                <Skeleton className="h-32 w-full" />
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    if (error || !diamond) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h3 className="text-lg font-semibold text-red-600">
                        {error || "Diamond not found"}
                    </h3>
                    <p className="text-gray-600 mt-2">
                        The diamond with ID "{diamondId}" could not be found.
                    </p>
                    <Button
                        onClick={() => window.history.back()}
                        className="mt-4"
                    >
                        Go Back
                    </Button>
                </div>
            </div>
        );
    }

    const discountedPrice = diamond.discount
        ? diamond.price * (1 - diamond.discount / 100)
        : diamond.price;

    return (
        <div className="min-h-screen bg-gray-50">
            <Container>
                <div className="py-8">
                    {/* Diamond Details */}

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sticky top-30 ">
                        {/* Diamond Image/Visual */}
                        <div className="relative">
                            <div className="bg-white rounded-lg shadow-sm sticky top-30">
                                <div className="aspect-square bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg flex items-center justify-center">
                                    <DiamondImage
                                        certificateNumber={
                                            diamond.certificateNumber
                                        }
                                        className="w-full"
                                        clickable
                                    />
                                </div>
                            </div>
                        </div>
                        {/* Diamond Information */}
                        <div className="space-y-3">
                            {/* Header */}
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                    {diamond.shape} Diamond
                                </h1>
                                <p className="text-gray-600">
                                    Certificate Number:{" "}
                                    {diamond.certificateNumber}
                                </p>
                                <div className="flex items-center gap-2 mt-2">
                                    <Badge
                                        variant={
                                            diamond.isAvailable
                                                ? "default"
                                                : "secondary"
                                        }
                                        className={"bg-gray-900"}
                                    >
                                        {diamond.isAvailable
                                            ? "Available"
                                            : "Unavailable"}
                                    </Badge>
                                </div>
                            </div>

                            {/* Price */}
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="flex items-center gap-3">
                                    {diamond.discount ? (
                                        <>
                                            <span className="text-2xl font-bold text-gray-600">
                                                $
                                                {discountedPrice.toLocaleString()}
                                            </span>
                                            <span className="text-lg text-gray-500 line-through">
                                                $
                                                {diamond.rapList.toLocaleString()}
                                            </span>
                                            <Badge variant="outline">
                                                {diamond.discount}% OFF
                                            </Badge>
                                        </>
                                    ) : (
                                        <span className="text-2xl font-bold text-gray-900">
                                            ${diamond.price.toLocaleString()}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Specifications */}
                            <h1 className="text-lg font-semibold pl-1">
                                Specifications
                            </h1>
                            <Card className="py-3 px-0">
                                <CardContent className="py-0 px-0">
                                    <div className="flex flex-col text-base">
                                        <div className="flex justify-between px-5 items-center py-4 border-b border-gray-100">
                                            <span className="text-gray-600 font-bold">
                                                Carat:
                                            </span>
                                            <span className="font-normal text-gray-400">
                                                {diamond.size} ct
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center px-5 py-4 border-b border-gray-100">
                                            <span className="text-gray-600 font-bold">
                                                Color:
                                            </span>
                                            <span className="font-normal text-gray-400">
                                                {diamond.color}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center px-5 py-4 border-b border-gray-100">
                                            <span className="text-gray-600 font-bold">
                                                Clarity:
                                            </span>
                                            <span className="font-normal text-gray-400">
                                                {diamond.clarity}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center px-5 py-4 border-b border-gray-100">
                                            <span className="text-gray-600 font-bold">
                                                Cut:
                                            </span>
                                            <span className="font-normal text-gray-400">
                                                {diamond.cut}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center px-5 py-4 border-b border-gray-100">
                                            <span className="text-gray-600 font-bold">
                                                Polish:
                                            </span>
                                            <span className="font-normal text-gray-400">
                                                {diamond.polish}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center px-5 py-4 border-b border-gray-100">
                                            <span className="text-gray-600 font-bold">
                                                Symmetry:
                                            </span>
                                            <span className="font-normal text-gray-400">
                                                {diamond.symmetry}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center px-5 py-4 border-b border-gray-100">
                                            <span className="text-gray-600 font-bold">
                                                Fluorescence:
                                            </span>
                                            <span className="font-normal text-gray-400">
                                                {diamond.fluorescence}
                                            </span>
                                        </div>

                                        <div className="flex justify-between items-center px-5 py-4 border-b border-gray-100">
                                            <span className="text-gray-600 font-bold">
                                                Fancy Color:
                                            </span>
                                            <span className="font-normal text-gray-400">
                                                {diamond.fancyColor}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center px-5 py-4 border-b border-gray-100">
                                            <span className="text-gray-600 font-bold">
                                                Fancy Color Intensity:
                                            </span>
                                            <span className="font-normal text-gray-400">
                                                {diamond.fancyColorIntensity}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center px-5 py-4 border-b border-gray-100">
                                            <span className="text-gray-600 font-bold">
                                                Fancy Color Overtone:
                                            </span>
                                            <span className="font-normal text-gray-400">
                                                {diamond.fancyColorOvertone}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center px-5 py-4 border-b border-gray-100">
                                            <span className="text-gray-600 font-bold">
                                                Laboratory:
                                            </span>
                                            <span className="font-normal text-gray-400">
                                                {diamond.laboratory}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center px-5 py-4 border-b border-gray-100">
                                            <span className="text-gray-600 font-bold">
                                                Length:
                                            </span>
                                            <span className="font-normal text-gray-400">
                                                {diamond.measurements?.length}{" "}
                                                mm
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center px-5 py-4 border-b border-gray-100">
                                            <span className="text-gray-600 font-bold">
                                                Width:
                                            </span>
                                            <span className="font-normal text-gray-400">
                                                {diamond.measurements?.width} mm
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center px-5 py-4 border-b border-gray-100">
                                            <span className="text-gray-600 font-bold">
                                                Depth:
                                            </span>
                                            <span className="font-normal text-gray-400">
                                                {diamond.measurements?.depth} mm
                                            </span>
                                        </div>
                                        {/* {diamond.measurements && (
                                            <div className="flex justify-between items-center px-5 py-4 border-b border-gray-100 col-span-2">
                                                <span className="text-gray-600 font-bold">
                                                    Measurements:
                                                </span>
                                                <span className="font-normal text-gray-400">
                                                    {
                                                        diamond.measurements
                                                            .length
                                                    }{" "}
                                                    x{" "}
                                                    {diamond.measurements.width}{" "}
                                                    x{" "}
                                                    {diamond.measurements.depth}
                                                </span>
                                            </div>
                                        )} */}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Action Buttons */}
                            <div className="flex gap-3">
                                <Button
                                    className="flex-1 bg-gray-700 hover:bg-gray-900"
                                    disabled={!diamond.isAvailable}
                                    onClick={handleRequestQuote}
                                >
                                    {diamond.isAvailable
                                        ? "Request Quote"
                                        : "Not Available"}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Learn More Section */}
                <div className="mt-12 text-center">
                    <p className="text-gray-600 mb-4">
                        Want to learn more about diamond quality and
                        characteristics?
                    </p>
                    <Button variant="outline" asChild>
                        <a href="/diamond-knowledge">Learn about Diamonds</a>
                    </Button>
                </div>
            </Container>

            {/* Request Quote Modal */}
            <RequestQuoteModal
                isOpen={isQuoteModalOpen}
                onClose={() => setIsQuoteModalOpen(false)}
                diamond={diamond}
            />
        </div>
    );
}
