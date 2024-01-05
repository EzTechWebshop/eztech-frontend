"use client";
import { GetCart } from "@/server/cart-actions";
import CartItemCard from "@/components/cards/cart-item-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Cart } from "@/types/domain-types";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";
import { IoCartOutline } from "react-icons/io5";
import { ScrollArea } from "./ui/scroll-area";

export default function UserCart() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["cart"],
    queryFn: () => GetCart(),
  });
  if (isLoading) return null;
  if (error) return null;
  if (!data) return null;

  return (
    <>
      <Cart cart={data} />
    </>
  );
}

function Cart({ cart }: { cart: Cart }) {
  const sheetCloseRef = React.useRef<HTMLButtonElement>(null);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"iconCircle"} size={"icon"}>
          <div className="">
            <IoCartOutline size={20} />
            <Badge
              variant={"outline"}
              className="absolute w-fit h-fit px-0.5 py-0.5"
            >
              {cart.totalQuantity}
            </Badge>
          </div>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col flex-1 select-none max-h-[100vh] overflow-hidden">
        <SheetHeader>My Cart</SheetHeader>
        <ScrollArea className="flex flex-col flex-1 gap-2 p-2">
          <div className="flex flex-col space-y-8">
            {cart.cartItems.map((cartItem) => (
              <div key={cartItem.id}>
                <CartItemCard item={cartItem} />
              </div>
            ))}
          </div>
        </ScrollArea>
        {cart.cartItems.length !== 0 && (
          <SheetFooter>
            <div className="flex flex-1 items-center justify-between">
              <Button
                size={"sm"}
                onClick={() => sheetCloseRef.current?.click()}
              >
                <Link href="/checkout">Check Out</Link>
              </Button>
              Total Price: {cart.totalPrice} DKK
            </div>
          </SheetFooter>
        )}
      </SheetContent>
      <SheetClose ref={sheetCloseRef} />
    </Sheet>
  );
}
