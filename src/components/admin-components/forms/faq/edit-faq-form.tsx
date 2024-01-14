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
import { EditFaq } from "@/server/faq-actions";
import { EditFaqRequest } from "@/types/admin-types/admin-faq-types";
import { Faq } from "@/types/domain-types";
import { ConfirmationWindow } from "@/utils/alerts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  question: z.string().min(4),
  answer: z.string().min(4),
});
type FormType = z.infer<typeof formSchema>;

type EditFaqModalProps = {
  faq: Faq;
  action: (result: any) => void;
};
export function EditFaqForm({ ...props }: EditFaqModalProps) {
  const { faq, action } = props;
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: faq.question,
      answer: faq.answer,
    },
  });
  const onSubmit = async (data: FormType) => {
    if(!ConfirmationWindow("Are you sure you want to edit this FAQ?")){
      return;
    }
    const request: EditFaqRequest = {
      question: data.question,
      answer: data.answer,
    };
    const result = await EditFaq(faq.id, request).catch((err) => {
      form.control.setError("question", {
        message: "Question already exists",
      });
    });
    if (result) {
      action(result);
    }
  };
  const resetForm = (e: any) => {
    e.preventDefault();
    form.reset();
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="question"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question</FormLabel>
              <FormControl>
                <Input placeholder={"FAQ question"} {...field} />
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
                  className="min-h-[20vh] max-h-[20vh] resize-none"
                  placeholder={"FAQ answer..."}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-1 justify-between">
          <Button type="submit">Save</Button>
          <Button onClick={(e) => resetForm(e)}>Reset</Button>
        </div>
      </form>
    </Form>
  );
}
