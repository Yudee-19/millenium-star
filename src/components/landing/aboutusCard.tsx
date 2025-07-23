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
                const isOdd = index % 2 === 0; // 0-based index, so 0,2,4... are "odd positions"

                return (
                    <div
                        key={item.id}
                        className="flex flex-col lg:flex-row items-center justify-center lg:items-center gap-2"
                    >
                        {/* Image section */}
                        <div
                            className={`bg-gray-200 rounded-lg shadow-lg flex items-center justify-center mx-auto ${
                                isOdd ? "lg:order-1" : "lg:order-2"
                            }`}
                        >
                            <Image
                                src={item.image}
                                alt={item.title}
                                width={300}
                                height={300}
                                className="w-fit md:w-130 lg:w-154 h-100 md:h-78 lg:h-111 object-cover rounded-lg"
                                sizes="(max-width: 768px) 128px, (max-width: 1024px) 160px, 192px"
                            />
                        </div>

                        {/* Content section */}
                        <div
                            className={`flex-1 text-left lg:text-left px-10 ${
                                isOdd ? "lg:order-2" : "lg:order-1"
                            }`}
                        >
                            <h2
                                className={`text-3xl lg:text-4xl font-semibold mb-4 lg:mb-6 ${playFair.className}`}
                            >
                                {item.title}
                            </h2>
                            <p
                                className={`text-base lg:text-lg text-gray-700 leading-relaxed max-w-none lg:max-w-none ${inter.className}`}
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
