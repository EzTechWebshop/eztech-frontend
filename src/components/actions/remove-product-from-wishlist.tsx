"use client";
import { AddToWishlist, RemoveFromWishlist } from "@/server/wishlist-actions";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

import { Product } from "@/types/domain-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { IoHeartOutline, IoTrashBinOutline } from "react-icons/io5";

export type RemoveProductFromWishlistButtonProps = {
  product: Product;
};
export default function RemoveProductFromWishlistButton({
  ...props
}: RemoveProductFromWishlistButtonProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { product } = props;
  const { toast } = useToast();
  const removeItem = () => {
    mutationRemove.mutate(product.id);
  };

  const mutationRemove = useMutation({
    mutationFn: (productId: number) => RemoveFromWishlist(productId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      router.refresh();
      toast({
        title: "Product removed from wishlist",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to remove product from wishlist",
      });
    },
  });

  return (
    <>
      <Button
        disabled={mutationRemove.isPending}
        onClick={removeItem}
        buttonTip="Remove from wishlist"
        variant={"destructive"}
        size={"icon"}
      >
        <IoHeartOutline size={18} />
      </Button>
    </>
  );
}
