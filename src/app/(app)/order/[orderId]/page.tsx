import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Order, OrderItem } from "@/types/domain-types";

import api from "@/utils/api";
import { Heading, Strong, Text } from "@radix-ui/themes";

type OrderPageProps = {
  params: {
    orderId: string;
  };
};

export default async function OrderPage({ ...props }: OrderPageProps) {
  const { params } = props;

  const res = await api.order.getOrderByOrderNumber(params.orderId);
  const order = res.data;

  if (!order) {
    return <div>No Order Found</div>;
  }

  return (
    <div className="mx-auto w-7xl border-2 rounded-lg shadow-lg p-4 h-fit">
      <OrderCard order={order} />
    </div>
  );
}

type OrderCardProps = {
  order: Order;
};
const OrderCard = ({ ...props }: OrderCardProps) => {
  const { order } = props;
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col justify-between">
        <Text>Order Nr: {order.orderNumber}</Text>
        <Text>Status: {order.statusName}</Text>
      </div>
      <div className="flex flex-col justify-between">
        <Text>
          Order Date: {new Date(order.createdAt).toLocaleDateString()}
        </Text>
        <Text>Total Price: {order.total} DKK</Text>
      </div>
      <div>
        <Heading size={"3"}>Products</Heading>
        <div className="grid grid-cols-4">
          {order.items.map((item) => (
            <OrderCardProductCard key={item.id} item={item} />
          ))}
        </div>
      </div>
      <div>
        <Button size={"sm"} variant={"destructive"}>
          Cancel Order
        </Button>
      </div>
    </div>
  );
};

type OrderCardProductCardProps = {
  item: OrderItem;
};
const OrderCardProductCard = ({ ...props }: OrderCardProductCardProps) => {
  const { item } = props;
  return (
    <div className="flex flex-col justify-between border-2 px-2 py-1 rounded-lg shadow-md">
      <Text>
        Name: <Strong>{item.productName}</Strong>
      </Text>
      <Text>Quantity: {item.quantity}</Text>
      <Text>Price: {item.price}</Text>
    </div>
  );
};
