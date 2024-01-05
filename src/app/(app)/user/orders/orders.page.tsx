import api from "@/utils/api";
import { Text } from "@radix-ui/themes";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import UserOrderCard from "@/components/cards/user-order-card";

type UserOrdersPageProps = {
  searchParams: {
    status: string;
  };
};
export default async function UserOrdersPage({
  ...props
}: UserOrdersPageProps) {
  const { searchParams } = props;
  // TODO: Implement searchParams
  let query = searchParams.status ? `?status=${searchParams.status}` : "";
  const res = await api.user.getUserOrders(query);
  const data = res.data;
  return (
    <div className="flex flex-1">
      <div className="flex flex-col w-fit ml-4 h-[10vh]">
        <Text size={"3"} weight={"medium"}>
          Select Order Status
        </Text>
        <div className="flex flex-col space-y-2 w-fit">
          <Link href="/user/orders" className="w-fit">
            <Button
              className={cn("", data.status == "All" && "bg-orange-300")}
              variant={"outline"}
              size={"xs"}
            >
              All ({data.totalOrders})
            </Button>
          </Link>
          <Link href="/user/orders?status=Completed" className="w-fit">
            <Button
              className={cn("", data.status == "Completed" && "bg-orange-300")}
              variant={"outline"}
              size={"xs"}
            >
              Completed ({data.completedOrders})
            </Button>
          </Link>
          <Link href="/user/orders?status=Pending">
            <Button
              className={cn("", data.status == "Pending" && "bg-orange-300")}
              variant={"outline"}
              size={"xs"}
            >
              Pending ({data.pendingOrders})
            </Button>
          </Link>
          <Link href="/user/orders?status=Processing">
            <Button
              className={cn("", data.status == "Processing" && "bg-orange-300")}
              variant={"outline"}
              size={"xs"}
            >
              Processing ({data.processingOrders})
            </Button>
          </Link>
        </div>
      </div>
      <div className=" w-[50vw] max-w-7xl mx-auto mb-4 border-2 rounded-lg shadow-lg p-4 top-0 overflow-y-scroll">
        {data.orders.length == 0 ? (
          "No orders found"
        ) : (
          <div className="flex flex-col space-y-4">
            {data.orders.map((order) => (
              <UserOrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
