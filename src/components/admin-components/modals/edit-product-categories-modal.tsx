'use client'

import { EditProductCategories } from '@/components/admin-components/forms/product/edit-product-categories'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { GetCategories } from '@/server/category-actions'
import { AdminManagementCategories } from '@/types/admin-types/admin-category-types'
import { Category, Product } from '@/types/domain-types'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { IoPencilSharp } from 'react-icons/io5'
import { useToast } from '@/components/ui/use-toast'

// Edit Product Categories Modal
type EditProductCategoriesModalProps = {
    product: Product
}
export default function EditProductCategoriesModal({
    ...props
}: EditProductCategoriesModalProps) {
    const [added, setAdded] = useState<boolean | undefined>()
    const [message, setMessage] = useState<string | undefined>()
    const [categories, setCategories] = useState<Category[] | undefined>()
    const { toast } = useToast()
    const router = useRouter()
    const { product } = props

    const addSuccessAction = () => {
        setAdded(true)
        setMessage('Category added successfully')
        router.refresh()
        toast({
            title: 'Category added',
        })
    }

    const removeSuccessAction = () => {
        setAdded(false)
        setMessage('Category removed successfully')
        router.refresh()
        toast({
            title: 'Category removed',
        })
    }

    const handleClick = async () => {
        const data: AdminManagementCategories = await GetCategories()
        setCategories(data.categories)
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    onClick={handleClick}
                    buttonTip="Edit categories associated with the product"
                    variant="iconCircle"
                    size="icon"
                >
                    <IoPencilSharp size={20} />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>Categories</DialogHeader>
                {message && (
                    <div
                        className={cn(
                            '',
                            added ? 'text-green-500' : 'text-red-500'
                        )}
                    >
                        {message}
                    </div>
                )}
                <EditProductCategories
                    product={product}
                    categories={categories}
                    addAction={addSuccessAction}
                    removeAction={removeSuccessAction}
                />
            </DialogContent>
        </Dialog>
    )
}
