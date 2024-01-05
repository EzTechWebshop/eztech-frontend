import { Category, Product } from '@/types/domain-types';
export type AdminManagementCategories = {
    totalCategories: number;
    totalPages: number;
    page: number;
    pageSize: number;
    search: string;
    sort: "name_asc" | "name_desc" | "products_asc" | "products_desc";
    categories: Category[];
    category: Category | null | undefined;
    categoryProducts: Product[] | null | undefined;
};

export type AddCategoryRequest = {
    name: string;
    description: string;
};


export type AddCategoryResponse = {
    id: number;
    name: string;
    description: string;
};