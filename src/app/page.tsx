import DiamondCards from "@/components/landing/certificates";
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
        title: "Certified Diamonds",
        imageUrl: "/assets/diamond-img-1.png", // Replace with your actual image path
        buttonText: "Explore Inventory",
    },
    {
        id: 2,
        title: "Fancy Cut Diamonds",
        imageUrl: "/assets/fancyCut-img.png", // Replace with your actual image path
        buttonText: "Explore Inventory",
    },
];
const gridCardsData2 = [
    {
        id: 1,
        title: "Matched Diamond Pairs ",
        imageUrl: "/assets/diamond2-img.png", // Replace with your actual image path
        buttonText: "Explore Inventory",
    },
    {
        id: 2,
        title: "Matched Diamond Parcels",
        imageUrl: "/assets/diamond-parcel.jpeg", // Replace with your actual image path
        buttonText: "Explore Inventory",
    },
];

const HomePage = () => {
    return (
        <div>
            {/* <Navbar /> */}
            {/* Hero Section */}
            <div className="relative max-lg:py-30 lg:min-h-screen flex items-center justify-center overflow-hidden">
                {/* Background Images Container */}
                <div className="absolute inset-0 flex">
                    {/* Left Image */}
                    <div className="relative w-1/2 h-full">
                        <Image
                            src={"/assets/hero-1.png"}
                            alt="Hero Background1"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    {/* Right Image */}
                    <div className="relative w-1/2 h-full">
                        <Image
                            src={"/assets/hero-3.png"}
                            alt="Hero Background2"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>
                {/* Overlay for better text readability */}
                <div className="absolute inset-0 bg-black/50 z-15"></div>

                {/* Centered Content */}
                <div className="relative z-20 text-center px-6 max-w-6xl mx-auto">
                    <Title className="mb-6">
                        Certified Diamonds & Non Certified Diamond Designed for
                        Business
                    </Title>
                    <Description className="mb-8">
                        From ethically sourced stones to — built for traders,
                        retailers, and private labels worldwide.
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

            <section className="md:min-h-screen flex flex-col lg:flex-row">
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
                        src={"/assets/diamond-4copy.png"}
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
            <DiamondCards />

            <Testimonial />
            <Footer />
        </div>
    );
};

export default HomePage;
