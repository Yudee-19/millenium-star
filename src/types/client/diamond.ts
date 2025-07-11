// src/types/client/diamond.ts
export interface ClientDiamond {
    _id: string;
    color: string;
    clarity: string;
    carat: number;
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
    isAvailable: boolean;
    lab?: string;
    shape?: string;
    createdAt: string;
    updatedAt: string;
}

export interface ClientFilters {
    shape?: string[];
    caratMin?: number;
    caratMax?: number;
    priceMin?: number;
    priceMax?: number;
    color?: string[];
    clarity?: string[];
    cut?: string[];
    polish?: string[];
    symmetry?: string[];
    fluorescence?: string[];
    lab?: string[];
    searchTerm?: string;
    isAvailable?: boolean;
}

export interface FilterOptions {
    colors: string[];
    clarities: string[];
    cuts: string[];
    polishes: string[];
    symmetries: string[];
    fluorescences: string[];
    shapes: string[];
    labs: string[];
}
