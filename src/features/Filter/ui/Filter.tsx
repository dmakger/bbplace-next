'use client'

import { useEffect, useRef, useState } from "react"
import cl from './_Filter.module.scss'
import { useCountryAll } from "@/entities/Metrics/hooks/useCountry.hooks"
import { IOption } from "@/shared/model/option.model"
import { getSelected } from "../lib/filter.lib"
import { FilterForm, FilterTitleButton } from "../components"

interface IFilter{
    country: IOption,
    setCountry: Function,
    minOrder: string,
    setMinOrder: Function,
    status: IOption, 
    setStatus: Function,
    setFilter:Function
}

export const Filter = ({
    country,
    setCountry,
    minOrder,
    setMinOrder,
    status,
    setStatus,
}: IFilter) => {

    //STATE
    const [isFiltersOpen, setIsFiltersOpen] = useState<boolean>(false)
    const [countriesAsOptions, setCountriesAsOptions] = useState<IOption[]>([])

    //REF
    const inputListRef = useRef<HTMLDivElement>(null)

    //API
    const { data: countries } = useCountryAll()
    

    useEffect(() => {
        countries && setCountriesAsOptions(getSelected(countries))
    }, [countries])

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
            <FilterForm
                isFiltersOpen={isFiltersOpen}
                countriesAsOptions={countriesAsOptions}
                inputListRef={inputListRef}
                selectedCountry={country}
                setSelectedCountry={setCountry}
                minOrder={minOrder}
                setMinOrder={setMinOrder}
                status={status}
                setStatus={setStatus}
            />
        </article>
    )
}
