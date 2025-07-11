import { z } from "zod";

export const diamondSchema = z.object({
    _id: z.string(),
    color: z.string(),
    clarity: z.string(),
    rapList: z.number(),
    discount: z.number(),
    cut: z.string(),
    polish: z.string(),
    symmetry: z.string(),
    fluorescence: z.string(),
    measurements: z.object({
        length: z.number(),
        width: z.number(),
        depth: z.number(),
    }),
    totalDepth: z.number(),
    table: z.number(),
    certificateNumber: z.string(),
    price: z.number(),
    noBgm: z.string().optional(),
    fromTab: z.string().optional(),
    isAvailable: z.boolean().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});

export type DiamondType = z.infer<typeof diamondSchema>;

// Export the interface as well for compatibility
export interface IDiamond {
    color: string;
    clarity: string;
    rapList: number;
    discount: number;
    cut: string;
    polish: string;
    symmetry: string;
    fluorescence: string;
    measurements: {
        length: number;
        width: number;
        depth: number;
    };
    totalDepth: number;
    table: number;
    certificateNumber: string;
    price: number;
    noBgm?: string;
    fromTab?: string;
    isAvailable?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
