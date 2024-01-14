import api from '@/utils/api'
import AdminDashboard from './dashboard.page'

export default async function DashboardPage() {
    const res = await api.dashboard.getDashboard()
    const data = res.data
    return <AdminDashboard data={data} />
}
