"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface GridSectionProps {
    children?: React.ReactNode;
    className?: string;
    gridData: {
        id: number;
        title: string;
        imageUrl: string;
        buttonText?: string;
    }[];
}

const GridSection = ({ children, className, gridData }: GridSectionProps) => {
    // Calculate grid columns based on data length
    const getGridCols = () => {
        const dataLength = gridData.length;

        if (dataLength === 1) {
            return "grid-cols-1";
        } else if (dataLength === 2) {
            return "grid-cols-1 md:grid-cols-2 lg:grid-cols-2";
        } else {
            // For 3 or more items, max 3 columns
            return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
        }
    };

    return (
        <section className={cn("my-0 py-20 px-6 bg-[#F4F4F5]", className)}>
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                {children && <div className="text-center mb-1">{children}</div>}

                {/* Cards Grid - Dynamic columns based on data length */}
                <div
                    className={cn(
                        "grid  max-w-5xl max-h-fit gap-12 p-10 md:p-30",
                        getGridCols()
                    )}
                >
                    {gridData.map((card) => (
                        <GridCard
                            key={card.id}
                            title={card.title}
                            imageUrl={card.imageUrl}
                            buttonText={card.buttonText}
                            onButtonClick={() =>
                                console.log(`${card.title} clicked`)
                            }
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GridSection;

interface GridCardProps {
    title: string;
    imageUrl: string;
    buttonText?: string;
    onButtonClick?: () => void;
    usePlaceholder?: boolean;
}

export const GridCard = ({
    title,
    imageUrl,
    buttonText = "Order Now",
    onButtonClick,
    usePlaceholder = false,
}: GridCardProps) => {
    return (
        <div className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            {/* Image Container */}
            <div className="aspect-square relative overflow-hidden">
                {usePlaceholder ? (
                    // Placeholder with diamond icon
                    <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-full">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-6xl text-gray-400 group-hover:text-gray-500 transition-colors duration-300">
                                💎
                            </div>
                        </div>
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
                    </div>
                ) : (
                    // Actual image
                    <>
                        <Image
                            src={imageUrl}
                            alt={title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
                    </>
                )}
            </div>

            {/* Content */}
            <div className="p-6 text-center">
                <h3 className="text-xl font-light text-gray-900 mb-4">
                    {title}
                </h3>
                <button
                    onClick={onButtonClick}
                    className="bg-gray-800 text-white px-6 py-2 rounded-md font-medium hover:bg-gray-700 transition-colors duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                    {buttonText}
                </button>
            </div>
        </div>
    );
};
