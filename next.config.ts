import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname:
                    "donai-gems-inventory-management.s3.eu-north-1.amazonaws.com",
                pathname: "/uploads/images/**",
            },
            {
                protocol: "https",
                hostname: "images.inc.com",
                pathname: "/uploaded_files/**",
            },
        ],
    },
};

export default nextConfig;
