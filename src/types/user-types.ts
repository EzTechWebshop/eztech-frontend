import { Order } from '@/types/domain-types'

export type ChangeCartItemQuantityRequest = {
    cartItemId: number
    quantity: number
}

export type GetUserOrdersResponse = {
    status: 'Pending' | 'Processing' | 'Completed' | 'All'
    totalOrders: number
    pendingOrders: number
    processingOrders: number
    completedOrders: number
    orders: Order[]
}

// User Types
export type UpdateUserDetailsRequest = {
    firstName?: string
    lastName?: string
    email?: string
    phoneNumber?: string
    address?: string
    city?: string
    postalCode?: string
    country?: string
}

export type ChangeUserPasswordRequest = {
    oldPassword: string
    newPassword: string
}

// Website Info Types
