'use client'

import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel'
import Image from 'next/image'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Card, CardContent, CardFooter } from './ui/card'
import { Heading, Text } from '@radix-ui/themes'
import { CatalogPromotions } from '@/types/public-types'

const basePath = process.env.NEXT_PUBLIC_IMAGE_URL || ''

type FrontPageCarouselProps = {
    data: CatalogPromotions
}
export default function FrontPageCarousel({
    ...props
}: FrontPageCarouselProps) {
    const { promotions } = props.data
    if (!promotions) return null
    if (promotions.length <= 0) return null
    return (
        <Carousel className="w-full max-w-sm h-fit mr-8">
            <CarouselContent>
                {promotions.map((promotion, index) => (
                    <CarouselItem key={index}>
                        <div className="p-1">
                            <Card>
                                <CardContent className="flex flex-col gap-4 aspect-square items-center justify-center p-6">
                                    <Heading size={'4'}>
                                        {promotion.title}
                                    </Heading>
                                    <div className="relative overflow-hidden w-[450px]">
                                        <AspectRatio ratio={16 / 9}>
                                            <Image
                                                src={`${basePath}/${promotion.imageUrl}`}
                                                style={{ objectFit: 'contain' }}
                                                fill={true}
                                                alt="promotion"
                                                className="rounded-md object-cover"
                                            />
                                        </AspectRatio>
                                    </div>
                                    <Text>{promotion.description}</Text>
                                </CardContent>
                                <CardFooter>
                                    <PromotionTimespan
                                        startDate={
                                            new Date(promotion.startDate)
                                        }
                                        endDate={new Date(promotion.endDate)}
                                    />
                                </CardFooter>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}

const PromotionTimespan = ({
    startDate,
    endDate,
}: {
    startDate: Date
    endDate: Date
}) => {
    return (
        <div className="flex flex-1 justify-between">
            <Text size={'4'}>
                {startDate.toLocaleDateString('en-GB', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                })}
            </Text>
            <Text size={'4'}>-</Text>
            <Text size={'4'}>
                {endDate.toLocaleDateString('en-GB', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                })}
            </Text>
        </div>
    )
}
