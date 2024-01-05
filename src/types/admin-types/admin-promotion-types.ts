import { Product, Promotion } from '@/types/domain-types';

export type AdminManagementPromotions = {
    totalPromotions: number;
    totalPages: number;
    page: number;
    pageSize: number;
    search: string;
    sort: 
    | "name_asc" 
    | "name_desc" 
    | "products_asc" 
    | "products_desc"
    | "startDate_asc"
    | "startDate_desc"
    | "endDate_asc"
    | "endDate_desc"
    promotions: Promotion[];
    promotion: Promotion | null | undefined;
    promotionProducts: Product[] | null | undefined;
};

export type AddPromotionRequest = {
    title: string;
    description: string;
    startDate?: Date;
    endDate?: Date;
};


export type UpdatePromotionRequest = {
    title?: string;
    description?: string;
    startDate?: Date;
    endDate?: Date;
};