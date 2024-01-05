"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { UpdateProductRequest } from "@/types/admin-types/admin-product-types";
import { Product } from "@/types/domain-types";
import { PopoverClose } from "@radix-ui/react-popover";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { CiDiscount1 } from "react-icons/ci";
import { UpdateProduct } from "@/server/product-actions";

// Edit Discount Button
type EditDiscountButtonProps = {
  product: Product;
};
export default function EditDiscountModal({
  ...props
}: EditDiscountButtonProps) {
  const maxDiscount = 99;
  const minDiscount = 0;
  const router = useRouter();
  const closePopoverRef = useRef<HTMLButtonElement>(null);
  const { product } = props;
  const [discount, setDiscount] = useState(0);
  const [infoText, setInfoText] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > maxDiscount) {
      setDiscount(maxDiscount);
      e.target.value = maxDiscount.toString();
      setInfoText("Discount cannot be higher than " + maxDiscount + "%");
      return;
    } else if (value < minDiscount) {
      e.target.value = "0";
      setDiscount(0);
      setInfoText("Discount cannot be lower than " + minDiscount + "%");
      return;
    }
    setInfoText("");
    setDiscount(value);
  };
  const handleSubmit = async () => {
    const request: UpdateProductRequest = {
      discount: discount,
    };
    const result = await UpdateProduct(product.id, request).catch((err) => {});
    if (result) {
      router.refresh();
      closePopoverRef.current?.click();
      setDiscount(0);
    }
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button buttonTip="Edit Discount" variant={"outline"} size={"icon"}>
          <CiDiscount1 size={20} />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div>
          <div className="flex flex-1 justify-between">
            <p>Original Price</p>{" "}
            <p className="text-right">{product.price} DKK</p>
          </div>
          <div className="flex flex-1 justify-between">
            <p>Current Discount</p>{" "}
            <p className="text-right">{product.discount} %</p>
          </div>
          <div className="flex flex-1 justify-between">
            <p>New Discount</p> <p className="text-right">{discount} %</p>
          </div>
        </div>
        <Input type="number" onChange={(e) => handleChange(e)} />
        <div className="text-red-500">{infoText}</div>
        <div>
          <div className="flex flex-1 justify-between">
            <p>New Discount</p>
            <p className="text-right">{discount} %</p>
          </div>
          <div className="flex flex-1 justify-between">
            <p>New Price</p>
            <p className="text-right">
              {(product.price - (product.price * discount) / 100).toFixed(2)}{" "}
              DKK
            </p>
          </div>
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
        <PopoverClose ref={closePopoverRef} />
      </PopoverContent>
    </Popover>
  );
}
