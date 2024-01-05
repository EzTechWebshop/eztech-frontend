'use client'

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { Order, OrderItem, Product } from "@/types/domain-types";
import { Text } from "@radix-ui/themes";
import { useState } from "react";
import { IoCheckmarkCircleOutline, IoCloseCircleOutline, IoConstructOutline } from "react-icons/io5";
import { LiaShippingFastSolid } from "react-icons/lia";
import DetailText from "@/components/admin-components/detail-text";
import DetailsBox from "@/components/admin-components/details-box";
import { useRouter } from 'next/navigation';
import { ChangeOrderStatus } from "@/server/order-actions";
import { GetProductById } from "@/server/product-actions";

// ORDER DETAILS
type OrderDetailsProps = {
    item: Order;
};
export default function OrderDetails({ ...props }: OrderDetailsProps) {
    const router = useRouter();
    const { toast } = useToast();
    const { item } = props;

    const changeOrderStatus = async (status: string) => {
        const data = await ChangeOrderStatus(item!.id ?? 0, status);
        if(data == "Order status changed"){
            toast({
                title: "Order status changed",
            });
            router.refresh();
        } else {
            toast({
                title: "Something went wrong",
            });
        }
    };
    return (
        <div className="flex flex-col space-y-2">
            <div className="flex flex-1 justify-between">
                <DetailsBox label="Details">
                    <DetailText label="ID" text={item.id} />
                    <DetailText label="Order Number" text={item.orderNumber} />
                    <DetailText label="Total Price" text={`${item.total} DKK`} />
                    <DetailText label="Created At" text={new Date(item.createdAt).toLocaleDateString("en-GB")} />
                    <DetailText label="Status" text={item.statusName} />
                </DetailsBox>
                {!item.active && (
                    <DetailsBox className="flex space-x-4">
                        <Text size={"8"}>Order is archived</Text>
                    </DetailsBox>
                )}
            </div>
            <DetailsBox label="Items" className="w-[75%]">
                <ScrollArea className="max-h-[50vh] overflow-auto px-4">
                    <div className={`grid gap-2 grid-cols-2 ${item.active ? "" : ""}`}>
                        {item.items.map((item) => (
                            <ProductDetailsModal key={item.id} item={item} />
                        ))}
                    </div>
                </ScrollArea>
            </DetailsBox>
            <div className="flex space-x-4">
                {item.active && (
                    <>
                        <DetailsBox label="Manage Order" className="flex space-x-4">
                            <Button
                                variant={"outline"}
                                size={"icon"}
                                onClick={() => changeOrderStatus("Processing")}
                                disabled={item?.statusName === "Processing"}
                                buttonInfo="Process Order">
                                <IoConstructOutline size={20} />
                            </Button>
                            <Button
                                variant={"outline"}
                                size={"icon"}
                                onClick={() => changeOrderStatus("Shipped")}
                                disabled={item?.statusName === "Shipped"}
                                buttonInfo="Ship Order">
                                <LiaShippingFastSolid size={20} />
                            </Button>
                        </DetailsBox>
                        <DetailsBox label="Finish Order" className="flex space-x-4">
                            <Button
                                variant={"success"}
                                size={"icon"}
                                onClick={() => changeOrderStatus("Completed")}
                                disabled={item?.statusName === "Completed"}
                                buttonInfo="Finish Order">
                                <IoCheckmarkCircleOutline size={20} />
                            </Button>
                            <Button
                                variant={"destructive"}
                                size={"icon"}
                                onClick={() => changeOrderStatus("Cancelled")}
                                disabled={item?.statusName === "Cancelled"}
                                buttonInfo="Cancel Order">
                                <IoCloseCircleOutline size={20} />
                            </Button>
                        </DetailsBox>
                    </>
                )}
            </div>
        </div>
    );
}

type ProductDetailsModalProps = {
    item: OrderItem;
};
function ProductDetailsModal({ ...props }: ProductDetailsModalProps) {
    const [product, setProduct] = useState<Product | undefined>(undefined);
    const { item } = props;
    const handleClick = async () => {
        const res = await GetProductById(item.productId);
        setProduct(product);
    };
    return (
        <div
            key={item.id}
            className="flex flex-col border-2 p-2 rounded-lg hover:cursor-pointer hover:bg-orange-50 select-none"
            onClick={handleClick}>
            <DetailText label="ID" text={item.productId} />
            <DetailText label="Name" text={item.productName} />
            <DetailText label="Price" text={`${item.price} DKK`} />
            <DetailText label="Quantity" text={item.quantity} />
            <DetailText label="Total Price" text={`${item.total} DKK`} />
        </div>
    );
}
