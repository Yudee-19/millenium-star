"use client";
import { useCallback, useState } from "react";
import { diamondColumns } from "@/components/data-table/diamond-columns";
import { DataTable } from "@/components/data-table/data-table";
import { DiamondTableToolbar } from "@/components/data-table/diamond-toolbar";
import { SiteHeader } from "@/components/layout/site-header";
import { Shell } from "@/components/shells/shell";
import Container from "@/components/ui/container";
import CustomButton from "@/components/ui/customButton";
import { Input } from "@/components/ui/input";
import { useDiamonds } from "@/hooks/use-diamonds";
import { useFilteredDiamonds } from "@/hooks/use-filtered-diamonds";
import {
    ChartColumn,
    CircleCheckBig,
    DownloadIcon,
    FileTextIcon,
    FunnelPlus,
    GridIcon,
    PlusIcon,
    Ruler,
    SlashIcon,
    TrendingUp,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AddDiamondModal } from "@/components/modals/add-diamond";
import { AdminGuard } from "@/components/auth/routeGuard";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { StatsCard } from "@/components/cards/stats-card";

export default function DiamondPage() {
    const { user, logout } = useAuth();
    const {
        diamonds,
        loading,
        error,
        totalCount,
        pageCount,
        refetch,
        updateTable,
        paginationMeta,
    } = useDiamonds();

    // Filtered diamonds hooks
    const {
        diamonds: fancyDiamonds,
        loading: fancyLoading,
        error: fancyError,
        totalCount: fancyTotalCount,
        pageCount: fancyPageCount,
        refetch: fancyRefetch,
        paginationMeta: fancyPaginationMeta,
    } = useFilteredDiamonds("diamonds/search?notShape=RBC");

    const {
        diamonds: highEndDiamonds,
        loading: highEndLoading,
        error: highEndError,
        totalCount: highEndTotalCount,
        pageCount: highEndPageCount,
        refetch: highEndRefetch,
        paginationMeta: highEndPaginationMeta,
    } = useFilteredDiamonds("diamonds/search?shape=RBC&sizeMax=1");

    const {
        diamonds: lowEndDiamonds,
        loading: lowEndLoading,
        error: lowEndError,
        totalCount: lowEndTotalCount,
        pageCount: lowEndPageCount,
        refetch: lowEndRefetch,
        paginationMeta: lowEndPaginationMeta,
    } = useFilteredDiamonds("diamonds/search?shape=RBC&sizeMin=1");

    // Modal state
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("all");

    // Handle table state changes for main table
    const handleTableStateChange = useCallback(
        (state: {
            pagination: { pageIndex: number; pageSize: number };
            sorting: Array<{ id: string; desc: boolean }>;
            columnFilters: Array<{ id: string; value: any }>;
        }) => {
            console.log("🎯 Page: Table state change requested:", state);
            updateTable(state);
        },
        [updateTable]
    );

    // Empty handlers for filtered tables (read-only)
    const handleFancyTableStateChange = useCallback(() => {
        // Fancy diamonds table is read-only, no state changes needed
    }, []);

    const handleHighEndTableStateChange = useCallback(() => {
        // High-end diamonds table is read-only, no state changes needed
    }, []);

    const handleLowEndTableStateChange = useCallback(() => {
        // Low-end diamonds table is read-only, no state changes needed
    }, []);

    // Handle successful diamond addition
    const handleAddDiamondSuccess = () => {
        console.log("✅ Diamond added successfully");
        refetch(); // Refresh the main table data
        fancyRefetch(); // Refresh fancy diamonds
        highEndRefetch(); // Refresh high-end diamonds
        lowEndRefetch(); // Refresh low-end diamonds
    };

    const exportToCsv = (diamondsToExport: any[], fileName: string) => {
        if (!diamondsToExport || diamondsToExport.length === 0) {
            alert("No data available to export for the selected tab.");
            return;
        }

        const headers = [
            "Certificate Number",
            "Shape",
            "Carat",
            "Color",
            "Clarity",
            "Cut",
            "Polish",
            "Symmetry",
            "Fluorescence",
            "Lab",
            "Price",
            "Discount",
        ];

        const csvRows = diamondsToExport.map((d) => {
            const row = [
                d.certificateNumber || d["CERT-NO"] || "",
                d.shape || d["Shape"] || "",
                d.size || d["Carat"] || 0,
                d.color || d["Color"] || "",
                d.clarity || d["Clarity"] || "",
                d.cut || d["Cut"] || "",
                d.polish || d["Polish"] || "",
                d.symmetry || d["sym"] || "",
                d.fluorescence || d["FLOU"] || "",
                d.lab || d["LAB"] || "",
                d.price || 0,
                d.discount ? `${d.discount}%` : "0%",
            ];
            return row
                .map((value) => {
                    const str = String(value);
                    if (str.includes(",")) {
                        return `"${str}"`;
                    }
                    return str;
                })
                .join(",");
        });

        const csvContent = [headers.join(","), ...csvRows].join("\n");
        const blob = new Blob([csvContent], {
            type: "text/csv;charset=utf-8;",
        });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.setAttribute("download", `${fileName}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleExport = () => {
        let dataToExport: any[] = [];
        let fileName = "diamonds";

        switch (activeTab) {
            case "fancy":
                dataToExport = fancyDiamonds;
                fileName = "fancy-diamonds";
                break;
            case "highEnd":
                dataToExport = highEndDiamonds;
                fileName = "high-end-diamonds";
                break;
            case "lowEnd":
                dataToExport = lowEndDiamonds;
                fileName = "low-end-diamonds";
                break;
            case "all":
            default:
                dataToExport = diamonds;
                fileName = "all-diamonds";
                break;
        }
        exportToCsv(dataToExport, fileName);
    };

    if (error) {
        return (
            <Container>
                <SiteHeader />
                <div className="flex items-center justify-center h-96">
                    <div className="text-center">
                        <h3 className="text-lg font-semibold text-red-600">
                            Error Loading Diamonds
                        </h3>
                        <p className="text-muted-foreground mt-2">{error}</p>
                        <CustomButton
                            variant="dark"
                            onClick={refetch}
                            className="mt-4"
                        >
                            Retry
                        </CustomButton>
                    </div>
                </div>
            </Container>
        );
    }

    return (
        <AdminGuard>
            <Container className="bg-[#F9FAFB]">
                {/* Header Section */}
                <h1 className="text-3xl  font-medium">Admin Dashboard</h1>
                <Breadcrumb className="my-3">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">HOME</BreadcrumbLink>{" "}
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>{"/"}</BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/admin">ADMIN</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                {/* Search and Action Buttons */}
                <div className="flex  items-start justify-between gap-5 my-5">
                    <Input
                        className="bg-white border-2 text-black px-3 py-5 text-base rounded-md max-w-xl"
                        placeholder="Search by Diamond ID, Shape, Color, Clarity, etc."
                    />
                    <div className=" flex items-center justify-start gap-6">
                        <CustomButton
                            className="bg-white hover:bg-gray-100"
                            variant="secondary"
                            icon={<DownloadIcon size={15} />}
                            onClick={handleExport}
                        >
                            Export
                        </CustomButton>
                        <CustomButton
                            className="bg-white hover:bg-gray-100"
                            variant="secondary"
                            icon={<FileTextIcon size={15} />}
                        >
                            <span>Import&nbsp;Excel</span>
                        </CustomButton>
                        <CustomButton
                            variant="dark"
                            icon={<PlusIcon size={15} />}
                            onClick={() => setIsAddModalOpen(true)}
                        >
                            <span>Add&nbsp;Diamond</span>
                        </CustomButton>
                    </div>
                </div>

                {/* Tabs Section */}
                <div className="w-full my-5">
                    <Tabs
                        value={activeTab}
                        onValueChange={setActiveTab}
                        className="w-full"
                    >
                        <TabsList className="w-full font-medium rounded-md py-6">
                            <TabsTrigger
                                value="all"
                                className="rounded-md    p-5"
                            >
                                All
                            </TabsTrigger>
                            <TabsTrigger
                                value="fancy"
                                className="rounded-md p-5"
                            >
                                Fancy
                            </TabsTrigger>
                            <TabsTrigger
                                value="highEnd"
                                className="rounded-md  p-5"
                            >
                                High End
                            </TabsTrigger>
                            <TabsTrigger
                                value="lowEnd"
                                className="rounded-md  p-5"
                            >
                                Low End
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="all">
                            {/* Stats Cards */}
                            <div className="flex items-center justify-center gap-5 my-10">
                                <StatsCard
                                    icon={GridIcon}
                                    iconColor="text-blue-500"
                                    iconBgColor="bg-blue-400/20"
                                    label="Total Diamonds"
                                    value={
                                        loading
                                            ? "..."
                                            : totalCount.toLocaleString()
                                    }
                                    subtext="All Inventory"
                                />

                                <StatsCard
                                    icon={CircleCheckBig}
                                    iconColor="text-green-500"
                                    iconBgColor="bg-green-400/20"
                                    label="Available"
                                    value={
                                        loading
                                            ? "..."
                                            : diamonds.filter(
                                                  (d) => d.isAvailable
                                              ).length
                                    }
                                    subtext="Ready for Sale"
                                />

                                <StatsCard
                                    icon={ChartColumn}
                                    iconColor="text-purple-500"
                                    iconBgColor="bg-purple-400/20"
                                    label="Total Value"
                                    value={
                                        loading
                                            ? "..."
                                            : `$${diamonds
                                                  .reduce(
                                                      (sum, d) =>
                                                          sum + (d.price || 0),
                                                      0
                                                  )
                                                  .toFixed(2)}`
                                    }
                                    subtext="Current Market Value"
                                />

                                <StatsCard
                                    icon={Ruler}
                                    iconColor="text-orange-500"
                                    iconBgColor="bg-orange-400/20"
                                    label="Total Size"
                                    value={
                                        loading
                                            ? "..."
                                            : `${diamonds
                                                  .reduce(
                                                      (sum, d) =>
                                                          sum + (d.size || 0),
                                                      0
                                                  )
                                                  .toFixed(2)} ct`
                                    }
                                    subtext="Carat Weight"
                                />
                            </div>

                            <Tabs defaultValue="tableview" className="">
                                <TabsList className="rounded-md space-x-3">
                                    <TabsTrigger
                                        value="tableview"
                                        className="rounded-md text-black p-3"
                                    >
                                        Table View
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="rapport"
                                        className="rounded-md text-black p-3"
                                    >
                                        Rapport
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="chart"
                                        className="rounded-md text-black p-3"
                                    >
                                        Chart
                                    </TabsTrigger>
                                </TabsList>

                                <TabsContent value="tableview">
                                    <Shell>
                                        <div className="flex h-full min-h-screen overflow-x-auto flex-col">
                                            <div className="flex flex-col space-y-8">
                                                <DataTable
                                                    data={diamonds}
                                                    columns={diamondColumns}
                                                    toolbar={
                                                        DiamondTableToolbar
                                                    }
                                                    pageCount={pageCount}
                                                    loading={loading}
                                                    onStateChange={
                                                        handleTableStateChange
                                                    }
                                                    paginationMeta={
                                                        paginationMeta
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </Shell>
                                </TabsContent>

                                <TabsContent value="rapport">
                                    Rappaport Unavailable
                                </TabsContent>

                                <TabsContent value="chart">
                                    Charts Not Fetched
                                </TabsContent>
                            </Tabs>
                        </TabsContent>

                        <TabsContent value="fancy">
                            {/* Fancy Diamonds Stats */}
                            <div className="flex items-center justify-center gap-5 my-10">
                                <StatsCard
                                    icon={GridIcon}
                                    iconColor="text-blue-500"
                                    iconBgColor="bg-blue-400/20"
                                    label="Fancy Diamonds (Non-RBC)"
                                    value={
                                        fancyLoading
                                            ? "..."
                                            : fancyTotalCount.toLocaleString()
                                    }
                                    subtext="Total Inventory"
                                />

                                <StatsCard
                                    icon={CircleCheckBig}
                                    iconColor="text-green-500"
                                    iconBgColor="bg-green-400/20"
                                    label="Available"
                                    value={
                                        fancyLoading
                                            ? "..."
                                            : fancyDiamonds.filter(
                                                  (d) => d.isAvailable
                                              ).length
                                    }
                                    subtext="Ready for Sale"
                                />

                                <StatsCard
                                    icon={ChartColumn}
                                    iconColor="text-purple-500"
                                    iconBgColor="bg-purple-400/20"
                                    label="Total Value"
                                    value={
                                        fancyLoading
                                            ? "..."
                                            : `$${fancyDiamonds
                                                  .reduce(
                                                      (sum, d) =>
                                                          sum + (d.price || 0),
                                                      0
                                                  )
                                                  .toFixed(2)}`
                                    }
                                    subtext="Current Market Value"
                                />

                                <StatsCard
                                    icon={Ruler}
                                    iconColor="text-orange-500"
                                    iconBgColor="bg-orange-400/20"
                                    label="Total Size"
                                    value={
                                        fancyLoading
                                            ? "..."
                                            : `${fancyDiamonds
                                                  .reduce(
                                                      (sum, d) =>
                                                          sum + (d.size || 0),
                                                      0
                                                  )
                                                  .toFixed(2)} ct`
                                    }
                                    subtext="Carat Weight"
                                />
                            </div>

                            <Shell>
                                <div className="flex h-full min-h-screen overflow-x-auto flex-col">
                                    <div className="flex flex-col space-y-8">
                                        <DataTable
                                            data={fancyDiamonds}
                                            columns={diamondColumns}
                                            toolbar={DiamondTableToolbar}
                                            pageCount={fancyPageCount}
                                            loading={fancyLoading}
                                            onStateChange={
                                                handleFancyTableStateChange
                                            }
                                            paginationMeta={fancyPaginationMeta}
                                        />
                                    </div>
                                </div>
                            </Shell>
                        </TabsContent>

                        <TabsContent value="highEnd">
                            {/* High End Diamonds Stats */}
                            <div className="flex items-center justify-center gap-5 my-10">
                                <div className="w-80 bg-white border-2 border-gray-200 rounded-xl flex flex-col justify-center items-start gap-2 px-7 py-3">
                                    <div className="w-full flex justify-between items-center">
                                        <div className="bg-blue-400/20 rounded-md p-2">
                                            <GridIcon className="text-blue-500" />
                                        </div>
                                        <TrendingUp className="text-green-400" />
                                    </div>
                                    <h1 className="text-gray-600 text-base">
                                        High End Diamonds (RBC ≤ 1ct)
                                    </h1>
                                    <h1 className="text-2xl font-semibold">
                                        {highEndLoading
                                            ? "..."
                                            : highEndTotalCount.toLocaleString()}
                                    </h1>
                                    <h1 className="text-gray-500 text-sm">
                                        Total Inventory
                                    </h1>
                                </div>
                                <div className="w-80 bg-white border-2 border-gray-200 rounded-xl flex flex-col justify-center items-start gap-2 px-7 py-3">
                                    <div className="w-full flex justify-between items-center">
                                        <div className="bg-green-400/20 rounded-md p-2">
                                            <CircleCheckBig className="text-green-500" />
                                        </div>
                                        <TrendingUp className="text-green-400" />
                                    </div>
                                    <h1 className="text-gray-600 text-base">
                                        Available
                                    </h1>
                                    <h1 className="text-2xl font-semibold">
                                        {highEndLoading
                                            ? "..."
                                            : highEndDiamonds.filter(
                                                  (d) => d.isAvailable
                                              ).length}
                                    </h1>
                                    <h1 className="text-gray-500 text-sm">
                                        Ready for Sale
                                    </h1>
                                </div>
                                <div className="w-80 bg-white border-2 border-gray-200 rounded-xl flex flex-col justify-center items-start gap-2 px-7 py-3">
                                    <div className="w-full flex justify-between items-center">
                                        <div className="bg-purple-400/20 rounded-md p-2">
                                            <ChartColumn className="text-purple-500" />
                                        </div>
                                        <TrendingUp className="text-green-400" />
                                    </div>
                                    <h1 className="text-gray-600 text-base">
                                        Total Value
                                    </h1>
                                    <h1 className="text-2xl font-semibold">
                                        $
                                        {highEndLoading
                                            ? "..."
                                            : highEndDiamonds
                                                  .reduce(
                                                      (sum, d) =>
                                                          sum + (d.price || 0),
                                                      0
                                                  )
                                                  .toFixed(2)}
                                    </h1>
                                    <h1 className="text-gray-500 text-sm">
                                        Current Market Value
                                    </h1>
                                </div>
                                <div className="w-80 bg-white border-2 border-gray-200 rounded-xl flex flex-col justify-center items-start gap-2 px-7 py-3">
                                    <div className="w-full flex justify-between items-center">
                                        <div className="bg-orange-400/20 rounded-md p-2">
                                            <Ruler className="text-orange-500" />
                                        </div>
                                        <TrendingUp className="text-green-400" />
                                    </div>
                                    <h1 className="text-gray-600 text-base">
                                        Total Size
                                    </h1>
                                    <h1 className="text-2xl font-semibold">
                                        {highEndLoading
                                            ? "..."
                                            : highEndDiamonds
                                                  .reduce(
                                                      (sum, d) =>
                                                          sum + (d.size || 0),
                                                      0
                                                  )
                                                  .toFixed(2)}{" "}
                                        ct
                                    </h1>
                                    <h1 className="text-gray-500 text-sm">
                                        Carat Weight
                                    </h1>
                                </div>
                            </div>

                            <Shell>
                                <div className="flex h-full min-h-screen overflow-x-auto flex-col">
                                    <div className="flex flex-col space-y-8">
                                        <DataTable
                                            data={highEndDiamonds}
                                            columns={diamondColumns}
                                            toolbar={DiamondTableToolbar}
                                            pageCount={highEndPageCount}
                                            loading={highEndLoading}
                                            onStateChange={
                                                handleHighEndTableStateChange
                                            }
                                            paginationMeta={
                                                highEndPaginationMeta
                                            }
                                        />
                                    </div>
                                </div>
                            </Shell>
                        </TabsContent>

                        <TabsContent value="lowEnd">
                            {/* Low End Diamonds Stats */}
                            <div className="flex items-center justify-center gap-5 my-10">
                                <div className="w-80 bg-white border-2 border-gray-200 rounded-xl flex flex-col justify-center items-start gap-2 px-7 py-3">
                                    <div className="w-full flex justify-between items-center">
                                        <div className="bg-blue-400/20 rounded-md p-2">
                                            <GridIcon className="text-blue-500" />
                                        </div>
                                        <TrendingUp className="text-green-400" />
                                    </div>
                                    <h1 className="text-gray-600 text-base">
                                        Low End Diamonds (RBC ≥ 1ct)
                                    </h1>
                                    <h1 className="text-2xl font-semibold">
                                        {lowEndLoading
                                            ? "..."
                                            : lowEndTotalCount.toLocaleString()}
                                    </h1>
                                    <h1 className="text-gray-500 text-sm">
                                        Total Inventory
                                    </h1>
                                </div>
                                <div className="w-80 bg-white border-2 border-gray-200 rounded-xl flex flex-col justify-center items-start gap-2 px-7 py-3">
                                    <div className="w-full flex justify-between items-center">
                                        <div className="bg-green-400/20 rounded-md p-2">
                                            <CircleCheckBig className="text-green-500" />
                                        </div>
                                        <TrendingUp className="text-green-400" />
                                    </div>
                                    <h1 className="text-gray-600 text-base">
                                        Available
                                    </h1>
                                    <h1 className="text-2xl font-semibold">
                                        {lowEndLoading
                                            ? "..."
                                            : lowEndDiamonds.filter(
                                                  (d) => d.isAvailable
                                              ).length}
                                    </h1>
                                    <h1 className="text-gray-500 text-sm">
                                        Ready for Sale
                                    </h1>
                                </div>
                                <div className="w-80 bg-white border-2 border-gray-200 rounded-xl flex flex-col justify-center items-start gap-2 px-7 py-3">
                                    <div className="w-full flex justify-between items-center">
                                        <div className="bg-purple-400/20 rounded-md p-2">
                                            <ChartColumn className="text-purple-500" />
                                        </div>
                                        <TrendingUp className="text-green-400" />
                                    </div>
                                    <h1 className="text-gray-600 text-base">
                                        Total Value
                                    </h1>
                                    <h1 className="text-2xl font-semibold">
                                        $
                                        {lowEndLoading
                                            ? "..."
                                            : lowEndDiamonds
                                                  .reduce(
                                                      (sum, d) =>
                                                          sum + (d.price || 0),
                                                      0
                                                  )
                                                  .toFixed(2)}
                                    </h1>
                                    <h1 className="text-gray-500 text-sm">
                                        Current Market Value
                                    </h1>
                                </div>
                                <div className="w-80 bg-white border-2 border-gray-200 rounded-xl flex flex-col justify-center items-start gap-2 px-7 py-3">
                                    <div className="w-full flex justify-between items-center">
                                        <div className="bg-orange-400/20 rounded-md p-2">
                                            <Ruler className="text-orange-500" />
                                        </div>
                                        <TrendingUp className="text-green-400" />
                                    </div>
                                    <h1 className="text-gray-600 text-base">
                                        Total Size
                                    </h1>
                                    <h1 className="text-2xl font-semibold">
                                        {lowEndLoading
                                            ? "..."
                                            : lowEndDiamonds
                                                  .reduce(
                                                      (sum, d) =>
                                                          sum + (d.size || 0),
                                                      0
                                                  )
                                                  .toFixed(2)}{" "}
                                        ct
                                    </h1>
                                    <h1 className="text-gray-500 text-sm">
                                        Carat Weight
                                    </h1>
                                </div>
                            </div>

                            <Shell>
                                <div className="flex h-full min-h-screen overflow-x-auto flex-col">
                                    <div className="flex flex-col space-y-8">
                                        <DataTable
                                            data={lowEndDiamonds}
                                            columns={diamondColumns}
                                            toolbar={DiamondTableToolbar}
                                            pageCount={lowEndPageCount}
                                            loading={lowEndLoading}
                                            onStateChange={
                                                handleLowEndTableStateChange
                                            }
                                            paginationMeta={
                                                lowEndPaginationMeta
                                            }
                                        />
                                    </div>
                                </div>
                            </Shell>
                        </TabsContent>
                    </Tabs>
                </div>

                {/* Add Diamond Modal */}
                <AddDiamondModal
                    isOpen={isAddModalOpen}
                    onClose={() => setIsAddModalOpen(false)}
                    onSuccess={handleAddDiamondSuccess}
                />
            </Container>
        </AdminGuard>
    );
}
