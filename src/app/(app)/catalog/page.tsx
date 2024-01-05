import api from "@/utils/api";
import { auth } from "@/app/api/auth/[...nextauth]/options";
import Catalog from "./catalog.page";
import { CatalogProducts } from "@/types/public-types";
import { Cart, Wishlist } from "@/types/domain-types";

type CatalogPageProps = {
    searchParams: {
        includeSoldOut?: boolean;
        page?: number;
        pageSize?: number;
        search?: string;
        sort?: string;
        categoryId?: number;
    };
};

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
    const session = await auth();
    let searchQuery = "?";
    const searchQueries = Object.entries(searchParams);
    searchQueries.forEach(([key, value]) => {
        if (value) {
            searchQuery += `${key}=${value}&`;
        }
    });

    const res = await api.catalog.getProducts(searchQuery);
    const data: CatalogProducts = res.data;
    if (session?.user) {
        const wishlistRes = await api.wishlist.getWishlist();
        const wishlist: Wishlist = wishlistRes.data;
        const cartRes = await api.cart.getCart();
        const cart: Cart = cartRes.data;
        const cartIds = cart?.cartItems.map((item) => item.product.id);
        const wishlistIds = wishlist?.products.map((item) => item.id);

        data.products.forEach((item) => {
            if (cartIds?.includes(item.id)) {
                item.isInCart = true;
            }
            if (wishlistIds?.includes(item.id)) {
                item.isInWishlist = true;
            }
        });
    }
    return <Catalog data={data} isUser={session != null} />;
}
