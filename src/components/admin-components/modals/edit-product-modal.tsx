'use client'

import { EditProductForm } from '@/components/admin-components/forms/product/edit-product-form'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from '@/components/ui/dialog'
import { useToast } from '@/components/ui/use-toast'
import { Product } from '@/types/domain-types'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'
import { IoPencilSharp } from 'react-icons/io5'

type EditProductModalProps = {
    product: Product
}
export default function EditProductModal({ ...props }: EditProductModalProps) {
    const { product } = props
    const { toast } = useToast()
    const router = useRouter()
    const closeDialogRef = useRef<HTMLButtonElement>(null)

    const actionSuccess = (result: any) => {
        router.refresh()
        closeDialogRef.current?.click()
        toast({
            title: 'Succesfully edited product',
            description: `Edited product ${product.name}`,
        })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    buttonTip="Edit Product"
                    className="flex space-x-2"
                    variant="outline"
                    size={'icon'}
                >
                    <IoPencilSharp size={20} />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>Edit Product</DialogHeader>
                <EditProductForm product={product} action={actionSuccess} />
                <DialogClose ref={closeDialogRef} />
            </DialogContent>
        </Dialog>
    )
}
