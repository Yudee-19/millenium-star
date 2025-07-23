import DiamondCards from "@/components/landing/certificates";
import Footer from "@/components/landing/footer";
import GridSection from "@/components/landing/gridSection";
import Navbar from "@/components/landing/header";
import HeroSection from "@/components/landing/heroSection";
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
            <HeroSection />

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
                        <a href="/contact">
                            <button className="inline-flex text-md cursor-pointer items-center gap-2 bg-transparent text-white px-6 py-3 rounded-md font-medium border-2 border-white ">
                                Book a consultation
                            </button>
                        </a>
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
