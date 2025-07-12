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
import Link from "next/link";
import { useRouter } from "next/navigation";

interface RegistrationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface RegisterData {
    username: string;
    email: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
}

interface KYCData {
    idNumber: string;
    shopName: string;
    shopRegistrationNumber: string;
    taxNumber: string;
}

interface PersonalData {
    firstName: string;
    lastName: string;
    recoveryEmail: string;
    identityNumber: string;
    dateOfBirth: string;
    address: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    };
}

export function RegistrationModal({ isOpen, onClose }: RegistrationModalProps) {
    const [currentStep, setCurrentStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [isUserRegistered, setIsUserRegistered] = useState(false);
    const [registeredUserData, setRegisteredUserData] = useState<any>(null);
    const router = useRouter();

    // Form data states
    const [registerData, setRegisterData] = useState<RegisterData>({
        username: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
    });

    const [kycData, setKycData] = useState<KYCData>({
        idNumber: "",
        shopName: "",
        shopRegistrationNumber: "",
        taxNumber: "",
    });

    const [personalData, setPersonalData] = useState<PersonalData>({
        firstName: "",
        lastName: "",
        recoveryEmail: "",
        identityNumber: "",
        dateOfBirth: "",
        address: {
            street: "",
            city: "",
            state: "",
            zipCode: "",
            country: "",
        },
    });

    const handleRegisterInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;
        setRegisterData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleKycInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setKycData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handlePersonalInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;
        if (name.startsWith("address.")) {
            const addressField = name.split(".")[1];
            setPersonalData((prev) => ({
                ...prev,
                address: {
                    ...prev.address,
                    [addressField]: value,
                },
            }));
        } else {
            setPersonalData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const validateRegisterStep = () => {
        if (!registerData.username.trim()) return "Username is required";
        if (!registerData.email.trim()) return "Email is required";
        if (!registerData.phoneNumber.trim()) return "Phone number is required";
        if (!registerData.password.trim()) return "Password is required";
        if (!registerData.confirmPassword.trim())
            return "Confirm password is required";
        if (registerData.password !== registerData.confirmPassword)
            return "Passwords do not match";
        if (registerData.password.length < 6)
            return "Password must be at least 6 characters";
        return null;
    };

    const validateKycStep = () => {
        if (!kycData.idNumber.trim()) return "ID Number is required";
        if (!kycData.shopName.trim()) return "Shop Name is required";
        if (!kycData.shopRegistrationNumber.trim())
            return "Shop Registration Number is required";
        if (!kycData.taxNumber.trim()) return "TAX Number is required";
        return null;
    };

    const validatePersonalStep = () => {
        if (!personalData.firstName.trim()) return "First Name is required";
        if (!personalData.lastName.trim()) return "Last Name is required";
        if (!personalData.recoveryEmail.trim())
            return "Recovery Email is required";
        if (!personalData.identityNumber.trim())
            return "Identity Number is required";
        if (!personalData.dateOfBirth.trim())
            return "Date of Birth is required";
        if (!personalData.address.street.trim())
            return "Street address is required";
        if (!personalData.address.city.trim()) return "City is required";
        if (!personalData.address.state.trim()) return "State is required";
        if (!personalData.address.zipCode.trim()) return "Zip Code is required";
        if (!personalData.address.country.trim()) return "Country is required";
        return null;
    };

    // Handle registration after first step
    const handleRegisterUser = async (): Promise<boolean> => {
        setIsLoading(true);
        setError("");

        try {
            console.log("Registering user:", registerData);

            const registerResponse = await fetch(
                "http://localhost:5000/api/users/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: registerData.username,
                        email: registerData.email,
                        password: registerData.password,
                    }),
                }
            );

            // Check if response is JSON
            const contentType = registerResponse.headers.get("content-type");
            console.log("Register response status:", registerResponse.status);
            console.log("Register content-type:", contentType);

            if (!registerResponse.ok) {
                const responseText = await registerResponse.text();
                console.log("Register error response:", responseText);

                if (contentType && contentType.includes("application/json")) {
                    try {
                        const errorData = JSON.parse(responseText);
                        throw new Error(
                            errorData.message || "Registration failed"
                        );
                    } catch (parseError) {
                        console.error(
                            "Failed to parse error response:",
                            parseError
                        );
                        throw new Error(
                            `Registration failed. Status: ${registerResponse.status}`
                        );
                    }
                } else {
                    throw new Error(
                        `Registration failed. Status: ${
                            registerResponse.status
                        }. Response: ${responseText.substring(0, 200)}`
                    );
                }
            }

            const registerResult = await registerResponse.json();
            console.log("Registration successful:", registerResult);

            // Store the registered user data for later use
            setRegisteredUserData(registerResult.data.user);
            setIsUserRegistered(true);

            return true; // Registration successful
        } catch (err) {
            console.error("Registration error:", err);
            setError(
                err instanceof Error
                    ? err.message
                    : "Registration failed. Please try again."
            );
            return false; // Registration failed
        } finally {
            setIsLoading(false);
        }
    };

    // Handle KYC submission after final step
    const handleSubmitKYC = async () => {
        setIsLoading(true);
        setError("");

        try {
            console.log("Submitting KYC data...");

            // Login first to get authentication for KYC submission
            const loginResponse = await fetch(
                "http://localhost:5000/api/users/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: registerData.email,
                        password: registerData.password,
                    }),
                    credentials: "include",
                }
            );

            if (!loginResponse.ok) {
                const loginErrorText = await loginResponse.text();
                console.log("Login error:", loginErrorText);
                throw new Error("Failed to authenticate for KYC submission");
            }

            const loginResult = await loginResponse.json();
            console.log("Login successful for KYC:", loginResult);

            // Now submit KYC with all required data
            const kycPayload = {
                firstName: personalData.firstName,
                lastName: personalData.lastName,
                dateOfBirth: personalData.dateOfBirth,
                phoneNumber: registerData.phoneNumber, // From registration data
                address: personalData.address,
                businessInfo: {
                    companyName: kycData.shopName,
                    businessType: "Retail", // You can make this configurable
                    registrationNumber: kycData.shopRegistrationNumber,
                },
            };

            console.log("KYC Payload:", kycPayload);

            const kycResponse = await fetch(
                "http://localhost:5000/api/users/kyc",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(kycPayload),
                    credentials: "include",
                }
            );

            const contentType = kycResponse.headers.get("content-type");
            console.log("KYC response status:", kycResponse.status);

            if (!kycResponse.ok) {
                const responseText = await kycResponse.text();
                console.log("KYC error response:", responseText);

                if (contentType && contentType.includes("application/json")) {
                    try {
                        const errorData = JSON.parse(responseText);
                        throw new Error(
                            errorData.message || "KYC submission failed"
                        );
                    } catch (parseError) {
                        console.error("Failed to parse KYC error:", parseError);
                        throw new Error(
                            `KYC submission failed. Status: ${kycResponse.status}`
                        );
                    }
                } else {
                    throw new Error(
                        `KYC submission failed. Status: ${kycResponse.status}`
                    );
                }
            }

            const kycResult = await kycResponse.json();
            console.log("KYC submission successful:", kycResult);

            // Store user session with KYC data
            localStorage.setItem(
                "user",
                JSON.stringify({
                    id: registeredUserData?._id,
                    username: registerData.username,
                    email: registerData.email,
                    status: "PENDING", // After KYC submission, status becomes PENDING
                    role: "USER",
                    kyc: kycResult.data.user.kyc,
                    loggedIn: true,
                    timestamp: new Date().toISOString(),
                })
            );

            // Close modal and redirect
            onClose();
            router.push("/client");
        } catch (err) {
            console.error("KYC submission error:", err);
            setError(
                err instanceof Error
                    ? err.message
                    : "KYC submission failed. Please try again."
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleNext = async () => {
        setError("");

        if (currentStep === 1) {
            // Check if user is already registered
            if (isUserRegistered) {
                // User is already registered, just proceed to next step
                setCurrentStep(2);
                return;
            }

            // Validate first step
            const validationError = validateRegisterStep();
            if (validationError) {
                setError(validationError);
                return;
            }

            // Register user and wait for completion
            const registrationSuccessful = await handleRegisterUser();

            // Only proceed if registration was successful
            if (registrationSuccessful) {
                setCurrentStep(2);
            }
            // If registration failed, error will be shown by handleRegisterUser
        } else if (currentStep === 2) {
            // Validate second step
            const validationError = validateKycStep();
            if (validationError) {
                setError(validationError);
                return;
            }

            // Proceed to final step
            setCurrentStep(3);
        }
    };

    const handleBack = () => {
        setError("");
        setCurrentStep((prev) => Math.max(prev - 1, 1));
    };

    const handleSubmit = async () => {
        setError("");
        const personalError = validatePersonalStep();
        if (personalError) {
            setError(personalError);
            return;
        }

        // Submit KYC data
        await handleSubmitKYC();
    };

    const handleClose = () => {
        setCurrentStep(1);
        setIsUserRegistered(false);
        setRegisteredUserData(null);
        setRegisterData({
            username: "",
            email: "",
            phoneNumber: "",
            password: "",
            confirmPassword: "",
        });
        setKycData({
            idNumber: "",
            shopName: "",
            shopRegistrationNumber: "",
            taxNumber: "",
        });
        setPersonalData({
            firstName: "",
            lastName: "",
            recoveryEmail: "",
            identityNumber: "",
            dateOfBirth: "",
            address: {
                street: "",
                city: "",
                state: "",
                zipCode: "",
                country: "",
            },
        });
        setError("");
        onClose();
    };

    const renderRegisterStep = () => (
        <div className="w-full space-y-4">
            <div className="space-y-2">
                <Label
                    htmlFor="username"
                    className="text-sm font-medium text-gray-700"
                >
                    Username*
                </Label>
                <Input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Enter your username"
                    value={registerData.username}
                    onChange={handleRegisterInputChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                    required
                    disabled={isUserRegistered}
                />
            </div>

            <div className="space-y-2">
                <Label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700"
                >
                    Email*
                </Label>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={registerData.email}
                    onChange={handleRegisterInputChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                    required
                    disabled={isUserRegistered}
                />
            </div>

            <div className="space-y-2">
                <Label
                    htmlFor="phoneNumber"
                    className="text-sm font-medium text-gray-700"
                >
                    Phone Number*
                </Label>
                <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={registerData.phoneNumber}
                    onChange={handleRegisterInputChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                    required
                    disabled={isUserRegistered}
                />
            </div>

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
                    value={registerData.password}
                    onChange={handleRegisterInputChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                    required
                    disabled={isUserRegistered}
                />
            </div>

            <div className="space-y-2">
                <Label
                    htmlFor="confirmPassword"
                    className="text-sm font-medium text-gray-700"
                >
                    Confirm Password*
                </Label>
                <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={registerData.confirmPassword}
                    onChange={handleRegisterInputChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                    required
                    disabled={isUserRegistered}
                />
            </div>

            {isUserRegistered && (
                <div className="text-green-600 text-sm text-center bg-green-50 p-2 rounded">
                    ✅ Registration successful! Please continue with your KYC
                    details.
                </div>
            )}
        </div>
    );

    const renderKycStep = () => (
        <div className="w-full space-y-4">
            <div className="space-y-2">
                <Label
                    htmlFor="idNumber"
                    className="text-sm font-medium text-gray-700"
                >
                    ID Number*
                </Label>
                <Input
                    id="idNumber"
                    name="idNumber"
                    type="text"
                    placeholder="Enter your ID number"
                    value={kycData.idNumber}
                    onChange={handleKycInputChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                    required
                />
            </div>

            <div className="space-y-2">
                <Label
                    htmlFor="shopName"
                    className="text-sm font-medium text-gray-700"
                >
                    Shop Name*
                </Label>
                <Input
                    id="shopName"
                    name="shopName"
                    type="text"
                    placeholder="Enter your shop name"
                    value={kycData.shopName}
                    onChange={handleKycInputChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                    required
                />
            </div>

            <div className="space-y-2">
                <Label
                    htmlFor="shopRegistrationNumber"
                    className="text-sm font-medium text-gray-700"
                >
                    Shop Registration Number*
                </Label>
                <Input
                    id="shopRegistrationNumber"
                    name="shopRegistrationNumber"
                    type="text"
                    placeholder="Enter your shop registration number"
                    value={kycData.shopRegistrationNumber}
                    onChange={handleKycInputChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                    required
                />
            </div>

            <div className="space-y-2">
                <Label
                    htmlFor="taxNumber"
                    className="text-sm font-medium text-gray-700"
                >
                    TAX Number*
                </Label>
                <Input
                    id="taxNumber"
                    name="taxNumber"
                    type="text"
                    placeholder="Enter your TAX number"
                    value={kycData.taxNumber}
                    onChange={handleKycInputChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                    required
                />
            </div>
        </div>
    );

    const renderPersonalStep = () => (
        <div className="w-full space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label
                        htmlFor="firstName"
                        className="text-sm font-medium text-gray-700"
                    >
                        First Name*
                    </Label>
                    <Input
                        id="firstName"
                        name="firstName"
                        type="text"
                        placeholder="Enter your first name"
                        value={personalData.firstName}
                        onChange={handlePersonalInputChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label
                        htmlFor="lastName"
                        className="text-sm font-medium text-gray-700"
                    >
                        Last Name*
                    </Label>
                    <Input
                        id="lastName"
                        name="lastName"
                        type="text"
                        placeholder="Enter your last name"
                        value={personalData.lastName}
                        onChange={handlePersonalInputChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                        required
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label
                    htmlFor="recoveryEmail"
                    className="text-sm font-medium text-gray-700"
                >
                    Recovery Email*
                </Label>
                <Input
                    id="recoveryEmail"
                    name="recoveryEmail"
                    type="email"
                    placeholder="Enter your recovery email"
                    value={personalData.recoveryEmail}
                    onChange={handlePersonalInputChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                    required
                />
            </div>

            <div className="space-y-2">
                <Label
                    htmlFor="identityNumber"
                    className="text-sm font-medium text-gray-700"
                >
                    Identity Number*
                </Label>
                <Input
                    id="identityNumber"
                    name="identityNumber"
                    type="text"
                    placeholder="Enter your identity number"
                    value={personalData.identityNumber}
                    onChange={handlePersonalInputChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                    required
                />
            </div>

            <div className="space-y-2">
                <Label
                    htmlFor="dateOfBirth"
                    className="text-sm font-medium text-gray-700"
                >
                    Date of Birth*
                </Label>
                <Input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    value={personalData.dateOfBirth}
                    onChange={handlePersonalInputChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                    required
                />
            </div>

            <div className="space-y-2">
                <Label
                    htmlFor="address.street"
                    className="text-sm font-medium text-gray-700"
                >
                    Street Address*
                </Label>
                <Input
                    id="address.street"
                    name="address.street"
                    type="text"
                    placeholder="Enter your street address"
                    value={personalData.address.street}
                    onChange={handlePersonalInputChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                    required
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label
                        htmlFor="address.city"
                        className="text-sm font-medium text-gray-700"
                    >
                        City*
                    </Label>
                    <Input
                        id="address.city"
                        name="address.city"
                        type="text"
                        placeholder="Enter your city"
                        value={personalData.address.city}
                        onChange={handlePersonalInputChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label
                        htmlFor="address.state"
                        className="text-sm font-medium text-gray-700"
                    >
                        State*
                    </Label>
                    <Input
                        id="address.state"
                        name="address.state"
                        type="text"
                        placeholder="Enter your state"
                        value={personalData.address.state}
                        onChange={handlePersonalInputChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                        required
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label
                        htmlFor="address.zipCode"
                        className="text-sm font-medium text-gray-700"
                    >
                        Zip Code*
                    </Label>
                    <Input
                        id="address.zipCode"
                        name="address.zipCode"
                        type="text"
                        placeholder="Enter your zip code"
                        value={personalData.address.zipCode}
                        onChange={handlePersonalInputChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label
                        htmlFor="address.country"
                        className="text-sm font-medium text-gray-700"
                    >
                        Country*
                    </Label>
                    <Input
                        id="address.country"
                        name="address.country"
                        type="text"
                        placeholder="Enter your country"
                        value={personalData.address.country}
                        onChange={handlePersonalInputChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                        required
                    />
                </div>
            </div>

            {/* Summary of registration data */}
            <div className="mt-6 p-4 bg-blue-50 rounded-md">
                <h4 className="text-sm font-medium text-blue-900 mb-2">
                    Registration Summary:
                </h4>
                <p className="text-xs text-blue-700">
                    <strong>Email:</strong> {registerData.email}
                </p>
                <p className="text-xs text-blue-700">
                    <strong>Phone:</strong> {registerData.phoneNumber}
                </p>
                <p className="text-xs text-blue-700">
                    <strong>Company:</strong> {kycData.shopName}
                </p>
            </div>
        </div>
    );

    const getStepTitle = () => {
        switch (currentStep) {
            case 1:
                return "Register";
            case 2:
                return "KYC Details";
            case 3:
                return "Personal Details";
            default:
                return "Register";
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-md mx-auto bg-white rounded-lg shadow-xl border-0 max-h-[90vh] overflow-y-auto">
                <div className="flex flex-col items-center space-y-6 p-6">
                    {/* Header */}
                    <div className="text-center space-y-2">
                        <DialogTitle className="text-3xl font-bold font-playfair tracking-wide text-gray-800">
                            DIAMOND ELITE
                        </DialogTitle>
                        <h2 className="text-2xl font-light font-playfair text-gray-700">
                            {getStepTitle()}
                        </h2>
                        <div className="text-sm text-gray-500">
                            Step {currentStep} of 3
                        </div>
                    </div>

                    {/* Step Content */}
                    {currentStep === 1 && renderRegisterStep()}
                    {currentStep === 2 && renderKycStep()}
                    {currentStep === 3 && renderPersonalStep()}

                    {/* Error Message */}
                    {error && (
                        <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded w-full">
                            {error}
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="w-full space-y-3">
                        {currentStep < 3 ? (
                            <Button
                                onClick={handleNext}
                                disabled={isLoading}
                                className="w-full bg-black hover:bg-black text-white py-3 rounded-full font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading && currentStep === 1
                                    ? "Registering..."
                                    : "Next"}
                            </Button>
                        ) : (
                            <Button
                                onClick={handleSubmit}
                                disabled={isLoading}
                                className="w-full bg-black hover:bg-black text-white py-3 rounded-full font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading
                                    ? "Submitting KYC..."
                                    : "Complete Registration"}
                            </Button>
                        )}

                        {currentStep > 1 && (
                            <Button
                                onClick={handleBack}
                                variant="outline"
                                disabled={isLoading}
                                className="w-full border-black text-black hover:bg-gray-50 py-3 rounded-full font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Back
                            </Button>
                        )}
                    </div>

                    {/* Login Link */}
                    <div className="text-center">
                        <span className="text-gray-600">
                            Already have an account?{" "}
                        </span>
                        <Link
                            href="#"
                            className="text-gray-800 font-medium hover:underline"
                            onClick={handleClose}
                        >
                            Log in
                        </Link>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
