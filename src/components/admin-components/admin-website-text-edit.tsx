"use client";
import { DeleteWebsiteInfoText } from "@/server/website-info-actions";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { WebsiteInfoField, WebsiteInfoFieldTopic } from "@/types/domain-types";
import { HandleQueryChange } from "@/utils/handle-query-change";
import { Heading, Text } from "@radix-ui/themes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { IoTrashBinOutline } from "react-icons/io5";
import AddWebsiteInfoTextModal from "./modals/add-website-info-text";
import EditWebsiteInfoTextModal from "./modals/edit-website-info-text";

type AdminWebsiteTextEditProps = {
    topic: WebsiteInfoFieldTopic;
    websiteInfoFields: WebsiteInfoField[];
};

export default function AdminWebsiteTextEdit({ ...props }: AdminWebsiteTextEditProps) {
    return (
        <div className="flex flex-1">
            <div className="flex flex-col gap-4">
                <AdminWebsiteTextEditMenuBar {...props} />
                <AdminWebsiteTextEditContent {...props} />
            </div>
        </div>
    );
}

function AdminWebsiteTextEditContent({ ...props }: AdminWebsiteTextEditProps) {
    const { topic, websiteInfoFields } = props;
    return (
        <div>
            <div className="flex flex-1 justify-between items-center">
                <Heading size={"6"}>{topic}</Heading>
                <AddWebsiteInfoTextModal topic={topic} />
            </div>
            {websiteInfoFields.length == 0 && <div>No content</div>}
            <Accordion type="single" collapsible className="w-full">
                {websiteInfoFields.map((websiteInfoField) => (
                    <AdminMenuTextEditContentAccordion key={websiteInfoField.id} websiteInfoField={websiteInfoField} />
                ))}
            </Accordion>
        </div>
    );
}

type AdminWebsiteTextEditContentAccordionProps = {
    websiteInfoField: WebsiteInfoField;
};
function AdminMenuTextEditContentAccordion({ ...props }: AdminWebsiteTextEditContentAccordionProps) {
    const { websiteInfoField } = props;
    const { toast } = useToast();
    const router = useRouter();

    const handleDelete = async () => {
        const result = await DeleteWebsiteInfoText(websiteInfoField.id);
        if (result == "Deleted") {
            toast({
                title: "Succesfully deleted text",
                description: `Deleted text for ${websiteInfoField.title}`,
            });
            router.refresh();
        }
    };

    return (
        <AccordionItem value={websiteInfoField.id.toString()}>
            <AccordionTrigger>
                <Heading size={"6"}>{websiteInfoField.title}</Heading>
            </AccordionTrigger>
            <AccordionContent>
                <div className="flex flex-1">
                    <div className="flex flex-col space-y-8 w-full">
                        <Text>{websiteInfoField.description}</Text>
                        <div className="flex flex-1 justify-between">
                            <EditWebsiteInfoTextModal infoText={websiteInfoField} />
                            <Button
                                buttonTip="Delete Text"
                                variant={"destructiveCircle"}
                                size={"xsIcon"}
                                onClick={handleDelete}>
                                <IoTrashBinOutline size={18} />
                            </Button>
                        </div>
                    </div>
                </div>
            </AccordionContent>
        </AccordionItem>
    );
}
function AdminWebsiteTextEditMenuBar({ ...props }: AdminWebsiteTextEditProps) {
    const router = useRouter();
    const { topic, websiteInfoFields } = props;
    const websiteInfoFieldTopics: WebsiteInfoFieldTopic[] = [
        "AboutUs",
        "ContactUs",
        "TermsAndConditions",
        "PrivacyPolicy",
        "ShippingPolicy",
        "ReturnPolicy",
    ];
    const handleSelect = (topic: WebsiteInfoFieldTopic) => {
        const query = HandleQueryChange("topic", topic);
        router.push(`?${query}`);
    };
    return (
        <div className="flex flex-1 gap-2">
            {websiteInfoFieldTopics.map((websiteInfoFieldTopic) => (
                <div key={websiteInfoFieldTopic}>
                    <Button
                        className={cn("", websiteInfoFieldTopic == topic && "bg-slate-200")}
                        variant={"outline"}
                        onClick={() => handleSelect(websiteInfoFieldTopic)}
                        size={"badge"}>
                        {websiteInfoFieldTopic}
                    </Button>
                </div>
            ))}
        </div>
    );
}
