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
import { CategoryAPI } from "@/entities/Metrics/api/category.metrics.api"
import { CountryAPI } from "@/entities/Metrics/api/country.metrics.api"
import { ICategory } from "@/entities/Metrics/model/category.metrics.model"
import { ICountry } from "@/entities/Metrics/model/country.metrics.model"
// import { useCategoryForFilter } from "@/entities/Product/hooks/useProduct.hooks"

interface IFilter{
    variant: ECatalogVariants,
    filter: ISortFilter
    setFilter: Dispatch<SetStateAction<ISortFilter>>
    categories: ICategory[]
    countries: ICountry[]
}

export const Filter = ({variant, filter, setFilter, categories, countries }: IFilter) => {

    //STATE
    const [isFiltersOpen, setIsFiltersOpen] = useState<boolean>(true)
    const [countriesAsOptions, setCountriesAsOptions] = useState<IOption[]>([])
    const [categoriesAsOptions, setCategoriesAsOptions] = useState<IOption[]>([])

    //REF
    const inputListRef = useRef<HTMLDivElement>(null)
    
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
