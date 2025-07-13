"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";
import {
    shape_options,
    color_options,
    clarity_options,
    cut_options,
    lab_options,
    flou_options,
} from "../filters/diamond-filters";
import { Textarea } from "../ui/textarea";

interface AddDiamondModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

interface DiamondFormData {
    // Basic Properties
    certificateNumber: string;
    lab: string;
    shape: string;
    size: number;
    color: string;
    clarity: string;
    cut: string;
    polish: string;
    symmetry: string;
    fluorescence: string;

    // Measurements
    length: number;
    width: number;
    depth: number;
    totalDepth: number;
    table: number;

    // Pricing
    rapList: number;
    discount: number;
    price: number;

    // Availability
    isAvailable: boolean;

    // Optional fields
    comments?: string;
}

const initialFormData: DiamondFormData = {
    certificateNumber: "",
    lab: "",
    shape: "",
    size: 0,
    color: "",
    clarity: "",
    cut: "",
    polish: "",
    symmetry: "",
    fluorescence: "",
    length: 0,
    width: 0,
    depth: 0,
    totalDepth: 0,
    table: 0,
    rapList: 0,
    discount: 0,
    price: 0,
    isAvailable: true,
    comments: "",
};

export function AddDiamondModal({
    isOpen,
    onClose,
    onSuccess,
}: AddDiamondModalProps) {
    const [formData, setFormData] = useState<DiamondFormData>(initialFormData);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Partial<DiamondFormData>>({});

    const handleInputChange = (
        field: keyof DiamondFormData,
        value: string | number | boolean
    ) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));

        // Clear error when user starts typing
        if (errors[field]) {
            setErrors((prev) => ({
                ...prev,
                [field]: undefined,
            }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Partial<DiamondFormData> = {};

        // Required field validations
        if (!formData.certificateNumber.trim()) {
            newErrors.certificateNumber = "Certificate number is required";
        }
        if (!formData.lab) {
            newErrors.lab = "Lab is required";
        }
        if (!formData.shape) {
            newErrors.shape = "Shape is required";
        }
        if (!formData.color) {
            newErrors.color = "Color is required";
        }
        if (!formData.clarity) {
            newErrors.clarity = "Clarity is required";
        }
        if (formData.size <= 0) {
            newErrors.size = Number("Size must be greater than 0");
        }
        if (formData.price <= 0) {
            newErrors.price = Number("Price must be greater than 0");
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            // Transform form data to match API schema exactly
            const apiData = {
                color: formData.color,
                clarity: formData.clarity,
                rapList: formData.rapList,
                discount: formData.discount,
                cut: formData.cut,
                polish: formData.polish,
                symmetry: formData.symmetry,
                fluorescence: formData.fluorescence,
                measurements: {
                    length: formData.length,
                    width: formData.width,
                    depth: formData.depth,
                },
                totalDepth: formData.totalDepth,
                table: formData.table,
                certificateNumber: formData.certificateNumber,
                price: formData.price,
                noBgm: formData.comments || "", // Using comments as noBgm
                fromTab: "", // You can add this field to the form if needed
                isAvailable: formData.isAvailable,
            };

            console.log("📤 Sending API data:", apiData);

            const response = await fetch(
                "https://diamond-inventory.onrender.com/api/diamonds/create",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(apiData),
                }
            );

            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                throw new Error(
                    errorData?.message ||
                        `HTTP error! status: ${response.status}`
                );
            }

            const result = await response.json();

            if (!result.success) {
                throw new Error(result.message || "Failed to create diamond");
            }

            console.log("✅ Diamond created successfully:", result);

            // Reset form and close modal
            setFormData(initialFormData);
            onSuccess();
            onClose();
        } catch (error) {
            console.error("❌ Error creating diamond:", error);
            setErrors({
                certificateNumber:
                    error instanceof Error
                        ? error.message
                        : "Failed to create diamond",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        if (!loading) {
            setFormData(initialFormData);
            setErrors({});
            onClose();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="min-w-5xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Add New Diamond</DialogTitle>
                    <DialogDescription>
                        Fill in the diamond details below. Required fields are
                        marked with *.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="certificateNumber">
                                Certificate Number *
                            </Label>
                            <Input
                                id="certificateNumber"
                                value={formData.certificateNumber}
                                onChange={(e) =>
                                    handleInputChange(
                                        "certificateNumber",
                                        e.target.value
                                    )
                                }
                                placeholder="Enter certificate number"
                                className={
                                    errors.certificateNumber
                                        ? "border-red-500"
                                        : ""
                                }
                            />
                            {errors.certificateNumber && (
                                <p className="text-sm text-red-500">
                                    {errors.certificateNumber}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="lab">Lab *</Label>
                            <Select
                                value={formData.lab}
                                onValueChange={(value) =>
                                    handleInputChange("lab", value)
                                }
                            >
                                <SelectTrigger
                                    className={
                                        errors.lab ? "border-red-500" : ""
                                    }
                                >
                                    <SelectValue placeholder="Select lab" />
                                </SelectTrigger>
                                <SelectContent>
                                    {lab_options.map((option) => (
                                        <SelectItem
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.lab && (
                                <p className="text-sm text-red-500">
                                    {errors.lab}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="shape">Shape *</Label>
                            <Select
                                value={formData.shape}
                                onValueChange={(value) =>
                                    handleInputChange("shape", value)
                                }
                            >
                                <SelectTrigger
                                    className={
                                        errors.shape ? "border-red-500" : ""
                                    }
                                >
                                    <SelectValue placeholder="Select shape" />
                                </SelectTrigger>
                                <SelectContent>
                                    {shape_options.map((option) => (
                                        <SelectItem
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.shape && (
                                <p className="text-sm text-red-500">
                                    {errors.shape}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="size">Carat Weight *</Label>
                            <Input
                                id="size"
                                type="number"
                                step="0.01"
                                min="0"
                                value={formData.size || ""}
                                onChange={(e) =>
                                    handleInputChange(
                                        "size",
                                        parseFloat(e.target.value) || 0
                                    )
                                }
                                placeholder="0.00"
                                className={errors.size ? "border-red-500" : ""}
                            />
                            {errors.size && (
                                <p className="text-sm text-red-500">
                                    {errors.size}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="color">Color *</Label>
                            <Select
                                value={formData.color}
                                onValueChange={(value) =>
                                    handleInputChange("color", value)
                                }
                            >
                                <SelectTrigger
                                    className={
                                        errors.color ? "border-red-500" : ""
                                    }
                                >
                                    <SelectValue placeholder="Select color" />
                                </SelectTrigger>
                                <SelectContent>
                                    {color_options.map((option) => (
                                        <SelectItem
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.color && (
                                <p className="text-sm text-red-500">
                                    {errors.color}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="clarity">Clarity *</Label>
                            <Select
                                value={formData.clarity}
                                onValueChange={(value) =>
                                    handleInputChange("clarity", value)
                                }
                            >
                                <SelectTrigger
                                    className={
                                        errors.clarity ? "border-red-500" : ""
                                    }
                                >
                                    <SelectValue placeholder="Select clarity" />
                                </SelectTrigger>
                                <SelectContent>
                                    {clarity_options.map((option) => (
                                        <SelectItem
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.clarity && (
                                <p className="text-sm text-red-500">
                                    {errors.clarity}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Cut, Polish, Symmetry, Fluorescence */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="cut">Cut</Label>
                            <Select
                                value={formData.cut}
                                onValueChange={(value) =>
                                    handleInputChange("cut", value)
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select cut" />
                                </SelectTrigger>
                                <SelectContent>
                                    {cut_options.map((option) => (
                                        <SelectItem
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="polish">Polish</Label>
                            <Select
                                value={formData.polish}
                                onValueChange={(value) =>
                                    handleInputChange("polish", value)
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select polish" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="EX">
                                        Excellent
                                    </SelectItem>
                                    <SelectItem value="VG">
                                        Very Good
                                    </SelectItem>
                                    <SelectItem value="GD">Good</SelectItem>
                                    <SelectItem value="FR">Fair</SelectItem>
                                    <SelectItem value="PR">Poor</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="symmetry">Symmetry</Label>
                            <Select
                                value={formData.symmetry}
                                onValueChange={(value) =>
                                    handleInputChange("symmetry", value)
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select symmetry" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="EX">
                                        Excellent
                                    </SelectItem>
                                    <SelectItem value="VG">
                                        Very Good
                                    </SelectItem>
                                    <SelectItem value="GD">Good</SelectItem>
                                    <SelectItem value="FR">Fair</SelectItem>
                                    <SelectItem value="PR">Poor</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="fluorescence">Fluorescence</Label>
                            <Select
                                value={formData.fluorescence}
                                onValueChange={(value) =>
                                    handleInputChange("fluorescence", value)
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select fluorescence" />
                                </SelectTrigger>
                                <SelectContent>
                                    {flou_options.map((option) => (
                                        <SelectItem
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Measurements */}
                    <div className="space-y-2">
                        <Label className="text-base font-semibold">
                            Measurements
                        </Label>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="length">Length (mm)</Label>
                                <Input
                                    id="length"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={formData.length || ""}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "length",
                                            parseFloat(e.target.value) || 0
                                        )
                                    }
                                    placeholder="0.00"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="width">Width (mm)</Label>
                                <Input
                                    id="width"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={formData.width || ""}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "width",
                                            parseFloat(e.target.value) || 0
                                        )
                                    }
                                    placeholder="0.00"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="depth">Depth (mm)</Label>
                                <Input
                                    id="depth"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={formData.depth || ""}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "depth",
                                            parseFloat(e.target.value) || 0
                                        )
                                    }
                                    placeholder="0.00"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="totalDepth">
                                    Total Depth (%)
                                </Label>
                                <Input
                                    id="totalDepth"
                                    type="number"
                                    step="0.1"
                                    min="0"
                                    max="100"
                                    value={formData.totalDepth || ""}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "totalDepth",
                                            parseFloat(e.target.value) || 0
                                        )
                                    }
                                    placeholder="0.0"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="table">Table (%)</Label>
                                <Input
                                    id="table"
                                    type="number"
                                    step="0.1"
                                    min="0"
                                    max="100"
                                    value={formData.table || ""}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "table",
                                            parseFloat(e.target.value) || 0
                                        )
                                    }
                                    placeholder="0.0"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Pricing */}
                    <div className="space-y-2">
                        <Label className="text-base font-semibold">
                            Pricing
                        </Label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="rapList">Rap List ($)</Label>
                                <Input
                                    id="rapList"
                                    type="number"
                                    min="0"
                                    value={formData.rapList || ""}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "rapList",
                                            parseFloat(e.target.value) || 0
                                        )
                                    }
                                    placeholder="0"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="discount">Discount (%)</Label>
                                <Input
                                    id="discount"
                                    type="number"
                                    step="0.1"
                                    value={formData.discount || ""}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "discount",
                                            parseFloat(e.target.value) || 0
                                        )
                                    }
                                    placeholder="0.0"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="price">Final Price ($) *</Label>
                                <Input
                                    id="price"
                                    type="number"
                                    min="0"
                                    value={formData.price || ""}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "price",
                                            parseFloat(e.target.value) || 0
                                        )
                                    }
                                    placeholder="0"
                                    className={
                                        errors.price ? "border-red-500" : ""
                                    }
                                />
                                {errors.price && (
                                    <p className="text-sm text-red-500">
                                        {errors.price}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Availability and Comments */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="isAvailable"
                                checked={formData.isAvailable}
                                onCheckedChange={(checked) =>
                                    handleInputChange("isAvailable", !!checked)
                                }
                            />
                            <Label htmlFor="isAvailable">
                                Available for sale
                            </Label>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="comments">
                                Comments (Optional)
                            </Label>
                            <Textarea
                                id="comments"
                                value={formData.comments}
                                onChange={(e) =>
                                    handleInputChange(
                                        "comments",
                                        e.target.value
                                    )
                                }
                                placeholder="Add any additional notes about this diamond..."
                                rows={3}
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleClose}
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading && (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            {loading ? "Adding Diamond..." : "Add Diamond"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
