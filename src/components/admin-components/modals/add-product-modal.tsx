"use client";
import { AddProductForm } from "@/components/admin-components/forms/product/add-product-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HandleQueryChange } from "@/utils/handle-query-change";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { IoAddOutline } from "react-icons/io5";

export default function AddProductModal() {
  const router = useRouter();
  const closeDialogRef = useRef<HTMLButtonElement>(null);

  const actionSuccess = (result: any) => {
    const query = HandleQueryChange("productId", result.id.toString());
    router.push("?" + query);
    closeDialogRef.current?.click();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button buttonTip="Add Product" variant="iconCircle" size="icon">
          <IoAddOutline size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>Add Product</DialogHeader>
        <AddProductForm action={actionSuccess} />
        <DialogClose ref={closeDialogRef} />
      </DialogContent>
    </Dialog>
  );
}
