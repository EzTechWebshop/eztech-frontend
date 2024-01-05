"use client";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Cart, UserDetails } from "@/types/domain-types";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  firstName: z.string().min(3).max(255),
  lastName: z.string().min(3).max(255),
  address: z.string().min(3).max(255),
  postalCode: z.string().min(3).max(255),
  country: z.string().min(3).max(255),
  email: z.string().email(),
  phoneNumber: z.string().min(3).max(255),
});
export type FormType = z.infer<typeof formSchema>;

export type OrderFormProps = {
  userDetails: UserDetails;
  action: (orderDetails: FormType) => void;
};
const CheckOutForm = ({ ...props }: OrderFormProps) => {
  const { userDetails, action } = props;

  const onSubmit: SubmitHandler<FormType> = async (orderDetails) => {
    action(orderDetails);
    // TODO: Send order to server and validate? or validate here?
  };

  const form = useForm<FormType>({
    defaultValues: {
      firstName: userDetails.firstName || "",
      lastName: userDetails.lastName || "",
      address: userDetails.address || "",
      postalCode: userDetails.postalCode || "",
      country: userDetails.country || "",
      email: userDetails.email || "",
      phoneNumber: userDetails.phoneNumber || "",
    },
    resolver: zodResolver(formSchema),
  });
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          method={"POST"}
          className="space-y-2"
        >
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <Input placeholder={`First name...`} {...field} />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <Input placeholder={`Last name...`} {...field} />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <Input placeholder={`22222222`} {...field} />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    placeholder={`user@example.com`}
                    {...field}
                  />
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
                <Input placeholder={`Addresse`} {...field} />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postal Code</FormLabel>
                  <Input placeholder={`2222`} {...field} />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <Input placeholder={`Country...`} {...field} />
                </FormItem>
              )}
            />
          </div>
          <div className="mt-4">
            <Button
              type="submit"
              variant={"success"}
              size={"sm"}
              disabled={!form.formState.isValid}
            >
              Check Out
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default CheckOutForm;
