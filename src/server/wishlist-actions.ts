'use server'

import api from '@/utils/api'

export async function GetWishlist() {
    const res = await api.wishlist.getWishlist()
    return res.data
}

export async function AddToWishlist(productId: number) {
    const res = await api.wishlist.addToWishlist(productId)
    return res.data
}

export async function RemoveFromWishlist(productId: number) {
    const res = await api.wishlist.removeFromWishlist(productId)
    return res.data
}
