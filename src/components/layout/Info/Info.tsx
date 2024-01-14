import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import {
    WebsiteInfoField,
    WebsiteInfoFieldTopic,
    WebsiteInfoFieldTopicNames,
    WebsiteInfoFieldTopics,
} from '@/types/domain-types'
import { Heading, SelectSeparator, Text } from '@radix-ui/themes'
import Link from 'next/link'
import { IoMenuOutline } from 'react-icons/io5'

type InfoProps = {
    type: WebsiteInfoFieldTopic
    infoList: WebsiteInfoField[]
}
export default function Info({ ...props }: InfoProps) {
    const { infoList } = props
    return (
        <div className="flex flex-1 gap-4 max-w-7xl">
            <div className="flex flex-col w-full">
                <InfoContentHeader {...props} />
                <div className="flex flex-col mt-4 space-y-8">
                    {infoList.length == 0 && (
                        <Heading size={'7'}>No info found</Heading>
                    )}
                    {infoList.map((item) => (
                        <InfoContentField key={item.id} info={item} />
                    ))}
                </div>
            </div>
        </div>
    )
}

function InfoContentHeader({ ...props }: InfoProps) {
    const { type } = props
    const typeList = WebsiteInfoFieldTopics
    return (
        <div className="flex space-x-4 py-4 border-b-2 justify-between px-8">
            <div className="flex flex-1 items-center space-x-4 justify-between">
                <Heading className="whitespace-nowrap" size={'6'}>
                    {WebsiteInfoFieldTopicNames[type]}
                </Heading>
                <Text size={'8'}>|</Text>
            </div>
            <div className="flex items-center space-x-4 md:hidden">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant={'ghost'}>
                            <Text size={'6'}>
                                <IoMenuOutline size={20} />
                            </Text>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {typeList.map((item) => (
                            <Link href={`/about-us/${item}`} key={item}>
                                <DropdownMenuItem
                                    className={cn(
                                        '',
                                        type == item && 'bg-slate-200'
                                    )}
                                >
                                    <Text>
                                        {WebsiteInfoFieldTopicNames[item]}
                                    </Text>
                                </DropdownMenuItem>
                            </Link>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
                <Text>Topics</Text>
            </div>
            <div className="hidden md:flex flex-wrap items-center overflow-hidden space-x-4">
                {typeList.map((item) => (
                    <Link href={`/about-us/${item}`} key={item}>
                        <Button
                            className={cn('', type == item && 'bg-slate-200')}
                            variant={'outline'}
                            size={'xs'}
                        >
                            <Text size={'1'}>
                                {WebsiteInfoFieldTopicNames[item].toString()}
                            </Text>
                        </Button>
                    </Link>
                ))}
            </div>
        </div>
    )
}
type InfoContentFieldProps = {
    info: WebsiteInfoField
}
const InfoContentField = ({ ...props }: InfoContentFieldProps) => {
    const { info } = props
    return (
        <div className="flex flex-1 mx-4">
            <div className="flex flex-col w-full gap-4">
                <Heading size={'6'}>{info.title}</Heading>
                <div className="flex flex-1 mx-4 w-full">
                    <Text size={'4'}>{info.description}</Text>
                </div>
                <SelectSeparator />
            </div>
        </div>
    )
}
