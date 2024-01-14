import RemoveProductFromWishlistButton from '@/components/actions/remove-product-from-wishlist'
import { ProductAvatar } from '@/components/product-logo'
import { Product } from '@/types/domain-types'
import { Strong, Text } from '@radix-ui/themes'

type WishlistItemCardProps = {
    product: Product
}
export default function WishlistItemCard({ ...props }: WishlistItemCardProps) {
    const { product } = props

    return (
        <div className="flex flex-col gap-4 p-2 rounded-lg border-2">
            <div className="flex justify-between items-center">
                <div className="flex flex-col">
                    <div className='mb-2'>

                    <Text>{product.name}</Text>
                    </div>
                    <Text size={'2'}>Stock: {product.stock} </Text>
                    <Text size={'2'}>Price: {product.price} DKK</Text>
                    {product.stock <= 0 && (
                        <Text color="red">
                            <Strong>SOLD OUT</Strong>
                        </Text>
                    )}
                </div>
                <ProductAvatar product={product} />
            </div>
            <RemoveProductFromWishlistButton product={product} />
        </div>
    )
}
