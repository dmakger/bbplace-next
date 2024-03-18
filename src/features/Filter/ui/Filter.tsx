'use client'

import { FormEvent, useEffect, useRef, useState } from "react"
import cl from './_Filter.module.scss'
import { useCountryAll } from "@/entities/Metrics/hooks/useCountry.hooks"
import { IOption } from "@/shared/model/option.model"
import { getSelected } from "../lib/filter.lib"
import { FilterForm, FilterTitleButton } from "../components"


export const Filter = () => {

    //STATE
    const [isFiltersOpen, setIsFiltersOpen] = useState<boolean>(false)
    const [countriesAsOptions, setCountriesAsOptions] = useState<IOption[]>([])
    const [selectedCountry, setSelectedCountry] = useState<number>(-1)

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
        event.preventDefault();
        if (inputListRef.current) {
            const formData = new FormData(inputListRef.current);
            const tempDataStorage: Record<string, any> = {};
            formData.forEach((value, key) => tempDataStorage[key] = value)
            setSelectedCountry(tempDataStorage['selectCountry']);
            console.log(tempDataStorage);
        }
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
            />
        </article>
    )
}
