"use server";
import { CreateOrderRequest } from "@/types/checkout-types";
import api from "@/utils/api";

export async function ChangeOrderStatus(orderId: number, newStatus: string) {
    const result = await api.order
        .changeOrderStatus(orderId, newStatus)
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            return err.response.data;
        });
    return result;
}

export async function CreateOrder(request: CreateOrderRequest) {
    const result = await api.order
        .addOrder(request)
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            return err.response.data;
        });
    return result;
}
