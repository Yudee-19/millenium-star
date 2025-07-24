"use client";

import React from "react";
import { Playfair_Display, Inter } from "next/font/google";
import Image from "next/image";

const playFair = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

const inter = Inter({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});

interface ContentItem {
    id: number;
    title: string;
    content: string;
    image: string;
}

interface ContentSectionProps {
    data: ContentItem[];
}

const ContentSection: React.FC<ContentSectionProps> = ({ data }) => {
    return (
        <div className="max-w-6xl mx-auto space-y-20">
            {data.map((item, index) => {
                const isOdd = index % 2 === 0;

                return (
                    <div
                        key={item.id}
                        className="flex flex-col lg:flex-row items-center justify-center lg:items-center gap-8 lg:gap-12"
                    >
                        {/* Image section */}
                        <div
                            className={`relative w-full lg:w-1/2 ${
                                isOdd ? "lg:order-1" : "lg:order-2"
                            }`}
                        >
                            <div className="relative aspect-[4/3] w-full max-w-lg mx-auto">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover rounded-lg shadow-lg"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 500px"
                                    quality={95}
                                    priority={index < 2}
                                />
                            </div>
                        </div>

                        {/* Content section */}
                        <div
                            className={`w-full lg:w-1/2 text-left px-4 lg:px-8 ${
                                isOdd ? "lg:order-2" : "lg:order-1"
                            }`}
                        >
                            <h2
                                className={`text-3xl lg:text-4xl font-semibold mb-4 lg:mb-6 ${playFair.className}`}
                            >
                                {item.title}
                            </h2>
                            <p
                                className={`text-base lg:text-lg text-gray-700 leading-relaxed ${inter.className}`}
                            >
                                {item.content}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ContentSection;
