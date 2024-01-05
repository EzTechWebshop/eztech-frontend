"use client";
import { TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Promotion } from "@/types/domain-types";
import { HandleQueryChange } from "@/utils/handle-query-change";
import { useRouter, useSearchParams } from "next/navigation";

// Promotion Table Body
type PromotionTableBodyProps = {
    items: Promotion[];
};
export default function PromotionTableBody({ ...props }: PromotionTableBodyProps) {
    const router = useRouter();
    const currentPromotionId = useSearchParams().get("promotionId") ?? 0;
    const { items } = props;
    return (
        <>
            {items.map((promotion, index) => (
                <TableRow
                    key={promotion.id}
                    className={cn(
                        "hover:cursor-pointer hover:bg-orange-50",
                        currentPromotionId == promotion.id && "bg-orange-200"
                    )}
                    onClick={() => router.push(`?${HandleQueryChange("promotionId", promotion.id)}`)}>
                    <TableCell>{promotion.id}</TableCell>
                    <TableCell>{promotion.title}</TableCell>
                    <TableCell>{
                            new Date(promotion.startDate).toLocaleDateString("en-GB", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                            })
                        }</TableCell>
                    <TableCell>{
                            new Date(promotion.endDate).toLocaleDateString("en-GB", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                            })
                        }</TableCell>
                    <TableCell>{promotion.isActive ? "Yes" : "No"}</TableCell>
                </TableRow>
            ))}
        </>
    );
}
