"use client";

import { AddProductToCart } from "@/server/cart-actions";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { Product } from "@/types/domain-types";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { IoBagAddOutline } from "react-icons/io5";

export type AddProductToCartButtonProps = {
  product: Product;
};
export default function AddProductToCartButton({
  ...props
}: AddProductToCartButtonProps) {
  const router = useRouter();
  const { product } = props;
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const addProduct = () => {
    mutationAdd.mutate(product.id);
  };

  const mutationAdd = useMutation({
    mutationFn: (productId: number) => AddProductToCart(productId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      router.refresh();
      toast({
        title: "Product added to cart",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to add product to cart",
      });
    },
  });
  return (
    <>
      <Button
        className={cn("", product.isInCart && "bg-green-500")}
        size={"icon"}
        variant={"outline"}
        buttonTip="Add to cart"
        disabled={product.isInCart || mutationAdd.isPending}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          addProduct();
        }}
      >
        <IoBagAddOutline size={18} />
      </Button>
    </>
  );
}
