"use client";
import { CreateCategory } from "@/server/category-actions";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AddCategoryRequest, AddCategoryResponse } from "@/types/admin-types/admin-category-types";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const addCategoryFormSchema = z.object({
    name: z.string().min(2),
    description: z.string().min(2),
});
type CategoryManagementProps = {
    action: (result: AddCategoryResponse) => void;
};
export function CreateCategoryForm({ ...props }: CategoryManagementProps) {
    const closeDialogRef = useRef<HTMLButtonElement>(null);
    const { action } = props;
    const form = useForm<z.infer<typeof addCategoryFormSchema>>({
        resolver: zodResolver(addCategoryFormSchema),
        defaultValues: {
            name: "",
            description: "",
        },
    });
    const onSubmit = async (data: z.infer<typeof addCategoryFormSchema>) => {
        const request: AddCategoryRequest = {
            name: data.name,
            description: data.description,
        };
        const result = await CreateCategory(request);
        if (result) {
            void action(result);
        }
    };
    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder={"Category name..."} {...field} />
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
                                    <Input placeholder={"Category description..."} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Create category</Button>
                </form>
            </Form>
        </>
    );
}
