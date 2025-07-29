"use client";

import Link from "next/link";
import { Playfair_Display, Inter } from "next/font/google";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import Image from "next/image";

const playFair = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

const inter = Inter({
    subsets: ["latin"],
    weight: ["400", "500", "600"],
});

const quickLinks = [
    { href: "/about", label: "About Us" },
    { href: "/inventory", label: "Access Inventory" },
    { href: "/contact", label: "Contact Us" },
];

const socialLinks = [
    { href: "#", icon: <Facebook /> },
    { href: "#", icon: <Instagram /> },
    { href: "#", icon: <Linkedin /> },
    { href: "#", icon: <Twitter /> },
];

const Footer = () => {
    return (
        <footer className="bg-[#212121] text-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Top section */}
                <div className="py-16 grid grid-cols-1 md:grid-cols-12 gap-8">
                    {/* Logo */}
                    <div className="md:col-span-6">
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
                    </div>

                    {/* Quick Links */}
                    <div className="md:col-span-3">
                        <h3
                            className={`${playFair.className} text-lg font-semibold mb-4`}
                        >
                            Quick Links
                        </h3>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className={`${inter.className} text-gray-300 hover:text-white transition-colors text-sm font-medium`}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Follow Us */}
                    <div className="md:col-span-3">
                        <h3
                            className={`${playFair.className} text-lg font-semibold mb-4`}
                        >
                            Follow Us
                        </h3>
                        <div className="flex items-center space-x-4">
                            {socialLinks.map((social, index) => (
                                <Link
                                    key={index}
                                    href={social.href}
                                    className="text-gray-300 hover:text-white transition-colors text-xl"
                                >
                                    {social.icon}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom section */}
                <div className="border-t border-gray-700 py-6 flex flex-col sm:flex-row items-center justify-between">
                    <p
                        className={`${inter.className} text-sm text-gray-400 order-2 sm:order-1 mt-4 sm:mt-0`}
                    >
                        {/* &copy; {new Date().getFullYear()} Millennium Star. All */}
                        &copy; {new Date().getFullYear()} Company Name. All
                        rights reserved.
                    </p>
                    <div
                        className={`${inter.className} flex items-center space-x-6 text-sm text-gray-400 order-1 sm:order-2`}
                    >
                        <Link
                            href="/privacy"
                            className="hover:text-white transition-colors"
                        >
                            Privacy
                        </Link>
                        <Link
                            href="/terms"
                            className="hover:text-white transition-colors"
                        >
                            Terms
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
