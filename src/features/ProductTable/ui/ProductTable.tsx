'use client'

import cl from './_ProductTable.module.scss'
import { IProduct } from '@/entities/Product/model/product.model'
import { HeadingToTextTable } from '@/shared/ui/Text'
import { getCharacteristic, getDataHeadingToTextProductMainTable } from '@/shared/ui/Text/lib/htt.product.lib'
import { EHeadingToTextVariants } from '@/shared/model/text.model'
import { CountryAPI } from '@/entities/Metrics/api/country.metrics.api'
import { useEffect, useState } from 'react'
import { MetricsAPI } from '@/entities/Metrics/api/metrics.metrics.api'

interface IProductTable {
    product: IProduct
}
export const ProductTable = ({
    product
}: IProductTable) => {

    //STATE
    const [selectedCountry, setSelectedCountry] = useState<string | undefined>('')
    const [selectedWeightUnit, setSelectedWeightUnit] = useState<string | undefined>('')

    //API
    const { data: countries } = CountryAPI.useGetCountriesQuery()
    const { data: metrics } = MetricsAPI.useGetMetricsQuery()


    //EFFECT
    useEffect(() => {
        if (countries)
            setSelectedCountry(getCharacteristic({ characteristic: product.characteristics.country, list: countries }))
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
        <div id='characteristics'>
            <HeadingToTextTable
                variant={EHeadingToTextVariants.ROW}
                data={getDataHeadingToTextProductMainTable({ product, selectedCountry: selectedCountry ?? '', selectedWeightUnit: selectedWeightUnit ?? '' })}
                hasColon={false}
                hasSpace={false}
                classNameMainBlock={cl.Table}
                classNameRow={cl.tableRow}
                classNameHeadingItem={cl.headingItem}
                classNameTextItem={cl.textItem}
                classNameLastRow={cl.lastRow}
            />
        </div>

    )
}