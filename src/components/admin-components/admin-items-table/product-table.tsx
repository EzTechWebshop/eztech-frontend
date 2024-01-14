'use client'

import { TableCell, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { Product } from '@/types/domain-types'
import { HandleQueryChange } from '@/utils/handle-query-change'
import { Text } from '@radix-ui/themes'
import { useRouter, useSearchParams } from 'next/navigation'

// Product Table Body
type ProductTableBodyProps = {
    items: Product[]
}
export default function ProductTableBody({ ...props }: ProductTableBodyProps) {
    const router = useRouter()
    const currentProductId = useSearchParams().get('productId') ?? 0
    const { items } = props
    return (
        <>
            {items.map((product, index) => (
                <TableRow
                    key={product.id}
                    className={cn(
                        'hover:cursor-pointer hover:bg-orange-50',
                        currentProductId == product.id && 'bg-orange-200'
                    )}
                    onClick={() =>
                        router.push(
                            `?${HandleQueryChange('productId', product.id)}`
                        )
                    }
                >
                    <TableCell>{product.id}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>
                        {product.discount > 0 ? (
                            <span className="whitespace-nowrap">
                                {product.discountedPrice}
                                <Text color="gray" size={'1'}>
                                    ({product.price})
                                </Text>{' '}
                                DKK
                            </span>
                        ) : (
                            <span className="whitespace-nowrap">
                                {product.price} DKK
                            </span>
                        )}
                    </TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>{product.sold}</TableCell>
                    <TableCell>{product.discount}%</TableCell>
                    <TableCell>{product.averageRating.toFixed(2)}/5</TableCell>
                    <TableCell>
                        {new Date(product.createdAt).toLocaleDateString(
                            'en-GB'
                        )}
                    </TableCell>
                    <TableCell>
                        {product.isDeleted ? (
                            <Text>Deleted</Text>
                        ) : (
                            <Text>Available</Text>
                        )}
                    </TableCell>
                </TableRow>
            ))}
        </>
    )
}
