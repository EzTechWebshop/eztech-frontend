"use client";
// https://next-auth.js.org/configuration/pages#credentials-sign-in
// https://www.youtube.com/watch?v=g6S-XZxq9Ug
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(100),
});
type FormType = z.infer<typeof formSchema>;

export default function SignInForm() {
    const router = useRouter();

    const form = useForm<FormType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(values: FormType) {
        // https://next-auth.js.org/configuration/pages#credentials-sign-in
        var res = await signIn("credentials", {
            email: values.email,
            password: values.password,
            redirect: false,
        }).catch((err) => {});

        if (res?.ok) {
            router.push("/");
            router.refresh();
        }

        if (res?.status === 401) {
            if (res.error == "Email is not registered") {
                form.setError("email", {
                    message: "Email is not registered",
                });
            }
            if (res.error == "Incorrect password") {
                form.resetField("password");
                form.setError("password", {
                    message: "Incorrect password",
                });
            }
            if (res.error == "Email is not verified") {
                toast({
                    title: "Email is not verified",
                    description: "Please check your inbox for a verification email.",
                });
            }
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    form.handleSubmit(onSubmit)();
                }}
                className={`space-y-4`}>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="user@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="********" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button variant={"outline"} size={"xs"} type="submit">
                    Sign In
                </Button>
            </form>
        </Form>
    );
}
