"use client";

import React from "react";
import Image from "next/image";
import HeroImage from "@/../public/assets/abouHero.jpg";
import Footer from "@/components/landing/footer";
import Container from "@/components/ui/container";

import image1 from "../../../public/assets/aboutus-diamond1.png";
import image2 from "../../../public/assets/aboutus-diamond2.png";
import image3 from "../../../public/assets/aboutus-diamond3.png";
import ContentSection from "@/components/landing/aboutusCard";
// Data for the content sections
// Data for the content sections
const aboutUsData = [
    {
        id: 1,
        title: "the4Cs",
        content:
            "Diamonds come in different shapes, sizes, color and clarity. No two diamonds are exactly alike i.e each diamond is unique.\n\nThe 4 C's of diamond (Carat, Color, Clarity, Cut) provide a universal method for assessing diamonds characteristics thereby making each diamond distinctive/ exclusive and special. The 4C is now a universal language that helps to communicate diamond quality, decide the value of the diamond and also helps the customer understand what they are buying.",
        image: "/assets/aboutUs1.jpg",
    },
    {
        id: 2,
        title: "Carat",
        content:
            "The weight of diamond is expressed in carat. One carat equals 200 milligrams or 2 grams. Each carat is also sub divided into 100 points that allow precise measurement of diamonds to the hundredth decimal place. For instance a diamond that weighs .50 carat can also be referred as 50 pointers.\n\nA diamond price increases with the increase in weight of the diamond. Two diamonds of the same weight may have different values (Price) depending on the other 4Cs i.e color, clarity and cut.",
        image: "/assets/aboutUs2.jpg",
    },
    {
        id: 3,
        title: "Color",
        content:
            "Most diamonds range in color from colorless to slightly yellow. A diamond is graded on a scale of D to Z representing colorless, and continues with increasing presence of color to the letter Z.\n\nA diamond price changes with the color. The more colorless the diamond, higher is the price.\n\nDiamonds come in all colors of the rainbow i.e yellow, pink, blue, purple, green, orange and red. These diamonds are called fancy color diamonds and come in different hues of light and vivid. The darker (vivid) the color, the more expensive is the stone. The fancy colored diamonds are rare and exclusive and fetch fancy prices. They are one of the most sought after diamonds for investment. The rare stones are generally auctioned.",
        image: "/assets/aboutUs3.jpg",
    },
];

const AboutUs = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Banner */}
            <section className="relative">
                <Image
                    src={HeroImage}
                    width={1200}
                    height={600}
                    sizes="(max-width: 768px) 100vw, (min-width: 769px) 50vw"
                    alt="Legacy Image"
                    className="w-full lg:h-[350px] h-auto object-cover"
                />
                <h1 className="text-3xl md:text-5xl text-white font-semibold font-playfair absolute left-20 top-1/2 -translate-y-1/2">
                    OUR DIAMONDS
                </h1>
            </section>

            <Container className="my-20 px-10">
                <ContentSection data={aboutUsData} />
            </Container>

            <Footer />
        </div>
    );
};

export default AboutUs;
