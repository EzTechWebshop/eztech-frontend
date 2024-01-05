import CategoryDetails from "./category-details";
import OrderDetails from "./order-details";
import ProductDetails from "./product-details";
import PromotionDetails from "./promotion-details";

type AdminItemDetailsProps = {
    type: "products" | "categories" | "orders" | "promotions";
    item: any;
};
export default function AdminItemDetails({ ...props }: AdminItemDetailsProps) {
    const { type, item } = props;
    return (
        <div className="flex flex-col space-y-2 select-none">
            {type === "products" && <ProductDetails item={item} />}
            {type === "orders" && <OrderDetails item={item} />}
            {type === "categories" && <CategoryDetails item={item} />}
            {type === "promotions" && <PromotionDetails item={item} />}
        </div>
    );
}
