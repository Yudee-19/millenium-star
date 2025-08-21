// src/types/client/diamond.ts
export interface ClientDiamond {
    _id: string;
    color: string;
    clarity: string;
    rapList: number;
    discount: number;
    laboratory: string;
    size: number;
    cut: string;
    polish: string;
    symmetry: string;
    fluorescenceColor: string;
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
    sortBy?: string;
    sortOrder?: string;
    shape?: string[];
    sizeMin?: number;
    sizeMax?: number;
    priceMin?: number;
    priceMax?: number;
    discountMin?: number;
    discountMax?: number;
    rapListMin?: number;
    rapListMax?: number;
    color?: string[];
    clarity?: string[];
    cut?: string[];
    polish?: string[];
    symmetry?: string[];
    fluorescenceColor?: string[];
    laboratory?: string[];
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
