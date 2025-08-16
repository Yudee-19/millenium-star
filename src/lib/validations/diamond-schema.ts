import { z } from "zod";

export const diamondSchema = z.object({
    _id: z.string().optional(),

    color: z.enum([
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
    ]),

    clarity: z.enum([
        "FL",
        "IF",
        "Loupe Clean",
        "LC",
        "VVS1",
        "VVS2",
        "VS1",
        "VS2",
        "SI1",
        "SI2",
        "SI3",
        "I1",
        "P1",
        "I2",
        "P2",
        "I3",
        "P3",
    ]),

    rapList: z.number().min(0),

    discount: z.number().min(0).max(100),

    cut: z.enum(["I", "EX", "VG", "G", "F", "P"]),

    polish: z.enum(["I", "EX", "VG-EX", "VG", "G-VG", "G", "F-G", "F", "P"]),

    symmetry: z.enum(["I", "EX", "VG-EX", "VG", "G-VG", "G", "F-G", "F", "P"]),

    fluorescence: z.enum(["B", "W", "Y", "O", "R", "G", "N"]),

    fancyColor: z
        .enum([
            "BK",
            "B",
            "BN",
            "CH",
            "CM",
            "CG",
            "GY",
            "G",
            "O",
            "P",
            "PL",
            "R",
            "V",
            "Y",
            "W",
            "X",
            "None",
        ])
        .optional(),

    fancyColorOvertone: z
        .enum([
            "Black",
            "Brown",
            "Brownish",
            "Champagne",
            "Cognac",
            "Chameleon",
            "Violetish",
            "White",
            "Brown-Greenish",
            "Green",
            "Greenish",
            "Purple",
            "Purplish",
            "Orange",
            "Orangey",
            "Violet",
            "Gray",
            "Grayish",
            "None",
            "Yellow",
            "Yellowish",
            "Pink",
            "Pinkish",
            "Blue",
            "Bluish",
            "Red",
            "Reddish",
            "Gray-Greenish",
            "Gray-Yellowish",
            "Orange-Brown",
            "Other",
        ])
        .optional(),

    fancyColorIntensity: z
        .enum(["VS", "S", "M", "F", "SL", "VSL", "N", "None"])
        .optional(),

    laboratory: z
        .enum([
            "GIA",
            "AGS",
            "CGL",
            "DCLA",
            "GCAL",
            "GSI",
            "HRD",
            "IGI",
            "NGTC",
            "None",
            "Other",
            "PGS",
            "VGR",
            "RDC",
            "RDR",
            "GHI",
            "DBIOD",
            "SGL",
        ])
        .optional(),

    shape: z.enum([
        "RBC",
        "Round",
        "Pear",
        "Emerald",
        "Square Emerald",
        "Princess",
        "Marquise",
        "Asscher",
        "Baguette",
        "Tapered Baguette",
        "Tapered Bullet",
        "Calf",
        "Briolette",
        "Bullets",
        "Cushion Brilliant",
        "Cushion Modified",
        "EuropeanCut",
        "Epaulette",
        "Flanders",
        "Half Moon",
        "Heart",
        "Hexagonal",
        "Kite",
        "Lozenge",
        "Octagonal",
        "Old Miner",
        "Oval",
        "Pentagonal",
        "Radiant",
        "Square Radiant",
        "Rose",
        "Shield",
        "Square",
        "Star",
        "Trapezoid",
        "Triangle",
        "Trilliant",
        "Other",
    ]),

    measurements: z.object({
        length: z.number().min(0),
        width: z.number().min(0),
        depth: z.number().min(0),
    }),

    totalDepth: z.number().min(0).max(100),

    table: z.number().min(0).max(100),

    certificateNumber: z.string(),

    price: z.number().min(0),

    size: z.number(),

    noBgm: z.string().optional(),

    fromTab: z.string().optional(),

    isAvailable: z.boolean().optional(),

    imageUrls: z.array(z.string()).optional(),

    videoUrls: z.array(z.string()).optional(),

    certificateUrls: z.array(z.string()).optional(),

    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
});

export type DiamondType = z.infer<typeof diamondSchema>;
