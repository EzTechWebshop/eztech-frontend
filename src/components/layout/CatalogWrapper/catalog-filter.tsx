import { Button } from "@/components/ui/button";
import { HandleQueryChange } from "@/utils/handle-query-change";
import { useRouter, useSearchParams } from "next/navigation";
import {
  IoArrowDownCircleOutline,
  IoArrowUpCircleOutline,
} from "react-icons/io5";

type CatalogMenuProps = {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function CatalogFilter({ ...props }: CatalogMenuProps) {
  const { loading, setLoading } = props;
  const filters = ["Price", "Name", "Date", "Popularity", "Rating"];
  const router = useRouter();
  const currentSort = useSearchParams().get("sort")?.split("_") ?? ["", ""];

  const handleClick = (filter: string) => {
    setLoading(true);
    const sortType = currentSort[1] === "asc" ? "desc" : "asc";
    const query = HandleQueryChange("sort", `${filter}_${sortType}`);
    router.push(`?${query}`);
  };

  return (
    <>
      {filters.map((filter) => (
        <Button
          variant={"outline"}
          disabled={loading}
          size={"badge"}
          onClick={() => handleClick(filter.toLowerCase())}
          key={filter}
          className="flex items-center gap-1"
        >
          {currentSort[0] === filter.toLowerCase() ? (
            <FilterButton name={filter} active={true} sort={currentSort[1]} />
          ) : (
            <FilterButton name={filter} active={false} />
          )}
        </Button>
      ))}
    </>
  );
}

const FilterButton = ({
  name,
  active,
  sort,
}: {
  name: string;
  active: boolean;
  sort?: string;
}) => {
  return (
    <>
      <div className={`flex items-center gap-1 ${active ? "" : ""}`}>
        {name}
        {sort === "asc" && <IoArrowUpCircleOutline />}
        {sort === "desc" && <IoArrowDownCircleOutline />}
      </div>
    </>
  );
};
