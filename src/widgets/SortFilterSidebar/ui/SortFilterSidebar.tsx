'use client'

import cl from './_SortFilterSidebar.module.scss'
import { Button, ButtonVariant } from "@/shared/ui/Button"
import { Filter } from "@/features/Filter"
import { useEffect, useState } from 'react'
import { IOption } from '@/shared/model/option.model'
import { DEFAULT_APPLICATION_OPTION, DEFAULT_CATEGORY_OPTION, DEFAULT_COUNTRY_OPTION, DEFAULT_STATUS_OPTION } from '@/features/Filter/data/filter.data'
import { useProductAll } from '@/entities/Product/hooks/useProduct.hooks'
import { DEFAULT_ALPHABETICAL_SORT, DEFAULT_DATE_SORT, Sort } from '@/features/Sort'
import { ECatalogVariants } from '..'

interface ISortFilterSidebar{
    variant: ECatalogVariants
}


export const SortFilterSidebar = ({
    variant
}:ISortFilterSidebar) => {

    //STATE
    //FILTERS
    const [country, setCountry] = useState<IOption>(DEFAULT_COUNTRY_OPTION)
    const [minOrder, setMinOrder] = useState<string>('')
    const [status, setStatus] = useState<IOption>(DEFAULT_STATUS_OPTION)
    const [categories, setCategories] = useState<IOption>(DEFAULT_CATEGORY_OPTION)
    const [application, setApplication] = useState<IOption>(DEFAULT_APPLICATION_OPTION)
    //SORT
    const [sortByDate, setSortByDate] = useState<IOption>(DEFAULT_DATE_SORT)
    const [sortByAlphabetical, setSortByAlphabetical] = useState<IOption>(DEFAULT_ALPHABETICAL_SORT)

    const [filter, setFilter] = useState<string>('')

    //EFFECT
    useEffect(() => {
        const filterAccum: string[] = [];

        if (sortByDate.id !== -1) filterAccum.push(`SortBy=${sortByDate.value}`);

        if (sortByAlphabetical.id !== -1) filterAccum.push(`SortBy=${sortByAlphabetical.value}`);

        if (country.id) filterAccum.push(`Country=${country.name}`);

        if (status.id !== -1) filterAccum.push(`Status=${status.name}`);

        if (minOrder !== '' && !isNaN(Number(minOrder))) filterAccum.push(`MinOrderQuantity=${minOrder}`);

        setFilter(filterAccum.join('&'));
    }, [country, minOrder, status, sortByDate, sortByAlphabetical]);
    

    const clearFilters = () => {
        setCountry(DEFAULT_COUNTRY_OPTION)
        setMinOrder('')
        setStatus(DEFAULT_STATUS_OPTION)
        setSortByDate(DEFAULT_DATE_SORT)
        setSortByAlphabetical(DEFAULT_ALPHABETICAL_SORT)
        setApplication(DEFAULT_APPLICATION_OPTION)
    }

    const { data: productList, setData: setProductList } = useProductAll({page: 0, limit: 16, filter})


    
    return (
        <aside className={cl.SortFilterSidebar}>
            {variant !== ECatalogVariants.TENDERS && <Sort
                variant={variant}
                sortByDate={sortByDate}
                setSortByDate={setSortByDate}
                sortByAlphabetical={sortByAlphabetical}
                setSortByAlphabetical={setSortByAlphabetical}
            />}
            <Filter
                variant={variant}
                country={country}
                setCountry={setCountry}
                status={status}
                setStatus={setStatus}
                minOrder={minOrder}
                setMinOrder={setMinOrder}
                setFilter={setFilter}
                application={application}
                setApplication={setApplication}
            />
            <Button variant={ButtonVariant.BACKGROUND_WHITE_WIDE} onClick={clearFilters}>
                Очистить
            </Button>
        </aside>
    )
}
