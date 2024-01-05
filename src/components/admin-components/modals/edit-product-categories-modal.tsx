"use client";
import { GetCategories } from "@/server/category-actions";
import { EditProductCategories } from "@/components/forms/product/edit-product-categories";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { AdminManagementCategories } from "@/types/admin-types/admin-category-types";
import { Category, Product } from "@/types/domain-types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { set } from "react-hook-form";
import { IoPencilSharp } from "react-icons/io5";

// Edit Product Categories Modal
type EditProductCategoriesModalProps = {
  product: Product;
};
export default function EditProductCategoriesModal({
  ...props
}: EditProductCategoriesModalProps) {
  const [added, setAdded] = useState<boolean | undefined>();
  const [message, setMessage] = useState<string | undefined>();
  const [categories, setCategories] = useState<Category[] | undefined>();
  const router = useRouter();
  const { product } = props;
  const addSuccessAction = () => {
    setAdded(true);
    setMessage("Category added successfully");
    router.refresh();
  };
  const removeSuccessAction = () => {
    setAdded(false);
    setMessage("Category removed successfully");
    router.refresh();
  };
  const handleClick = async () => {
    const data: AdminManagementCategories = await GetCategories();
    setCategories(data.categories);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          onClick={handleClick}
          buttonTip="Edit categories associated with the product"
          variant="iconCircle"
          size="icon"
        >
          <IoPencilSharp size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>Categories</DialogHeader>
        {message && (
          <div className={cn("", added ? "text-green-500" : "text-red-500")}>
            {message}
          </div>
        )}
        <EditProductCategories
          product={product}
          categories={categories}
          addAction={addSuccessAction}
          removeAction={removeSuccessAction}
        />
      </DialogContent>
    </Dialog>
  );
}
