import { columns } from "@/components/data-table/columns";
import { DataTable } from "@/components/data-table/data-table";
import { SiteHeader } from "@/components/layout/site-header";
import { Shell } from "@/components/shells/shell";
import Container from "@/components/ui/container";
import CustomButton from "@/components/ui/customButton";
import { Input } from "@/components/ui/input";
import { sampleTasks } from "@/lib/data/sample-tasks";
import { DownloadIcon, FileTextIcon, FunnelPlus, PlusIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TaskPage() {
    return (
        <Container>
            {/* Header Section */}
            <SiteHeader />
            {/* Navbar Buttons */}
            <div className="flex items-center justify-evenly gap-2 my-5 ">
                <CustomButton variant="primary">Inventory</CustomButton>
                <CustomButton variant="secondary">Application</CustomButton>
                <CustomButton variant="secondary">Rapnet</CustomButton>
                {/* <label htmlFor="search" className="sr-only"> */}
                <Input
                    className="  bg-black/5 text-sky-950  px-3 py-3 text-base rounded-full"
                    placeholder="Search by Diamond ID, Shape, Color, Clarity, etc."
                />
                {/* </label> */}
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
                <CustomButton variant="primary" icon={<PlusIcon size={15} />}>
                    <span>Add&nbsp;Diamond</span>
                </CustomButton>
            </div>
            {/* Tabs Section */}
            <div className="w-full my-5">
                <Tabs defaultValue="all" className="w-full">
                    <TabsList className="w-full rounded-full">
                        <TabsTrigger
                            value="all"
                            className="rounded-full text-sky-950"
                        >
                            All
                        </TabsTrigger>
                        <TabsTrigger
                            value="fancy"
                            className="rounded-full text-sky-950"
                        >
                            Fancy
                        </TabsTrigger>
                        <TabsTrigger
                            value="labGrown"
                            className="rounded-full text-sky-950"
                        >
                            Lab&nbsp;Grown
                        </TabsTrigger>
                        <TabsTrigger
                            value="highEnd"
                            className="rounded-full text-sky-950"
                        >
                            High-End
                        </TabsTrigger>
                        <TabsTrigger
                            value="lowEnd"
                            className="rounded-full text-sky-950"
                        >
                            Low-End
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent
                        value="all"
                        className="rounded-full text-sky-950"
                    >
                        {/* Table MetaDeta */}
                        <div className="w-full flex items-center justify-between gap-5 my-5">
                            <div className=" w-80 h-28 bg-neutral-300/20 rounded-xl flex flex-col justify-center items-start gap-2 px-7">
                                <h1 className="text-sky-950 text-base ">
                                    Total Diamonds (All Inventory)
                                </h1>
                                <h1 className="text-blue-700 text-2xl font-semibold ">
                                    100
                                </h1>
                            </div>
                            <div className=" w-80 h-28 bg-neutral-300/20 rounded-xl flex flex-col justify-center items-start gap-2 px-7">
                                <h1 className="text-sky-950 text-base ">
                                    Available
                                </h1>
                                <h1 className="text-blue-700 text-2xl font-semibold ">
                                    50
                                </h1>
                            </div>
                            <div className=" w-80 h-28 bg-neutral-300/20 rounded-xl flex flex-col justify-center items-start gap-2 px-7">
                                <h1 className="text-sky-950 text-base ">
                                    Total Value
                                </h1>
                                <h1 className="text-blue-700 text-2xl font-semibold ">
                                    $12,12,122
                                </h1>
                            </div>
                            <div className=" w-80 h-28 bg-neutral-300/20 rounded-xl flex flex-col justify-center items-start gap-2 px-7">
                                <h1 className="text-sky-950 text-base ">
                                    Avg. Size
                                </h1>
                                <h1 className="text-blue-700 text-2xl font-semibold ">
                                    3.42 ct
                                </h1>
                            </div>
                        </div>

                        <Tabs defaultValue="tableview" className="">
                            <TabsList className="rounded-full space-x-3">
                                <TabsTrigger
                                    value="tableview"
                                    className=" rounded-full text-sky-950 p-3"
                                >
                                    Table View
                                </TabsTrigger>
                                <TabsTrigger
                                    value="rapport"
                                    className=" rounded-full text-sky-950 p-3"
                                >
                                    Rapport
                                </TabsTrigger>
                                <TabsTrigger
                                    value="chart"
                                    className=" rounded-full text-sky-950 p-3"
                                >
                                    Chart
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="tableview">
                                <Shell>
                                    <div className="flex h-full min-h-screen w-full flex-col">
                                        <div className="flex flex-col space-y-8">
                                            <DataTable
                                                data={sampleTasks}
                                                columns={columns}
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
                    <TabsContent
                        value="fancy"
                        className="rounded-full text-sky-950"
                    >
                        Data Unavailable Now
                    </TabsContent>
                    <TabsContent
                        value="labGrown"
                        className="rounded-full text-sky-950"
                    >
                        Data Unavailable Now
                    </TabsContent>
                    <TabsContent
                        value="highEnd"
                        className="rounded-full text-sky-950"
                    >
                        Data Unavailable Now
                    </TabsContent>
                    <TabsContent
                        value="lowEnd"
                        className="rounded-full text-sky-950"
                    >
                        Data Unavailable Now
                    </TabsContent>
                </Tabs>
            </div>
        </Container>
    );
}
