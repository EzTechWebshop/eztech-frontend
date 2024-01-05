import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Product } from "@/types/domain-types";
import Image from "next/image";

const basePath = process.env.NEXT_PUBLIC_IMAGE_URL || "";
type ProductAvatarProps = {
    product: Product;
};
export function ProductAvatar({ ...props }: ProductAvatarProps) {
    const { product } = props;
    return (
        <Avatar className="w-20 h-20">
            {product.images.length > 0 ? (
                <AvatarImage
                    src={`${basePath}/${
                        product.thumbnail ? product.thumbnail.fileName : product.images[0].fileName
                    } `}
                    alt="img"
                />
            ) : (
                <AvatarImage src={`/no-image.jpg`} alt="img" />
            )}
            <AvatarFallback>
                <Image src={"/no-image.jpg"} width={250} height={250} alt="img" />
            </AvatarFallback>
        </Avatar>
    );
}

type ProductImageProps = {
    product: Product;
};
export function ProductImage({ ...props }: ProductImageProps) {
    const { product } = props;
    console.log('e');
    return (
        <Image
            width={250}
            height={250}
            src={`${basePath}/${
                product.thumbnail ? product.thumbnail.fileName : "no-image.jpg"
            } `}
            alt={`img`}
        />
    );
}
