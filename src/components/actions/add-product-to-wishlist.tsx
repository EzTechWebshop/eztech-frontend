"use client";
import { AddToWishlist } from "@/server/wishlist-actions";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

import { Product } from "@/types/domain-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { IoHeartOutline } from "react-icons/io5";

export type AddProductToWishListButtonProps = {
  product: Product;
};
export default function AddProductToWishListButton({
  ...props
}: AddProductToWishListButtonProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { product } = props;
  const { toast } = useToast();
  const addProduct = () => {
    mutationAdd.mutate(product.id);
  };

  const mutationAdd = useMutation({
    mutationFn: (productId: number) => AddToWishlist(productId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      router.refresh();
      toast({
        title: "Product added to wishlist",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to add product to wishlist",
      });
    },
  });

  return (
    <>
      <Button
        className={cn("", product.isInWishlist && " bg-fuchsia-400")}
        buttonTip="Add to wishlist"
        size={"icon"}
        variant={"icon"}
        disabled={product.isInWishlist || mutationAdd.isPending}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          addProduct();
        }}
      >
        <IoHeartOutline size={18} />
      </Button>
    </>
  );
}
