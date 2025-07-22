import Image from "next/image";
import React from "react";
import cert1 from "../../../public/assets/cert1.jpg";
import cert2 from "../../../public/assets/cert2.jpg";
import cert3 from "../../../public/assets/cert3.jpg";
import { Playfair_Display, Open_Sans } from "next/font/google";

const playfairDisplay = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

const openSans = Open_Sans({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});

// Certificate data array
const certificateData = [
    {
        id: 1,
        image: cert1,
        title: "GIA CERTIFICATE",
        description:
            "When purchasing a diamond, we pay close attention to its grading. The grading certificate serves as the diamond's identity card and to a...",
        alt: "GIA Certificate",
    },
    {
        id: 2,
        image: cert2,
        title: "IGI CERTIFICATE",
        description:
            "The most authoritative diamond grading institution in the world is the Gemological Institute of America (GIA). In addition to GIA, there are...",
        alt: "IGI Certificate",
    },
    {
        id: 3,
        image: cert3,
        title: "HRD CERTIFICATE",
        description:
            "The HRD certificate is a diamond grade certificate issued by the Belgian Diamond High Council. What is the Belgian Diamond High Council? As...",
        alt: "HRD Certificate",
    },
];

const DiamondCards = () => {
    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h1
                        className={`text-3xl sm:text-4xl lg:text-5xl font-semibold ${playfairDisplay.className} text-gray-900 mb-4`}
                    >
                        DIAMOND KNOWLEDGE
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
                    {certificateData.map((certificate) => (
                        <div
                            key={certificate.id}
                            className="group bg-white rounded-lg hover:shadow-lg transition-all duration-500 overflow-hidden border "
                        >
                            {/* Certificate Image */}
                            <div className="relative aspect-[4/3] overflow-hidden">
                                <Image
                                    src={certificate.image}
                                    alt={certificate.alt}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>

                            {/* Card Content */}
                            <div className="p-6 lg:p-8">
                                {/* Certificate Title */}
                                <h2
                                    className={`text-xl lg:text-2xl font-semibold mb-4 ${playfairDisplay.className} text-gray-900  transition-colors duration-300`}
                                >
                                    {certificate.title}
                                </h2>

                                {/* Certificate Description */}
                                <p
                                    className={`text-gray-600 text-sm lg:text-base leading-relaxed mb-6 ${openSans.className}`}
                                >
                                    {certificate.description}
                                </p>

                                {/* View All Link */}
                                <button
                                    className={`inline-flex items-center text-amber-600 font-medium ${openSans.className} hover:text-amber-700 transition-colors duration-200 group/link`}
                                >
                                    <span>Learn More</span>
                                    <svg
                                        className="ml-2 w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-200"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default DiamondCards;
