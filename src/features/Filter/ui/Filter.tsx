'use client'

import { useEffect, useRef, useState } from "react"
import cl from './_Filter.module.scss'
import { useCountryAll } from "@/entities/Metrics/hooks/useCountry.hooks"
import { IOption } from "@/shared/model/option.model"
import { FilterCompaniesCatalog, FilterProductsCatalog, FilterTendersCatalog, FilterTitleButton } from "../components"
import { ECatalogVariants } from "@/widgets/SortFilterSidebar"
import { useCategoryAll } from "@/entities/Metrics/hooks/useCategory.hooks"
import { getCategoriesAsSelected, getCountriesAsSelected } from "../lib/filter.lib"

interface IFilter{
    variant: ECatalogVariants,
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
    const { data: categories } = useCategoryAll()

    
    //EFFECT
    useEffect(() => {
        countries && setCountriesAsOptions(getCountriesAsSelected(countries))
    }, [countries])

    useEffect(() => {
        categories && setCategoriesAsOptions(getCategoriesAsSelected(categories))
        console.log(categoriesAsOptions);
        
    }, [categories])



    useEffect(() => {
        if (inputListRef.current) {
            if (isFiltersOpen) {
                inputListRef.current.style.maxHeight = `${inputListRef.current.scrollHeight}px`;
            } else {
                inputListRef.current.style.maxHeight = '0';
            }
        }

    }, [isFiltersOpen]);

    return (
        <article className={cl.Filter}>
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
