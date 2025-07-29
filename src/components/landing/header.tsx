"use client";
import React, { useState } from "react";
import Container from "../ui/container";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { LoginModal } from "./loginCard";
import { RegistrationModal } from "./registrationCard";
import { Menu, X, User, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const Navbar = () => {
    const pathname = usePathname();
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isRegistrationModalOpen, setIsRegistrationModalOpen] =
        useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Add authentication state
    const { user, isAuthenticated, logout, loading } = useAuth();

    const accessInventoryClickHandler = () => {
        if (isAuthenticated()) {
            // User is authenticated, navigate to inventory
            window.location.href = "/inventory";
        } else {
            // User is not authenticated, open login modal
            setIsLoginModalOpen(true);
        }
    };

    const navItems = [
        { href: "/", label: "Home" },
        { href: "/about", label: "About us" },
        {
            href: "/inventory",
            label: "Access Inventory",
            onClick: () => accessInventoryClickHandler(),
        },
        { href: "/diamond-knowledge", label: "Diamond Knowledge" },
        { href: "/contact", label: "Contact us" },
    ];

    const handleLoginClick = () => {
        setIsLoginModalOpen(true);
        setIsMobileMenuOpen(false);
    };

    const handleCloseLoginModal = () => {
        setIsLoginModalOpen(false);
    };

    const handleRegistrationClick = () => {
        setIsRegistrationModalOpen(true);
        setIsMobileMenuOpen(false);
    };

    const handleCloseRegistrationModal = () => {
        setIsRegistrationModalOpen(false);
    };

    const handleOpenRegistrationFromLogin = () => {
        setIsLoginModalOpen(false);
        setIsRegistrationModalOpen(true);
    };

    const handleLogout = async () => {
        await logout();
        setIsMobileMenuOpen(false);
    };

    const handleProfileClick = () => {
        // Navigate to appropriate dashboard based on user role
        if (user?.role === "ADMIN") {
            window.location.href = "/admin";
        } else {
            window.location.href = "/inventory";
        }
        setIsMobileMenuOpen(false);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    // Show loading state while checking authentication
    if (loading) {
        return (
            <div className="sticky top-0 z-50 bg-white shadow-md">
                <Container className="flex items-center justify-between py-4">
                    <Link href="/" className="flex  items-center space-x-2">
                        {/* <Image
                            src="/assets/logo.png"
                            alt="Logo"
                            width={100}
                            height={100}
                            className="h-10 w-auto"
                        /> */}
                        <h1 className="font-playfair text-xl md:text-3xl font-semibold">
                            {/* MILLENNIUM&nbsp;STAR */}
                            COMPANY&nbsp;NAME
                        </h1>
                    </Link>
                    <div className="flex items-center space-x-3">
                        <div className="w-20 h-8 bg-gray-200 animate-pulse rounded"></div>
                        <div className="w-16 h-8 bg-gray-200 animate-pulse rounded"></div>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className="sticky top-0 z-50 bg-white shadow-md">
            <Container className="flex max-w-[1500px] items-center justify-between py-4">
                {/* Logo */}
                <Link href="/" className="flex shrink items-center space-x-2">
                    {/* <Image
                        src="/assets/logo.png"
                        alt="Logo"
                        width={100}
                        height={100}
                        className="h-10 w-auto"
                    /> */}
                    <h1 className="font-playfair text-xl md:text-3xl font-semibold">
                        {/* MILLENNIUM&nbsp;STAR */}
                        COMPANY&nbsp;NAME
                    </h1>
                </Link>

                {/* Desktop Navigation */}
                <ul className="hidden lg:flex list-none space-x-7 font-sans font-light text-base">
                    {navItems.map((item) => (
                        <li key={item.href}>
                            <Link
                                onClick={item.onClick}
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

                {/* Desktop Auth/Profile Buttons */}
                <div className="hidden lg:flex space-x-3">
                    {isAuthenticated() ? (
                        // Authenticated user buttons
                        <>
                            <Button
                                variant="outline"
                                onClick={handleProfileClick}
                                className="border-2 border-black text-black hover:bg-gray-50 px-4 py-2 rounded-[3px] flex items-center space-x-2"
                            >
                                <User className="h-4 w-4" />
                                <span>{user?.username || "Profile"}</span>
                            </Button>
                            <Button
                                variant="outline"
                                onClick={handleLogout}
                                className="bg-[#4D4D4D] border-2 border-black text-white hover:bg-gray-700 px-4 py-2 rounded-[3px] flex items-center space-x-2"
                            >
                                <LogOut className="h-4 w-4" />
                                <span>Logout</span>
                            </Button>
                        </>
                    ) : (
                        // Guest user buttons
                        <>
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
                        </>
                    )}
                </div>

                {/* Mobile Hamburger Button */}
                <button
                    className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
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
                <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
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

                        {/* Mobile Auth/Profile Buttons */}
                        <div className="space-y-3">
                            {isAuthenticated() ? (
                                // Authenticated user mobile buttons
                                <>
                                    <Button
                                        onClick={handleProfileClick}
                                        className="w-full bg-white border-2 border-black text-black hover:bg-gray-50 py-3 rounded-[3px] flex items-center justify-center space-x-2"
                                    >
                                        <User className="h-4 w-4" />
                                        <span>
                                            {user?.username || "Profile"}
                                        </span>
                                    </Button>
                                    <Button
                                        onClick={handleLogout}
                                        className="w-full bg-[#4D4D4D] border-2 border-black text-white hover:bg-gray-700 py-3 rounded-[3px] flex items-center justify-center space-x-2"
                                    >
                                        <LogOut className="h-4 w-4" />
                                        <span>Logout</span>
                                    </Button>
                                </>
                            ) : (
                                // Guest user mobile buttons
                                <>
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
                                </>
                            )}
                        </div>
                    </Container>
                </div>
            )}

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

export default Navbar;
