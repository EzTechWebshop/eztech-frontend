"use client";

import { GetCart } from "@/server/cart-actions";
import CartItemCard from "@/components/cards/cart-item-card";
import PaymentForm from "@/components/forms/check-out/payment-form";
import CheckOutForm from "@/components/forms/check-out/user-details-form";
import { useToast } from "@/components/ui/use-toast";

import { Cart, UserDetails } from "@/types/domain-types";
import { Heading } from "@radix-ui/themes";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

// Load necessary data for the page
type CheckOutProps = {
    userDetails: UserDetails;
};
export default function CheckOut({ ...props }: CheckOutProps) {
    const { toast } = useToast();
    const [finalCart, setFinalCart] = useState<Cart | null>(null);
    const [finalUserDetails, setFinalUserDetails] = useState<UserDetails | null>(null);
    const [valid, setValid] = useState(false);
    const { userDetails } = props;

    const { isLoading, error, data } = useQuery({
        queryKey: ["cart"],
        queryFn: () => GetCart(),
    });

    if (isLoading) return null;
    if (error) return null;
    if (!data) return null;
    const cart = data;
    if (cart.cartItems.length === 0) {
        return (
            <div className="flex flex-1 justify-center items-center">
                <Heading size={"8"}>Your cart is empty</Heading>
            </div>
        );
    }
    const action = async (orderDetails: any) => {
        setFinalUserDetails(orderDetails);
        const finalCart = await GetCart();
        finalCart.cartItems.forEach((item) => {
            if (item.quantity > item.product.stock) {
                toast({
                    title: "Failed to add product to cart",
                    description: `"${item.product.name}" is out of stock`,
                });
                return;
            }
        });
        setFinalCart(finalCart);
        setValid(true);
    };

    return (
        <>
            <div className="border-2 p-4 rounded-lg shadow-md w-full">
                <Heading>Checkout</Heading>
                <div className="grid grid-cols-9 gap-4">
                    <div className="col-span-6 border-2 p-4">
                        <Heading size={"3"}>User Details</Heading>
                        {valid && cart && finalCart ? (
                            <Elements stripe={stripePromise}>
                                <PaymentForm cart={finalCart} details={finalUserDetails} />
                            </Elements>
                        ) : (
                            <CheckOutForm action={action} userDetails={userDetails} />
                        )}
                    </div>
                    <div className="col-span-3 border-2 p-4">
                        <Heading size={"3"}>Payment Details</Heading>
                        <div className="flex flex-col">
                            {cart.cartItems.map((item) => (
                                <CartItemCard key={item.id} item={item} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
