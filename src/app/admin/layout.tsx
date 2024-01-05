import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { IoHomeOutline } from "react-icons/io5";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="flex border-b-2 h-12 gap-4 items-center">
                <div className="flex flex-1 gap-4 items-center mx-4 justify-between">
                    <div className="flex gap-4 items-center">
                        <Link href="/">
                            <Button size={"icon"} variant={"iconCircle"}>
                                <IoHomeOutline size={12} />
                            </Button>
                        </Link>
                    </div>
                    <div className="flex gap-4 items-center">
                        <AdminLayoutButton>
                            <Link href="/admin/dashboard">Dashboard</Link>
                        </AdminLayoutButton>
                        <AdminLayoutButton>
                            <Link href="/admin/products">Products</Link>
                        </AdminLayoutButton>
                        <AdminLayoutButton>
                            <Link href="/admin/orders">Orders</Link>
                        </AdminLayoutButton>
                        <AdminLayoutButton>
                            <Link href="/admin/faqs">FAQs</Link>
                        </AdminLayoutButton>
                        <AdminLayoutButton>
                            <Link href="/admin/categories">Categories</Link>
                        </AdminLayoutButton>
                        <AdminLayoutButton>
                            <Link href="/admin/website-info">
                                Website Info
                            </Link>
                        </AdminLayoutButton>
                        <AdminLayoutButton>
                            <Link href="/admin/promotions">Promotions</Link>
                        </AdminLayoutButton>
                            
                    </div>
                </div>
            </div>
            {children}
        </>
    );
}

const AdminLayoutButton = ({ children }: { children: React.ReactNode }) => (
    <Button size={"sm"} variant={"iconCircle"}>
        {children}
    </Button>
);
