"use client";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { HandleQueryChange } from "@/utils/handle-query-change";
import { Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import { IoArrowDownOutline, IoArrowUpOutline } from "react-icons/io5";
import ProductTableBody from "./product-table";
import OrderTableBody from "./order-table";
import CategoryTableBody from "./category-table";
import PromotionTableBody from './promotion-table';

type AdminTableProps = {
    type: "products" | "categories" | "orders" |"promotions";
    currentItemId?: number;
    items: any[];
    labels: string[];
};

export default function AdminTable({ ...props }: AdminTableProps) {
    return (
        <ScrollArea className="max-h-[calc(100vh-64px-48px)] overflow-auto">
            <Table className="border-2">
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[50px] overflow-hidden">
                            <Text>{props.labels[0]}</Text>
                        </TableHead>
                        {props.labels.slice(1).map((label, index) => (
                            <TableHead key={index}>
                                <TableHeadButton label={label} />
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {props.type === "products" && <ProductTableBody items={props.items} />}
                    {props.type === "orders" && <OrderTableBody items={props.items} />}
                    {props.type === "categories" && <CategoryTableBody items={props.items} />}
                    {props.type === "promotions" && <PromotionTableBody items={props.items} />}
                </TableBody>
            </Table>
        </ScrollArea>
    );
}

type TableHeadButtonProps = {
    label: string;
};
const TableHeadButton = ({ ...props }: TableHeadButtonProps) => {
    const { label } = props;
    const router = useRouter();
    const currentQuery = useSearchParams().get("sort")?.split("_") ?? [];
    const isCurrentLabel = CheckCurrentLabel(currentQuery, label);
    const changeSort = () => {
        let result = "";
        if (currentQuery[0] !== label.toLowerCase()) {
            result = HandleQueryChange("sort", label.toLowerCase() + "_asc");
        } else {
            const newSort = currentQuery[1] === "asc" ? "desc" : "asc";
            result = HandleQueryChange("sort", `${label.toLowerCase()}_${newSort}`);
        }
        router.push("?" + result);
    };
    return (
        <Button
            variant={"ghost"}
            size={"badge"}
            className={cn("flex items-center justify-center", isCurrentLabel && " bg-orange-50")}
            onClick={changeSort}>
            {label}
            {isCurrentLabel ? (
                <>{currentQuery[1] == "asc" ? <IoArrowUpOutline size={12} /> : <IoArrowDownOutline size={12} />}</>
            ) : (
                <></>
            )}
        </Button>
    );
};

const CheckCurrentLabel = (currentQuery: string[], label: string) => {
    if(currentQuery[0] == label.toLowerCase()) {
        return true;
    }
    return false;
}