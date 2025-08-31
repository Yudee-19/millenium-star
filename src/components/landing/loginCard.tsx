"use client";

import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    onOpenRegistration?: () => void; // Add this prop for opening registration modal
}

export function LoginModal({
    isOpen,
    onClose,
    onOpenRegistration,
}: LoginModalProps) {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: false,
    });
    const { loadFromStorage } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            console.log("Attempting login with:", { email: formData.email });
            console.log("Using API URL:", process.env.NEXT_PUBLIC_BASE_URL);

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/users/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: formData.email,
                        password: formData.password,
                    }),
                    credentials: "include", // Important for cookie-based auth
                }
            );

            // console.log("Login response status:", response.status);
            // console.log("Login Json response Object:", await response.json());
            const result = await response.json();

            // // Check if response is JSON
            const contentType = response.headers.get("content-type");
            console.log("Content-Type:", contentType);

            if (!response.ok) {
                // Parse error response
                const errorMessage = result.error;
                throw new Error(
                    errorMessage || "Login failed. Please try again."
                );
            }

            // Parse successful response
            console.log("Login successful:", result);

            if (result.success) {
                // Store user session data from the API response
                const userData = {
                    id: result.data.user._id,
                    username: result.data.user.username,
                    email: result.data.user.email,
                    status: result.data.user.status,
                    role: result.data.user.role,
                    kyc: result.data.user.kyc || null,
                    loggedIn: true,
                    timestamp: new Date().toISOString(),
                };

                localStorage.setItem("user", JSON.stringify(userData));
                await loadFromStorage();

                // Close modal and redirect based on user role
                onClose();

                // Force a page reload to ensure all components re-render with the new auth state
                // window.location.reload();

                // Redirect based on role
                if (result.data.user.role === "ADMIN") {
                    window.location.href = "/admin";
                } else {
                    window.location.href = "/inventory";
                }
            } else {
                throw new Error(result.message || "Login failed");
            }
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Login failed. Please try again."
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setFormData({ email: "", password: "", rememberMe: false });
        setError("");
        onClose();
    };

    const handleRegistrationClick = () => {
        handleClose();
        if (onOpenRegistration) {
            onOpenRegistration();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-md mx-auto bg-white rounded-lg shadow-xl border-0">
                <div className="flex flex-col items-center space-y-6 p-6">
                    {/* Header */}
                    <div className="text-center space-y-2">
                        <DialogTitle className="text-3xl font-bold font-playfair tracking-wide text-gray-800">
                            MILLENNIUM&nbsp;STAR
                        </DialogTitle>
                        <h2 className="text-2xl font-light font-playfair text-gray-700">
                            Login
                        </h2>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="w-full space-y-4">
                        {/* Email Field */}
                        <div className="space-y-2">
                            <Label
                                htmlFor="email"
                                className="text-sm font-medium text-gray-700"
                            >
                                Email address*
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Enter your email address"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                                required
                            />
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <Label
                                htmlFor="password"
                                className="text-sm font-medium text-gray-700"
                            >
                                Password*
                            </Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                                required
                            />
                        </div>

                        {/* Remember Me & Forgot Password */}
                        {/* <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    className="border-black border-1"
                                    id="remember"
                                    checked={formData.rememberMe}
                                    onCheckedChange={(checked) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            rememberMe: checked as boolean,
                                        }))
                                    }
                                />
                                <Label
                                    htmlFor="remember"
                                    className="text-sm text-black"
                                >
                                    Remember me
                                </Label>
                            </div>
                            <Link
                                href="/forgot-password"
                                className="text-sm text-black hover:text-gray-700 transition-colors"
                            >
                                Forgot Password?
                            </Link>
                        </div> */}

                        {/* Error Message */}
                        {error && (
                            <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">
                                {error}
                            </div>
                        )}

                        {/* Login Button */}
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-black hover:bg-black text-white py-3 rounded-full font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? "Logging in..." : "Log in"}
                        </Button>
                    </form>

                    {/* Register Link */}
                    <div className="text-center">
                        <span className="text-gray-600">
                            Don't have an account?{" "}
                        </span>
                        <button
                            onClick={handleRegistrationClick}
                            className="text-gray-800 font-medium hover:underline bg-transparent border-none cursor-pointer"
                        >
                            Register
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
