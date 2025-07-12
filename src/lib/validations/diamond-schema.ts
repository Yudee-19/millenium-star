import { optional, z } from "zod";

export const diamondSchema = z.object({
    _id: z.string(),
    color: z.string().optional(),
    clarity: z.string().optional(),
    rapList: z.number().optional(),
    discount: z.number(),
    cut: z.string(),
    polish: z.string().optional(),
    symmetry: z.string().optional(),
    fluorescence: z.string().optional(),
    measurements: z
        .object({
            length: z.number(),
            width: z.number(),
            depth: z.number(),
        })
        .optional(),
    totalDepth: z.number().optional(),
    table: z.number().optional(),
    certificateNumber: z.string().optional(),
    price: z.number(),
    size: z.number().optional(),
    shape: z.string().optional(),
    lab: z.string().optional(),
    noBgm: z.string().optional(),
    fromTab: z.string().optional(),
    isAvailable: z.boolean().optional(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
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
