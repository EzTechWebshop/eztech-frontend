"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Category } from "@/types/domain-types";
import { HandleQueryChange } from "@/utils/handle-query-change";
import { useRouter, useSearchParams } from "next/navigation";

// Category Table Body
type CategoryTableBodyProps = {
  items: Category[];
};
export default function CategoryTableBody({
  ...props
}: CategoryTableBodyProps) {
  const router = useRouter();
  const currentCategoryId = useSearchParams().get("categoryId") ?? 0;
  const { items } = props;
  return (
    <>
      {items.map((category, index) => (
        <TableRow
          key={category.id}
          className={cn(
            "hover:cursor-pointer hover:bg-orange-50",
            currentCategoryId == category.id && "bg-orange-200",
          )}
          onClick={() =>
            router.push(`?${HandleQueryChange("categoryId", category.id)}`)
          }
        >
          <TableCell>{category.id}</TableCell>
          <TableCell>{category.name}</TableCell>
          <TableCell>{category.totalProducts}</TableCell>
        </TableRow>
      ))}
    </>
  );
}
