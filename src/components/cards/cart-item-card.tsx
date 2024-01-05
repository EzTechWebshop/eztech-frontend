"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CartItem } from "@/types/domain-types";
import { Strong, Text } from "@radix-ui/themes";
import { CartChangeQuantity, CartRemoveFromCart } from "@/server/cart-actions";
import { IoAddCircleOutline, IoBagRemoveOutline, IoRemoveCircleOutline } from "react-icons/io5";
import { ChangeCartItemQuantityRequest } from "@/types/user-types";
import { useRouter } from "next/navigation";
import { ProductAvatar } from "@/components/product-logo";
import { Badge } from "@/components/ui/badge";

type CartItemCardProps = {
    item: CartItem;
};
const CartItemCard = ({ ...props }: CartItemCardProps) => {
    const { item } = props;
    const product = item.product;

    return (
        <div className="flex flex-col relative gap-4 p-2 rounded-lg border-2">
            {product.discount && (
                <Badge
                variant={"outline"}
                className="absolute w-fit h-fit z-50 px-1.5 py-1.5 top-0 bg-green-500 right-0">
                {product.discount}%
            </Badge>
            )}
            <div className="flex justify-between items-center">
                <div className="flex flex-col">
                    <Text>{product.name}</Text>
                    <Text size={"2"}>Stock: {product.stock}</Text>
                    {item.product.discount ? (
                        <>
                            <div className="flex flex-1">
                                <Text className="flex flex-1 gap-1 items-center">
                                    Price:
                                    <span
                                        className="mt-1 text-red-500 text-xs "
                                        style={{ textDecoration: "line-through" }}>
                                        {product.price}
                                    </span>
                                    <span className=" text-green-500">{product.discountedPrice} DKK</span>
                                </Text>
                            </div>
                        </>
                    ) : (
                        <>
                            <Text size={"2"}>Price: {product.price} DKK</Text>
                        </>
                    )}
                    <Text size={"2"}>Total price: {item.price} DKK</Text>
                    {item.quantity > item.product.stock && (
                        <Text color="red">
                            <Strong>NOT ENOUGH STOCK</Strong>
                        </Text>
                    )}
                </div>
                <ProductAvatar product={product} />
            </div>
            <CartItemCardMenu item={item} />
        </div>
    );
};
type ChangeCartItemQuantityProps = {
    item: CartItem;
};
function CartItemCardMenu({ ...props }: ChangeCartItemQuantityProps) {
    const router = useRouter();
    const queryClient = useQueryClient();
    const { item } = props;
    const { toast } = useToast();
    const handleQuantityChange = (quantity: number) => {
        let newQuantity = 0;
        if (item.quantity > item.product.stock) {
            // Product has sold out while in cart
            newQuantity = item.product.stock;
        } else {
            // Normal case
            newQuantity = item.quantity + quantity;
        }

        if (newQuantity > item.product.stock) {
            toast({
                title: "Not Enough Stock",
            });
            return;
        }
        const request: ChangeCartItemQuantityRequest = {
            cartItemId: item.id,
            quantity: newQuantity,
        };
        mutationChangeQuantity.mutate(request);
    };

    const mutationChangeQuantity = useMutation({
        mutationFn: (request: ChangeCartItemQuantityRequest) => CartChangeQuantity(request),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["cart"] });
            router.refresh();
        },
        onError: (error) => {
            toast({
                title: "Failed to change quantity",
            });
        },
    });

    const mutationRemove = useMutation({
        mutationFn: () => CartRemoveFromCart(item.id),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["cart"] });
            router.refresh();
        },
        onError: (error) => {
            toast({
                title: "Failed to remove from cart",
            });
        },
    });
    return (
        <div className="flex justify-between items-center">
            <div className="flex gap-1">
                <Button
                    size={"icon"}
                    variant={"outline"}
                    className="rounded-full w-fit h-fit"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={item.quantity === 1 || mutationChangeQuantity.isPending}>
                    <IoRemoveCircleOutline size={24} />
                </Button>
                <div>{item.quantity}</div>
                <Button
                    size={"icon"}
                    variant={"outline"}
                    disabled={item.quantity >= item.product.stock || mutationChangeQuantity.isPending}
                    className="rounded-full w-fit h-fit"
                    onClick={() => handleQuantityChange(1)}>
                    <IoAddCircleOutline size={24} />
                </Button>
            </div>
            <div>
                <Button
                    size={"icon"}
                    variant={"destructive"}
                    disabled={mutationRemove.isPending}
                    className="rounded-full w-fit h-fit p-1"
                    onClick={() => mutationRemove.mutate()}>
                    <IoBagRemoveOutline size={16} />
                </Button>
            </div>
        </div>
    );
}

export default CartItemCard;
