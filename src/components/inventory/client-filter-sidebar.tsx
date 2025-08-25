"use client";

import React, { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ClientFilters, FilterOptions } from "@/types/client/diamond";
import {
    Search,
    RotateCcw,
    ChevronDown,
    ChevronUp,
    Filter,
    Gem,
    RulerDimensionLine,
    Euro,
    Palette,
    SearchCheck,
    Scissors,
} from "lucide-react";
import {
    shape_options,
    color_options,
    clarity_options,
    cut_options,
    polish_options,
    symmetry_options,
    lab_options,
    flou_options,
} from "@/components/filters/diamond-filters";
import Container from "../ui/container";

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
        shape: true,
        color: true,
        clarity: true,
        lab: true,
        cut: true,
        polish: true,
        symmetry: true,
        fluorescence: true,
        price: true,
        carat: true,
    });
    const [showAdvanced, setShowAdvanced] = useState(false);

    // Ref for the advanced filters content
    const advancedContentRef = useRef<HTMLDivElement>(null);

    // Debounce timer ref
    const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Updated debounced search function - pass filters directly
    const debouncedSearch = useCallback(
        (filtersToSearch: ClientFilters) => {
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }
            searchTimeoutRef.current = setTimeout(() => {
                onSearch(filtersToSearch);
            }, 500);
        },
        [onSearch]
    );

    const updateFilter = (key: keyof ClientFilters, value: any) => {
        const newFilters = { ...filters, [key]: value };
        onFiltersChange(newFilters);
        debouncedSearch(newFilters);
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

        const newFilters = {
            ...filters,
            [key]: newValues.length > 0 ? newValues : undefined,
        };
        onFiltersChange(newFilters);
        debouncedSearch(newFilters);
    };

    const handleSearch = () => {
        onSearch(filters);
    };

    // Helper function to get SVG image path for shapes
    const getShapeImage = (shapeValue: string) => {
        const shapeMap: { [key: string]: string } = {
            Round: "round.svg",
            Emerald: "emerald.svg",
            Princess: "princess.svg",
            PrincessAlt: "princess.svg",
            Asscher: "asscher.svg",
            Cushion: "cushion.svg",
            CUB: "cushion.svg",
            CUM: "cushion.svg",
            Oval: "oval.svg",
            Heart: "heart.svg",
            Marquise: "marquise.svg",
            Baguette: "baguette.svg",
            "Tapered Baguette": "tapered.svg",
            Radiant: "radiant.svg",
            Pear: "pear.svg",
            Square: "square.svg",
            Trilliant: "trilliant.svg",
            "Square Emerald": "sqEmerald.jpg",
        };
        const fileName = shapeMap[shapeValue];
        return fileName ? `/assets/diamondShapes/${fileName}` : null;
    };

    return (
        <div className="w-full bg-white border border-gray-200 rounded-lg p-4 mb-6">
            <Container>
                <div className="flex flex-col justify-between gap-5 md:flex-row">
                    {/* Shape Filter - Always visible */}
                    <div className="mb-6 flex-1 bg-gray-200/50 p-5">
                        <Label className="text-sm font-medium text-gray-700 mb-3  flex items-center gap-2">
                            <Gem className="w-4 h-4" />
                            Shape
                        </Label>
                        <div className="flex  flex-wrap gap-2">
                            {shape_options.slice(0, 12).map((shape) => (
                                <div key={shape.value} className="">
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
                                        className="sr-only peer"
                                    />
                                    <label
                                        htmlFor={`shape-${shape.value}`}
                                        className={` cursor-pointer bg-white justify-center transition-all flex flex-col rounded-md px-6 py-4 border border-gray-300 items-center hover:border-gray-400hover:bg-gray-100  peer-data-[state=checked]:bg-gray-200 peer-data-[state=checked]:text-black peer-data-[state=checked]:border-black ${
                                            (filters.shape || []).includes(
                                                shape.value
                                            )
                                                ? " bg-gray-200 border-black border-1"
                                                : ""
                                        }`}
                                    >
                                        {getShapeImage(shape.value) ? (
                                            <img
                                                src={
                                                    getShapeImage(shape.value)!
                                                }
                                                alt={shape.label}
                                                className="w-12 h-12 object-contain"
                                            />
                                        ) : (
                                            <span className="text-xs text-center">
                                                {shape.value}
                                            </span>
                                        )}
                                        <span className="text-xs text-gray-600 mt-1 text-center">
                                            {shape.label}
                                        </span>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 bg-gray-200/50 p-5 mb-6">
                        <div>
                            <Label className="text-sm font-medium text-gray-700 mb-2  flex items-center gap-2">
                                <RulerDimensionLine className="w-4 h-4" />
                                Carat
                            </Label>
                            <div className="flex gap-2">
                                <Input
                                    type="number"
                                    placeholder="From"
                                    step="0.01"
                                    value={filters.sizeMin || ""}
                                    onChange={(e) =>
                                        updateFilter(
                                            "sizeMin",
                                            e.target.value
                                                ? parseFloat(e.target.value)
                                                : undefined
                                        )
                                    }
                                    className="text-xs h-8 bg-white"
                                />
                                <Input
                                    type="number"
                                    placeholder="To"
                                    step="0.01"
                                    value={filters.sizeMax || ""}
                                    onChange={(e) =>
                                        updateFilter(
                                            "sizeMax",
                                            e.target.value
                                                ? parseFloat(e.target.value)
                                                : undefined
                                        )
                                    }
                                    className="text-xs h-8 bg-white"
                                />
                            </div>
                        </div>

                        {/* Price Range */}
                        <div>
                            <Label className="text-sm font-medium text-gray-700 mb-2  flex items-center gap-2">
                                <Euro className="w-4 h-4" />
                                Price
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
                                    className="text-xs h-8 bg-white"
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
                                    className="text-xs h-8 bg-white"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* Horizontal Filter Sections */}
                <div className="grid grid-cols-1 gap-6 mb-6 bg-gray-200/50 p-5">
                    {/* Color */}
                    <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2  flex items-center gap-2">
                            <Filter className="w-4 h-4" />
                            Color
                        </Label>
                        <div className="flex flex-wrap gap-1">
                            {color_options.slice(0, 11).map((color) => (
                                <div key={color.value}>
                                    <Checkbox
                                        id={`color-${color.value}`}
                                        className="sr-only peer"
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
                                        className="text-xs px-3 py-2 border bg-white border-gray-300 rounded cursor-pointer hover:bg-gray-100 hover:border-black transition-colors peer-data-[state=checked]:bg-gray-200  peer-data-[state=checked]:border-black "
                                    >
                                        {color.value}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-center pt-4 my-5 bg-gray-200/50 p-5">
                    <Button
                        variant="ghost"
                        onClick={() => setShowAdvanced(!showAdvanced)}
                        className="text-sm text-gray-700 bg-white hover:bg-gray-100 hover:border-1 hover:border-black cursor-pointer transition-all duration-200"
                    >
                        {showAdvanced ? (
                            <>
                                <ChevronUp className="w-4 h-4 mr-1 transition-transform duration-200" />
                                Hide Advanced Filters
                            </>
                        ) : (
                            <>
                                <ChevronDown className="w-4 h-4 mr-1 transition-transform duration-200" />
                                Show Advanced Filters
                            </>
                        )}
                    </Button>
                </div>

                {/* Advanced Filters - Collapsible with Animation */}
                <div
                    className={` bg-gray-200/50 p-5 overflow-hidden transition-all duration-500 ease-in-out ${
                        showAdvanced
                            ? "max-h-[2000px] opacity-100"
                            : "max-h-0 opacity-0"
                    }`}
                >
                    <div
                        ref={advancedContentRef}
                        className={`pt-6 mb-6 transform transition-all duration-500 ease-in-out ${
                            showAdvanced
                                ? "translate-y-0 scale-100"
                                : "-translate-y-4 scale-95"
                        }`}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                            {/* Clarity */}
                            <div className="animate-fade-in-up">
                                <Label className="text-sm font-medium text-gray-700 mb-2  flex items-center gap-2">
                                    <SearchCheck className="w-4 h-4" />
                                    Clarity
                                </Label>
                                <div className="flex flex-wrap gap-4">
                                    {clarity_options.map((clarity) => (
                                        <div key={clarity.value}>
                                            <Checkbox
                                                id={`clarity-${clarity.value}`}
                                                className="sr-only peer"
                                                checked={(
                                                    filters.clarity || []
                                                ).includes(clarity.value)}
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
                                                className="text-xs bg-white px-3 py-2 border border-gray-300 rounded cursor-pointer hover:bg-gray-100 transition-colors peer-data-[state=checked]:bg-gray-200 peer-data-[state=checked]:text-black peer-data-[state=checked]:border-black"
                                            >
                                                {clarity.value}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Fluorescence */}
                            <div className="animate-fade-in-up">
                                <Label className="text-sm font-medium text-gray-700 mb-2  flex items-center gap-2">
                                    <Filter className="w-4 h-4" />
                                    Fluorescence Color
                                </Label>
                                <div className="flex flex-wrap gap-4">
                                    {flou_options.map((fluo) => (
                                        <div key={fluo.value}>
                                            <Checkbox
                                                id={`fluo-${fluo.value}`}
                                                className="sr-only peer"
                                                checked={(
                                                    filters.fluorescenceColor ||
                                                    []
                                                ).includes(fluo.value)}
                                                onCheckedChange={(checked) =>
                                                    updateArrayFilter(
                                                        "fluorescenceColor",
                                                        fluo.value,
                                                        checked as boolean
                                                    )
                                                }
                                            />
                                            <Label
                                                htmlFor={`fluo-${fluo.value}`}
                                                className="text-xs bg-white px-3 py-2 border border-gray-300 rounded cursor-pointer hover:bg-gray-100 transition-colors peer-data-[state=checked]:bg-gray-200 peer-data-[state=checked]:text-black peer-data-[state=checked]:border-black"
                                            >
                                                {fluo.label}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Cut */}
                            <div className="animate-fade-in-up">
                                <Label className="text-sm font-medium text-gray-700 mb-2  flex items-center gap-2">
                                    <Filter className="w-4 h-4" />
                                    Cut
                                </Label>
                                <div className="flex flex-wrap gap-4">
                                    {cut_options.map((cut) => (
                                        <div key={cut.value}>
                                            <Checkbox
                                                id={`cut-${cut.value}`}
                                                className="sr-only peer"
                                                checked={(
                                                    filters.cut || []
                                                ).includes(cut.value)}
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
                                                className="text-xs bg-white px-3 py-2 border border-gray-300 rounded cursor-pointer hover:bg-gray-100 transition-colors peer-data-[state=checked]:bg-gray-200 peer-data-[state=checked]:text-black peer-data-[state=checked]:border-black"
                                            >
                                                {cut.label}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Polish */}
                            <div className="animate-fade-in-up">
                                <Label className="text-sm font-medium text-gray-700 mb-2  flex items-center gap-2">
                                    <Filter className="w-4 h-4" />
                                    Polish
                                </Label>
                                <div className="flex flex-wrap gap-4">
                                    {polish_options.map((polish) => (
                                        <div key={polish.value}>
                                            <Checkbox
                                                id={`polish-${polish.value}`}
                                                className="sr-only peer"
                                                checked={(
                                                    filters.polish || []
                                                ).includes(polish.value)}
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
                                                className="text-xs bg-white px-3 py-2 border border-gray-300 rounded cursor-pointer hover:bg-gray-100 transition-colors peer-data-[state=checked]:bg-gray-200 peer-data-[state=checked]:text-black peer-data-[state=checked]:border-black"
                                            >
                                                {polish.label}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Symmetry */}
                            <div className="animate-fade-in-up">
                                <Label className="text-sm font-medium text-gray-700 mb-2  flex items-center gap-2">
                                    <Filter className="w-4 h-4" />
                                    Symmetry
                                </Label>
                                <div className="flex flex-wrap gap-4">
                                    {symmetry_options.map((symmetry) => (
                                        <div key={symmetry.value}>
                                            <Checkbox
                                                id={`symmetry-${symmetry.value}`}
                                                className="sr-only peer"
                                                checked={(
                                                    filters.symmetry || []
                                                ).includes(symmetry.value)}
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
                                                className="text-xs bg-white px-3 py-2 border border-gray-300 rounded cursor-pointer hover:bg-gray-100 transition-colors peer-data-[state=checked]:bg-gray-200 peer-data-[state=checked]:text-black peer-data-[state=checked]:border-black"
                                            >
                                                {symmetry.label}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Laboratory */}
                            <div className="animate-fade-in-up">
                                <Label className="text-sm font-medium text-gray-700 mb-2  flex items-center gap-2">
                                    <Filter className="w-4 h-4" />
                                    Laboratory
                                </Label>
                                <div className="flex flex-wrap gap-4">
                                    {[
                                        { value: "GIA", label: "GIA" },
                                        { value: "HRD", label: "HRD" },
                                        {
                                            value: "None",
                                            label: "Other",
                                        },
                                    ].map((lab) => (
                                        <div key={lab.value}>
                                            <Checkbox
                                                id={`lab-${lab.value}`}
                                                className="sr-only peer"
                                                checked={(
                                                    filters.laboratory || []
                                                ).includes(lab.value)}
                                                onCheckedChange={(checked) =>
                                                    updateArrayFilter(
                                                        "laboratory",
                                                        lab.value,
                                                        checked as boolean
                                                    )
                                                }
                                            />
                                            <Label
                                                htmlFor={`lab-${lab.value}`}
                                                className="text-xs bg-white px-3 py-2 border border-gray-300 rounded cursor-pointer hover:bg-gray-100 transition-colors peer-data-[state=checked]:bg-gray-200 peer-data-[state=checked]:text-black peer-data-[state=checked]:border-black"
                                            >
                                                {lab.label}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Controls */}
                <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex justify-end gap-3">
                        <Button
                            variant="outline"
                            onClick={onReset}
                            className="text-sm px-6"
                        >
                            <RotateCcw className="w-4 h-4 mr-2" />
                            Reset
                        </Button>
                        <Button
                            onClick={handleSearch}
                            disabled={loading}
                            className="text-sm px-8"
                        >
                            <Search className="w-4 h-4 mr-2" />
                            {loading ? "Searching..." : "Search"}
                        </Button>
                    </div>
                </div>
            </Container>
        </div>
    );
}
