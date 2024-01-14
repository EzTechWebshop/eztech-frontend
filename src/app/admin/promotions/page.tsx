import api from '@/utils/api'
import PromotionManagement from './promotion.page'
type PromotionManagementPageProps = {
    searchParams: {
        minPrice: number
        maxPrice: number
        search: string
        startDate: Date
        endDate: Date
        sort: string
        page: number
        pageSize: number
    }
}
export default async function ProductManagementPage({
    searchParams,
}: PromotionManagementPageProps) {
    let searchQuery = '?'
    const searchQueries = Object.entries(searchParams)
    searchQueries.forEach(([key, value]) => {
        if (value) {
            searchQuery += `${key}=${value}&`
        }
    })
    const res = await api.management.getPromotionManagement(searchQuery)
    const data = res.data
    return <PromotionManagement data={data} />
}
