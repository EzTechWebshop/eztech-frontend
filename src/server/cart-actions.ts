'use server'

import { ChangeCartItemQuantityRequest } from '@/types/user-types'
import api from '@/utils/api'

export async function GetCart() {
    const res = await api.cart.getCart()
    return res.data
}

export async function AddProductToCart(productId: number) {
    const res = await api.cart.addProductToCart(productId)
    return res.data
}

export async function CartRemoveFromCart(cartItemId: number) {
    const res = await api.cart.removeFromCart(cartItemId)
    return res.data
}

export async function CartChangeQuantity(
    request: ChangeCartItemQuantityRequest
) {
    const res = await api.cart.changeQuantity(request)
    return res.data
}
