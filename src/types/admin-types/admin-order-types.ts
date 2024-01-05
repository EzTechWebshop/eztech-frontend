import { Order } from "@/types/domain-types";

// Order Management
export type AdminManagementOrders = {
    orderId?: number;
    userId?: number;
    status?: "Pending" | "Processing" | "Shipped" | "Completed" | "Cancelled" | "Refunded";
    startDate?: Date;
    endDate?: Date;
    sort?: "date_asc" | "date_desc" | "amount_asc" | "amount_desc";
    totalOrders: number;
    totalPages: number;
    page: number;
    pageSize: number;
    orders: Order[];
    order: Order | null | undefined;
};
