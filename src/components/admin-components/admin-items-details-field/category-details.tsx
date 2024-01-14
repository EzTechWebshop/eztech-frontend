'use client'

import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { Category, Product } from '@/types/domain-types'
import { Text } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'
import { IoTrashBinOutline } from 'react-icons/io5'
import { DeleteCategory } from '@/server/category-actions'
import { useToast } from '@/components/ui/use-toast'
import DetailsBox from '@/components/admin-components/details-box'
import DetailText from '@/components/admin-components/detail-text'
import { ConfirmationWindow } from '@/utils/alerts'

// ORDER DETAILS
type CategoryDetailsProps = {
    item: {
        category: Category
        products: Product[]
    }
}
export default function CategoryDetails({ ...props }: CategoryDetailsProps) {
    const router = useRouter()
    const { toast } = useToast()
    const { category, products } = props.item

    const handleDeleteCategory = async () => {
        if (
            !ConfirmationWindow(
                'Are you sure you want to delete this category?'
            )
        ) {
            return
        }

        const res = await DeleteCategory(category.id)
        if (res == 'Category deleted') {
            router.push('/admin/categories')
            router.refresh()
            toast({
                title: 'Category deleted successfully',
            })
        } else {
            toast({
                title: 'Category could not be deleted',
                description: res,
            })
        }
    }
    return (
        <div className="flex flex-col space-y-2">
            <div className="flex flex-1 justify-between">
                <DetailsBox label={'Details'}>
                    <DetailText label="ID" text={category.id} />
                    <DetailText label="Name" text={category.name} />
                    <DetailText label="Products" text={products.length} />
                </DetailsBox>
                {!products && (
                    <DetailsBox className="flex space-x-4">
                        <Text size={'8'}>No Products</Text>
                    </DetailsBox>
                )}
            </div>
            <DetailsBox label="Description">
                <Text>{category.description}</Text>
            </DetailsBox>
            <DetailsBox label="Products" className="w-[75%]">
                {products.length > 0 ? (
                    <ScrollArea className="max-h-[50vh] overflow-auto px-4">
                        <div
                            className={`grid gap-2 grid-cols-2 ${true ? '' : ''}`}
                        >
                            {products.map((item) => (
                                <ProductDetailsModal
                                    key={category.id}
                                    product={item}
                                />
                            ))}
                        </div>
                    </ScrollArea>
                ) : (
                    <p>No products found</p>
                )}
            </DetailsBox>
            <DetailsBox label="Categories">
                <Button
                    buttonTip="Delete Category"
                    variant={'destructive'}
                    size={'icon'}
                    onClick={handleDeleteCategory}
                >
                    <IoTrashBinOutline size={20} />
                </Button>
            </DetailsBox>
        </div>
    )
}

type ProductDetailsModalProps = {
    product: Product
}
function ProductDetailsModal({ ...props }: ProductDetailsModalProps) {
    const { product } = props

    return (
        <div
            key={product.id}
            className="flex flex-col bcategory-2 p-2 rounded-lg hover:cursor-pointer hover:bg-orange-50 select-none"
        >
            <DetailText label="Id" text={product.id} />
            <DetailText label="Name" text={product.name} />
            <DetailText label="Price" text={`${product.price} DKK`} />
            <DetailText label="Stock" text={product.stock} />
            <DetailText
                label="Created At"
                text={new Date(product.createdAt).toLocaleDateString('en-GB')}
            />
            <DetailText
                label="Status"
                text={product.isDeleted ? 'Inactive' : 'Active'}
            />
        </div>
    )
}
