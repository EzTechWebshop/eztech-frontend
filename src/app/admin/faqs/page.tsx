import api from '@/utils/api'
import FaqManagement from './faq.page'
import { AdminManagementFaqs } from '@/types/admin-types/admin-faq-types'

export default async function ProductManagementPage() {
    const res = await api.management.getFaqManagement()
    const data: AdminManagementFaqs = res.data
    return <FaqManagement data={data} />
}
