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
} from "../diamond-filters";

export const diamondColumns: ColumnDef<DiamondType>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value: any) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
                className="translate-y-[2px]"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value: any) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="translate-y-[2px]"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "CERT-NO",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="CERT-NO" />
        ),
        cell: ({ row }) => (
            <div className="w-[120px] font-mono text-xs ">
                {row.getValue("CERT-NO") || row.getValue("certificateNumber")}
            </div>
        ),
    },
    {
        accessorKey: "LAB",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="LAB" />
        ),
        cell: ({ row }) => {
            const lab = lab_options.find(
                (lab) => lab.value === row.getValue("LAB")
            );
            return (
                <div className="flex w-[80px] items-center">
                    {lab?.icon && (
                        <lab.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                    )}
                    <span>{row.getValue("LAB")}</span>
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
            const shape = shape_options.find(
                (shape) => shape.value === row.getValue("shape")
            );
            return (
                <div className="flex w-[80px] items-center">
                    {shape?.icon && (
                        <shape.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                    )}
                    <span>{row.getValue("shape")}</span>
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
            <div className="w-[80px]">{row.getValue("size")} ct</div>
        ),
    },
    {
        accessorKey: "Color",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Color" />
        ),
        cell: ({ row }) => {
            const color = color_options.find(
                (color) => color.value === row.getValue("Color")
            );
            return (
                <div className="flex w-[60px] items-center">
                    {color?.icon && (
                        <color.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                    )}
                    <span>{row.getValue("Color")}</span>
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
            const clarity = clarity_options.find(
                (clarity) => clarity.value === row.getValue("Clarity")
            );
            return (
                <div className="flex w-[80px] items-center">
                    {clarity?.icon && (
                        <clarity.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                    )}
                    <span>{row.getValue("Clarity")}</span>
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
            <div className="w-[80px]">{row.getValue("RapList")}</div>
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
            const cut = cut_options.find(
                (cut) => cut.value === row.getValue("cut")
            );
            return (
                <div className="flex w-[80px] items-center">
                    {cut?.icon && (
                        <cut.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                    )}
                    <span>{row.getValue("cut")}</span>
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
            <div className="w-[80px]">{row.getValue("Polish")}</div>
        ),
    },
    {
        accessorKey: "sym",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Symmetry" />
        ),
        cell: ({ row }) => (
            <div className="w-[80px]">{row.getValue("sym")}</div>
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
                    {flou?.icon && (
                        <flou.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                    )}
                    <span>{row.getValue("FLOU")}</span>
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
            <div className="w-[80px]">{row.getValue("length")} mm</div>
        ),
    },
    {
        accessorKey: "width",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Width" />
        ),
        cell: ({ row }) => (
            <div className="w-[80px]">{row.getValue("width")} mm</div>
        ),
    },
    {
        accessorKey: "depth",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Depth" />
        ),
        cell: ({ row }) => (
            <div className="w-[80px]">{row.getValue("depth")} mm</div>
        ),
    },
    {
        accessorKey: "T.DEP",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="T.DEP" />
        ),
        cell: ({ row }) => {
            // Safe access to nested property
            const tDep = (row.original as any)?.T?.DEP;
            return <div className="w-[80px]">{tDep ? `${tDep}%` : "N/A"}</div>;
        },
    },
    {
        accessorKey: "TABLE",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Table" />
        ),
        cell: ({ row }) => (
            <div className="w-[80px]">{row.getValue("TABLE")}%</div>
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
        id: "actions",
        cell: ({ row }) => <DataTableRowActions row={row} />,
    },
];
