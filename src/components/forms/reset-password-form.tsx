"use client";

import { ChangeUserPassword } from "@/server/user-actions";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

import { ChangeUserPasswordRequest } from "@/types/user-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import * as z from "zod";
import { Toggle } from "@/components/ui/toggle";

const formSchema = z.object({
    oldPassword: z.string().min(8).max(100),
    newPassword: z.string().min(8).max(100),
    confirmNewPassword: z.string().min(8).max(100),
});
export type FormType = z.infer<typeof formSchema>;

export default function ResetPasswordForm() {
    const { toast } = useToast();
    const [updatingDetails, setUpdatingDetails] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const form = useForm<FormType>({
        defaultValues: {
            oldPassword: "",
            newPassword: "",
            confirmNewPassword: "",
        },
        disabled: updatingDetails,
        resolver: zodResolver(formSchema),
    });

    async function onSubmit(values: FormType) {
        setUpdatingDetails(true);
        const request: ChangeUserPasswordRequest = {
            oldPassword: values.oldPassword,
            newPassword: values.newPassword,
        };
        if (request.newPassword !== values.confirmNewPassword) {
            form.setError("confirmNewPassword", {
                message: "Passwords do not match",
            });
            setUpdatingDetails(false);
            return;
        }
        const response = await ChangeUserPassword(request);
        if (response == "success") {
            setUpdatingDetails(false);
            toast({
                title: "Password changed",
            });
            return;
        }

        if (response) {
            setUpdatingDetails(false);
            toast({
                title: "Password changed",
            });
            form.reset();
        }
        setUpdatingDetails(false);
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={`space-y-4`}>
                {showPassword ? (
                    <>
                        <FormField
                            control={form.control}
                            name="oldPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Enter old password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Old Password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="newPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Enter new password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="New Password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmNewPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm new password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Confirm New Password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </>
                ) : (
                    <>
                        <FormField
                            control={form.control}
                            name="oldPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Enter old password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="Old Password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="newPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Enter new password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="New Password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmNewPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm new password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="Confirm New Password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </>
                )}
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
                        disabled={updatingDetails}>
                        Reset
                    </Button>
                    <Toggle
                        onClick={() => {
                            setShowPassword(!showPassword);
                        }}>
                        {showPassword ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />}
                    </Toggle>
                </div>
            </form>
        </Form>
    );
}
