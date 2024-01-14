'use server'

import {
    AddPromotionRequest,
    UpdatePromotionRequest,
} from '@/types/admin-types/admin-promotion-types'
import api from '@/utils/api'

export async function GetPromotions() {
    const result = await api.management
        .getPromotionManagement()
        .then((res) => {
            return res.data
        })
        .catch((err) => {
            return err.response.data
        })
    return result
}

export async function CreatePromotion(request: AddPromotionRequest) {
    const result = await api.promotion
        .addPromotion(request)
        .then((res) => {
            return res.data
        })
        .catch((err) => {
            return err.response.data
        })
    return result
}

export async function UpdatePromotion(
    promotionId: number,
    request: UpdatePromotionRequest
) {
    const result = await api.promotion
        .editPromotion(promotionId, request)
        .then((res) => {
            return res.data
        })
        .catch((err) => {
            return err.response.data
        })
    return result
}

export async function DeletePromotion(id: number) {
    const result = await api.promotion
        .deletePromotion(id)
        .then((res) => {
            return res.data
        })
        .catch((err) => {
            return err.response.data
        })
    return result
}

// Image
export async function AddPromotionImage(promotionId: number, image: any) {
    const result = await api.promotion
        .addPromotionImage(promotionId, image)
        .then((res) => {
            return res.data
        })
        .catch((err) => {
            return err.response.data
        })
    return result
}
