"use client";

import type { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableFacetedFilter } from "@/components/data-table/data-table-faceted-filter";
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options";
import { X } from "lucide-react";
import {
    shape_options,
    color_options,
    clarity_options,
    cut_options,
    lab_options,
    flou_options,
    availability_options,
} from "../filters/diamond-filters";

interface DiamondTableToolbarProps<TData> {
    table: Table<TData>;
}

export function DiamondTableToolbar<TData>({
    table,
}: DiamondTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0;

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
                {/* <Input
                    placeholder="Search diamonds..."
                    value={
                        (table
                            .getColumn("diamond-Id")
                            ?.getFilterValue() as string) ?? ""
                    }
                    onChange={(event) =>
                        table
                            .getColumn("diamond-Id")
                            ?.setFilterValue(event.target.value)
                    }
                    className="h-8 w-[150px] shadowm lg:w-[250px]"
                /> */}
                {table.getColumn("laboratory") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("laboratory")}
                        title="Lab"
                        options={lab_options}
                    />
                )}
                {table.getColumn("shape") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("shape")}
                        title="Shape"
                        options={shape_options}
                    />
                )}
                {table.getColumn("color") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("color")}
                        title="Color"
                        options={color_options}
                    />
                )}
                {table.getColumn("clarity") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("clarity")}
                        title="Clarity"
                        options={clarity_options}
                    />
                )}
                {table.getColumn("cut") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("cut")}
                        title="Cut"
                        options={cut_options}
                    />
                )}
                {table.getColumn("fluorescenceColor") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("fluorescenceColor")}
                        title="Fluorescence"
                        options={flou_options}
                    />
                )}
                {table.getColumn("isAvailable") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("isAvailable")}
                        title="Availability"
                        options={availability_options}
                    />
                )}
                {isFiltered && (
                    <Button
                        variant="ghost"
                        onClick={() => table.resetColumnFilters()}
                        className="h-8 px-2 lg:px-3"
                    >
                        Reset
                        <X className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </div>
            <DataTableViewOptions table={table} />
        </div>
    );
}
