import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import ConditionalHeader from "@/components/layout/ConditionalHeader"; // Import the new component
import { Toaster } from "sonner";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});
const playfair = Playfair_Display({
    variable: "--font-playfair",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Millennium Star",
    description: "Diamond Inventory Management",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${inter.variable} ${playfair.variable} antialiased`}
            >
                <ConditionalHeader /> {/* Use the conditional header here */}
                {children}
            </body>
        </html>
    );
}
