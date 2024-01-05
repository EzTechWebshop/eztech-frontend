"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

import { EditWebsiteInfoText } from "@/server/website-info-actions";
import { WebsiteInfoField } from "@/types/domain-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { UpdateWebsiteInfoTextRequest } from "@/types/admin-types/admin-website-info-types";

const formSchema = z.object({
  title: z.string().min(2).max(100),
  description: z.string().min(2).max(9999),
});
export type FormType = z.infer<typeof formSchema>;

type EditWebsiteInfoTextFormProps = {
  details: WebsiteInfoField;
  action: (result: any) => void;
};
export default function EditWebsiteInfoTextForm({
  ...props
}: EditWebsiteInfoTextFormProps) {
  const { toast } = useToast();
  const { details, action } = props;
  const [updatingDetails, setUpdatingDetails] = useState(false);

  const form = useForm<FormType>({
    defaultValues: {
      title: details.title,
      description: details.description,
    },
    disabled: updatingDetails,
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: FormType) {
    setUpdatingDetails(true);
    const request: UpdateWebsiteInfoTextRequest = {
      title: values.title,
      description: values.description,
    };
    const data = await EditWebsiteInfoText(details.id, request);
    if (data) {
      action(data);
    }
    setUpdatingDetails(false);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={`space-y-4`}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Enter description..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex  flex-1 gap-4">
          <Button variant={"success"} type="submit" disabled={updatingDetails}>
            Submit
          </Button>
          <Button
            variant={"destructive"}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.reset();
            }}
            disabled={updatingDetails}
          >
            Reset
          </Button>
        </div>
      </form>
    </Form>
  );
}
