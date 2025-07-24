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
        image: "/assets/hero2.png",
    },
    {
        id: 3,
        title: "Color",
        content:
            "Most diamonds range in color from colorless to slightly yellow. A diamond is graded on a scale of D to Z representing colorless, and continues with increasing presence of color to the letter Z.\n\nA diamond price changes with the color. The more colorless the diamond, higher is the price.\n\nDiamonds come in all colors of the rainbow i.e yellow, pink, blue, purple, green, orange and red. These diamonds are called fancy color diamonds and come in different hues of light and vivid. The darker (vivid) the color, the more expensive is the stone. The fancy colored diamonds are rare and exclusive and fetch fancy prices. They are one of the most sought after diamonds for investment. The rare stones are generally auctioned.",
        image: "/assets/Diamond-color.webp",
    },
];

const clarityGrades = [
    {
        name: "Flawless",
        description:
            "No inclusions and no blemishes visible under 10x magnification",
    },
    {
        name: "Internally Flawless (IF)",
        description: "No inclusions visible under 10x magnification",
    },
    {
        name: "Very, Very Slightly Included (VVS1 and VVS2)",
        description:
            "Inclusions so slight they are difficult for a skilled grader to see under 10x magnification",
    },
    {
        name: "Very Slightly Included (VS1 and VS2)",
        description:
            "Inclusions are observed with effort under 10x magnification, but can be characterized as minor",
    },
    {
        name: "Slightly Included (SI1 and SI2)",
        description: "Inclusions are noticeable under 10x magnification.",
    },
    {
        name: "Included (I1, I2, and I3)",
        description:
            "Inclusions are obvious under 10x magnification which may affect transparency and brilliance. Also the inclusions are so obvious that they are generally visible through the naked eyes.",
    },
];

const ClaritySection = () => (
    <div className="py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Clarity</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
            With clarity, we define a diamond's purity. Diamonds occur naturally
            and are a result of carbon exposed to extreme heat and pressure deep
            in the earth. This process can result in a variety of internal
            characteristics called 'inclusions' and external characteristics
            called 'blemishes.
        </p>
        <p className="text-gray-700 leading-relaxed mb-8">
            Following are the 6 categories into which the clarity is divided,
            some of which are sub- divided, for a total of 11 specific grades.
        </p>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
            {/* Left Column: Text Content */}
            <div className="lg:w-1/2 space-y-5">
                {clarityGrades.map((grade) => (
                    <div key={grade.name}>
                        <h3 className="font-semibold text-lg text-gray-800">
                            {grade.name}
                        </h3>
                        <p className="text-gray-600">{grade.description}</p>
                    </div>
                ))}
            </div>

            {/* Right Column: Image */}
            <div className="lg:w-1/2 flex items-center justify-center">
                <div className="relative w-full max-w-sm">
                    <Image
                        src="/assets/dia_know4.jpg"
                        alt="Diamond clarity grades diagram"
                        width={500}
                        height={500}
                        className="object-contain w-full h-auto"
                        quality={100}
                    />
                </div>
            </div>
        </div>

        <p className="text-gray-700 leading-relaxed mt-10">
            Evaluating diamond clarity involves determining the number, size,
            nature, and position of these characteristics, as well as how these
            affect the overall appearance of the stone. While no diamond is
            perfectly pure, the closer it comes to these characteristics, the
            higher its value.
        </p>
    </div>
);

const CutSection = () => (
    <div className="py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
            {/* Left Column: Image */}
            <div className="lg:w-1/2 flex items-center justify-center">
                <div className="relative w-full max-w-lg bg-black p-4 rounded-lg shadow-lg">
                    <Image
                        src="/assets/diamond-knowledge5.jpg"
                        alt="Diagram of Diamond Cut and its types"
                        width={600}
                        height={350}
                        className="object-contain w-full h-auto"
                        quality={100}
                    />
                </div>
            </div>

            {/* Right Column: Text Content */}
            <div className="lg:w-1/2">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Cut</h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>
                        A diamond's cut is essential to its final beauty and
                        value. The cut is divided into 3 grades: Proportion,
                        Polish and Symmetry.
                    </p>
                    <p>
                        Proportions determine the brilliance and 'fire' of a
                        diamond, Symmetry describes the variation of different
                        parameters that define the proportions and Polish
                        describes the finish of the facets. Each grade is
                        evaluated according to four parameters: Excellent, Very
                        Good, Good and Fair.
                    </p>
                    <p>
                        A diamond's cut grade represents how well a diamond's
                        facets interact with light. A perfect cut diamond has
                        more sparkle, brilliance and fire.
                    </p>
                </div>
            </div>
        </div>
    </div>
);

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
                <ClaritySection />
                <CutSection />
            </Container>

            <Footer />
        </div>
    );
};

export default AboutUs;
