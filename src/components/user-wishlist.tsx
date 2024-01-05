"use client";

import { GetWishlist } from "@/server/wishlist-actions";
import WishlistItemCard from "@/components/cards/wishlist-item-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Wishlist } from "@/types/domain-types";
import { useQuery } from "@tanstack/react-query";
import { IoHeartOutline } from "react-icons/io5";

export default function UserWishlist() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["wishlist"],
    queryFn: () => GetWishlist(),
  });
  if (isLoading) return null;
  if (error) return null;
  if (!data) return null;
  return (
    <>
      <Wishlist wishlist={data} />
    </>
  );
}
type WishlistProps = {
  wishlist: Wishlist;
};
function Wishlist({ ...props }: WishlistProps) {
  const { wishlist } = props;
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"iconCircle"} size={"icon"}>
          <div className="">
            <IoHeartOutline size={20} />
            <Badge
              variant={"outline"}
              className="absolute w-fit h-fit px-0.5 py-0.5"
            >
              {wishlist.products.length}
            </Badge>
          </div>
        </Button>
      </SheetTrigger>
      <SheetContent className="select-none">
        <SheetHeader>My Wishlist</SheetHeader>
        <div className="max-h-[80vh] overflow-y-auto p-2">
          {wishlist.products.map((wishlistItem) => (
            <div key={wishlistItem.id}>
              <WishlistItemCard product={wishlistItem} />
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
