// src/components/auth/login-modal.tsx
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

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        rememberMe: false,
    });
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
            // Simulate API call - replace with actual authentication logic
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // For demo purposes, accept any non-empty username/password
            if (formData.username.trim() && formData.password.trim()) {
                // Store user session (you can use localStorage, cookies, or a state management solution)
                localStorage.setItem(
                    "user",
                    JSON.stringify({
                        username: formData.username,
                        loggedIn: true,
                        timestamp: new Date().toISOString(),
                    })
                );

                // Close modal and redirect to client page
                onClose();
                router.push("/client");
            } else {
                setError("Please enter both username and password");
            }
        } catch (err) {
            setError("Login failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setFormData({ username: "", password: "", rememberMe: false });
        setError("");
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-md mx-auto bg-white rounded-lg shadow-xl border-0">
                <div className="flex flex-col items-center space-y-6 p-6">
                    {/* Header */}
                    <div className="text-center space-y-2">
                        <DialogTitle className="text-3xl  font-bold font-playfair tracking-wide text-gray-800">
                            DIAMOND ELITE
                        </DialogTitle>
                        <h2 className="text-2xl font-light font-playfair text-gray-700">
                            Login
                        </h2>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="w-full space-y-4">
                        {/* Username/Email Field */}
                        <div className="space-y-2">
                            <Label
                                htmlFor="username"
                                className="text-sm font-medium text-gray-700"
                            >
                                Username or email address*
                            </Label>
                            <Input
                                id="username"
                                name="username"
                                type="text"
                                placeholder="Enter your username or email"
                                value={formData.username}
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
                        <div className="flex items-center justify-between">
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
                        </div>

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
                        <Link
                            href="/register"
                            className="text-gray-800 font-medium hover:underline"
                            onClick={handleClose}
                        >
                            Register
                        </Link>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
