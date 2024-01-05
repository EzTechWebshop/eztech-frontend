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

const basePath = process.env.NEXT_PUBLIC_IMAGE_URL || "";

export function ProductCarousel({ ...props }: ProductCarouselProps) {
  const { product } = props;
  const [activeImage, setActiveImage] = React.useState("");
  const handleSelect = (href: string) => {
    setActiveImage(href);
  };
  if (product.images.length == 0) return <div></div>;
  return (
    <div className="flex flex-1 gap-4">
      <ScrollArea className="flex flex-wrap w-fit border-2 gap-2 p-4 max-h-[80vh]">
        <div className="flex flex-col space-y-4 flex-wrap">
          {product.images.map((image) => (
            <div className="relative w-[100px] h-[100px]" key={image.id}>
              <Button
                onClick={() => handleSelect(image.fileName)}
                variant={"ghost"}
                size={"carousel"}
                className={cn("p-2", activeImage == image.fileName && "")}
              >
                <Image
                  style={{ objectFit: "contain" }}
                  src={`${basePath}/${image.fileName}`}
                  height={250}
                  width={250}
                  alt="img"
                  className="object-cover"
                />
              </Button>
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="flex relative w-[300px]">
        <AspectRatio ratio={16 / 9}>
          <Image
            style={{ objectFit: "contain" }}
            width={500}
            height={500}
            src={`${basePath}/${
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
