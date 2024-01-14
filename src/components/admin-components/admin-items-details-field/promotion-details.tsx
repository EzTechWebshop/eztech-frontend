import AddImageToPromotion from '@/components/admin-components/actions/add-image-to-promotion'
import DetailText from '@/components/admin-components/detail-text'
import DetailsBox from '@/components/admin-components/details-box'
import { Button } from '@/components/ui/button'
import { Product, Promotion } from '@/types/domain-types'
import { Text } from '@radix-ui/themes'
import Image from 'next/image'
import { IoTrashBinOutline } from 'react-icons/io5'
import EditPromotionModal from '../modals/edit-promotion-modal'

const basePath = process.env.NEXT_PUBLIC_IMAGE_URL || ''

// PRODUCT DETAILS
type PromotionDetailsProps = {
    item: {
        promotion: Promotion
        products: Product[]
    }
}
export default function PromotionDetails({ ...props }: PromotionDetailsProps) {
    const { promotion, products } = props.item

    return (
        <div className="flex flex-col space-y-2">
            <div className="flex flex-1 justify-between">
                <DetailsBox className="w-[10vw]" label={'Promotion Name'}>
                    <DetailText label={'ID'} text={promotion.id} />
                    <DetailText label={'Title'} text={promotion.title} />
                </DetailsBox>
                <div className=" absolute right-0 border-2 rounded-lg shadow-lg mr-4 mt-4">
                    <Image
                        src={`${basePath}/${promotion.imageUrl}`}
                        width={250}
                        height={250}
                        alt="img"
                    />
                </div>
            </div>
            <DetailsBox label={'Description'} className="mr-8">
                <Text>{promotion.description}</Text>
            </DetailsBox>
            <div className="flex space-x-8">
                <DetailsBox label={'Information'}>
                    <DetailText
                        label={'Start Date'}
                        text={new Date(promotion.startDate).toLocaleDateString(
                            'en-GB',
                            {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            }
                        )}
                    />
                    <DetailText
                        label={'End Date'}
                        text={new Date(promotion.endDate).toLocaleDateString(
                            'en-GB',
                            {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            }
                        )}
                    />
                    <DetailText
                        label={'Active'}
                        text={promotion.isActive ? 'Yes' : 'No'}
                    />
                </DetailsBox>
            </div>
            <div className="flex flex-1 justify-between mx-8">
                <DetailsBox label={'Menu'} className="flex space-x-4">
                    <EditPromotionModal promotion={promotion} />
                </DetailsBox>
                <DetailsBox label={'Change Image'} className="flex space-x-4">
                    <AddImageToPromotion promotion={promotion} />
                </DetailsBox>
                {promotion.isActive && (
                    <DetailsBox
                        label={'Manage status'}
                        className="flex space-x-4"
                    >
                        <Button variant={'icon'}>End Promotion</Button>
                        <Button variant={'icon'}>Pause Promotion</Button>
                    </DetailsBox>
                )}
                <DetailsBox label={'Delete'} className="flex space-x-4">
                    <Button variant={'destructive'}>
                        <IoTrashBinOutline size={20} />
                    </Button>
                </DetailsBox>
            </div>
        </div>
    )
}
