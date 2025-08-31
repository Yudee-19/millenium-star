import { DiamondDetailClient } from "./diamond-detail-client";

interface PageProps {
    params: Promise<{ diamondId: string }>;
}

// Generate static params for all diamonds
export async function generateStaticParams() {
    try {
        const baseURL =
            process.env.NEXT_PUBLIC_BASE_URL ||
            "https://millennium-star-inventory-service-dev.caratlogic.com/api";
        const response = await fetch(`${baseURL}/diamonds/all`, {
            credentials: "include",
        });
        console.log("Response:", response);

        if (!response.ok) {
            return [];
        }

        const diamondIds = await response.json();

        return diamondIds.map((id: string) => ({
            diamondId: id,
        }));
    } catch (error) {
        console.error("Error generating static params:", error);
        return [];
    }
}

export default async function DiamondDetailPage({ params }: PageProps) {
    const { diamondId } = await params;

    return <DiamondDetailClient diamondId={diamondId} />;
}
