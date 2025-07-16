"use client";

import * as React from "react";
import { Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Copy, Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { diamondSchema, DiamondType } from "@/lib/validations/diamond-schema";

interface DiamondRowActionsProps<TData> {
    row: Row<TData>;
}

export function DataTableRowActions<TData>({
    row,
}: DiamondRowActionsProps<TData>) {
    // Safe parsing with error handling
    const parseResult = diamondSchema.safeParse(row.original);

    if (!parseResult.success) {
        console.error("Diamond data parsing failed:", parseResult.error);
        console.log("Raw data:", row.original);

        // Fallback: try to access basic properties directly
        const rawData = row.original as any;
        const diamondId = rawData._id || rawData.id || "unknown";
        const certNo = rawData["CERT-NO"] || rawData.certNo || "unknown";

        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                    >
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                        onClick={() => navigator.clipboard.writeText(diamondId)}
                    >
                        <Copy className="mr-2 h-4 w-4" />
                        Copy ID
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        );
    }

    const diamond = parseResult.data;
    // console.log("Parsed diamond data:", diamond);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                >
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                    onClick={() => navigator.clipboard.writeText(diamond._id)}
                >
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Diamond ID
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => {
                        const diamond = row.original as DiamondType;
                        const certNo =
                            diamond.certificateNumber ||
                            (diamond as any)["CERT-NO"] ||
                            "No certificate number";
                        navigator.clipboard.writeText(certNo);
                    }}
                >
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Certificate Number
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {/* <DropdownMenuItem>
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit Diamond
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Diamond
                </DropdownMenuItem> */}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
