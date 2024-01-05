import api from "@/utils/api";
import ProductManagement from "./product.page";
import { AdminManagementProducts } from "@/types/admin-types/admin-product-types";

type ProductManagementPageProps = {
  searchParams: {
    minPrice: number;
    maxPrice: number;
    search: string;
    startDate: Date;
    endDate: Date;
    sort: string;
    page: number;
    pageSize: number;
  };
};

export default async function ProductManagementPage({
  searchParams,
}: ProductManagementPageProps) {
  let searchQuery = "?";
  const searchQueries = Object.entries(searchParams);
  searchQueries.forEach(([key, value]) => {
    if (value) {
      searchQuery += `${key}=${value}&`;
    }
  });
  const res = await api.management.getProductManagement(searchQuery);
  const data: AdminManagementProducts = res.data;
  return <ProductManagement data={data} />;
}
