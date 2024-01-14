'use client'
import AdminItemDetails from '@/components/admin-components/admin-items-details-field'
import AdminTable from '@/components/admin-components/admin-items-table'
import AdminMenuBar from '@/components/admin-components/admin-menu-bar'
import { Button } from '@/components/ui/button'
import { AdminManagementOrders } from '@/types/admin-types/admin-order-types'
import {
    HandleQueryChange,
    HandleQueryRemoval,
} from '@/utils/handle-query-change'
import { Text } from '@radix-ui/themes'
import { useRouter, useSearchParams } from 'next/navigation'
import { IoArchiveOutline, IoReceiptOutline } from 'react-icons/io5'

type ProductManagementProps = {
    data: AdminManagementOrders
}
export default function ProductManagement({
    ...props
}: ProductManagementProps) {
    const { data } = props
    const labels: string[] = [
        'ID',
        'Order Number',
        'User ID',
        'Items',
        'Total Price',
        'Status',
        'Created At',
    ]
    const customInfoProps: CustomInfoProps = {
        orderCount: data.totalOrders,
    }
    return (
        <div className="grid grid-cols-2 gap-2">
            <div>
                <AdminMenuBar
                    href="/admin/orders"
                    totalItems={data.totalOrders}
                    totalPages={data.totalPages}
                    page={data.page}
                    pageSize={data.pageSize}
                    menuButtons={<MenuButtons />}
                    customInfo={<CustomInfo {...customInfoProps} />}
                />
                {data.totalOrders > 0 ? (
                    <AdminTable
                        type="orders"
                        labels={labels}
                        items={data.orders}
                    />
                ) : (
                    <Text>No orders found</Text>
                )}
            </div>
            <div>
                {data.order && (
                    <AdminItemDetails type="orders" item={data.order} />
                )}
            </div>
        </div>
    )
}

function MenuButtons() {
    const router = useRouter()
    const archived = useSearchParams().get('archive')
    const handleArchiveClick = async () => {
        const newQuery = HandleQueryChange('archive', true)
        router.push('?' + newQuery)
    }
    const handleActiveClick = async () => {
        const newQuery = HandleQueryRemoval('archive')
        router.push('?' + newQuery)
    }
    return (
        <>
            {archived ? (
                <>
                    <Button
                        buttonInfo={'View Active Orders'}
                        variant={'iconCircle'}
                        size={'icon'}
                        onClick={handleActiveClick}
                    >
                        <IoReceiptOutline size={20} />
                    </Button>
                </>
            ) : (
                <>
                    <Button
                        buttonInfo={'View Archived Orders'}
                        variant={'iconCircle'}
                        size={'icon'}
                        onClick={handleArchiveClick}
                    >
                        <IoArchiveOutline size={20} />
                    </Button>
                </>
            )}
        </>
    )
}

type CustomInfoProps = {
    orderCount: number
}
function CustomInfo({ ...props }: CustomInfoProps) {
    const { orderCount } = props
    return (
        <>
            <p className="text-lg font-medium">{orderCount} Orders</p>
        </>
    )
}
