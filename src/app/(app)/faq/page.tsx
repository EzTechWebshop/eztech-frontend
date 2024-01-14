import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import { CatalogFaqs } from '@/types/public-types'
import { Faq } from '@/types/domain-types'
import api from '@/utils/api'
import { Heading, Strong, Text } from '@radix-ui/themes'

export default async function Faq() {
    const res = await api.catalog.getFaqs()
    const data: CatalogFaqs = res.data
    return (
        <div className="flex flex-1">
            <div className="flex flex-col h-full w-full">
                <Heading>
                    <Strong>Frequently Asked Questions</Strong>
                </Heading>
                {data.faqs.length == 0 ? (
                    <Heading size={'7'}>No FAQ found</Heading>
                ) : (
                    <Accordion type="single" collapsible className="w-full">
                        {data.faqs.map((faq: Faq) => (
                            <AccordionItem
                                value={faq.id.toString()}
                                key={faq.id}
                            >
                                <AccordionTrigger>
                                    <Text>
                                        <Strong>{faq.question}</Strong>
                                    </Text>
                                </AccordionTrigger>
                                <AccordionContent>
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                )}
            </div>
        </div>
    )
}
