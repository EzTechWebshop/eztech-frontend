"use client";

import { Button } from "@/components/ui/button";
import { Product } from "@/types/domain-types";
import { Text } from "@radix-ui/themes";
import { IoAddOutline, IoTrashBinOutline } from "react-icons/io5";
import DetailText from "@/components/admin-components/detail-text";
import DetailsBox from "@/components/admin-components/details-box";
import { useRouter } from "next/navigation";
import { RemoveProduct, RestoreProduct } from "@/server/product-actions";
import EditProductCategoriesModal from "@/components/admin-components/modals/edit-product-categories-modal";
import EditDiscountPopover from "@/components/admin-components/popovers/edit-discount-popover";
import EditProductModal from "@/components/admin-components/modals/edit-product-modal";
import EditProductImagesModal from "@/components/admin-components/modals/edit-product-images-modal";
import { useToast } from "@/components/ui/use-toast";
import { ConfirmationWindow } from "@/utils/alerts";

// PRODUCT DETAILS
type ProductDetailsProps = {
  item: Product;
};
export default function ProductDetails({ ...props }: ProductDetailsProps) {
  const router = useRouter();
  const { toast } = useToast();
  const { item } = props;

  const handleRemoveProduct = async () => {
    if(!ConfirmationWindow("Are you sure you want to remove this product?")){
      return;
    }
    const result = await RemoveProduct(item.id).catch((err) => {
      toast({
        title: "Error removing product",
      });
      return;
    });
    toast({
      title: "Product removed",
      variant: "destructive",
    });
    router.refresh();
  };
  const handleRestoreProduct = async () => {
    const result = await RestoreProduct(item.id).catch((err) => {
      toast({
        title: "Error restoring product",
      });
      return;
    });
    toast({
      title: "Product restored",
    });
    router.refresh();
  };

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex flex-1 justify-between">
        <DetailsBox className="w-[10vw]" label={"Product Name"}>
          <DetailText label={"ID"} text={item.id} />
          <DetailText label={"Name"} text={item.name} />
        </DetailsBox>
        {item.isDeleted && (
          <DetailsBox>
            <Text size={"8"}>{"Removed from Store"}</Text>
          </DetailsBox>
        )}
      </div>
      <DetailsBox label={"Description"} className="mr-8">
        <Text>{item.description}</Text>
      </DetailsBox>
      <div className="flex space-x-8">
        <DetailsBox label={"Information"}>
          <DetailText label={"Price"} text={`${item.price} DKK`} />
          <DetailText label={"Stock"} text={item.stock} />
          <DetailText label={"Sold"} text={item.sold} />
          <DetailText label={"Discount"} text={item.discount} />
          <DetailText label={"Rating"} text={item.averageRating} />
        </DetailsBox>
        <DetailsBox label={"Categories"}>
          {item.categories.map((category) => (
            <div
              className="flex border-2 rounded-lg shadow-sm py-1 px-2 h-8 items-center"
              key={category.id}
            >
              {category.name}
            </div>
          ))}
          <EditProductCategoriesModal product={item} />
        </DetailsBox>
      </div>
      <div className="flex space-x-4">
        <DetailsBox label={"Manage"}>
          <div className="flex space-x-4">
            <EditDiscountPopover product={item} />
          </div>
        </DetailsBox>
        <DetailsBox label={"Menu"} className="flex space-x-4">
          <EditProductModal product={item} />
          <EditProductImagesModal product={item} />
        </DetailsBox>
        <DetailsBox label={"Status"} className="flex space-x-4">
          {item.isDeleted ? (
            <Button
              variant={"success"}
              size={"icon"}
              buttonTip="Restore product"
              onClick={handleRestoreProduct}
            >
              <IoAddOutline size={20} />
            </Button>
          ) : (
            <Button
              variant={"destructive"}
              size={"icon"}
              buttonTip="Remove product"
              onClick={handleRemoveProduct}
            >
              <IoTrashBinOutline size={20} />
            </Button>
          )}
        </DetailsBox>
      </div>
    </div>
  );
}
