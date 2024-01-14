import {
  AddCategoryToProduct,
  RemoveCategoryFromProduct,
} from "@/server/product-actions";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Category, Product } from "@/types/domain-types";
import { IoAddOutline, IoRemoveOutline } from "react-icons/io5";
import SpinnerLoad from "@/components/loading-fields/spinner-load";


type EditProductCategoriesProps = {
  product: Product;
  categories: Category[] | undefined;
  addAction: () => void;
  removeAction: () => void;
};

export function EditProductCategories({
  ...props
}: EditProductCategoriesProps) {
  const { product, categories, addAction, removeAction } = props;
  if (categories == undefined) {
    return <SpinnerLoad />
  }
  const productCategoryIds = product.categories.map((category) => category.id);
  const productCategories = categories.filter((category) =>
    productCategoryIds.includes(category.id),
  );
  const otherCategories = categories.filter(
    (category) => !productCategoryIds.includes(category.id),
  );
  const addCategory = async (id: number) => {
    const result = await AddCategoryToProduct(product.id, id);
    if (result) {
      addAction();
    }
  };
  const removeCategory = async (id: number) => {
    const result = await RemoveCategoryFromProduct(product.id, id);
    if (result) {
      removeAction();
    }
  };
  return (
    <ScrollArea className="max-h-[50vh]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[75px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {productCategories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>{category.id}</TableCell>
              <TableCell>{category.name}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant={"destructive"}
                  size={"icon"}
                  onClick={() => removeCategory(category.id)}
                >
                  <IoRemoveOutline size={16} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {otherCategories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>{category.id}</TableCell>
              <TableCell>{category.name}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant={"success"}
                  size={"icon"}
                  onClick={() => addCategory(category.id)}
                >
                  <IoAddOutline size={16} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}
