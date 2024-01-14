import FrontPageCarousel from '@/components/frontpage-carousel'
import { DayOfWeek } from '@/types/domain-types'
import api from '@/utils/api'
import { Em, Heading, Strong, Text } from '@radix-ui/themes'

export default async function Home() {
    const websiteInfoRes = await api.catalog.getWebsiteInfo()
    const websiteInfo = websiteInfoRes.data
    const promotionsRes = await api.catalog.getPromotions()
    const promotionsData = promotionsRes.data
    return (
        <div className="grid grid-cols-2 justify-between max-w-7xl ">
            <div className=" flex flex-col gap-8">
                <Heading size={'8'}>EzTech | Easy Tech Shop</Heading>
                <div className="flex flex-col max-w-7xl bg-gray-50 rounded-lg p-2 shadow-lg">
                    <Text size={'6'}>
                        Welcome to our shop. Click around and get inspired.
                    </Text>
                    <div className="ml-4">
                        <Text size={'4'}>
                            If you have any questions, contact us within our
                            business hours.
                        </Text>
                    </div>
                    <div className="flex flex-col space-y-8 mt-8">
                        <div className="flex flex-1 flex-col space-y-2">
                            <Heading size={'4'}>Opening hours</Heading>
                            <div className="flex flex-col border-t-2 border-black mb-4 w-[300px]">
                                {websiteInfo.weeklyOpeningHours.map((day) => (
                                    <div
                                        className="flex flex-1 justify-between border-b"
                                        key={day.id}
                                    >
                                        <Text size={'4'}>
                                            {DayOfWeek[day.dayOfWeek]}
                                        </Text>
                                        {day.isClosed && (
                                            <Text color="red" size={'4'}>
                                                Closed
                                            </Text>
                                        )}
                                        {!day.isClosed &&
                                            day.openTime != null &&
                                            day.closeTime != null && (
                                                <Text
                                                    key={day.dayOfWeek}
                                                    size={'4'}
                                                >
                                                    {new Date(
                                                        '1970-01-01T' +
                                                            day.openTime
                                                    )
                                                        .toLocaleTimeString(
                                                            'en-GB',
                                                            {
                                                                hour: '2-digit',
                                                                minute: '2-digit',
                                                            }
                                                        )
                                                        .replace(/^0/, '')}{' '}
                                                    -
                                                    {new Date(
                                                        '1970-01-01T' +
                                                            day.closeTime
                                                    )
                                                        .toLocaleTimeString(
                                                            'en-GB',
                                                            {
                                                                hour: '2-digit',
                                                                minute: '2-digit',
                                                            }
                                                        )
                                                        .replace(/^0/, '')}
                                                </Text>
                                            )}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-1 flex-col space-y-2">
                            <Heading size={'4'}>Contact</Heading>
                            <div className="flex flex-col border-t-2 border-black mb-4 w-[300px]">
                                <Text
                                    className="flex flex-1 justify-between"
                                    size={'4'}
                                >
                                    <Em>Phone number:</Em>
                                    <Strong>{websiteInfo.phoneNumber}</Strong>
                                </Text>
                                <Text
                                    className="flex flex-1 justify-between"
                                    size={'4'}
                                >
                                    <Em>Email:</Em>
                                    <Strong>{websiteInfo.email}</Strong>
                                </Text>
                            </div>
                            <Em>Address:</Em>
                            <Text
                                className="flex flex-col border-2 border-black rounded-lg p-2 w-fit"
                                size={'4'}
                            >
                                <Text>{websiteInfo.country}</Text>
                                <Text>
                                    {websiteInfo.postalCode} {websiteInfo.city}
                                </Text>
                                <Text size={'3'} className="whitespace-nowrap">
                                    {websiteInfo.address},{' '}
                                    {websiteInfo.postalCode}
                                </Text>
                            </Text>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col flex-1 mx-auto h-fit">
                <Heading size={'4'}>Active Promotions</Heading>
                <FrontPageCarousel data={promotionsData} />
            </div>
        </div>
    )
}
