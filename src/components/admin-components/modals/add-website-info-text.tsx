"use client";

import { AddWebsiteTextForm } from "@/components/admin-components/forms/website-info/add-website-info-text-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { WebsiteInfoFieldTopic } from "@/types/domain-types";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { IoAddOutline, IoPencilSharp } from "react-icons/io5";

// PRODUCT MODALS AND POPOVERS
type AddWebsiteInfoTextModalProps = {
  topic: WebsiteInfoFieldTopic;
};
export default function AddWebsiteInfoTextModal({
  ...props
}: AddWebsiteInfoTextModalProps) {
  const { topic } = props;
  const { toast } = useToast();
  const router = useRouter();
  const closeDialogRef = useRef<HTMLButtonElement>(null);

  const actionSuccess = (result: any) => {
    router.refresh();
    closeDialogRef.current?.click();
    toast({
      title: "Succesfully added text",
      description: `Added text for ${topic}`,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          buttonTip={`Add Field for ${topic}`}
          className="flex space-x-2"
          variant="iconCircle"
          size={"icon"}
        >
          <IoAddOutline size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>Add Text for topic: {topic}</DialogHeader>
        <AddWebsiteTextForm action={actionSuccess} topic={topic} />
        <DialogClose ref={closeDialogRef} />
      </DialogContent>
    </Dialog>
  );
}
