import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'

import { Order } from '@/types/domain-types'
import { Button, Text } from '@radix-ui/themes'

type UserOrderCardProps = {
    order: Order
}
export default function UserOrderCard({ ...props }: UserOrderCardProps) {
    const { order } = props
    return (
        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle className="flex justify-between">
                    <Text>Order #{order.orderNumber}</Text>
                    <Text>{order.statusName}</Text>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col">
                    <Text>
                        Created at:{' '}
                        {new Date(order.createdAt).toLocaleDateString('en-GB')}
                    </Text>
                    {order.updatedAt && (
                        <Text>
                            Updated at:{' '}
                            {new Date(order.updatedAt).toLocaleDateString(
                                'en-GB'
                            )}
                        </Text>
                    )}
                    <Text>Total: {order.total.toFixed(2)} DKK</Text>
                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                            <AccordionTrigger>
                                Total items: {order.items.length}
                            </AccordionTrigger>
                            <AccordionContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[100px]">
                                                ID
                                            </TableHead>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Price</TableHead>
                                            <TableHead>Quantity</TableHead>
                                            <TableHead>Total Price</TableHead>
                                        </TableRow>
                                    </TableHeader>

                                    <TableBody>
                                        {order.items.map((item) => (
                                            <TableRow key={item.id}>
                                                <TableCell className="font-medium">
                                                    {item.productId}
                                                </TableCell>
                                                <TableCell>
                                                    {item.productName}
                                                </TableCell>
                                                <TableCell>
                                                    {item.price.toFixed(2)} DKK
                                                </TableCell>
                                                <TableCell>
                                                    {item.quantity}
                                                </TableCell>
                                                <TableCell>
                                                    {item.total.toFixed(2)} DKK
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </CardContent>
            <CardFooter className="flex space-x-4">
                <Button>Return Order</Button>
                <Button>Cancel Order</Button>
            </CardFooter>
        </Card>
    )
}
