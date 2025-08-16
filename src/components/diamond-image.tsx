"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface DiamondImageProps {
    certificateNumber: string;
    className?: string;
    size?: number; // px, default 80
    clickable?: boolean; // for modal preview
}

const fallbackUrl = "/assets/hero-3.png";

export const DiamondImage: React.FC<DiamondImageProps> = ({
    certificateNumber,
    className,
    size = 80,
    clickable = false,
}) => {
    const [imageUrl, setImageUrl] = useState<string>(fallbackUrl);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        let isMounted = true;
        setIsLoading(true);
        setError(null);

        fetch(
            `https://diamond-inventory.onrender.com/api/diamonds/S3Bucket/images/${certificateNumber}/`
        )
            .then((res) => res.json())
            .then((data) => {
                if (
                    isMounted &&
                    data?.imagesUrls &&
                    Array.isArray(data.imagesUrls) &&
                    data.imagesUrls.length > 0
                ) {
                    setImageUrl(data.imagesUrls[0]);
                } else {
                    setImageUrl(fallbackUrl);
                }
            })
            .catch((err) => {
                setError("Failed to load image");
                setImageUrl(fallbackUrl);
            })
            .finally(() => {
                if (isMounted) setIsLoading(false);
            });

        return () => {
            isMounted = false;
        };
    }, [certificateNumber]);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    if (isLoading) {
        return (
            <div
                className={cn("bg-gray-200 animate-pulse rounded", className)}
                style={{ width: size, height: size }}
            />
        );
    }

    return (
        <>
            <Image
                src={imageUrl}
                alt={`Diamond ${certificateNumber}`}
                width={size}
                height={size}
                className={cn("object-cover rounded cursor-pointer", className)}
                onClick={clickable ? openModal : undefined}
                onError={() => setImageUrl(fallbackUrl)}
            />
            {clickable && isModalOpen && (
                <div
                    className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
                    onClick={closeModal}
                >
                    <Image
                        src={imageUrl}
                        alt={`Diamond ${certificateNumber} Enlarged`}
                        width={400}
                        height={400}
                        className="object-contain rounded shadow-lg"
                        onClick={(e) => e.stopPropagation()}
                        onError={() => setImageUrl(fallbackUrl)}
                    />
                </div>
            )}
        </>
    );
};
