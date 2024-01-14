import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { HandleQueryChange } from "@/utils/handle-query-change";
import { useRouter, useSearchParams } from "next/navigation";
import {
  IoArrowBackCircleOutline,
  IoArrowForwardCircleOutline,
} from "react-icons/io5";

// https://nextjs.org/docs/app/api-reference/functions/use-search-params
export type CatalogNavigateProps = {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  totalPages: number;
};
export default function CatalogNavigate({ ...props }: CatalogNavigateProps) {
  const router = useRouter();
  const { loading, setLoading, totalPages } = props;
  const page = Number(useSearchParams().get("page")) || 1;
  const pageSizes = [15, 50, 100];

  const changePage = (amount: number) => {
    setLoading(true);
    if (page + amount > totalPages) {
      return;
    }
    const query = HandleQueryChange("page", page + amount);
    router.push(`?${query}`);
  };
  const handlePageSize = (size: number) => {
    const query = HandleQueryChange("pageSize", size);
    router.push(`?${query}`);
  };
  return (
    <div className="flex items-center select-none gap-4">
      <Button
        disabled={page <= 1 || loading}
        onClick={() => changePage(-1)}
        variant={"outline"}
      >
        <IoArrowBackCircleOutline size={24} />
      </Button>
      <p className="whitespace-nowrap">
        {page} / {totalPages}
      </p>
      <Button
        disabled={page >= totalPages || loading}
        onClick={() => changePage(1)}
        variant={"outline"}
      >
        <IoArrowForwardCircleOutline size={24} />
      </Button>
      <div className="flex">
        {pageSizes.map((size) => (
          <NavigatePageSizeButton
            key={size}
            handlePageSize={handlePageSize}
            size={size}
          />
        ))}
      </div>
    </div>
  );
}

type NavigatePageSizeButtonProps = {
  handlePageSize: (size: number) => void;
  size: number;
};
const NavigatePageSizeButton = ({ ...props }: NavigatePageSizeButtonProps) => {
  const { handlePageSize, size } = props;
  const currentSize = useSearchParams().get("pageSize");
  return (
    <Button
      className={cn("", size.toString() === currentSize && "bg-orange-200")}
      variant={"ghost"}
      size={"sm"}
      onClick={() => handlePageSize(size)}
    >
      {size}
    </Button>
  );
};
