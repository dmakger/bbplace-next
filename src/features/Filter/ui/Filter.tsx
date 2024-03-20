'use client'

import { FormEvent, useEffect, useRef, useState } from "react"
import cl from './_Filter.module.scss'
import { useCountryAll } from "@/entities/Metrics/hooks/useCountry.hooks"
import { IOption } from "@/shared/model/option.model"
import { getSelected } from "../lib/filter.lib"
import { FilterForm, FilterTitleButton } from "../components"
import { IFilterValues } from "../model/filter.model"
import { DEFAULT_FILTER_VALUES } from "../data/filter.data"

interface IFilter{
    country: IOption,
    setCountry: Function,
    minOrder: string,
    setMinOrder: Function,
    status: IOption, 
    setStatus: Function,
    setFilter:Function,
    filterValues: IFilterValues,
    setFilterValues: Function

}

export function Filter({
    country,
    setCountry,
    minOrder,
    setMinOrder,
    status,
    setStatus,
    setFilter,
    filterValues,
    setFilterValues
}:IFilter){

    //STATE
    const [isFiltersOpen, setIsFiltersOpen] = useState<boolean>(false)
    const [countriesAsOptions, setCountriesAsOptions] = useState<IOption[]>([])
    

    //REF
    const inputListRef = useRef<HTMLFormElement>(null)

    //API
    const { data: countries } = useCountryAll()
    

    useEffect(() => {
        countries && setCountriesAsOptions(getSelected(countries))
    }, [countries])

    useEffect(() => {
        if (inputListRef.current) {
            if (isFiltersOpen) {
                inputListRef.current.style.height = `${inputListRef.current.scrollHeight}px`;
            } else {
                inputListRef.current.style.height = '0';
            }
        }

    }, [isFiltersOpen]);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        // event.preventDefault();
        // if (inputListRef.current) {
        //     const formData = new FormData(inputListRef.current);
        //     const tempDataStorage: Record<string, any> = {};
        //     formData.forEach((value, key) => tempDataStorage[key] = value)
        //     console.log(formData);
            
        //     setFilterValues({
        //         country:tempDataStorage['selectCountry'],
        //         minOrder: tempDataStorage['minOrder'],
        //         status: tempDataStorage['selectStatus']
        //     })}
    };

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
                onChange={handleSubmit}
                selectedCountry={country}
                setSelectedCountry={setCountry}
                minOrder={minOrder}
                setMinOrder={setMinOrder}
                status={status}
                setStatus={setStatus}
                setFilter={setFilter}
                filterValues={filterValues}
                setFilterValues={setFilterValues}
            />
        </article>
    )
}
