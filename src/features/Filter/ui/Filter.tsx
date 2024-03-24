'use client'

import { useEffect, useRef, useState } from "react"
import cl from './_Filter.module.scss'
import { useCountryAll } from "@/entities/Metrics/hooks/useCountry.hooks"
import { IOption } from "@/shared/model/option.model"
import { FilterCompaniesCatalog, FilterProductsCatalog, FilterTendersCatalog, FilterTitleButton } from "../components"
import { ECatalogVariants } from "@/widgets/SortFilterSidebar"
import { getCountriesAsOption, updateCategoriesAsOptions } from "../lib/filter.lib"
import { cls } from "@/shared/lib/classes.lib"
import { useCategoryForFilter } from "@/entities/Product/hooks/useProduct.hooks"

interface IFilter{
    variant: ECatalogVariants,
    category: IOption,
    setCategory: Function,
    country: IOption,
    setCountry: Function,
    minOrder: string,
    setMinOrder: Function,
    status: IOption, 
    setStatus: Function,
    setFilter: Function,
    application: IOption,
    setApplication: Function,
}

export const Filter = ({
    variant,
    country,
    category,
    setCategory,
    setCountry,
    minOrder,
    setMinOrder,
    status,
    setStatus,
    application,
    setApplication
}: IFilter) => {

    //STATE
    const [isFiltersOpen, setIsFiltersOpen] = useState<boolean>(false)
    const [countriesAsOptions, setCountriesAsOptions] = useState<IOption[]>([])
    const [categoriesAsOptions, setCategoriesAsOptions] = useState<IOption[]>([])


    //REF
    const inputListRef = useRef<HTMLDivElement>(null)

    //API
    const { data: countries } = useCountryAll()
    const { data: categories } = variant === ECatalogVariants.COMPANIES ? useCategoryForFilter() : { data: undefined };
    
    //EFFECT
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
        <article className={cls(cl.Filter, variant !== ECatalogVariants.PRODUCTS && isFiltersOpen ? cl.FilterTenders : '')}>
            <FilterTitleButton
                isFiltersOpen={isFiltersOpen}
                setIsFiltersOpen={setIsFiltersOpen}
            />
            {variant === ECatalogVariants.PRODUCTS && <FilterProductsCatalog
                isFiltersOpen={isFiltersOpen}
                countryDefaultOption={country}
                countryListOptions={countriesAsOptions}
                countryOnClickOption={setCountry}
                inputListRef={inputListRef}
                statusDefaultOption={status}
                statusOnClickOption={setStatus}
                minOrderDefaultValue={minOrder}
                minOrderOnChange={setMinOrder}
            />}

            {variant === ECatalogVariants.TENDERS && <FilterTendersCatalog
                isFiltersOpen={isFiltersOpen}
                application={application}
                setApplication={setApplication}
                inputListRef={inputListRef}
            />}

            {variant === ECatalogVariants.COMPANIES && <FilterCompaniesCatalog
                isFiltersOpen={isFiltersOpen}
                categoryDefaultOption={category}
                categoryListOptions={categoriesAsOptions}
                categoryOnClickOption={setCategory}
                countryDefaultOption={country}
                countryListOptions={countriesAsOptions}
                countryOnClickOption={setCountry}
                inputListRef={inputListRef}
                minOrderDefaultValue={minOrder}
                minOrderOnChange={setMinOrder}
             />}
        </article>
    )
}
