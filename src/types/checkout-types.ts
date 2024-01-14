export type CreateOrderItem = {
    productId: number
    productName: string
    productDescription: string
    price: number
    quantity: number
}

export type CreateOrderRequest = {
    paymentId: string
    products: CreateOrderItem[]
    total: number
    date: string
}
