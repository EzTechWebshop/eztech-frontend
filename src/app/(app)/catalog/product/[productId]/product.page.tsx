import { ProductCarousel } from "@/components/product-carousel";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/domain-types";
import api from "@/utils/api";
import { Em, Heading, Text } from "@radix-ui/themes";

export default async function ProductPage({ params }: { params: { productId: string } }) {
    const res = await api.catalog.getProductById(parseInt(params.productId));
    const product: Product = res.data;
    return (
        <div className="flex flex-1 max-w-7xl mx-auto py-4 border-r-2 border-l-2">
            <div className="flex flex-col h-full w-full">
                <div className="flex flex-1 max-h-14 border-b-2 mx-4">
                    <Heading className=" whitespace-nowrap" size={"6"}>
                        {product.name}
                    </Heading>
                </div>
                <div className="grid grid-cols-6 h-full">
                    <div className="col-span-4 flex flex-col w-full h-full">
                        <ProductCarousel product={product} />
                    </div>
                    <div className="flex flex-col col-span-2 p-4 bg-slate-200 justify-between">
                        <div>
                            <Heading className=" whitespace-nowrap" size={"6"}>
                                {product.price} DKK
                            </Heading>
                            <Heading size={"4"}>Stock: {product.stock}</Heading>
                            <div className=" mt-4 border-2 py-2 px-4 w-fit h-fit border-black rounded-lg">
                                <Heading size={"4"}>Categories:</Heading>
                                {product.categories.map((category) => (
                                    <div key={category.id}>
                                        <Text>
                                            <Em>{category.name}</Em>
                                        </Text>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4">
                                <Heading size={"4"}>Description:</Heading>
                                <Text>{product.description}</Text>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <Button>Add to cart</Button>
                            <Button>Add to wishlist</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
