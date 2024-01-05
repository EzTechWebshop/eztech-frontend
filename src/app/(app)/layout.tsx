import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import api from "@/utils/api";
import { ReactNode } from "react";

export type AppLayoutProps = {
    children: ReactNode;
};

export default async function AppLayout({ children }: AppLayoutProps) {
    const res = await api.catalog.getWebsiteInfo();
    const data = res.data;
    if(!data) return null;
    return (
        <>
            <header className="flex bg-white border-b-2 fixed top-0 w-screen z-50">
                <Navbar />
            </header>
            <main className="flex flex-1 mx-auto py-0 px-0 sm:py-2 sm:px-4 mt-[48px] min-h-[calc(100vh-48px)] max-w-7xl">
                {children}
            </main>
            <footer className="hidden flex-1 md:flex max-w-screen border-t-2 bg-slate-300">
                <Footer data={data}  />
            </footer>
        </>
    );
}
