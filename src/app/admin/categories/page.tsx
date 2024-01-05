import api from "@/utils/api";
import CategoryManagement from "./category.page";
import { AdminManagementCategories } from "@/types/admin-types/admin-category-types";
type CategoryManagementPageProps = {
    searchParams: {
        page: number;
        pageSize: number;
    };
};
export default async function CategoryManagementPage({
    searchParams,
}: CategoryManagementPageProps) {
    let searchQuery = "?";
    const searchQueries = Object.entries(searchParams);
    searchQueries.forEach(([key, value]) => {
        if (value) {
            searchQuery += `${key}=${value}&`;
        }
    });
    const res = await api.management.getCategoryManagement(searchQuery);
    const data: AdminManagementCategories = res.data;
    return <CategoryManagement data={data} />;
}
