'use client'

import { CatalogProducts } from '@/types/public-types'
import CatalogMenu from './catalog-menu'
import CatalogNavigate from './catalog-navigate'
import { useEffect, useState } from 'react'

export type CatalogWrapperProps = {
    children: React.ReactNode
    data: CatalogProducts
}
export default function CatalogWrapper({ ...props }: CatalogWrapperProps) {
    const { children, data } = props
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        if (data) {
            setLoading(false)
        }
    }, [data])
    return (
        <div className="flex flex-1 h-fit">
            <div className="flex flex-1 flex-col">
                <CatalogMenu loading={loading} setLoading={setLoading} />
                <div className="h-full">{children}</div>
                <div className="flex">
                    <CatalogNavigate
                        loading={loading}
                        setLoading={setLoading}
                        totalPages={data.totalPages}
                    />
                </div>
            </div>
        </div>
    )
}
