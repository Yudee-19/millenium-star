import { NextResponse } from "next/server";
import { sampleTasks } from "@/lib/data/sample-tasks";

export async function GET() {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json(sampleTasks);
}
