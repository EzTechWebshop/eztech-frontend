import { cn } from '@/lib/utils'
import { Heading, Text } from '@radix-ui/themes'

type DetailsBox = {
    label?: string
    children: React.ReactNode
    className?: string
}
export default function DetailsBox({ ...props }: DetailsBox) {
    const { label, children, className } = props
    return (
        <div>
            {label && <Heading size={'4'}>{label}</Heading>}
            <div
                className={cn(
                    `border-2 rounded-lg shadow-md p-2 w-fit mt-2`,
                    className
                )}
            >
                {children}
            </div>
        </div>
    )
}
