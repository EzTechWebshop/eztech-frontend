"use client";

import { UpdateUserDetails } from "@/server/user-actions";
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
import { UserDetails } from "@/types/domain-types";
import { UpdateUserDetailsRequest } from "@/types/user-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  firstName: z.string().min(2).max(100),
  lastName: z.string().min(2).max(100),
  phoneNumber: z.string(),
  email: z.string().email(),
  address: z.string().min(2).max(100).optional(),
  city: z.string().min(2).max(100).optional(),
  postalCode: z.string().optional(),
  country: z.string().optional(),
});
export type FormType = z.infer<typeof formSchema>;

type UserSettingsFormProps = {
  details: UserDetails;
};
export default function UserSettingsForm({ ...props }: UserSettingsFormProps) {
  const { toast } = useToast();
  const { details } = props;
  const [updatingDetails, setUpdatingDetails] = useState(false);

  const form = useForm<FormType>({
    defaultValues: {
      firstName: details.firstName ?? "",
      lastName: details.lastName ?? "",
      phoneNumber: details.phoneNumber ?? "",
      email: details.email ?? "",
      address: details.address ?? "",
      city: details.city ?? "",
      postalCode: details.postalCode ?? "",
      country: details.country ?? "",
    },
    disabled: updatingDetails,
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: FormType) {
    setUpdatingDetails(true);
    const request: UpdateUserDetailsRequest = {
      firstName: values.firstName,
      lastName: values.lastName,
      phoneNumber: values.phoneNumber,
      email: values.email,
      address: values.address,
      city: values.city,
      postalCode: values.postalCode,
      country: values.country,
    };
    const data = await UpdateUserDetails(request);
    setUpdatingDetails(false);
    if(data){
      toast({
        title: "Details updated",
      });
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={`space-y-4`}>
        <div className="flex flex-1 justify-between gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your first name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your last name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-1 justify-between gap-4">
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your phone number" {...field} />
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
                  <Input placeholder="Enter your email" {...field} />
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
                <Input placeholder="Enter your address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your city" {...field} />
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
                  <Input placeholder="Enter your postal code" {...field} />
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
                  <Input placeholder="Enter your country" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-between">
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
