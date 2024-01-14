import AdminItemDetails from "@/components/admin-components/admin-items-details-field";
import AdminTable from "@/components/admin-components/admin-items-table";
import AdminMenuBar from "@/components/admin-components/admin-menu-bar";
import AddProductModal from "@/components/admin-components/modals/add-product-modal";
import SpinnerLoad from "@/components/loading-fields/spinner-load";
import { AdminManagementProducts } from "@/types/admin-types/admin-product-types";

type ProductManagementProps = {
  data: AdminManagementProducts;
};
export default function ProductManagement({
  ...props
}: ProductManagementProps) {
  if (!props.data) {
    return <SpinnerLoad />
  }
  const { data } = props;
  const labels: string[] = [
    "ID",
    "Name",
    "Price",
    "Stock",
    "Sold",
    "Discount",
    "Rating",
    "Created",
    "Removed",
  ];
  const customInfoProps: CustomInfoProps = {
    productCount: data.totalProducts,
  };
  return (
    <div className="grid grid-cols-2 gap-2">
      <div>
        <AdminMenuBar
          href="/admin/products"
          totalItems={data.totalProducts}
          totalPages={data.totalPages}
          page={data.page}
          pageSize={data.pageSize}
          menuButtons={<MenuButtons />}
          customInfo={<CustomInfo {...customInfoProps} />}
        />
        {data.totalProducts > 0 ? (
          <AdminTable type="products" labels={labels} items={data.products} />
        ) : (
          <p>No products found</p>
        )}
      </div>
      <div>
        {data.product && (
          <AdminItemDetails type="products" item={data.product} />
        )}
      </div>
    </div>
  );
}

function MenuButtons() {
  return (
    <>
      <AddProductModal />
    </>
  );
}

type CustomInfoProps = {
  productCount: number;
};
function CustomInfo({ ...props }: CustomInfoProps) {
  const { productCount } = props;
  return <>{`${productCount} products found`}</>;
}
