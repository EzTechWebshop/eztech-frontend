import { Order } from "@/types/domain-types";

export type GetDashboardResponse = {
  totalActiveOrders: number;
  pendingOrders: number;
  processingOrders: number;
  shippedOrders: number;
  createdOrdersToday: number;
  createdOrdersThisMonth: number;
  createdOrdersThisYear: number;
  completedOrdersToday: DashboardOrder[];
  completedOrdersThisMonth: DashboardOrder[];
  completedOrdersThisYear: DashboardOrder[];
  completedOrdersAllTime: DashboardOrder[];
  incomeToday: number;
  incomeThisMonth: number;
  incomeThisYear: number;
  incomeAllTime: number;
  latestFiveActiveOrders: Order[];
  oldestFiveActiveOrders: Order[];
};

type DashboardOrder = {
  orderId: number;
  userId: number;
  status: string;
  idListOfItems: number[];
  createdAt: Date;
  completedAt: Date | null;
  total: number;
};
