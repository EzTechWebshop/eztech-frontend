import { Category, Product } from '@/types/domain-types'

export type AdminManagementProducts = {
    totalProducts: number
    totalPages: number
    page: number
    pageSize: number
    search: string
    minPrice: number
    maxPrice: number
    minDate: Date
    maxDate: Date
    sort:
        | 'name_asc'
        | 'name_desc'
        | 'price_asc'
        | 'price_desc'
        | 'sold_asc'
        | 'sold_desc'
        | 'rating_asc'
        | 'rating_desc'
    products: Product[]
    product: Product | null | undefined
    category: Category | null | undefined
}

export type AddProductRequest = {
    name: string
    description: string
    price: number
    stock: number
}

export type UpdateProductRequest = {
    name?: string
    description?: string
    price?: number
    discount?: number
    stock?: number
}
