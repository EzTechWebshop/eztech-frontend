import CatalogProductCard from "@/components/cards/catalog-product-card";
import CatalogWrapper from "@/components/layout/CatalogWrapper";
import CatalogProductsLoad from "@/components/loading-fields/catalog-products-load";
import { CatalogProducts } from "@/types/public-types";
import { Text } from "@radix-ui/themes";
import { Suspense } from "react";

type CatalogProps = {
  data: CatalogProducts;
  isUser: boolean;
};
export default function Catalog({ ...props }: CatalogProps) {
  const { data, isUser } = props;
  return (
    <div className="flex flex-1">
      <CatalogWrapper data={data!}>
        {data.products.length === 0 ? (
          <div className="text-center text-2xl font-bold">
            <Text>No Products Found</Text>
          </div>
        ) : (
          <Suspense fallback={<CatalogProductsLoad />}>
            <CatalogProducts data={data} isUser={isUser} />
          </Suspense>
        )}
      </CatalogWrapper>
    </div>
  );
}

const CatalogProducts = async ({
  data,
  isUser,
}: {
  data: CatalogProducts;
  isUser: boolean;
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-4">
      {data.products.map((product) => (
        <div key={product.id}>
          <CatalogProductCard product={product} isUser={isUser} />
        </div>
      ))}
    </div>
  );
};
