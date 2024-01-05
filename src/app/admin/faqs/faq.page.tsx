"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { AdminManagementFaqs } from "@/types/admin-types/admin-faq-types";
import { Faq } from "@/types/domain-types";
import { Text } from "@radix-ui/themes";
import { ReactNode, useRef } from "react";
import { IoAddOutline, IoTrashBinOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { CreateFaqForm } from "@/components/forms/faq/create-faq-form";
import { EditFaqForm } from "@/components/forms/faq/edit-faq-form";
import { DeleteFaq } from "@/server/faq-actions";

type FaqManagementProps = {
    data: AdminManagementFaqs;
};
export default function FaqManagement({ ...props }: FaqManagementProps) {
    const { data } = props;
    return (
        <div className="flex flex-1 gap-8">
            <div className="ml-4 mt-4">
                <AddNewFaqDialog>
                    <Button buttonInfo={"Add"} variant={"iconCircle"} size={"icon"}>
                        <IoAddOutline size={20} />
                    </Button>
                </AddNewFaqDialog>
            </div>
            <div className="flex flex-1 mx-8">
                <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {data.faqs.map((faq) => (
                        <FaqPreview key={faq.id} faq={faq} />
                    ))}
                </div>
            </div>
        </div>
    );
}

type AddNewFaqDialogProps = {
    children: ReactNode;
};
function AddNewFaqDialog({ ...props }: AddNewFaqDialogProps) {
    const { children } = props;
    const router = useRouter();
    const { toast } = useToast();
    const dialogCloseRef = useRef<HTMLButtonElement>(null);

    const addSucess = () => {
        toast({
            title: "FAQ added successfully",
        });
        dialogCloseRef.current?.click();
        router.refresh();
    };
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>Create new FAQ</DialogHeader>
                <CreateFaqForm action={addSucess} />
            </DialogContent>
            <DialogClose ref={dialogCloseRef} />
        </Dialog>
    );
}

type FaqPreviewProps = {
    faq: Faq;
};
function FaqPreview({ ...props }: FaqPreviewProps) {
    const router = useRouter();
    const { toast } = useToast();
    const { faq } = props;

    const handleDeleteFaq = async () => {
        const result = await DeleteFaq(faq.id);
        if (result) {
            router.refresh();
            toast({
                title: "Successfully deleted FAQ",
            });
        }
    };
    return (
        <Card className="min-w-full space-y-4">
            <CardHeader className="flex flex-1 border-b-2">{faq.question}</CardHeader>
            <CardContent>
                <div className="h-72 overflow-auto">
                    <Text className="gap-4">
                        <Text style={{ whiteSpace: "pre-line" }}>{faq.answer}</Text>
                    </Text>
                </div>
            </CardContent>
            <CardFooter className="flex flex-1 justify-between">
                <EditFaqDialog faq={faq} />
                <Button buttonTip={"Delete FAQ"} variant={"destructive"} size={"xsIcon"} onClick={handleDeleteFaq}>
                    <IoTrashBinOutline />
                </Button>
            </CardFooter>
        </Card>
    );
}

type EditFaqDialogProps = {
    faq: Faq;
};
function EditFaqDialog({ ...props }: EditFaqDialogProps) {
    const router = useRouter();
    const dialogCloseRef = useRef<HTMLButtonElement>(null);
    const { faq } = props;
    const { toast } = useToast();
    const editSucess = () => {
        dialogCloseRef.current?.click();
        router.refresh();
        toast({
            title: "Successfully edited FAQ",
        });
    };
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <Text>Edit FAQ</Text>
                </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh]">
                <DialogHeader>Edit FAQ</DialogHeader>
                <EditFaqForm faq={faq} action={editSucess} />
            </DialogContent>
            <DialogClose ref={dialogCloseRef} />
        </Dialog>
    );
}
