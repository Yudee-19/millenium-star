"use client";

import React from "react";
import { Playfair_Display, Inter } from "next/font/google";
import Image from "next/image";
import HeroImage from "@/../public/assets/abouHero.jpg";
import { Button } from "@/components/ui/button";
import Footer from "@/components/landing/footer";

const playFair = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

const inter = Inter({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});

const AboutUs = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Our Legacy Section */}
            <section className="relative">
                <Image
                    src={HeroImage}
                    width={1200}
                    height={600}
                    sizes="(max-width: 768px) 100vw, (min-width: 769px) 50vw"
                    alt="Legacy Image"
                    className="w-full lg:h-[350px] h-auto object-cover "
                />
                <h1 className="text-3xl md:text-5xl text-white font-semibold font-playfair absolute left-20 top-1/2 -translate-y-1/2 ">
                    OUR DIAMONDS
                </h1>
            </section>
            <Footer />
        </div>
    );
};

export default AboutUs;
