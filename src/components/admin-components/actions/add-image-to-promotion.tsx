"use client";

import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { AddPromotionImage } from "@/server/promotion-actions";
import { Promotion } from "@/types/domain-types";
import { ConfirmationWindow } from "@/utils/alerts";
import { useRouter } from "next/navigation";

type PromotionDetailsProps = {
  promotion: Promotion;
};
export default function AddImageToPromotion({
  ...props
}: PromotionDetailsProps) {
  const { promotion } = props;
  const router = useRouter();
  const { toast } = useToast();
  const handleAddImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if(!ConfirmationWindow("Are you sure you want to add this image?")){
      return;
    }
    const formData = new FormData();

    if (e.target.files && e.target.files.length > 0) {
      formData.append("file", e.target.files[0]);
    }
    const result = await AddPromotionImage(promotion.id, formData);
    if (result) {
      toast({
        title: "Image added successfully",
      });
      router.refresh();
    }
  };
  return <Input type="file" onChange={handleAddImage} />;
}
