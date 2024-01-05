"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { HandleQueryChange, HandleQueryRemoval } from "@/utils/handle-query-change";
import { Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import {
    IoArrowBackOutline,
    IoArrowForwardOutline,
    IoCloseOutline,
    IoRefreshOutline,
    IoSearchOutline,
} from "react-icons/io5";

type AdminMenuBarProps = {
    href: string;
    totalItems: number;
    totalPages: number;
    page: number;
    pageSize: number;
    menuButtons?: React.ReactNode;
    customInfo?: React.ReactNode;
};
export default function AdminMenuBar({ ...props }: AdminMenuBarProps) {
    const router = useRouter();
    const { href, menuButtons, customInfo } = props;
    return (
        <div className="flex h-16 bg-orange-100">
            <div className="flex flex-1 gap-4 justify-between mx-4">
                {/* PAGE MANAGEMENT */}
                <div className="flex space-x-4">
                    <PageManager {...props} />
                    <Searchbar href={href} />
                </div>
                {/* MENU BUTTONS */}
                <div className="flex space-x-2 items-center">{menuButtons}</div>
                <div className="flex items-center">
                    <Text size={"2"}>
                        {customInfo}
                    </Text>
                </div>
                {/* DETAILS */}
                <div className="flex flex-1 justify-end items-center">
                    <Button
                        buttonTip="Refresh"
                        variant="iconCircle"
                        size="xsIcon"
                        onClick={() => router.push(href)}>
                        <IoRefreshOutline size={20} />
                    </Button>
                </div>
            </div>
        </div>
    );
}

// Managing the page state
type PageManagerProps = {
    totalPages: number;
    page: number;
    pageSize: number;
};
function PageManager({ ...props }: PageManagerProps) {
    const router = useRouter();
    const { totalPages, page, pageSize } = props;
    const sizeOptions: number[] = [15, 25, 50, 75, 100];

    const changePage = (page: number) => {
        if (page < 1 || page > totalPages) return;
        const query = HandleQueryChange("page", page.toString());
        router.push("?" + query);
    };

    return (
        <div className="flex flex-col my-auto space-y-1 items-center">
            <div className="flex items-center gap-2">
                <Button variant={"iconCircle"} size={"mini"} onClick={() => changePage(page - 1)}>
                    <IoArrowBackOutline size={16} />
                </Button>
                <Text size={"2"} className=" whitespace-nowrap">
                    {page} / {totalPages}
                </Text>
                <Button variant={"iconCircle"} size={"mini"} onClick={() => changePage(page + 1)}>
                    <IoArrowForwardOutline size={16} />
                </Button>
            </div>
            <div className="flex flex-col items-center">
                <div className="grid grid-cols-5">
                    {sizeOptions.map((size) => (
                        <Button
                            key={size}
                            variant={"ghost"}
                            size={"mini"}
                            className={cn(size === pageSize && "bg-orange-200")}
                            onClick={() => router.push("?" + HandleQueryChange("pageSize", size))}>
                            {size}
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    );
}
// Search bar
type SearchbarProps = {
    href: string;
};
function Searchbar({ ...props }: SearchbarProps) {
    const { href } = props;
    const router = useRouter();
    const label = "search";

    const searchRef = useRef<HTMLInputElement>(null);

    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (searchRef.current?.value == "") {
            const query = HandleQueryRemoval(label);
            router.push("?" + query);
            return;
        }
        const query = HandleQueryChange(label, searchRef.current?.value ?? "");
        router.push("?" + query);
    };

    return (
        <form className="flex items-center space-x-2" onSubmit={(e) => handleSearchSubmit(e)}>
            <Input ref={searchRef} placeholder="Search..." />
            <Button
                buttonTip="Search"
                variant={"iconCircle"}
                size={"xsIcon"}
                type="submit"
                onClick={() => router.push("?" + HandleQueryChange(label, searchRef.current?.value ?? ""))}>
                <IoSearchOutline size={16} />
            </Button>
            <Button
                buttonTip="Clear Search"
                variant={"iconCircle"}
                size={"xsIcon"}
                onClick={() => {
                    searchRef.current!.value = "";
                    router.push("?" + HandleQueryRemoval(label));
                }}>
                <IoCloseOutline size={20} />
            </Button>
        </form>
    );
}
