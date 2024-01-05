"use client";
import * as React from "react";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";
import { Product } from "@/types/domain-types";
import { ScrollArea } from "./ui/scroll-area";

type ProductCarouselProps = {
    product: Product;
};

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function ProductCarousel({ ...props }: ProductCarouselProps) {
    const { product } = props;
    const [activeImage, setActiveImage] = React.useState("");
    const handleSelect = (href: string) => {
        setActiveImage(href);
    };
    if (product.images.length == 0) return <div></div>;
    return (
        <div className="flex flex-1 gap-4">
            <ScrollArea className="flex flex-wrap w-fit border-2 gap-4 p-4 max-h-[80vh]">
                {product.images.map((image) => (
                    <div key={image.id}>
                        <Button
                            onClick={() => handleSelect(image.fileName)}
                            variant={"ghost"}
                            size={"carousel"}
                            className={cn("p-4", activeImage == image.fileName && "")}>
                            <Image
                                src={`${basePath}/api/image/${image.fileName}`}
                                height={50}
                                width={100}
                                alt="img"
                                className="object-cover"
                            />
                        </Button>
                    </div>
                ))}
            </ScrollArea>
            <div className="w-[450px] ml-16 mt-16">
                <AspectRatio ratio={16 / 9}>
                    <Image
                        width={500}
                        height={500}
                        src={`${basePath}/api/image/${
                            activeImage ? activeImage : product.images[0].fileName
                        } `}
                        alt="Image"
                        className="rounded-md object-cover"
                    />
                </AspectRatio>
            </div>
        </div>
    );
}
