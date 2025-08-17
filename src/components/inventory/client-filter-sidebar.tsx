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
    ChevronLeft,
    ChevronRight,
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
        searchBy: true,
    });
    const [collapsed, setCollapsed] = useState(false);

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

    const toggleSection = (section: string) => {
        setExpandedSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
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
            "Sq. Emerald": "sqEmerald.jpg",
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
                        gridTemplateColumns: `repeat(${itemsPerRow}, 1fr)`,
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

    // Section wrapper for collapsible cards
    const Section = ({
        title,
        sectionKey,
        children,
        defaultOpen = false,
        icon,
    }: {
        title: string;
        sectionKey: string;
        children: React.ReactNode;
        defaultOpen?: boolean;
        icon?: React.ReactNode;
    }) => (
        <div className="mb-4 rounded-lg  bg-white border border-gray-200">
            <button
                type="button"
                className="w-full flex items-center justify-between px-3 py-2 rounded-t-lg bg-gray-50 hover:bg-gray-100 focus:outline-none"
                onClick={() => toggleSection(sectionKey)}
                aria-expanded={expandedSections[sectionKey]}
            >
                <span className="flex items-center gap-2 font-medium text-gray-700 text-sm">
                    {icon}
                    {title}
                </span>
                {expandedSections[sectionKey] ? (
                    <ChevronUp className="w-4 h-4" />
                ) : (
                    <ChevronDown className="w-4 h-4" />
                )}
            </button>
            {expandedSections[sectionKey] && (
                <div className="px-3 py-2">{children}</div>
            )}
        </div>
    );

    return (
        <div
            className={`relative transition-all duration-300 pb-10 ${
                collapsed ? "w-16" : "w-100"
            } bg-gray-50 border-r border-gray-200 h-screen  flex flex-col`}
        >
            {/* Collapse/Expand Button */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-white sticky top-0 z-10">
                <span className="flex items-center gap-2 font-bold text-lg text-gray-700">
                    <Filter className="w-5 h-5" />
                    {!collapsed && "Filters"}
                </span>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setCollapsed((c) => !c)}
                    className="rounded-full"
                    aria-label={
                        collapsed ? "Expand sidebar" : "Collapse sidebar"
                    }
                >
                    {collapsed ? (
                        <ChevronRight className="w-5 h-5" />
                    ) : (
                        <ChevronLeft className="w-5 h-5" />
                    )}
                </Button>
            </div>
            {/* Sidebar Content */}
            <div
                className={`flex-1 overflow-y-auto px-2 pt-2 ${
                    collapsed ? "hidden" : ""
                }`}
            >
                <Section
                    title="Shape"
                    sectionKey="shape"
                    icon={<Gem className="w-4 h-4" />}
                >
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
                                        className="sr-only peer"
                                    />
                                    <label
                                        htmlFor={`shape-${shape.value}`}
                                        className={`w-8 h-8  rounded cursor-pointer flex items-center justify-center transition-colors ${
                                            (filters.shape || []).includes(
                                                shape.value
                                            )
                                                ? "border-black border-1  text-white"
                                                : "hover:bg-gray-200"
                                        } `}
                                    >
                                        {getShapeImage(shape.value) ? (
                                            <img
                                                src={
                                                    getShapeImage(shape.value)!
                                                }
                                                alt={shape.label}
                                                className="w-10 h-10 pt-1 object-contain"
                                                onError={(e) => {
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
                </Section>
                <Section
                    title="Size Range"
                    sectionKey="carat"
                    icon={<RulerDimensionLine className="w-4 h-4" />}
                >
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
                </Section>
                <Section
                    title="Price Range"
                    sectionKey="price"
                    icon={<Euro className="w-4 h-4" />}
                >
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
                </Section>
                <Section
                    title="Color"
                    sectionKey="color"
                    icon={<Palette className="w-4 h-4" />}
                >
                    {renderItemsWithViewMore(
                        color_options,
                        "color",
                        (color) => (
                            <div key={color.value} className="text-center">
                                {/* Color section */}
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
                                    className={`text-xs text-black/70 block mt-1 cursor-pointer hover:bg-gray-200 rounded-sm px-1 transition-colors peer-data-[state=checked]:font-semibold peer-data-[state=checked]:text-white peer-data-[state=checked]:bg-black/ peer-data-[state=checked]:border-black`}
                                >
                                    {color.value}
                                </Label>
                            </div>
                        ),
                        7
                    )}
                </Section>
                <Section
                    title="Clarity"
                    sectionKey="clarity"
                    icon={<SearchCheck className="w-4 h-4" />}
                >
                    {renderItemsWithViewMore(
                        clarity_options,
                        "clarity",
                        (clarity) => (
                            <div key={clarity.value} className="text-center">
                                {/* Clarity section */}
                                <Checkbox
                                    id={`clarity-${clarity.value}`}
                                    className="sr-only peer"
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
                                    className="text-xs text-black/70 block mt-1 cursor-pointer rounded-sm px-1 transition-colors peer-data-[state=checked]:font-semibold peer-data-[state=checked]:text-white peer-data-[state=checked]:bg-black"
                                >
                                    {clarity.value}
                                </Label>
                            </div>
                        ),
                        4
                    )}
                </Section>
                <Section
                    title="Fluorescence"
                    sectionKey="fluorescence"
                    icon={<Filter className="w-4 h-4" />}
                >
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
                                {/* Fluorescence checkboxes */}
                                <Checkbox
                                    id={`fluo-${fluo}`}
                                    className="sr-only peer"
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
                                    className="text-xs text-black/70 cursor-pointer rounded-sm px-1 transition-colors peer-data-[state=checked]:font-semibold peer-data-[state=checked]:text-white peer-data-[state=checked]:bg-black"
                                >
                                    {fluo}
                                </Label>
                            </div>
                        ))}
                    </div>
                </Section>
                {/* <Section
                    title="Search By"
                    sectionKey="searchBy"
                    icon={<Filter className="w-4 h-4" />}
                >
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
                </Section> */}
                <Section
                    title="Cut"
                    sectionKey="cut"
                    icon={<Scissors className="w-4 h-4" />}
                >
                    {renderItemsWithViewMore(
                        cut_options,
                        "cut",
                        (cut) => (
                            <div
                                key={cut.value}
                                className="flex items-center space-x-2"
                            >
                                {/* Cut section */}
                                <Checkbox
                                    id={`cut-${cut.value}`}
                                    className="sr-only peer"
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
                                    className="text-xs text-black/70 cursor-pointer rounded-sm px-1 transition-colors peer-data-[state=checked]:font-semibold peer-data-[state=checked]:text-white peer-data-[state=checked]:bg-black"
                                >
                                    {cut.label}
                                </Label>
                            </div>
                        ),
                        2
                    )}
                </Section>
                <Section
                    title="Polish"
                    sectionKey="polish"
                    icon={<Filter className="w-4 h-4" />}
                >
                    {renderItemsWithViewMore(
                        polish_options,
                        "polish",
                        (polish) => (
                            <div
                                key={polish.value}
                                className="flex items-center space-x-2"
                            >
                                {/* Polish section */}
                                <Checkbox
                                    id={`polish-${polish.value}`}
                                    className="sr-only peer"
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
                                    className="text-xs cursor-pointer rounded-sm px-1 transition-colors peer-data-[state=checked]:font-semibold peer-data-[state=checked]:text-white peer-data-[state=checked]:bg-black"
                                >
                                    {polish.label}
                                </Label>
                            </div>
                        ),
                        2
                    )}
                </Section>
                <Section
                    title="Symmetry"
                    sectionKey="symmetry"
                    icon={<Filter className="w-4 h-4" />}
                >
                    {renderItemsWithViewMore(
                        symmetry_options,
                        "symmetry",
                        (symmetry) => (
                            <div
                                key={symmetry.value}
                                className="flex items-center space-x-2"
                            >
                                {/* Symmetry section */}
                                <Checkbox
                                    id={`symmetry-${symmetry.value}`}
                                    className="sr-only peer"
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
                                    className="text-xs cursor-pointer rounded-sm px-1 transition-colors peer-data-[state=checked]:font-semibold peer-data-[state=checked]:text-white peer-data-[state=checked]:bg-black"
                                >
                                    {symmetry.label}
                                </Label>
                            </div>
                        ),
                        2
                    )}
                </Section>
                <Section
                    title="Laboratory"
                    sectionKey="lab"
                    icon={<Filter className="w-4 h-4" />}
                >
                    {renderItemsWithViewMore(
                        lab_options,
                        "lab",
                        (lab) => (
                            <div
                                key={lab.value}
                                className="flex items-center space-x-2"
                            >
                                {/* Laboratory section */}
                                <Checkbox
                                    id={`lab-${lab.value}`}
                                    className="sr-only peer"
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
                                    className="text-xs cursor-pointer rounded-sm px-1 transition-colors peer-data-[state=checked]:font-semibold peer-data-[state=checked]:text-white peer-data-[state=checked]:bg-black"
                                >
                                    {lab.label}
                                </Label>
                            </div>
                        ),
                        2
                    )}
                </Section>
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
