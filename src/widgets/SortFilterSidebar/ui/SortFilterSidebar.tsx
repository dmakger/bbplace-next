'use client'

import cl from './_SortFilterSidebar.module.scss'
import { Button, ButtonVariant } from "@/shared/ui/Button"
import { Filter } from "@/features/Filter"
import { useEffect, useState } from 'react'
import { IOption } from '@/shared/model/option.model'
import { DEFAULT_COUNTRY_OPTION, DEFAULT_STATUS_OPTION } from '@/features/Filter/data/filter.data'
import { useProductAll } from '@/entities/Product/hooks/useProduct.hooks'
import { DEFAULT_SORT } from '@/features/Sort/data/sort.data'
import { Sort } from '@/features/Sort'


export const SortFilterSidebar = () => {

    //STATE
    const [country, setCountry] = useState<IOption>(DEFAULT_COUNTRY_OPTION)
    const [minOrder, setMinOrder] = useState<string>('')
    const [status, setStatus] = useState<IOption>(DEFAULT_STATUS_OPTION)
    const [sortByDate, setSortByDate] = useState<IOption>(DEFAULT_SORT)
    const [filter, setFilter] = useState<string>('')

    //EFFECT
    useEffect(() => {
        const filterAccum: string[] = [];

        if (sortByDate.id !== -1) filterAccum.push(`SortBy=${sortByDate.value}`);

        if (country.id) filterAccum.push(`Country=${country.name}`);

        if (status.id !== -1) filterAccum.push(`Status=${status.name}`);

        if (minOrder !== '' && !isNaN(Number(minOrder))) filterAccum.push(`MinOrderQuantity=${minOrder}`);

        setFilter(filterAccum.join('&'));
    }, [country, minOrder, status, sortByDate]);
    

    const clearFilters = () => {
        setCountry(DEFAULT_COUNTRY_OPTION)
        setMinOrder('')
        setStatus(DEFAULT_STATUS_OPTION)
        setSortByDate(DEFAULT_SORT)
    }

    const { data: productList, setData: setProductList } = useProductAll({page: 0, limit: 16, filter})
    
    return (
        <aside className={cl.SortFilterSidebar}>
            <Sort
                sortByDate={sortByDate}
                setSortByDate={setSortByDate}
            />
            <Filter
                country={country}
                setCountry={setCountry}
                status={status}
                setStatus={setStatus}
                minOrder={minOrder}
                setMinOrder={setMinOrder}
                setFilter={setFilter}
            />
            <Button variant={ButtonVariant.BACKGROUND_WHITE_WIDE} onClick={clearFilters}>
                Очистить
            </Button>
        </aside>
    )
}
