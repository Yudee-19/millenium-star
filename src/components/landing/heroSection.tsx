"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Description, Title } from "@/components/ui/typography";
import { useAuth } from "@/hooks/useAuth";
import { LoginModal } from "./loginCard";
import { RegistrationModal } from "./registrationCard";

const HeroSection = () => {
    const { isAuthenticated } = useAuth();
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isRegistrationModalOpen, setIsRegistrationModalOpen] =
        useState(false);

    const handleLoginClick = () => {
        setIsLoginModalOpen(true);
    };

    const handleCloseLoginModal = () => {
        setIsLoginModalOpen(false);
    };

    const handleRegistrationClick = () => {
        setIsRegistrationModalOpen(true);
    };

    const handleCloseRegistrationModal = () => {
        setIsRegistrationModalOpen(false);
    };

    const handleOpenRegistrationFromLogin = () => {
        setIsLoginModalOpen(false);
        setIsRegistrationModalOpen(true);
    };

    const handleOpenLoginFromRegistration = () => {
        setIsRegistrationModalOpen(false);
        setIsLoginModalOpen(true);
    };

    const accessInventoryClickHandler = () => {
        if (isAuthenticated()) {
            // User is authenticated, navigate to inventory
            window.location.href = "/inventory";
        } else {
            // User is not authenticated, open login modal
            setIsLoginModalOpen(true);
        }
    };

    return (
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
                    Ethically sourced diamonds crafted specifically for traders,
                    retailers, and private labels across the globe.
                </Description>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button
                        onClick={() => {
                            accessInventoryClickHandler();
                        }}
                        className="bg-white cursor-pointer text-gray-900 px-8 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors"
                    >
                        Partner With Us
                    </button>

                    {/* Additional action buttons for unauthenticated users */}
                </div>

                {/* Optional: Login/Register links for unauthenticated users */}
            </div>

            {/* Modals - Only show when not authenticated */}
            {!isAuthenticated() && (
                <>
                    <LoginModal
                        isOpen={isLoginModalOpen}
                        onClose={handleCloseLoginModal}
                        onOpenRegistration={handleOpenRegistrationFromLogin}
                    />
                    <RegistrationModal
                        isOpen={isRegistrationModalOpen}
                        onClose={handleCloseRegistrationModal}
                    />
                </>
            )}
        </div>
    );
};

export default HeroSection;
