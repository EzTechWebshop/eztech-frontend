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
import { UpdateProduct } from "@/server/product-actions";
import { UpdateProductRequest } from "@/types/admin-types/admin-product-types";
import { Product } from "@/types/domain-types";
import { ConfirmationWindow } from "@/utils/alerts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const editProductFormSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(2),
  price: z.number().min(0).max(1000000),
  stock: z.number().min(0).max(1000000),
});
type EditProductModalProps = {
  product: Product;
  action: (result: any) => void;
};
export function EditProductForm({ ...props }: EditProductModalProps) {
  const { product, action } = props;
  const form = useForm<z.infer<typeof editProductFormSchema>>({
    resolver: zodResolver(editProductFormSchema),
    defaultValues: {
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
    },
  });
  const onSubmit = async (data: z.infer<typeof editProductFormSchema>) => {
    if(!ConfirmationWindow("Are you sure you want to edit this product?")){
      return;
    }
    const request: UpdateProductRequest = {
      name: data.name,
      description: data.description,
      price: data.price,
      stock: data.stock,
    };
    const result = await UpdateProduct(product.id, request).catch((err) => {
      form.control.setError("name", {
        message: "messages.nameAlreadyExists",
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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Enter description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className=" grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(event) => field.onChange(+event.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(event) => field.onChange(+event.target.value)}
                  />
                </FormControl>
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
