"use client";

import Image from "next/image";
import React, { useState } from "react";
import cert1 from "../../../public/assets/cert-1.jpg";
import cert2 from "../../../public/assets/cert-2.webp";
import cert3 from "../../../public/assets/hrd-cert.png";
import { Playfair_Display, Open_Sans } from "next/font/google";
import { Button } from "../ui/button";

const playfairDisplay = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

const openSans = Open_Sans({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});

// Certificate data array with expanded content
const certificateData = [
    {
        id: 1,
        image: cert1,
        title: "GIA CERTIFICATE",
        fullDescription:
            "GIA certificates are the gold standard for diamond grading, detailing a diamond's quality based on the 4Cs (Color, Clarity, Cut, Carat Weight). Established in 1931, GIA is a nonprofit authority ensuring unbiased, accurate assessments through rigorous processes. Their certificates provide trusted authenticity and quality assurance for buyers and sellers globally.",
        alt: "GIA Certificate",
    },
    {
        id: 2,
        image: cert2,
        title: "IGI CERTIFICATE",

        fullDescription:
            "IGI, established in 1975, is a major global gemological laboratory known for reliable diamond and gemstone grading. Popular in Asian and European markets, their certificates detail diamond quality using advanced technology. IGI is committed to innovation, offering comprehensive documentation for authenticity and characteristics.",
        alt: "IGI Certificate",
    },
    {
        id: 3,
        image: cert3,
        title: "HRD CERTIFICATE",
        fullDescription:
            "HRD Antwerp, a leading European gemological institute since 1973, issues highly respected diamond certificates. Renowned for rigorous scientific grading, HRD uses advanced techniques to assess a diamond's quality, origin, and treatment history. Their certificates offer comprehensive, secure, and verifiable documentation, preventing fraud in the diamond trade.",
        alt: "HRD Certificate",
    },
];

const DiamondCards = () => {
    const [expandedCards, setExpandedCards] = useState<{
        [key: number]: boolean;
    }>({});

    const toggleExpanded = (cardId: number) => {
        setExpandedCards((prev) => ({
            ...prev,
            [cardId]: !prev[cardId],
        }));
    };

    const truncateText = (text: string, maxLength: number = 150) => {
        if (text.length <= maxLength) return text;
        return text.substr(0, maxLength).trim() + "...";
    };

    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h1
                        className={`text-3xl sm:text-4xl lg:text-5xl font-semibold ${playfairDisplay.className} text-gray-900 mb-4`}
                    >
                        DIAMOND CERTIFICATES
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-amber-600 to-amber-400 mx-auto rounded-full"></div>
                    <p
                        className={`mt-6 text-lg text-gray-600 max-w-2xl mx-auto ${openSans.className}`}
                    >
                        Understanding diamond certificates and grading standards
                        from the world's most trusted institutions
                    </p>
                </div>

                {/* Certificate Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                    {certificateData.map((certificate) => {
                        const isExpanded = expandedCards[certificate.id];

                        return (
                            <div
                                key={certificate.id}
                                className="group bg-white rounded-lg hover:shadow-lg transition-all duration-500 overflow-hidden border"
                            >
                                {/* Certificate Image */}
                                <div className="relative aspect-[4/3] overflow-hidden">
                                    <Image
                                        src={certificate.image}
                                        alt={certificate.alt}
                                        fill
                                        priority
                                        quality={100}
                                        className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>

                                {/* Card Content */}
                                <div className="p-6 lg:p-8">
                                    {/* Certificate Title */}
                                    <h2
                                        className={`text-xl lg:text-2xl font-semibold mb-4 ${playfairDisplay.className} text-gray-900 transition-colors duration-300`}
                                    >
                                        {certificate.title}
                                    </h2>

                                    {/* Certificate Description */}
                                    <div
                                        className={`text-gray-600 text-sm lg:text-base leading-relaxed mb-6 ${openSans.className} transition-all duration-300`}
                                    >
                                        {isExpanded ? (
                                            <div className="whitespace-pre-line">
                                                {certificate.fullDescription}
                                            </div>
                                        ) : (
                                            <p>
                                                {truncateText(
                                                    certificate.fullDescription,
                                                    150
                                                )}
                                            </p>
                                        )}
                                    </div>

                                    {/* Learn More / Show Less Button */}
                                    <div className="flex justify-between items-center">
                                        <button
                                            onClick={() =>
                                                toggleExpanded(certificate.id)
                                            }
                                            className={`inline-flex items-center text-[#B99673] font-medium ${openSans.className} hover:text-[#B99673] transition-colors duration-200 group/link`}
                                        >
                                            <span>
                                                {isExpanded
                                                    ? "Show Less"
                                                    : "Learn More"}
                                            </span>
                                            <svg
                                                className={`ml-2 w-4 h-4 transition-transform duration-200 ${
                                                    isExpanded
                                                        ? "rotate-180"
                                                        : "group-hover/link:translate-x-1"
                                                }`}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                {isExpanded ? (
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M5 15l7-7 7 7"
                                                    />
                                                ) : (
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M9 5l7 7-7 7"
                                                    />
                                                )}
                                            </svg>
                                        </button>
                                        <a href="/diamond-knowledge">
                                            <Button className="bg-white border border-[#B99673] text-[#B99673] hover:bg-white/80 transition-colors duration-200">
                                                Learn about Diamonds
                                            </Button>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default DiamondCards;
