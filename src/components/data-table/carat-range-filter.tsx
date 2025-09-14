"use client";

import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { X, Gem } from "lucide-react";
import { useState } from "react";

interface CaratRange {
    label: string;
    min: number;
    max: number;
}

const CARAT_RANGES: CaratRange[] = [
    { label: "0.30 - 0.39", min: 0.3, max: 0.39 },
    { label: "0.40 - 0.49", min: 0.4, max: 0.49 },
    { label: "0.50 - 0.69", min: 0.5, max: 0.69 },
    { label: "0.70 - 0.89", min: 0.7, max: 0.89 },
    { label: "0.90 - 0.99", min: 0.9, max: 0.99 },
    { label: "1.00 - 1.49", min: 1.0, max: 1.49 },
    { label: "1.50 - 1.99", min: 1.5, max: 1.99 },
    { label: "2.00 - 2.99", min: 2.0, max: 2.99 },
    { label: "3.00 - 4.99", min: 3.0, max: 4.99 },
    { label: "5.00+", min: 5.0, max: 999 },
];

interface CaratRangeFilterProps {
    onRangeSelect: (min: number, max: number) => void;
    selectedRange: CaratRange | null;
    onClear: () => void;
}

export function CaratRangeFilter({
    onRangeSelect,
    selectedRange,
    onClear,
}: CaratRangeFilterProps) {
    const [open, setOpen] = useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="h-8 border-dashed"
                >
                    <Gem className="mr-2 h-4 w-4" />
                    Carat Range
                    {selectedRange && (
                        <>
                            <div className="ml-1 h-4 w-[1px] bg-gray-300" />
                            <Badge
                                variant="secondary"
                                className="rounded-sm px-1 font-normal lg:hidden"
                            >
                                1
                            </Badge>
                            <div className="hidden space-x-1 lg:flex">
                                <Badge
                                    variant="secondary"
                                    className="rounded-sm px-1 font-normal"
                                >
                                    {selectedRange.label}
                                </Badge>
                            </div>
                        </>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-60 p-0" align="start">
                <div className="p-2">
                    <div className="space-y-1">
                        <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium">Carat Range</h4>
                            {selectedRange && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                        onClear();
                                        setOpen(false);
                                    }}
                                    className="h-6 px-2 text-xs"
                                >
                                    Clear
                                    <X className="ml-1 h-3 w-3" />
                                </Button>
                            )}
                        </div>
                        <div className="grid grid-cols-2 gap-1">
                            {CARAT_RANGES.map((range) => (
                                <Button
                                    key={range.label}
                                    variant={
                                        selectedRange?.label === range.label
                                            ? "default"
                                            : "ghost"
                                    }
                                    size="sm"
                                    className="h-8 justify-start text-xs"
                                    onClick={() => {
                                        onRangeSelect(range.min, range.max);
                                        setOpen(false);
                                    }}
                                >
                                    {range.label}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}
