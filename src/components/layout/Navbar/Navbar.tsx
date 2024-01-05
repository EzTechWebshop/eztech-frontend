import NavbarUserLoad from "@/components/loading-fields/navbar-user-load";
import Link from "next/link";
import { Suspense } from "react";
import NavbarMenu from "./navbar-menu";
import NavbarUser from "./navbar-user";
import PageLogo from '@/components/layout/page-logo';

export default function Navbar() {
    return (
        <div className="flex flex-1 max-w-7xl mx-auto h-12">
            <div className="flex flex-1 gap-4 md:grid md:grid-cols-3 items-center mx-4 w-full">
                <div className="flex justify-start">
                    <Link href={"/"}>
                        <PageLogo />
                    </Link>
                </div>
                <NavbarMenu />
                <div className="flex flex-1 justify-end">
                    <Suspense fallback={<NavbarUserLoad />}>
                        <NavbarUser />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}
