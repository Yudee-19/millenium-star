"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./diamond-row-actions";
import { DiamondType } from "@/lib/validations/diamond-schema";
import {
    shape_options,
    color_options,
    clarity_options,
    cut_options,
    lab_options,
    flou_options,
    availability_options,
} from "../filters/diamond-filters";
import { clientDiamondAPI } from "@/services/client-api";
import Link from "next/link";
import { EyeIcon } from "lucide-react";
import { DiamondImage } from "../diamond-image";

export const diamondColumns: ColumnDef<DiamondType>[] = [
    {
        id: "actions",
        cell: ({ row }) => (
            <DataTableRowActions
                row={row}
                onRefresh={() => {
                    window.location.reload();
                }}
            />
        ),
    },
    {
        accessorKey: "image",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Image" />
        ),
        cell: ({ row }) => (
            <Link href={`/${row.original.certificateNumber}`}>
                <DiamondImage
                    certificateNumber={row.original.certificateNumber}
                    size={48}
                />
            </Link>
        ),
    },

    {
        accessorKey: "diamond-Id",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Diamond-Id" />
        ),
        cell: ({ row }) => {
            const certNo =
                (row.original as any)["CERT-NO"] ||
                row.original.certificateNumber ||
                "N/A";
            return (
                <div className="w-[120px] font-mono text-xs">{`${certNo}`}</div>
            );
        },
    },
    {
        accessorKey: "LAB",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="LAB" />
        ),
        cell: ({ row }) => {
            const labValue =
                row.original.laboratory || (row.original as any)["LAB"] || "-";

            const lab = lab_options.find((lab) => lab.value === labValue);
            return (
                <div className="flex w-[80px] items-center">
                    {/* {lab?.icon && (
                        <lab.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                    )} */}
                    <span>{labValue}</span>
                </div>
            );
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        accessorKey: "shape",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Shape" />
        ),
        cell: ({ row }) => {
            const shapeValue = row.original.shape || "-";
            const shape = shape_options.find(
                (shape) => shape.value === shapeValue
            );
            return (
                <div className="flex w-[80px] items-center">
                    {/* {shape?.icon && (
                        <shape.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                    )} */}
                    <span className="whitespace-pre-wrap">{shapeValue}</span>
                </div>
            );
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        accessorKey: "size",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Size" />
        ),
        cell: ({ row }) => (
            <div className="w-[80px] whitespace-pre-wrap">
                {(row.getValue("size") as number) || (0 as number)} ct
            </div>
        ),
    },
    {
        accessorKey: "Color",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Color" />
        ),
        cell: ({ row }) => {
            const colorValue =
                row.original.color || (row.original as any)["Color"] || "N/A";

            const color = color_options.find(
                (color) => color.value === colorValue
            );

            return (
                <div className="flex w-[60px] items-center">
                    <span className="whitespace-pre-wrap">{colorValue}</span>
                </div>
            );
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        accessorKey: "Clarity",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Clarity" />
        ),
        cell: ({ row }) => {
            const clarityValue =
                row.original.clarity ||
                (row.original as any)["Clarity"] ||
                "N/A";
            const clarity = clarity_options.find(
                (clarity) => clarity.value === clarityValue
            );
            return (
                <div className="flex w-[80px] items-center">
                    <span className="whitespace-pre-wrap">{clarityValue}</span>
                </div>
            );
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        accessorKey: "RapList",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="RapList" />
        ),
        cell: ({ row }) => (
            <div className="w-[80px]">
                {row.getValue("RapList") ||
                    (row.original as any)["rapList"] ||
                    "N/A"}
            </div>
        ),
    },
    {
        accessorKey: "discount",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Discount" />
        ),
        cell: ({ row }) => {
            const discount = row.getValue("discount") as number;
            return (
                <div
                    className={`w-[80px] ${
                        discount < 0 ? "text-red-600" : "text-green-600"
                    }`}
                >
                    {discount}%
                </div>
            );
        },
    },
    {
        accessorKey: "cut",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Cut" />
        ),
        cell: ({ row }) => {
            const cutValue =
                row.original.cut || (row.original as any)["cut"] || "N/A";
            const cut = cut_options.find((cut) => cut.value === cutValue);
            return (
                <div className="flex w-[80px] items-center">
                    <span className="whitespace-pre-wrap">{cutValue}</span>
                </div>
            );
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        accessorKey: "Polish",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Polish" />
        ),
        cell: ({ row }) => (
            <div className="w-[80px] whitespace-pre-wrap">
                {row.original.polish ||
                    (row.original as any)["Polish"] ||
                    "N/A"}
            </div>
        ),
    },
    {
        accessorKey: "sym",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Symmetry" />
        ),
        cell: ({ row }) => (
            <div className="w-[80px] whitespace-pre-wrap">
                {(row.original as any)["sym"] || row.original.symmetry || "N/A"}
            </div>
        ),
    },
    {
        accessorKey: "FLOU",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Fluorescence" />
        ),
        cell: ({ row }) => {
            const flou = flou_options.find(
                (flou) => flou.value === row.getValue("FLOU")
            );
            return (
                <div className="flex w-[100px] items-center">
                    <span className="whitespace-pre-wrap">
                        {(row.original as any)["FLOU"] ||
                            row.original.fluorescence ||
                            "-"}
                    </span>
                </div>
            );
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        accessorKey: "length",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Length" />
        ),
        cell: ({ row }) => (
            <div className="w-[80px]">
                {row.original.measurements?.length || "-"} mm
            </div>
        ),
    },
    {
        accessorKey: "width",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Width" />
        ),
        cell: ({ row }) => (
            <div className="w-[80px]">
                {row.original.measurements?.width || "-"} mm
            </div>
        ),
    },
    {
        accessorKey: "depth",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Depth" />
        ),
        cell: ({ row }) => (
            <div className="w-[80px]">
                {row.original.measurements?.depth || "-"} mm
            </div>
        ),
    },
    {
        accessorKey: "T.DEP",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="T.DEP" />
        ),
        cell: ({ row }) => {
            // Safe access to nested property
            const tDep =
                row.original.totalDepth || (row.original as any)?.T?.DEP;
            return <div className="w-[80px]">{tDep ? `${tDep}%` : "N/A"}</div>;
        },
    },
    {
        accessorKey: "TABLE",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Table" />
        ),
        cell: ({ row }) => (
            <div className="w-[80px]">
                {row.getValue("TABLE") || row.original.table || "-"}%
            </div>
        ),
    },
    {
        accessorKey: "price",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Price" />
        ),
        cell: ({ row }) => {
            const price = row.getValue("price") as number;
            return (
                <div className="w-[100px] font-semibold">
                    ${price.toLocaleString()}
                </div>
            );
        },
    },
    {
        accessorKey: "isAvailable", // Change from "Availabilty" to "isAvailable"
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Availability" />
        ),
        cell: ({ row }) => {
            const isAvailable = row.getValue("isAvailable") as boolean;
            return (
                <div className="w-[100px]">
                    <Badge
                        variant={isAvailable ? "default" : "secondary"}
                        className={
                            isAvailable
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                        }
                    >
                        {isAvailable ? "Available" : "Not Available"}
                    </Badge>
                </div>
            );
        },
        filterFn: (row, id, value) => {
            const cellValue = row.getValue(id) as boolean;
            // Handle undefined/null values
            const normalizedValue = cellValue ?? false;
            return value.includes(normalizedValue);
        },
        enableSorting: true, // Enable sorting for this column
    },

    // Example columns for newly added fields

    {
        accessorKey: "fancyColor",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Fancy Color" />
        ),
        cell: ({ row }) => (
            <div className="w-[100px]">{row.original.fancyColor || "-"}</div>
        ),
    },
    {
        accessorKey: "fancyColorOvertone",
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Fancy Color Overtone"
            />
        ),
        cell: ({ row }) => (
            <div className="w-[120px]">
                {row.original.fancyColorOvertone || "-"}
            </div>
        ),
    },
    {
        accessorKey: "fancyColorIntensity",
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Fancy Color Intensity"
            />
        ),
        cell: ({ row }) => (
            <div className="w-[120px]">
                {row.original.fancyColorIntensity || "-"}
            </div>
        ),
    },
];
