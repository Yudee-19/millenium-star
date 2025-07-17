"use client";
import React, { useState } from "react";
import Container from "../ui/container";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { LoginModal } from "./loginCard";
import { RegistrationModal } from "./registrationCard";
import { Menu, X } from "lucide-react";

const Navbar = () => {
    const pathname = usePathname();
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isRegistrationModalOpen, setIsRegistrationModalOpen] =
        useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { href: "/", label: "Home" },
        { href: "/about", label: "About us" },
        { href: "/contact", label: "Contact us" },
        { href: "/inventory", label: "Access Inventory" },
    ];

    const handleLoginClick = () => {
        setIsLoginModalOpen(true);
        setIsMobileMenuOpen(false); // Close mobile menu when opening modal
    };

    const handleCloseLoginModal = () => {
        setIsLoginModalOpen(false);
    };

    const handleRegistrationClick = () => {
        setIsRegistrationModalOpen(true);
        setIsMobileMenuOpen(false); // Close mobile menu when opening modal
    };

    const handleCloseRegistrationModal = () => {
        setIsRegistrationModalOpen(false);
    };

    const handleOpenRegistrationFromLogin = () => {
        setIsLoginModalOpen(false);
        setIsRegistrationModalOpen(true);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <div className="sticky top-0 z-50 bg-white shadow-md">
            <Container className="flex items-center justify-between py-4">
                {/* Logo */}
                <h1 className="font-playfair text-xl md:text-2xl font-semibold">
                    MILLENNIUM&nbsp;STAR
                </h1>

                {/* Desktop Navigation */}
                <ul className="hidden md:flex list-none space-x-7 font-sans font-light text-base">
                    {navItems.map((item) => (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                className={`transition-colors duration-200 ${
                                    pathname === item.href
                                        ? "text-[#A6A6A6] border-b-1 border-[#A6A6A6]"
                                        : "text-black hover:text-black"
                                }`}
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Desktop Auth Buttons */}
                <div className="hidden md:flex space-x-3">
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

                {/* Mobile Hamburger Button */}
                <button
                    className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
                    onClick={toggleMobileMenu}
                    aria-label="Toggle menu"
                >
                    {isMobileMenuOpen ? (
                        <X className="h-6 w-6 text-black" />
                    ) : (
                        <Menu className="h-6 w-6 text-black" />
                    )}
                </button>
            </Container>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
                    <Container className="py-4">
                        {/* Mobile Navigation Links */}
                        <ul className="space-y-4 mb-6">
                            {navItems.map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className={`block py-2 transition-colors duration-200 ${
                                            pathname === item.href
                                                ? "text-[#A6A6A6] font-medium"
                                                : "text-black hover:text-gray-600"
                                        }`}
                                        onClick={closeMobileMenu}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* Mobile Auth Buttons */}
                        <div className="space-y-3">
                            <div
                                className="w-full text-center bg-white cursor-pointer border-2 rounded-[3px] border-black text-black px-4 py-3 hover:bg-gray-50 transition-colors"
                                onClick={handleRegistrationClick}
                            >
                                Register
                            </div>
                            <div
                                className="w-full text-center bg-[#4D4D4D] cursor-pointer border-2 rounded-[3px] border-black text-white px-4 py-3 hover:bg-gray-700 transition-colors"
                                onClick={handleLoginClick}
                            >
                                Login
                            </div>
                        </div>
                    </Container>
                </div>
            )}

            {/* Modals */}
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
