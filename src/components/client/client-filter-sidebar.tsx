// src/components/client/client-filter-sidebar.tsx
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ClientFilters, FilterOptions } from "@/types/client/diamond";
import { Search, RotateCcw } from "lucide-react";

interface ClientFilterSidebarProps {
    filters: ClientFilters;
    onFiltersChange: (filters: ClientFilters) => void;
    filterOptions: FilterOptions;
    onSearch: (filters: ClientFilters) => void; // Updated to pass filters
    onReset: () => void;
    loading?: boolean;
}

export function ClientFilterSidebar({
    filters,
    onFiltersChange,
    filterOptions,
    onSearch,
    onReset,
    loading = false,
}: ClientFilterSidebarProps) {
    const updateFilter = (key: keyof ClientFilters, value: any) => {
        const newFilters = {
            ...filters,
            [key]: value,
        };
        onFiltersChange(newFilters);
    };

    const updateArrayFilter = (
        key: keyof ClientFilters,
        value: string,
        checked: boolean
    ) => {
        const currentValues = (filters[key] as string[]) || [];
        const newValues = checked
            ? [...currentValues, value]
            : currentValues.filter((v) => v !== value);

        updateFilter(key, newValues.length > 0 ? newValues : undefined);
    };

    const handleSearch = () => {
        onSearch(filters); // Pass current filters to search
    };

    const shapes = [
        { value: "RBC", label: "Round", icon: "●" },
        { value: "PRN", label: "Princess", icon: "◆" },
        { value: "EMD", label: "Emerald", icon: "▬" },
        { value: "ASS", label: "Asscher", icon: "⬜" },
        { value: "CUS", label: "Cushion", icon: "◈" },
        { value: "OVL", label: "Oval", icon: "⬭" },
        { value: "RAD", label: "Radiant", icon: "⬜" },
        { value: "PER", label: "Pear", icon: "💧" },
        { value: "MQS", label: "Marquise", icon: "◊" },
        { value: "HRT", label: "Heart", icon: "♥" },
    ];

    return (
        <div className="w-72 bg-gray-50 p-6 border-r border-gray-200 overflow-y-auto h-screen">
            <div className="space-y-6">
                {/* Shape */}
                <div>
                    <Label className="text-sm font-medium mb-3 block text-gray-700">
                        SHAPE
                    </Label>
                    <div className="grid grid-cols-5 gap-2">
                        {shapes.map((shape) => (
                            <div
                                key={shape.value}
                                className="flex flex-col items-center"
                            >
                                <div className="relative">
                                    <Checkbox
                                        id={`shape-${shape.value}`}
                                        checked={(filters.shape || []).includes(
                                            shape.value
                                        )}
                                        onCheckedChange={(checked) =>
                                            updateArrayFilter(
                                                "shape",
                                                shape.value,
                                                checked as boolean
                                            )
                                        }
                                        className="sr-only"
                                    />
                                    <label
                                        htmlFor={`shape-${shape.value}`}
                                        className={`w-8 h-8 border-2 rounded cursor-pointer flex items-center justify-center text-lg transition-colors ${
                                            (filters.shape || []).includes(
                                                shape.value
                                            )
                                                ? "border-blue-500 bg-blue-50 text-blue-600"
                                                : "border-gray-300 hover:border-gray-400"
                                        }`}
                                    >
                                        {shape.icon}
                                    </label>
                                </div>
                                <Label
                                    htmlFor={`shape-${shape.value}`}
                                    className="text-xs text-center cursor-pointer mt-1"
                                >
                                    {shape.label}
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Size Range */}
                <div>
                    <Label className="text-sm font-medium mb-3 block text-gray-700">
                        SIZE RANGE
                    </Label>
                    <div className="flex gap-2">
                        <Input
                            type="number"
                            placeholder="Min"
                            step="0.01"
                            value={filters.caratMin || ""}
                            onChange={(e) =>
                                updateFilter(
                                    "caratMin",
                                    e.target.value
                                        ? parseFloat(e.target.value)
                                        : undefined
                                )
                            }
                            className="text-sm"
                        />
                        <Input
                            type="number"
                            placeholder="Max"
                            step="0.01"
                            value={filters.caratMax || ""}
                            onChange={(e) =>
                                updateFilter(
                                    "caratMax",
                                    e.target.value
                                        ? parseFloat(e.target.value)
                                        : undefined
                                )
                            }
                            className="text-sm"
                        />
                    </div>
                </div>

                {/* Price Range */}
                <div>
                    <Label className="text-sm font-medium mb-3 block text-gray-700">
                        PRICE RANGE
                    </Label>
                    <div className="flex gap-2">
                        <Input
                            type="number"
                            placeholder="Min"
                            value={filters.priceMin || ""}
                            onChange={(e) =>
                                updateFilter(
                                    "priceMin",
                                    e.target.value
                                        ? parseInt(e.target.value)
                                        : undefined
                                )
                            }
                            className="text-sm"
                        />
                        <Input
                            type="number"
                            placeholder="Max"
                            value={filters.priceMax || ""}
                            onChange={(e) =>
                                updateFilter(
                                    "priceMax",
                                    e.target.value
                                        ? parseInt(e.target.value)
                                        : undefined
                                )
                            }
                            className="text-sm"
                        />
                    </div>
                </div>

                {/* Color */}
                {/* <div>
                    <Label className="text-sm font-medium mb-3 block text-gray-700">
                        COLOR
                    </Label>
                    <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                            <Checkbox id="white-diamonds" />
                            <Label htmlFor="white-diamonds" className="text-sm">
                                White Diamonds
                            </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="fancy-diamonds" />
                            <Label htmlFor="fancy-diamonds" className="text-sm">
                                Fancy Diamonds
                            </Label>
                        </div>
                    </div>

                    <div className="mt-3">
                        <Label className="text-xs text-gray-500 mb-2 block">
                            COLOR GRADE
                        </Label>
                        <div className="grid grid-cols-7 gap-1">
                            {["D", "E", "F", "G", "H", "I", "J"].map(
                                (color) => (
                                    <div key={color} className="text-center">
                                        <Checkbox
                                            id={`color-${color}`}
                                            checked={(
                                                filters.color || []
                                            ).includes(color)}
                                            onCheckedChange={(checked) =>
                                                updateArrayFilter(
                                                    "color",
                                                    color,
                                                    checked as boolean
                                                )
                                            }
                                        />
                                        <Label
                                            htmlFor={`color-${color}`}
                                            className="text-xs block mt-1 cursor-pointer"
                                        >
                                            {color}
                                        </Label>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div> */}

                {/* Clarity */}
                <div>
                    <Label className="text-sm font-medium mb-3 block text-gray-700">
                        CLARITY
                    </Label>
                    <div className="grid grid-cols-4 gap-2">
                        {[
                            "FL",
                            "IF",
                            "VVS1",
                            "VVS2",
                            "VS1",
                            "VS2",
                            "SI1",
                            "SI2",
                        ].map((clarity) => (
                            <div key={clarity} className="text-center">
                                <Checkbox
                                    id={`clarity-${clarity}`}
                                    checked={(filters.clarity || []).includes(
                                        clarity
                                    )}
                                    onCheckedChange={(checked) =>
                                        updateArrayFilter(
                                            "clarity",
                                            clarity,
                                            checked as boolean
                                        )
                                    }
                                />
                                <Label
                                    htmlFor={`clarity-${clarity}`}
                                    className="text-xs block mt-1 cursor-pointer"
                                >
                                    {clarity}
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Fluorescence */}
                <div>
                    <Label className="text-sm font-medium mb-3 block text-gray-700">
                        FLUORESCENCE
                    </Label>
                    <div className="space-y-1">
                        {[
                            "NON",
                            "FAINT",
                            "MEDIUM",
                            "STRONG",
                            "VERY STRONG",
                        ].map((fluo) => (
                            <div
                                key={fluo}
                                className="flex items-center space-x-2"
                            >
                                <Checkbox
                                    id={`fluo-${fluo}`}
                                    checked={(
                                        filters.fluorescence || []
                                    ).includes(fluo)}
                                    onCheckedChange={(checked) =>
                                        updateArrayFilter(
                                            "fluorescence",
                                            fluo,
                                            checked as boolean
                                        )
                                    }
                                />
                                <Label
                                    htmlFor={`fluo-${fluo}`}
                                    className="text-xs cursor-pointer"
                                >
                                    {fluo}
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Search By */}
                <div>
                    <Label className="text-sm font-medium mb-3 block text-gray-700">
                        SEARCH BY:
                    </Label>
                    <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                            <Checkbox id="stone-id" />
                            <Label htmlFor="stone-id" className="text-sm">
                                STONE ID
                            </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="cert-no" />
                            <Label htmlFor="cert-no" className="text-sm">
                                CERT NO
                            </Label>
                        </div>
                    </div>
                    <Input
                        placeholder="Enter search term"
                        value={filters.searchTerm || ""}
                        onChange={(e) =>
                            updateFilter(
                                "searchTerm",
                                e.target.value || undefined
                            )
                        }
                        className="mt-2 text-sm"
                    />
                </div>

                {/* Cut */}
                <div>
                    <Label className="text-sm font-medium mb-3 block text-gray-700">
                        CUT
                    </Label>
                    <Select
                        value={filters.cut?.[0] || ""}
                        onValueChange={(value) =>
                            updateFilter("cut", value ? [value] : undefined)
                        }
                    >
                        <SelectTrigger className="text-sm">
                            <SelectValue placeholder="Select grade" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="EX">Excellent</SelectItem>
                            <SelectItem value="VG">Very Good</SelectItem>
                            <SelectItem value="G">Good</SelectItem>
                            <SelectItem value="F">Fair</SelectItem>
                            <SelectItem value="P">Poor</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Polish */}
                <div>
                    <Label className="text-sm font-medium mb-3 block text-gray-700">
                        POLISH
                    </Label>
                    <Select
                        value={filters.polish?.[0] || ""}
                        onValueChange={(value) =>
                            updateFilter("polish", value ? [value] : undefined)
                        }
                    >
                        <SelectTrigger className="text-sm">
                            <SelectValue placeholder="Select grade" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="EX">Excellent</SelectItem>
                            <SelectItem value="VG">Very Good</SelectItem>
                            <SelectItem value="G">Good</SelectItem>
                            <SelectItem value="F">Fair</SelectItem>
                            <SelectItem value="P">Poor</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Symmetry */}
                <div>
                    <Label className="text-sm font-medium mb-3 block text-gray-700">
                        SYMMETRY
                    </Label>
                    <Select
                        value={filters.symmetry?.[0] || ""}
                        onValueChange={(value) =>
                            updateFilter(
                                "symmetry",
                                value ? [value] : undefined
                            )
                        }
                    >
                        <SelectTrigger className="text-sm">
                            <SelectValue placeholder="Select grade" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="EX">Excellent</SelectItem>
                            <SelectItem value="VG">Very Good</SelectItem>
                            <SelectItem value="G">Good</SelectItem>
                            <SelectItem value="F">Fair</SelectItem>
                            <SelectItem value="P">Poor</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Lab */}
                <div>
                    <Label className="text-sm font-medium mb-3 block text-gray-700">
                        LOCATION
                    </Label>
                    <div className="grid grid-cols-2 gap-2">
                        {["GIA", "HRD", "IGI", "GCAL"].map((lab) => (
                            <div
                                key={lab}
                                className="flex items-center space-x-2"
                            >
                                <Checkbox
                                    id={`lab-${lab}`}
                                    checked={(filters.lab || []).includes(lab)}
                                    onCheckedChange={(checked) =>
                                        updateArrayFilter(
                                            "lab",
                                            lab,
                                            checked as boolean
                                        )
                                    }
                                />
                                <Label
                                    htmlFor={`lab-${lab}`}
                                    className="text-xs cursor-pointer"
                                >
                                    {lab}
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-2 pt-4">
                    <Button
                        onClick={handleSearch}
                        disabled={loading}
                        className="flex-1 text-sm"
                    >
                        <Search className="w-4 h-4 mr-2" />
                        {loading ? "SEARCHING..." : "SEARCH"}
                    </Button>
                    <Button
                        variant="outline"
                        onClick={onReset}
                        className="flex-1 text-sm"
                    >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        RESET
                    </Button>
                </div>
            </div>
        </div>
    );
}
