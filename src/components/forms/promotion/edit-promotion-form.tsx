import { UpdatePromotion } from "@/server/promotion-actions";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { UpdatePromotionRequest } from "@/types/admin-types/admin-promotion-types";
import { Promotion } from "@/types/domain-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { IoCalendarOutline } from "react-icons/io5";
import { z } from "zod";

const editPromotionFormSchema = z.object({
    title: z.string().min(2),
    description: z.string().min(2),
    startDate: z.date(),
    endDate: z.date(),
});
type EditPromotionModalProps = {
    promotion: Promotion;
    action: (result: any) => void;
};
export function EditPromotionForm({ ...props }: EditPromotionModalProps) {
    const { promotion, action } = props;
    const form = useForm<z.infer<typeof editPromotionFormSchema>>({
        resolver: zodResolver(editPromotionFormSchema),
        defaultValues: {
            title: promotion.title,
            description: promotion.description,
            startDate: new Date(promotion.startDate),
            endDate: new Date(promotion.endDate),
        },
    });
    const onSubmit = async (data: z.infer<typeof editPromotionFormSchema>) => {
        const request: UpdatePromotionRequest = {
            title: data.title,
            description: data.description,
            startDate: data.startDate,
            endDate: data.endDate,
        };
        const result = await UpdatePromotion(promotion.id, request).catch((err) => {
            form.control.setError("title", {
                message: "Title already exists",
            });
        });
        if (result) {
            action(result);
        }
    };
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{field.value || "Title"}</FormLabel>
                            <FormControl>
                                <Input placeholder={field.value || "Enter Title"} {...field} />
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
                            <FormLabel>{field.value || "Description"}</FormLabel>
                            <FormControl>
                                <Textarea
                                    className="
                                 min-h-[20vh] max-h-[20vh] resize-none"
                                    placeholder={field.value || "Enter description"}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* https://ui.shadcn.com/docs/components/date-picker */}
                <div className="flex flex-1 justify-between gap-4">
                    <FormField
                        control={form.control}
                        name="startDate"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Start Date</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}>
                                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                                <IoCalendarOutline />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date >= form.getValues("endDate") || date < new Date("1900-01-01")
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="endDate"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>End Date</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}>
                                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                                <IoCalendarOutline />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date <= form.getValues("startDate") || date < new Date("1900-01-01")
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}
