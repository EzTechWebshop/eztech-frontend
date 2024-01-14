"use client";
import AdminMenuBar from "@/components/admin-components/admin-menu-bar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AdminManagementCategories } from "@/types/admin-types/admin-category-types";
import { HandleQueryChange } from "@/utils/handle-query-change";
import { useRef } from "react";
import { IoAddOutline } from "react-icons/io5";
import AdminTable from "@/components/admin-components/admin-items-table";
import { Text } from "@radix-ui/themes";
import AdminItemDetails from "@/components/admin-components/admin-items-details-field";
import { useRouter } from "next/navigation";
import { CreateCategoryForm } from "@/components/admin-components/forms/category/add-category-form";

type CategoryManagementProps = {
  data: AdminManagementCategories;
};
export default function CategoryManagement({
  ...props
}: CategoryManagementProps) {
  const { data } = props;
  const labels: string[] = ["ID", "Name", "Product Count"];

  return (
    <div className="grid grid-cols-2 gap-2">
      <div>
        <AdminMenuBar
          href="/admin/categories"
          totalItems={data.totalCategories}
          totalPages={data.totalPages}
          page={data.page}
          pageSize={data.pageSize}
          menuButtons={<MenuButtons />}
          customInfo={<CustomInfo categoryCount={data.totalCategories} />}
        />
        {data.totalCategories > 0 ? (
          <AdminTable
            type="categories"
            labels={labels}
            items={data.categories}
          />
        ) : (
          <Text>There are no categories</Text>
        )}
      </div>
      <div>
        {data.category && (
          <AdminItemDetails
            type="categories"
            item={{
              category: data.category,
              products: data.categoryProducts,
            }}
          />
        )}
      </div>
    </div>
  );
}

type CustomInfoProps = {
  categoryCount: number;
};
function CustomInfo({ ...props }: CustomInfoProps) {
  const { categoryCount } = props;
  return (
    <>
      <Text>Total Categories: {categoryCount}</Text>
    </>
  );
}
function MenuButtons() {
  return (
    <>
      <AddCategoryModal />
    </>
  );
}
// Add Category Modal
function AddCategoryModal() {
  const router = useRouter();
  const closeDialogRef = useRef<HTMLButtonElement>(null);

  const actionSuccess = (result: any) => {
    const query = HandleQueryChange("categoryId", result.id.toString());
    router.push("?" + query);
    closeDialogRef.current?.click();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button buttonTip={"Add new category"} variant="iconCircle" size="icon">
          <IoAddOutline size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>Create new category</DialogHeader>
        <CreateCategoryForm action={actionSuccess} />
        <DialogClose ref={closeDialogRef} />
      </DialogContent>
    </Dialog>
  );
}
