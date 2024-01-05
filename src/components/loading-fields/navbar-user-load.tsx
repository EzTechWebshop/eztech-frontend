import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function NavbarUserLoad() {
    return (
        <div className="flex gap-2 items-center">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
        </div>
    );
}
