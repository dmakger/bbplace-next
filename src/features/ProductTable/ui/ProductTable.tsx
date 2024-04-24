'use client'

import cl from './_ProductTable.module.scss'
import { productApiItemToProduct } from '@/entities/Product/lib/product.lib'
import { IProductAPI } from '@/entities/Product/model/product.model'
import { HeadingToTextTable } from '@/shared/ui/Text'
import { getCountry, getDataHeadingToTextProductMainTable } from '@/widgets/Product/Table/HeadingToText/lib/htt.product.lib'
import { EHeadingToTextVariants } from '@/shared/model/text.model'
import { CountryAPI } from '@/entities/Metrics/api/country.metrics.api'
import { useEffect, useState } from 'react'

interface IProductTable {
    productApi: IProductAPI
}
export const ProductTable = ({
    productApi
}: IProductTable) => {

    //STATE
    const [selectedCountry, setSelectedCountry] = useState<string | undefined>('')

    //API
    const {data: countries} = CountryAPI.useGetCountriesQuery()

    //VARIABLE
    const product = productApiItemToProduct(productApi)

    //EFFECT
    useEffect(() => {
        if(countries)
            setSelectedCountry(getCountry(product, countries))
    }, [countries])
    
    return (
        <HeadingToTextTable
            variant={EHeadingToTextVariants.ROW}
            data={getDataHeadingToTextProductMainTable(product, selectedCountry || '')}
            hasColon={false}
            classNameMainBlock={cl.Table}
            classNameHeadingItem={cl.headingItem}
            classNameTextItem={cl.textItem}
        />
    )
}
