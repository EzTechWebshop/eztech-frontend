"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Order } from "@/types/domain-types";
import { HandleQueryChange } from "@/utils/handle-query-change";
import { useRouter, useSearchParams } from "next/navigation";

// Order Table Body
type OrderTableBodyProps = {
  items: Order[];
};
export default function OrderTableBody({ ...props }: OrderTableBodyProps) {
  const router = useRouter();
  const currentOrderId = useSearchParams().get("orderId") ?? 0;
  const { items } = props;
  return (
    <>
      {items.map((order, index) => (
        <TableRow
          key={order.id}
          className={cn(
            "hover:cursor-pointer hover:bg-orange-50",
            currentOrderId == order.id && "bg-orange-200",
          )}
          onClick={() =>
            router.push(`?${HandleQueryChange("orderId", order.id)}`)
          }
        >
          <TableCell>{order.id}</TableCell>
          <TableCell>{order.orderNumber}</TableCell>
          <TableCell>#{order.userId}</TableCell>
          <TableCell>{order.items.length}</TableCell>
          <TableCell>{order.total} DKK</TableCell>
          <TableCell>{order.statusName}</TableCell>
          <TableCell>
            {new Date(order.createdAt).toLocaleDateString("en-GB")}
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
