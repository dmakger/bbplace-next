'use client'

import cl from './_SortFilterSidebar.module.scss'
import { Sort } from "@/features/Sort"
import { Button, ButtonVariant } from "@/shared/ui/Button"
import { Filter } from "@/features/Filter"
import { useEffect, useState } from 'react'
import { IOption } from '@/shared/model/option.model'
import { DEFAULT_COUNTRY_OPTION, DEFAULT_STATUS_OPTION } from '@/features/Filter/data/filter.data'
import { IFilterValues } from '@/features/Filter/model/filter.model'
import { useProductAll } from '@/entities/Product/hooks/useProduct.hooks'


export const SortFilterSidebar = () => {

    const [country, setCountry] = useState<IOption>(DEFAULT_COUNTRY_OPTION)
    const [minOrder, setMinOrder] = useState<string>('')
    const [status, setStatus] = useState<IOption>(DEFAULT_STATUS_OPTION)
    const [filter, setFilter] = useState<string>('')
    const [filterValues, setFilterValues] = useState<IFilterValues>({
            country: DEFAULT_COUNTRY_OPTION,
            status: DEFAULT_STATUS_OPTION,
            minOrder: ''
    })


    useEffect(() => {
        const filterAccum: string[] = [];

        // if (sortBy.id !== -1) filterAccum.push(`SortBy=${sortBy.value}`);

        if (country.id) filterAccum.push(`Country=${country.name}`);

        if (status.id !== -1) filterAccum.push(`Status=${status.name}`);

        if (minOrder !== '' && !isNaN(Number(minOrder))) filterAccum.push(`MinOrderQuantity=${minOrder}`);

        setFilter(filterAccum.join('&'));
    }, [country, minOrder, status]);
    

    const clearFilters = () => {
        setCountry(DEFAULT_COUNTRY_OPTION)
        setMinOrder('')
        setStatus(DEFAULT_STATUS_OPTION)
        setFilter('')
    }

   

    const { data: productList, setData: setProductList } = useProductAll({page: 0, limit: 16, filter: filter})
    
console.log(productList);

    return (
        <aside className={cl.SortFilterSidebar}>
            <Sort />
            <Filter
                country={country}
                setCountry={setCountry}
                status={status}
                setStatus={setStatus}
                minOrder={minOrder}
                setMinOrder={setMinOrder}
                setFilter={setFilter}
                filterValues={filterValues}
                setFilterValues={setFilterValues}
            />
            <Button variant={ButtonVariant.BACKGROUND_WHITE_NARROW} onClick={clearFilters}>
                Очистить фильтры
            </Button>
        </aside>
    )
}
