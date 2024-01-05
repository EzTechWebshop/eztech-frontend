// import AddProductToCartButton from '@/components/actions/add-product-to-cart';
// import AddProductToWishListButton from "@/components/actions/add-product-to-wishlist";

import { ProductAvatar } from "@/components/product-logo";
import { cn } from "@/lib/utils";
import { Product } from "@/types/domain-types";
import { Heading, Strong, Text } from "@radix-ui/themes";
import Link from "next/link";
import { IoStarOutline } from "react-icons/io5";
import AddProductToCartButton from "@/components/actions/add-product-to-cart";
import AddProductToWishListButton from "@/components/actions/add-product-to-wishlist";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type CatalogProductCardProps = {
  product: Product;
  isUser: boolean;
};
export default async function CatalogProductCard({
  ...props
}: CatalogProductCardProps) {
  const { product, isUser } = props;
  if (product.isDeleted) return <></>;
  return (
    <Link href={`/catalog/product/${product.id}`}>
      <Card
        className={cn(
          `p-2 space-y-2 max-w-full mx-2`,
          product.stock <= 0 && "bg-red-50",
          product.discount && "bg-green-50",
        )}
      >
        <CardHeader className="p-0">
          <div className="grid grid-cols-3">
            <Heading size={"4"} className=" col-span-2 truncate">
              {product.name}
            </Heading>
            <div className="flex items-center gap-1 justify-end">
              <Text size={"1"}>{product.averageRating.toFixed(2)}</Text>
              <IoStarOutline size={16} />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex flex-1 justify-between">
            <div className="flex flex-1 justify-between">
              <ProductAvatar product={product} />
              {product.discount > 0 && (
                <Badge
                  variant={"outline"}
                  className="w-fit h-fit z-40 px-1.5 py-1.5 bg-green-500"
                >
                  {product.discount}%
                </Badge>
              )}
            </div>
            {!isUser && (
              <div className="flex flex-col justify-end w-full text-right">
                <div className="flex flex-col">
                  <Text>
                    <Text size={"5"}>
                      <Strong>{product.price}</Strong>
                    </Text>{" "}
                    <Text size={"1"}>DKK</Text>
                  </Text>
                </div>
                <div className="flex flex-col">
                  {product.stock <= 0 ? (
                    <Text size={"1"} color="red">
                      <Strong>SOLD OUT</Strong>
                    </Text>
                  ) : (
                    <Text
                      size={"1"}
                      className=" whitespace-nowrap"
                      color="green"
                    >
                      <Strong>Stock: {product.stock}</Strong>
                    </Text>
                  )}
                </div>
              </div>
            )}
          </div>
        </CardContent>
        {isUser && (
          <CardFooter className="p-0">
            <>
              <div className="flex gap-2">
                <AddProductToCartButton product={product} />
                <AddProductToWishListButton product={product} />
              </div>
            </>

            <div className="flex flex-col justify-end w-full text-right">
              <div className="flex flex-col">
                <Text>
                  <Text size={"5"}>
                    <Strong>{product.price}</Strong>
                  </Text>{" "}
                  <Text size={"1"}>DKK</Text>
                </Text>
              </div>
              <div className="flex flex-col">
                {product.stock <= 0 ? (
                  <Text size={"1"} color="red">
                    <Strong>SOLD OUT</Strong>
                  </Text>
                ) : (
                  <Text size={"1"} className=" whitespace-nowrap" color="green">
                    <Strong>Stock: {product.stock}</Strong>
                  </Text>
                )}
              </div>
            </div>
          </CardFooter>
        )}
      </Card>
    </Link>
  );
}
