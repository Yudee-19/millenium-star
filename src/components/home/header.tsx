"use client";
import React, { useState } from "react";
import Container from "../ui/container";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { LoginModal } from "./loginCard";
import { RegistrationModal } from "./registrationCard";

const Navbar = () => {
    const pathname = usePathname();
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isRegistrationModalOpen, setIsRegistrationModalOpen] =
        useState(false);

    const navItems = [
        { href: "/home", label: "Home" },
        { href: "/about", label: "About us" },
        { href: "/faq", label: "Faq" },
        { href: "/contact", label: "Contact us" },
    ];

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

    return (
        <div className="">
            <Container className="flex items-center justify-between py-4 ">
                <h1 className="font-playfair text-2xl font-semibold">
                    AP&nbsp;JEWELLERS
                </h1>
                <ul className="list-none flex space-x-7 font-sans font-light text-base ">
                    {navItems.map((item) => (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                className={`transition-colors duration-200 ${
                                    pathname === item.href
                                        ? "text-[#A6A6A6] border-b-1 border-[#A6A6A6] "
                                        : "text-gray-700 hover:text-black"
                                }`}
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className="flex space-x-3">
                    <div
                        className="bg-white cursor-pointer border-2 rounded-[3px] border-black text-black px-4 py-2 hover:bg-gray-50 transition-colors"
                        onClick={handleRegistrationClick}
                    >
                        Register
                    </div>
                    <div
                        className="bg-[#4D4D4D] cursor-pointer border-2 rounded-[3px] border-black text-white px-4 py-2 hover:bg-gray-700 transition-colors"
                        onClick={handleLoginClick}
                    >
                        Login
                    </div>
                </div>
            </Container>
            <LoginModal
                isOpen={isLoginModalOpen}
                onClose={handleCloseLoginModal}
                onOpenRegistration={handleOpenRegistrationFromLogin}
            />
            <RegistrationModal
                isOpen={isRegistrationModalOpen}
                onClose={handleCloseRegistrationModal}
            />
        </div>
    );
};

export default Navbar;
