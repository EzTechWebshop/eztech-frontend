import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import { IoHomeOutline } from 'react-icons/io5'

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <div className="flex border-b-2 h-12 gap-4 items-center">
                <div className="flex flex-1 gap-4 items-center mx-4 justify-between">
                    <div className="flex gap-4 items-center">
                        <Link href="/">
                            <Button size={'icon'} variant={'iconCircle'}>
                                <IoHomeOutline size={12} />
                            </Button>
                        </Link>
                    </div>
                    <div className="flex gap-4 items-center">
                        <Link href="/admin/dashboard">
                            <AdminLayoutButton>Dashboard</AdminLayoutButton>
                        </Link>
                        <Link href="/admin/products">
                            <AdminLayoutButton>Products</AdminLayoutButton>
                        </Link>
                        <Link href="/admin/orders">
                            <AdminLayoutButton>Orders</AdminLayoutButton>
                        </Link>
                        <Link href="/admin/faqs">
                            <AdminLayoutButton>FAQs</AdminLayoutButton>
                        </Link>
                        <Link href="/admin/categories">
                            <AdminLayoutButton>Categories</AdminLayoutButton>
                        </Link>
                        <Link href="/admin/website-info">
                            <AdminLayoutButton>Website Info</AdminLayoutButton>
                        </Link>
                        <Link href="/admin/promotions">
                            <AdminLayoutButton>Promotions</AdminLayoutButton>
                        </Link>
                    </div>
                </div>
            </div>
            {children}
        </>
    )
}

const AdminLayoutButton = ({ children }: { children: React.ReactNode }) => (
    <Button size={'sm'} variant={'iconCircle'}>
        {children}
    </Button>
)
