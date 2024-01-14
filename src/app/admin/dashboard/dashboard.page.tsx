import { Heading, SelectSeparator, Text } from '@radix-ui/themes'
import React from 'react'
import { Order } from '@/types/domain-types'
import { GetDashboardResponse } from '@/types/admin-types/admin-dashboard-types'

type AdminDashboardProps = {
    data: GetDashboardResponse
}
export default function AdminDashboard({ ...props }: AdminDashboardProps) {
    const { data } = props
    return (
        <div className="flex flex-1">
            <div className="flex flex-col">
                <Heading>Admin Dashboard</Heading>
                <div className="flex flex-1">
                    <DashboardOrdersGeneralInfo {...props} />
                    <DashboardOrdersLatestAndOldest
                        latest={data.latestFiveActiveOrders}
                        oldest={data.oldestFiveActiveOrders}
                    />
                </div>
            </div>
        </div>
    )
}

function DashboardOrdersGeneralInfo({ ...props }: AdminDashboardProps) {
    const { data } = props
    return (
        <div className="flex flex-col border-2 p-4 rounded-lg">
            <Heading>Order</Heading>
            <div className="flex flex-col flex-1">
                <Text>Active Orders: {data.totalActiveOrders}</Text>
                <Text>Pending Orders: {data.pendingOrders}</Text>
                <Text>Shipped Orders: {data.shippedOrders}</Text>
                <Text>Processing Orders: {data.processingOrders}</Text>
            </div>
            <div className="flex flex-1 gap-2">
                <div className="flex flex-col border-2 rounded-lg p-4">
                    <Heading>Today</Heading>
                    <Text className="whitespace-nowrap">
                        New orders: {data.createdOrdersToday}
                    </Text>
                    <Text className="whitespace-nowrap">
                        Completed orders: {data.completedOrdersToday.length}
                    </Text>
                    <Text className="whitespace-nowrap">
                        Income: {data.incomeToday} DKK
                    </Text>
                </div>
                <div className="flex flex-col border-2 rounded-lg p-4">
                    <Heading>Month</Heading>
                    <Text className="whitespace-nowrap">
                        New orders: {data.createdOrdersThisMonth}
                    </Text>
                    <Text className="whitespace-nowrap">
                        Completed orders: {data.completedOrdersThisMonth.length}
                    </Text>
                    <Text className="whitespace-nowrap">
                        Income: {data.incomeThisMonth} DKK
                    </Text>
                </div>
                <div className="flex flex-col border-2 rounded-lg p-4">
                    <Heading>Year</Heading>
                    <Text className="whitespace-nowrap">
                        New orders: {data.createdOrdersThisYear}
                    </Text>
                    <Text className="whitespace-nowrap">
                        Completed orders: {data.completedOrdersThisYear.length}
                    </Text>
                    <Text className="whitespace-nowrap">
                        Income: {data.incomeThisYear} DKK
                    </Text>
                </div>
                <div className="flex flex-col border-2 rounded-lg p-4">
                    <Heading>All Time</Heading>
                    <Text className="whitespace-nowrap">
                        Completed orders: {data.completedOrdersAllTime.length}
                    </Text>
                    <Text className="whitespace-nowrap">
                        Income: {data.incomeAllTime} DKK
                    </Text>
                </div>
            </div>
        </div>
    )
}

type DashboardOrdersLatestAndOldestProps = {
    oldest: Order[]
    latest: Order[]
}
function DashboardOrdersLatestAndOldest({
    ...props
}: DashboardOrdersLatestAndOldestProps) {
    const { oldest, latest } = props
    return (
        <div className="grid grid-cols-2">
            <div>
                <Heading>Latest active orders</Heading>
                <div className="flex flex-col border-2 p-4 rounded-lg">
                    {latest.map((order) => (
                        <>
                            <div className="flex flex-col" key={order.id}>
                                <Text>Order {order.id}</Text>
                                <Text>
                                    Created:{' '}
                                    {new Date(
                                        order.createdAt
                                    ).toLocaleDateString('en-GB')}
                                </Text>
                                <Text>Total: {order.total} DKK</Text>
                            </div>
                            <SelectSeparator />
                        </>
                    ))}
                </div>
            </div>
            <div>
                <Heading>Oldest active orders</Heading>
                <div className="flex flex-col border-2 p-4 rounded-lg">
                    {oldest.map((order) => (
                        <>
                            <div className="flex flex-col" key={order.id}>
                                <Text>Order {order.id}</Text>
                                <Text>
                                    Created:{' '}
                                    {new Date(
                                        order.createdAt
                                    ).toLocaleDateString('en-GB')}
                                </Text>
                                <Text>Total: {order.total} DKK</Text>
                            </div>
                            <SelectSeparator />
                        </>
                    ))}
                </div>
            </div>
        </div>
    )
}
