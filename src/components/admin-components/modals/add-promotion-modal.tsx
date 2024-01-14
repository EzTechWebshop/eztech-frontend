"use client";
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
import { AddPromotionForm } from "@/components/admin-components/forms/promotion/add-promotion-form";

export default function AddPromotionModal() {
  const router = useRouter();
  const closeDialogRef = useRef<HTMLButtonElement>(null);

  const actionSuccess = (result: any) => {
    const query = HandleQueryChange("promotionId", result.id.toString());
    router.push("?" + query);
    closeDialogRef.current?.click();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button buttonTip="Add Promotion" variant="iconCircle" size="icon">
          <IoAddOutline size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>Add Promotion</DialogHeader>
        <AddPromotionForm action={actionSuccess} />
        <DialogClose ref={closeDialogRef} />
      </DialogContent>
    </Dialog>
  );
}
