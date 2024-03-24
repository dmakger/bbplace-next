'use client'

import cl from './_SortFilterSidebar.module.scss'
import { Button, ButtonVariant } from "@/shared/ui/Button"
import { Filter } from "@/features/Filter"
import { useCallback, useEffect, useState } from 'react'
import { IOption } from '@/shared/model/option.model'
import { DEFAULT_APPLICATION_OPTION, DEFAULT_CATEGORY_OPTION, DEFAULT_COUNTRY_OPTION, DEFAULT_STATUS_OPTION } from '@/features/Filter/data/filter.data'
import { DEFAULT_ALPHABETICAL_SORT, DEFAULT_DATE_SORT, Sort } from '@/features/Sort'
import { ECatalogVariants } from '..'
import { useDebounce } from '@/shared/hooks/useDebounce.hooks'

interface ISortFilterSidebar{
    variant: ECatalogVariants,
    // setFilter: Function,
}


export const SortFilterSidebar = ({
    variant,
    // setFilter
}:ISortFilterSidebar) => {

    //STATE
    //FILTERS
    const [country, setCountry] = useState<IOption>(DEFAULT_COUNTRY_OPTION)
    const [minOrder, setMinOrder] = useState<string>('')
    const [status, setStatus] = useState<IOption>(DEFAULT_STATUS_OPTION)
    const [category, setCategory] = useState<IOption>(DEFAULT_CATEGORY_OPTION)
    const [application, setApplication] = useState<IOption>(DEFAULT_APPLICATION_OPTION)
    //SORT
    const [sortByDate, setSortByDate] = useState<IOption>(DEFAULT_DATE_SORT)
    const [sortByAlphabetical, setSortByAlphabetical] = useState<IOption>(DEFAULT_ALPHABETICAL_SORT)

    const [filter, setFilter] = useState<string>('')

    const minOrderDebouncedValue = useDebounce(minOrder)    

    //EFFECT
    useEffect(() => {
        const filterAccum: string[] = [];

        sortByDate.id !== -1 && filterAccum.push(`SortByDate=${sortByDate.value}`);

        if(variant === ECatalogVariants.COMPANIES){
            sortByAlphabetical.id !== -1 && filterAccum.push(`SortByAlphabetical=${sortByAlphabetical.value}`);
            category.id && filterAccum.push(`CategoryId=${category.id}`);
        }

        if(variant !== ECatalogVariants.TENDERS){
            country.id && filterAccum.push(`Country=${country.name}`);
            minOrderDebouncedValue !== '' && !isNaN(Number(minOrderDebouncedValue)) && filterAccum.push(`MinOrderQuantity=${minOrderDebouncedValue}`);
        }
    
        variant === ECatalogVariants.PRODUCTS && status.id !== -1 && filterAccum.push(`Status=${status.name}`);

        variant === ECatalogVariants.TENDERS && application.name !== '' && filterAccum.push(`filter=${application.id}`)

        setFilter(filterAccum.join('&'));

    }, [category, country, minOrderDebouncedValue, status, application, sortByDate, sortByAlphabetical]);
    
    const clearFilters = useCallback(() => {
        setCountry(DEFAULT_COUNTRY_OPTION)
        setMinOrder('')
        setStatus(DEFAULT_STATUS_OPTION)
        setSortByDate(DEFAULT_DATE_SORT)
        setSortByAlphabetical(DEFAULT_ALPHABETICAL_SORT)
        setApplication(DEFAULT_APPLICATION_OPTION)
        setCategory(DEFAULT_CATEGORY_OPTION)
    },[])    

console.log(filter);

    
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
                category={category}
                setCategory={setCategory}
                country={country}
                setCountry={setCountry}
                status={status}
                setStatus={setStatus}
                minOrder={minOrderDebouncedValue}
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
