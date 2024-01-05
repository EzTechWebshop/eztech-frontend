import api from "@/utils/api";
import OrderManagement from "./order.page";

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
    const res = await api.management.getOrderManagement(searchQuery);
    const data = res.data;
    return <OrderManagement data={data} />;
}
