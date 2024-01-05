import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { HandleQueryChange } from "@/utils/handle-query-change";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { IoReloadCircleOutline, IoSearch } from "react-icons/io5";
import CatalogFilter from "./catalog-filter";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { set } from "react-hook-form";

type CatalogMenuProps = {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function CatalogMenu({ ...props }: CatalogMenuProps) {
  const router = useRouter();
  const { loading, setLoading } = props;
  const searchParams = useSearchParams().get("search");
  const searchInput = useRef<HTMLInputElement>(null);
  const [searchValue, setSearchValue] = useState<string>(searchParams || "");
  const includeSoldOut = useSearchParams().get("includeSoldOut") === "true";

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    const query = HandleQueryChange("search", searchInput.current?.value);
    router.push(`?${query}`);
  };

  return (
    <div className="flex flex-col w-full md:flex-1 gap-2">
      {/* Searchbar & Reset Filter */}
      <div className="flex justify-between">
        <form
          onSubmit={(e) => handleSearch(e)}
          className="flex items-center gap-2"
        >
          <Input
            placeholder={"Search For Products..."}
            disabled={loading}
            name="searchinput"
            ref={searchInput}
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
          />
          <Button
            disabled={loading}
            size={"badge"}
            variant={"outline"}
            type="submit"
          >
            <IoSearch />
          </Button>
        </form>
        <Button
          disabled={loading}
          buttonTip="Refresh"
          variant={"ghost"}
          size={"badge"}
          onClick={() => router.push("/catalog")}
        >
          <IoReloadCircleOutline size={20} />
        </Button>
      </div>
      {/* FILTERS */}
      <div className="flex flex-col gap-2 sm:gap-0 sm:flex-row sm:flex-1 sm:justify-between sm:items-center">
        <div className="flex gap-1 sm:gap-4">
          <CatalogFilter loading={loading} setLoading={setLoading} />
        </div>
        <IncludeSoldOutSwitch
          loading={loading}
          setLoading={setLoading}
          includeSoldOut={includeSoldOut}
        />
      </div>
    </div>
  );
}

type IncludeSoldOutSwitchProps = {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  includeSoldOut: boolean;
};
const IncludeSoldOutSwitch = ({ ...props }: IncludeSoldOutSwitchProps) => {
  const router = useRouter();
  const { loading, setLoading, includeSoldOut } = props;

  const handleSoldOutSwitch = () => {
    setLoading(true);
    const query = HandleQueryChange("includeSoldOut", !includeSoldOut);
    router.push(`?${query}`);
  };

  return (
    <div className="flex items-center gap-0 w-fit sm:gap-2">
      <Label htmlFor="include-sold-out" className=" whitespace-nowrap">
        Sold Out
      </Label>
      <Switch
        id="include-sold-out"
        checked={includeSoldOut ?? false}
        disabled={loading}
        onClick={handleSoldOutSwitch}
      />
    </div>
  );
};
