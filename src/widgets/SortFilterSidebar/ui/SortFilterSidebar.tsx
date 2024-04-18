'use client'

import cl from './_SortFilterSidebar.module.scss'
import { cls } from "@/shared/lib/classes.lib"
import { Button, ButtonVariant } from "@/shared/ui/Button"
import { Filter } from "@/features/Filter"
import { useCallback, useEffect, useState } from 'react'
import { IOption } from '@/shared/model/option.model'
import { DEFAULT_APPLICATION_OPTION, DEFAULT_CATEGORY_OPTION, DEFAULT_COUNTRY_OPTION, DEFAULT_STATUS_OPTION } from '@/features/Filter/data/filter.data'
import { DEFAULT_ALPHABETICAL_SORT, DEFAULT_DATE_SORT, Sort } from '@/features/Sort'
import { ECatalogVariants } from '..'
import { useDebounce } from '@/shared/hooks/useDebounce.hooks'
import { CORE_PARAMS } from '@/config/params/core.params.config'
import { DEFAULT_SORT_FILTER__DATA } from '../data/sortFilter.data'
import { ISortFilter } from '../model/sortFilterSidebar.model'
import { getUpdatedDataSortFilter, toSortFilter } from '../lib/sortFilter.lib'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

interface ISortFilterSidebar{
    variant: ECatalogVariants,
    // setFilter: Function,
    className?: string
}


export const SortFilterSidebar = ({
    variant,
    className,
    // setFilter
}:ISortFilterSidebar) => {

    // ROUTER
    const pathname = usePathname()
    const searchParams = useSearchParams() 
    const router = useRouter()

    toSortFilter(searchParams)

    //STATE
    const [minOrder, setMinOrder] = useState<string>('')
    const [filter, setFilter] = useState<ISortFilter>(DEFAULT_SORT_FILTER__DATA)

    const minOrderDebouncedValue = useDebounce(minOrder)    

    useEffect(() => {
        const sortData = getUpdatedDataSortFilter(filter)
        console.log('nigger', sortData);
        const params = new URLSearchParams(searchParams.toString())
        Object.keys(sortData).map(keySort => {
            sortData[keySort].map(valueSort => {params.set(keySort, valueSort)})
        })
        router.push(`${pathname}?${params.toString()}`);  
    }, [filter])
    

    const clearFilters = useCallback(() => {
        setFilter(DEFAULT_SORT_FILTER__DATA)
    }, [])    

    
    return (
        <aside className={cls(cl.SortFilterSidebar, className)}>
            {variant !== ECatalogVariants.TENDERS && 
                <Sort variant={variant}
                      filter={filter} 
                      setFilter={setFilter} />
            }
            <Filter variant={variant}
                    filter={filter} 
                    setFilter={setFilter} />
            
            <Button variant={ButtonVariant.BACKGROUND_WHITE_WIDE} onClick={clearFilters}>
                Очистить
            </Button>
        </aside>
    )
}
