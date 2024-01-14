'use server'
import { AddCategoryRequest } from '@/types/admin-types/admin-category-types'
import api from '@/utils/api'

export async function GetCategories() {
    const result = await api.management
        .getCategoryManagement()
        .then((res) => {
            return res.data
        })
        .catch((err) => {
            return err.response.data
        })
    return result
}

export async function CreateCategory(request: AddCategoryRequest) {
    const res = await api.category.createCategory(request)
    return res.data
}
export async function DeleteCategory(id: number) {
    const result = await api.category
        .deleteCategory(id)
        .then((res) => {
            return res.data
        })
        .catch((err) => {
            return err.response.data
        })
    return result
}
