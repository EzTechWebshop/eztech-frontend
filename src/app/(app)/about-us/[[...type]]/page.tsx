import Info from '@/components/layout/Info'
import { WebsiteInfoFieldTopic } from '@/types/domain-types'
import api from '@/utils/api'

type AboutUsPageProps = {
    params: {
        type: WebsiteInfoFieldTopic
    }
}
export default async function AboutUsPage({ params }: AboutUsPageProps) {
    const { type } = params
    const res = await api.catalog.getWebsiteInfo()
    const data = res.data

    if (!type) {
        const info = data.websiteInfoFields.filter(
            (item: any) => item.type == 'AboutUs'
        )
        return <Info type={'AboutUs'} infoList={info} />
    }

    const info = data.websiteInfoFields.filter((item: any) => item.type == type)
    return <Info type={type} infoList={info} />
}
