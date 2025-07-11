import Navbar from "@/components/home/header";
import Image from "next/image";
import React from "react";

const HomePage = () => {
    return (
        <div>
            <Navbar />
            <div>
                <Image
                    src={"/assets/hero-bg.png"}
                    alt="Hero Background"
                    width={1920}
                    height={1080}
                    className="w-full h-auto object-cover"
                />
            </div>
        </div>
    );
};

export default HomePage;
