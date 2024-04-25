'use client'

import cl from './_ProductTable.module.scss'
import { productApiToProduct } from '@/entities/Product/lib/product.lib'
import { IProductAPI } from '@/entities/Product/model/product.model'
import { HeadingToTextTable } from '@/shared/ui/Text'
import { getCountry, getDataHeadingToTextProductMainTable } from '@/widgets/Product/Table/HeadingToText/lib/htt.product.lib'
import { EHeadingToTextVariants } from '@/shared/model/text.model'
import { CountryAPI } from '@/entities/Metrics/api/country.metrics.api'
import { useEffect, useState } from 'react'
import { MetricsAPI } from '@/entities/Metrics/api/metrics.metrics.api'

interface IProductTable {
    productApi: IProductAPI
}
export const ProductTable = ({
    productApi
}: IProductTable) => {

    //STATE
    const [selectedCountry, setSelectedCountry] = useState<string | undefined>('')
    const [selectedWeightUnit, setSelectedWeightUnit] = useState<string | undefined>('')

    //API
    const {data: countries} = CountryAPI.useGetCountriesQuery()
    const {data: metrics} = MetricsAPI.useGetMetricsQuery()

    //VARIABLE
    const product = productApiToProduct({productAPI: productApi})

    //EFFECT
    useEffect(() => {
        if(countries)
            setSelectedCountry(getCountry(product, countries))
    }, [countries])

    useEffect(() => {
        if (metrics && product.characteristics.weightUnits) {
            const selectedMetric = metrics.find(it => it.id === Number(product.characteristics.weightUnits))
            if (selectedMetric) {
                setSelectedWeightUnit(selectedMetric.shortName)
            }
        }
    }, [metrics])
    
    return (
        <HeadingToTextTable
            variant={EHeadingToTextVariants.ROW}
            data={getDataHeadingToTextProductMainTable(product, selectedCountry || '', selectedWeightUnit || '')}
            hasColon={false}
            classNameMainBlock={cl.Table}
            classNameHeadingItem={cl.headingItem}
            classNameTextItem={cl.textItem}
        />
    )
}
