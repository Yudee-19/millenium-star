import Footer from "@/components/landing/footer";
import GridSection from "@/components/landing/gridSection";
import Navbar from "@/components/landing/header";
import Testimonial from "@/components/landing/testimonial";
import { Button } from "@/components/ui/button";
import { Description, Title } from "@/components/ui/typography";
import Image from "next/image";
import React from "react";

const gridCardsData1 = [
    {
        id: 1,
        title: "Loose Certified Diamonds",
        imageUrl: "/assets/diamond-img-1.png", // Replace with your actual image path
        buttonText: "Order Now",
    },
    {
        id: 2,
        title: "Custom Cut Diamonds",
        imageUrl: "/assets/diamond-img-2.png", // Replace with your actual image path
        buttonText: "Order Now",
    },
    {
        id: 3,
        title: "Jewellery-Ready Stones",
        imageUrl: "/assets/diamond-img-3.png", // Replace with your actual image path
        buttonText: "Order Now",
    },
];
const gridCardsData2 = [
    {
        id: 1,
        title: "Fancy Cut Diamonds",
        imageUrl: "/assets/diamond-img-1.png", // Replace with your actual image path
        buttonText: "Order Now",
    },
    {
        id: 2,
        title: "Matched Diamond Pairs & Parcels",
        imageUrl: "/assets/diamond-img-2.png", // Replace with your actual image path
        buttonText: "Order Now",
    },
    {
        id: 3,
        title: "Rose Cut & Antique Cuts",
        imageUrl: "/assets/diamond-img-3.png", // Replace with your actual image path
        buttonText: "Order Now",
    },
];

const HomePage = () => {
    return (
        <div>
            <Navbar />
            {/* Hero Section */}
            <div className="relative min-h-screen flex items-center justify-center">
                <Image
                    src={"/assets/hero-bg.png"}
                    alt="Hero Background"
                    fill
                    className="object-cover z-10"
                    priority
                />
                {/* Overlay for better text readability */}
                <div className="absolute inset-0 bg-black/10 z-15"></div>

                {/* Centered Content */}
                <div className="relative z-20 text-center px-6 max-w-6xl mx-auto">
                    <Title className="mb-6">
                        Certified Diamonds, Designed for Business
                    </Title>
                    <Description className="mb-8">
                        From ethically sourced stones to retail-ready jewellery
                        — built for traders, retailers, and private labels
                        worldwide.
                    </Description>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button className="bg-white cursor-pointer text-gray-900 px-8 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors">
                            Partner With Us
                        </button>
                        <button className="border  border-white text-white px-8 py-3 rounded-md font-medium hover:bg-white/10 transition-colors">
                            Request Quote
                        </button>
                    </div>
                </div>
            </div>

            {/* Grid Section */}
            <GridSection gridData={gridCardsData1}>
                <Title className="lg:text-5xl md:text-4xl text-3xl font-medium text-[#1E1E1E]">
                    Your Trusted B2B Diamond Supplier
                </Title>
            </GridSection>

            <section className="min-h-screen flex flex-col lg:flex-row">
                {/* Left Content Column */}
                <div className="lg:w-1/2 bg-[#A6A6A6] text-white flex items-center justify-center p-8 sm:p-16 lg:p-20 order-2 lg:order-1">
                    <div className="">
                        <h2 className="text-4xl md:text-5xl font-medium font-['Gloock'] leading-tight tracking-tight mb-3">
                            Retail-Ready Diamonds. Trusted Globally.
                        </h2>
                        <p className="font-['Roboto'] text-lg font-light leading-relaxed mb-8 opacity-90">
                            Serving hundreds of retailers and exporters with
                            consistently graded stones and private-label
                            jewellery manufacturing.
                        </p>
                        <button className="inline-flex text-md cursor-pointer items-center gap-2 bg-transparent text-white px-6 py-3 rounded-md font-medium border-2 border-white ">
                            Book a consultation
                        </button>
                    </div>
                </div>

                {/* Right Image Column */}
                <div className="lg:w-1/2 h-80 lg:h-auto min-h-[300px] relative order-1 lg:order-2">
                    <Image
                        src={"/assets/diamond-4.jpg"}
                        alt="Close-up of a large, sparkling diamond held by tweezers"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            </section>

            <GridSection gridData={gridCardsData2}>
                <Title className="lg:text-5xl md:text-4xl text-3xl font-medium text-[#1E1E1E]">
                    Your Trusted B2B Diamond Supplier
                </Title>
            </GridSection>

            <Testimonial />
            <Footer />
        </div>
    );
};

export default HomePage;
