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
import { DownloadIcon, FileTextIcon, FunnelPlus, PlusIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AddDiamondModal } from "@/components/modals/add-diamond";
import { AdminGuard } from "@/components/auth/routeGuard";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

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

    // Modal state
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    // Handle table state changes
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

    // Handle successful diamond addition
    const handleAddDiamondSuccess = () => {
        console.log("✅ Diamond added successfully");
        refetch(); // Refresh the table data
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
            <Container>
                {/* Header Section */}
                <div className="flex items-center justify-between mb-6">
                    <SiteHeader />
                    <div className="flex items-center space-x-4 h-16  border-b">
                        {/* Add navigation to inventory for admin */}
                        {/* <a href="/inventory">
                            <Button variant="outline">View Inventory</Button>
                        </a> */}
                        <a href="/admin/members-enquiry">
                            <Button variant="outline">Member Enquiry</Button>
                        </a>
                        <Button
                            onClick={logout}
                            variant="outline"
                            className="text-red-600 hover:text-red-700"
                        >
                            Logout
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            className="bg-gray-900 hover:bg-gray-900 border-none p-4 text-white hover:text-white rounded-full space-x-2 flex justify-center items-center"
                        >
                            <div className="h-5 w-5 bg-white/50 hover:bg-white/50 rounded-full"></div>
                            {user?.username || "User"}
                        </Button>
                    </div>
                </div>

                {/* Search and Action Buttons */}
                <div className="flex items-center justify-center gap-2 my-5">
                    <Input
                        className="bg-black/5 text-sky-950 px-3 py-3 text-base rounded-full"
                        placeholder="Search by Diamond ID, Shape, Color, Clarity, etc."
                    />
                    <CustomButton
                        variant="secondary"
                        icon={<FunnelPlus size={15} />}
                    >
                        Filter
                    </CustomButton>
                    <CustomButton
                        variant="secondary"
                        icon={<DownloadIcon size={15} />}
                    >
                        Export
                    </CustomButton>
                    <CustomButton
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

                {/* Tabs Section */}
                <div className="w-full my-5">
                    <Tabs defaultValue="all" className="w-full">
                        <TabsList className="w-full rounded-full">
                            <TabsTrigger
                                value="all"
                                className="rounded-full text-sky-950 p-3"
                            >
                                All
                            </TabsTrigger>
                            <TabsTrigger
                                value="fancy"
                                className="rounded-full text-sky-950 p-3"
                            >
                                Fancy
                            </TabsTrigger>
                            <TabsTrigger
                                value="highEnd"
                                className="rounded-full text-sky-950 p-3"
                            >
                                High End
                            </TabsTrigger>
                            <TabsTrigger
                                value="lowEnd"
                                className="rounded-full text-sky-950 p-3"
                            >
                                Low End
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="all">
                            {/* Stats Cards */}
                            <div className="flex items-center justify-center gap-5 my-10">
                                <div className="w-80 h-28 bg-neutral-300/20 rounded-xl flex flex-col justify-center items-start gap-2 px-7">
                                    <h1 className="text-sky-950 text-base">
                                        Total Diamonds (All Inventory)
                                    </h1>
                                    <h1 className="text-2xl font-semibold">
                                        {loading
                                            ? "..."
                                            : totalCount.toLocaleString()}
                                    </h1>
                                </div>
                                <div className="w-80 h-28 bg-neutral-300/20 rounded-xl flex flex-col justify-center items-start gap-2 px-7">
                                    <h1 className="text-sky-950 text-base">
                                        Available
                                    </h1>
                                    <h1 className="text-2xl font-semibold">
                                        {loading
                                            ? "..."
                                            : diamonds.filter(
                                                  (d) => d.isAvailable
                                              ).length}
                                    </h1>
                                </div>
                                <div className="w-80 h-28 bg-neutral-300/20 rounded-xl flex flex-col justify-center items-start gap-2 px-7">
                                    <h1 className="text-sky-950 text-base">
                                        Total Value
                                    </h1>
                                    <h1 className="text-2xl font-semibold">
                                        $
                                        {loading
                                            ? "..."
                                            : diamonds
                                                  .reduce(
                                                      (sum, d) =>
                                                          sum + (d.price || 0),
                                                      0
                                                  )
                                                  .toFixed(2)}{" "}
                                    </h1>
                                </div>
                                <div className="w-80 h-28 bg-neutral-300/20 rounded-xl flex flex-col justify-center items-start gap-2 px-7">
                                    <h1 className="text-sky-950 text-base">
                                        Total Size
                                    </h1>
                                    <h1 className="text-2xl font-semibold">
                                        {loading
                                            ? "..."
                                            : diamonds
                                                  .reduce(
                                                      (sum, d) =>
                                                          sum + (d.size || 0),
                                                      0
                                                  )
                                                  .toFixed(2)}{" "}
                                        ct
                                    </h1>
                                </div>
                            </div>

                            <Tabs defaultValue="tableview" className="">
                                <TabsList className="rounded-full space-x-3">
                                    <TabsTrigger
                                        value="tableview"
                                        className="rounded-full text-sky-950 p-3"
                                    >
                                        Table View
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="rapport"
                                        className="rounded-full text-sky-950 p-3"
                                    >
                                        Rapport
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="chart"
                                        className="rounded-full text-sky-950 p-3"
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
                            Data Unavailable Now
                        </TabsContent>
                        <TabsContent value="highEnd">
                            Data Unavailable Now
                        </TabsContent>
                        <TabsContent value="lowEnd">
                            Data Unavailable Now
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
