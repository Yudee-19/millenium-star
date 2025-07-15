import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
interface CardData {
    id: number;
    title: string;
    imageUrl: string;
    buttonText?: string; // Optional if it might not always be present
}
const GridSection = ({
    children,
    className,
    gridData,
}: {
    children?: React.ReactNode;
    className?: string;
    gridData: CardData[];
}) => {
    return (
        <div
            className={cn(
                "w-full py-20 px-6 bg-[#F4F4F5] inline-flex flex-col justify-center items-center gap-5",
                className
            )}
        >
            {children}
            <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-stretch gap-6 lg:gap-8">
                    {gridData.map((card) => (
                        <GridCard
                            key={card.id}
                            title={card.title}
                            imageUrl={card.imageUrl}
                            buttonText={card.buttonText}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GridSection;

interface GridCardProps {
    title: string;
    imageUrl: string;
    buttonText?: string;
    onButtonClick?: () => void;
}

export const GridCard = ({
    title,
    imageUrl,
    buttonText = "Order Now",
    onButtonClick,
}: GridCardProps) => {
    return (
        <div className="flex-1 min-w-[280px] h-[480px] group  transform transition-all duration-300 hover:-translate-y-2 hover:scale-105">
            <div className=" h-full flex flex-col justify-center items-center gap-6 p-4">
                {/* Image Container */}
                <div className="relative self-stretch flex-1 overflow-hidden rounded-lg shadow-md group-hover:shadow-xl transition-shadow duration-300">
                    <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                </div>

                {/* Title */}
                <div className="self-stretch text-center text-black/80 text-xl font-light  group-hover:text-black transition-colors duration-300">
                    {title}
                </div>

                {/* Button */}
                <Link href="#" className="cursor-pointer">
                    <Button className="rounded-sm cursor-pointer">
                        {buttonText}
                    </Button>
                </Link>
            </div>
        </div>
    );
};
