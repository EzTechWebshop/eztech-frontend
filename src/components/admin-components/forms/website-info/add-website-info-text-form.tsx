'use client'

import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { AddWebsiteInfoText } from '@/server/website-info-actions'
import { AddWebsiteInfoFieldRequest } from '@/types/admin-types/admin-website-info-types'
import { WebsiteInfoFieldTopic } from '@/types/domain-types'
import { ConfirmationWindow } from '@/utils/alerts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
    name: z.string().min(2).max(100),
    description: z.string().min(2).max(1000),
})
type AddWebsiteTextFormProps = {
    topic: WebsiteInfoFieldTopic
    action: (result: any) => void
}
export function AddWebsiteTextForm({ ...props }: AddWebsiteTextFormProps) {
    const { topic, action } = props
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            description: '',
        },
    })
    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        if (!ConfirmationWindow('Are you sure you want to create this text?')) {
            return
        }
        const request: AddWebsiteInfoFieldRequest = {
            topic: topic,
            title: data.name,
            description: data.description,
        }
        const result = await AddWebsiteInfoText(request)
        if (result) {
            action(result)
        }
    }
    return (
        <>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter name"
                                        {...field}
                                    />
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
                                    <Textarea
                                        className="min-h-[20vh] max-h-[20vh] resize-none"
                                        placeholder="Enter description"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </>
    )
}
