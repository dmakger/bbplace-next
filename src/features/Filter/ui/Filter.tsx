'use client'

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import cl from './_Filter.module.scss'
import { IOption } from "@/shared/model/option.model"
import { FilterCompaniesCatalog, FilterProductsCatalog, FilterTendersCatalog, FilterTitleButton } from "../components"
import { ECatalogVariants } from "@/widgets/SortFilterSidebar"
import { getCountriesAsOption, updateCategoriesAsOptions } from "../lib/filter.lib"
import { cls } from "@/shared/lib/classes.lib"
import { useAppSelector } from "@/storage/hooks"
import { CountrySlice } from "@/entities/Metrics/storage/country.metrics.storage"
import { ISortFilter } from "@/widgets/SortFilterSidebar/model/sortFilterSidebar.model"
// import { useCategoryForFilter } from "@/entities/Product/hooks/useProduct.hooks"

interface IFilter{
    variant: ECatalogVariants,
    filter: ISortFilter
    setFilter: Dispatch<SetStateAction<ISortFilter>>
}

export const Filter = ({variant, filter, setFilter}: IFilter) => {

    //STATE
    const [isFiltersOpen, setIsFiltersOpen] = useState<boolean>(true)
    const [countriesAsOptions, setCountriesAsOptions] = useState<IOption[]>([])
    const [categoriesAsOptions, setCategoriesAsOptions] = useState<IOption[]>([])

    // RTK
    const categories = useAppSelector(state => state.categoryList);
    const countries = useAppSelector(state => state.countryList);


    //REF
    const inputListRef = useRef<HTMLDivElement>(null)

    //API
    // const { data: categories } = variant === ECatalogVariants.COMPANIES ? useCategoryForFilter() : { data: undefined };
    
    // EFFECT
    useEffect(() => {
        countries && setCountriesAsOptions(getCountriesAsOption(countries))
    }, [countries])

    useEffect(() => {
        if (variant === ECatalogVariants.COMPANIES) {
            categories && categories.length && updateCategoriesAsOptions(categories, setCategoriesAsOptions);
        }
    }, [variant, categories]);


    useEffect(() => {
        if (inputListRef.current) {
            inputListRef.current.style.maxHeight = isFiltersOpen ? `${inputListRef.current.scrollHeight}px` : '0';
        }
    }, [isFiltersOpen]);

    return (
        <article className={cls(cl.Filter, isFiltersOpen ? cl.overflowVisible : '')}>
            <FilterTitleButton
                isFiltersOpen={isFiltersOpen}
                setIsFiltersOpen={setIsFiltersOpen}
            />
            {variant === ECatalogVariants.PRODUCTS && 
                <FilterProductsCatalog
                    isFiltersOpen={isFiltersOpen}
                    countryListOptions={countriesAsOptions}
                    filter={filter}
                    setFilter={setFilter}
                    inputListRef={inputListRef} />
            }

            {variant === ECatalogVariants.TENDERS && 
                <FilterTendersCatalog
                    isFiltersOpen={isFiltersOpen}
                    filter={filter}
                    setFilter={setFilter}
                    inputListRef={inputListRef} />
            }

            {variant === ECatalogVariants.COMPANIES && 
                <FilterCompaniesCatalog
                isFiltersOpen={isFiltersOpen}
                categoryListOptions={categoriesAsOptions}
                countryListOptions={countriesAsOptions}
                filter={filter} 
                setFilter={setFilter}
                inputListRef={inputListRef} />
            }
        </article>
    )
}
