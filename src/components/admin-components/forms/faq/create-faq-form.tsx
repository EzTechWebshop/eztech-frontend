import { CreateFaq } from "@/server/faq-actions";
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
import { CreateFaqRequest } from "@/types/admin-types/admin-faq-types";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const createFaqFormSchema = z.object({
  question: z.string().min(2),
  answer: z.string().min(2),
});
type CreateFaqFormProps = {
  action: (result: any) => void;
};
export function CreateFaqForm({ ...props }: CreateFaqFormProps) {
  const router = useRouter();
  const closeDialogRef = useRef<HTMLButtonElement>(null);

  const { action } = props;

  const form = useForm<z.infer<typeof createFaqFormSchema>>({
    resolver: zodResolver(createFaqFormSchema),
  });

  const onSubmit = async (data: z.infer<typeof createFaqFormSchema>) => {
    const request: CreateFaqRequest = {
      question: data.question,
      answer: data.answer,
    };
    const result = await CreateFaq(request);
    if (!result.id) {
      form.control.setError("question", {
        message: "Question already exists",
      });
    } else {
      router.refresh();
      closeDialogRef.current?.click();
      void action(result);
    }
  };
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="question"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Question</FormLabel>
                <FormControl>
                  <Input placeholder={"FAQ question..."} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Answer</FormLabel>
                <FormControl>
                  <Textarea
                    className="min-h-[25vh] max-h-[25vh] resize-none"
                    placeholder={"Faq answer"}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Create FAQ</Button>
        </form>
      </Form>
    </>
  );
}
