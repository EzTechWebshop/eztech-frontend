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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

import { EditWebsiteInfo } from "@/server/website-info-actions";
import { WebsiteInfo } from "@/types/domain-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { UpdateWebsiteInfoRequest } from "@/types/admin-types/admin-website-info-types";

const formSchema = z.object({
  name: z.string().min(2).max(20),
  companyName: z.string().min(2).max(20),
  cvr: z.string().min(8).max(8),
  city: z.string().min(2).max(20),
  postalCode: z.string().min(2).max(20),
  address: z.string().min(2).max(50),
  country: z.string().min(2).max(20),
  phoneNumber: z.string().min(2).max(20),
  email: z.string().email(),
  facebook: z.string().url(),
  instagram: z.string().url(),
  trustPilot: z.string().url(),
  website: z.string().url(),
  footerInfo: z.string(),
});
export type FormType = z.infer<typeof formSchema>;

type EditWebsiteInfoFormProps = {
  details: WebsiteInfo;
};
export default function EditWebsiteInfoForm({
  ...props
}: EditWebsiteInfoFormProps) {
  const { toast } = useToast();
  const { details } = props;
  const [updatingDetails, setUpdatingDetails] = useState(false);

  const form = useForm<FormType>({
    defaultValues: {
      name: details.name,
      companyName: details.companyName,
      cvr: details.cvr,
      city: details.city,
      postalCode: details.postalCode,
      address: details.address,
      country: details.country,
      phoneNumber: details.phoneNumber,
      email: details.email,
      facebook: details.facebook,
      instagram: details.instagram,
      trustPilot: details.trustPilot,
      website: details.website,
      footerInfo: details.footerInfo,
    },
    disabled: updatingDetails,
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: FormType) {
    setUpdatingDetails(true);
    const request: UpdateWebsiteInfoRequest = {
      name: values.name,
      companyName: values.companyName,
      cvr: values.cvr,
      city: values.city,
      postalCode: values.postalCode,
      address: values.address,
      country: values.country,
      phoneNumber: values.phoneNumber,
      email: values.email,
      facebook: values.facebook,
      instagram: values.instagram,
      trustPilot: values.trustPilot,
      website: values.website,
      footerInfo: values.footerInfo,
    };
    const data = await EditWebsiteInfo(details.id, request);
    if (data) {
      toast({ title: "Success", description: "Website info updated" });
    }
    setUpdatingDetails(false);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={`space-y-4`}>
        <div className="grid grid-cols-3 gap-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter company name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cvr"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CVR</FormLabel>
                <FormControl>
                  <Input placeholder="Enter CVR" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-3 gap-8">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="Enter city" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="postalCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Postal Code</FormLabel>
                <FormControl>
                  <Input placeholder="Enter postal code" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input placeholder="Enter country" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="Enter address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="facebook"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Facebook</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Facebook" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="instagram"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Instagram</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Instagram" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="trustPilot"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Trustpilot</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Trustpilot" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website</FormLabel>
                <FormControl>
                  <Input placeholder="Enter website" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="footerInfo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Footer Info</FormLabel>
              <FormControl>
                <Textarea
                  className="min-h-[20vh] max-h-[20vh] resize-none"
                  placeholder="Enter footer info"
                  {...field}
                />
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
