"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ClientFilters, FilterOptions } from "@/types/client/diamond";
import { Search, RotateCcw, ChevronDown, ChevronUp } from "lucide-react";
import {
    shape_options,
    color_options,
    clarity_options,
    cut_options,
    polish_options,
    symmetry_options,
    lab_options,
} from "@/components/filters/diamond-filters";

interface ClientFilterSidebarProps {
    filters: ClientFilters;
    onFiltersChange: (filters: ClientFilters) => void;
    filterOptions: FilterOptions;
    onSearch: (filters: ClientFilters) => void;
    onReset: () => void;
    loading?: boolean;
}

export function ClientFilterSidebar({
    filters,
    onFiltersChange,
    onSearch,
    onReset,
    loading = false,
}: ClientFilterSidebarProps) {
    const [expandedSections, setExpandedSections] = useState<{
        [key: string]: boolean;
    }>({
        shape: false,
        color: false,
        clarity: false,
        lab: false,
    });

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
        onSearch(filters);
    };

    const toggleSection = (section: string) => {
        setExpandedSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    // Helper function to get SVG image path for shapes
    const getShapeImage = (shapeValue: string) => {
        const shapeMap: { [key: string]: string } = {
            RBC: "round.svg",
            EMD: "emerald.svg",
            PRS: "princess.svg",
            PRN: "princess.svg", // Alternative code for princess
            ASS: "asscher.svg",
            CUS: "cushion.svg",
            CUB: "cushion.svg", // Cushion Brilliant
            CUM: "cushion.svg", // Cushion Modified
            OVL: "oval.svg",
            HRT: "heart.svg",
            MQS: "marquise.svg",
            BAG: "baguette.svg",
            TBG: "tapered.svg", // Updated to tapered.svg
            RAD: "radiant.svg",
            PR: "pear.svg",
            SQR: "square.svg",
            TRL: "trilliant.svg",
        };

        const fileName = shapeMap[shapeValue];
        return fileName ? `/assets/diamondShapes/${fileName}` : null;
    };

    // Helper function to render items with view more/less functionality
    const renderItemsWithViewMore = (
        items: any[],
        sectionKey: string,
        renderItem: (item: any) => React.ReactNode,
        itemsPerRow: number = 4
    ) => {
        const isExpanded = expandedSections[sectionKey];
        const visibleItems = isExpanded ? items : items.slice(0, 10);
        const hasMore = items.length > 10;

        return (
            <>
                <div
                    className={`grid gap-2`}
                    style={{
                        gridTemplateColumns: `repeat(4, 1fr)`,
                    }}
                >
                    {visibleItems.map((item) => renderItem(item))}
                </div>
                {hasMore && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleSection(sectionKey)}
                        className="w-full mt-2 text-xs text-gray-600 hover:text-gray-800"
                    >
                        {isExpanded ? (
                            <>
                                <ChevronUp className="w-3 h-3 mr-1" />
                                View Less
                            </>
                        ) : (
                            <>
                                <ChevronDown className="w-3 h-3 mr-1" />
                                View More ({items.length - 10} more)
                            </>
                        )}
                    </Button>
                )}
            </>
        );
    };

    return (
        <div className="w-72 bg-gray-50 p-6 border-r border-gray-200 overflow-y-auto h-screen">
            <div className="space-y-6">
                {/* Shape */}
                <div>
                    <Label className="text-sm font-medium mb-3 block text-gray-700">
                        SHAPE
                    </Label>
                    {renderItemsWithViewMore(
                        shape_options,
                        "shape",
                        (shape) => (
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
                                        className={`w-8 h-8 border-2 rounded cursor-pointer flex items-center justify-center transition-colors ${
                                            (filters.shape || []).includes(
                                                shape.value
                                            )
                                                ? "border-black "
                                                : "border-gray-300 hover:border-gray-400"
                                        }`}
                                    >
                                        {getShapeImage(shape.value) ? (
                                            <img
                                                src={
                                                    getShapeImage(shape.value)!
                                                }
                                                alt={shape.label}
                                                className="w-10 h-10 pt-1 object-contain"
                                                onError={(e) => {
                                                    // Fallback to text if image not found
                                                    const target =
                                                        e.currentTarget as HTMLImageElement;
                                                    target.style.display =
                                                        "none";
                                                    const parent =
                                                        target.parentElement;
                                                    if (parent) {
                                                        const fallback =
                                                            parent.querySelector(
                                                                ".fallback-text"
                                                            ) as HTMLElement;
                                                        if (fallback) {
                                                            fallback.style.display =
                                                                "block";
                                                        }
                                                    }
                                                }}
                                            />
                                        ) : null}
                                        <span
                                            className="text-xs fallback-text"
                                            style={{
                                                display: getShapeImage(
                                                    shape.value
                                                )
                                                    ? "none"
                                                    : "block",
                                            }}
                                        >
                                            {shape.value}
                                        </span>
                                    </label>
                                </div>
                                <Label
                                    htmlFor={`shape-${shape.value}`}
                                    className="text-xs text-center cursor-pointer mt-1"
                                >
                                    {shape.label}
                                </Label>
                            </div>
                        ),
                        5
                    )}
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
                <div>
                    <Label className="text-sm font-medium mb-3 block text-gray-700">
                        COLOR
                    </Label>
                    {renderItemsWithViewMore(
                        color_options,
                        "color",
                        (color) => (
                            <div key={color.value} className="text-center">
                                <Checkbox
                                    id={`color-${color.value}`}
                                    checked={(filters.color || []).includes(
                                        color.value
                                    )}
                                    onCheckedChange={(checked) =>
                                        updateArrayFilter(
                                            "color",
                                            color.value,
                                            checked as boolean
                                        )
                                    }
                                />
                                <Label
                                    htmlFor={`color-${color.value}`}
                                    className="text-xs block mt-1 cursor-pointer"
                                >
                                    {color.value}
                                </Label>
                            </div>
                        ),
                        7
                    )}
                </div>
                {/* Clarity */}
                <div>
                    <Label className="text-sm font-medium mb-3 block text-gray-700">
                        CLARITY
                    </Label>
                    {renderItemsWithViewMore(
                        clarity_options,
                        "clarity",
                        (clarity) => (
                            <div key={clarity.value} className="text-center">
                                <Checkbox
                                    id={`clarity-${clarity.value}`}
                                    checked={(filters.clarity || []).includes(
                                        clarity.value
                                    )}
                                    onCheckedChange={(checked) =>
                                        updateArrayFilter(
                                            "clarity",
                                            clarity.value,
                                            checked as boolean
                                        )
                                    }
                                />
                                <Label
                                    htmlFor={`clarity-${clarity.value}`}
                                    className="text-xs block mt-1 cursor-pointer"
                                >
                                    {clarity.value}
                                </Label>
                            </div>
                        ),
                        4
                    )}
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
                            <Checkbox id="diamond-id" />
                            <Label htmlFor="diamond-id" className="text-sm">
                                DIAMOND ID
                            </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="cert-no" />
                            <Label htmlFor="cert-no" className="text-sm">
                                CERT NO
                            </Label>
                        </div>
                    </div>
                    {/* <Input
                        placeholder="Enter search term"
                        value={filters.searchTerm || ""}
                        onChange={(e) =>
                            updateFilter(
                                "searchTerm",
                                e.target.value || undefined
                            )
                        }
                        className="mt-2 text-sm"
                    /> */}
                </div>
                {/* Cut */}
                <div>
                    <Label className="text-sm font-medium mb-3 block text-gray-700">
                        CUT
                    </Label>
                    {renderItemsWithViewMore(
                        cut_options,
                        "cut",
                        (cut) => (
                            <div
                                key={cut.value}
                                className="flex items-center space-x-2"
                            >
                                <Checkbox
                                    id={`cut-${cut.value}`}
                                    checked={(filters.cut || []).includes(
                                        cut.value
                                    )}
                                    onCheckedChange={(checked) =>
                                        updateArrayFilter(
                                            "cut",
                                            cut.value,
                                            checked as boolean
                                        )
                                    }
                                />
                                <Label
                                    htmlFor={`cut-${cut.value}`}
                                    className="text-xs cursor-pointer"
                                >
                                    {cut.label}
                                </Label>
                            </div>
                        ),
                        2
                    )}
                </div>
                {/* Polish */}
                <div>
                    <Label className="text-sm font-medium mb-3 block text-gray-700">
                        POLISH
                    </Label>
                    {renderItemsWithViewMore(
                        polish_options,
                        "polish",
                        (polish) => (
                            <div
                                key={polish.value}
                                className="flex items-center space-x-2"
                            >
                                <Checkbox
                                    id={`polish-${polish.value}`}
                                    checked={(filters.polish || []).includes(
                                        polish.value
                                    )}
                                    onCheckedChange={(checked) =>
                                        updateArrayFilter(
                                            "polish",
                                            polish.value,
                                            checked as boolean
                                        )
                                    }
                                />
                                <Label
                                    htmlFor={`polish-${polish.value}`}
                                    className="text-xs cursor-pointer"
                                >
                                    {polish.label}
                                </Label>
                            </div>
                        ),
                        2
                    )}
                </div>
                {/* Symmetry */}
                <div>
                    <Label className="text-sm font-medium mb-3 block text-gray-700">
                        SYMMETRY
                    </Label>
                    {renderItemsWithViewMore(
                        symmetry_options,
                        "symmetry",
                        (symmetry) => (
                            <div
                                key={symmetry.value}
                                className="flex items-center space-x-2"
                            >
                                <Checkbox
                                    id={`symmetry-${symmetry.value}`}
                                    checked={(filters.symmetry || []).includes(
                                        symmetry.value
                                    )}
                                    onCheckedChange={(checked) =>
                                        updateArrayFilter(
                                            "symmetry",
                                            symmetry.value,
                                            checked as boolean
                                        )
                                    }
                                />
                                <Label
                                    htmlFor={`symmetry-${symmetry.value}`}
                                    className="text-xs cursor-pointer"
                                >
                                    {symmetry.label}
                                </Label>
                            </div>
                        ),
                        2
                    )}
                </div>
                {/* Lab */}
                <div>
                    <Label className="text-sm font-medium mb-3 block text-gray-700">
                        LABORATORY
                    </Label>
                    {renderItemsWithViewMore(
                        lab_options,
                        "lab",
                        (lab) => (
                            <div
                                key={lab.value}
                                className="flex items-center space-x-2"
                            >
                                <Checkbox
                                    id={`lab-${lab.value}`}
                                    checked={(filters.lab || []).includes(
                                        lab.value
                                    )}
                                    onCheckedChange={(checked) =>
                                        updateArrayFilter(
                                            "lab",
                                            lab.value,
                                            checked as boolean
                                        )
                                    }
                                />
                                <Label
                                    htmlFor={`lab-${lab.value}`}
                                    className="text-xs cursor-pointer"
                                >
                                    {lab.label}
                                </Label>
                            </div>
                        ),
                        2
                    )}
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
