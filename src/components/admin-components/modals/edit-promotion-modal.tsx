"use client";
import { EditPromotionForm } from "@/components/forms/promotion/edit-promotion-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Promotion } from "@/types/domain-types";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { IoPencilSharp } from "react-icons/io5";

// PRODUCT MODALS AND POPOVERS
type EditPromotionModalProps = {
    promotion: Promotion;
};
export default function EditPromotionModal({ ...props }: EditPromotionModalProps) {
    const { promotion } = props;
    const { toast } = useToast();
    const router = useRouter();
    const closeDialogRef = useRef<HTMLButtonElement>(null);

    const actionSuccess = (result: any) => {
        router.refresh();
        closeDialogRef.current?.click();
        toast({
            title: "Success",
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button buttonTip="Edit Promotion" className="flex space-x-2" variant="outline" size={"icon"}>
                    <IoPencilSharp size={20} />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>Edit Promotion</DialogHeader>
                <EditPromotionForm promotion={promotion} action={actionSuccess} />
                <DialogClose ref={closeDialogRef} />
            </DialogContent>
        </Dialog>
    );
}
