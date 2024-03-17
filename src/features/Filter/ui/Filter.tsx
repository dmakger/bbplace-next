'use client'

import { FC, useEffect, useRef, useState } from "react"
import cl from './_Filter.module.scss'
import Image from "next/image"
import { cls } from "@/shared/lib/classes.lib"
import { useCountryAll } from "@/entities/Metrics/hooks/useCountry.hooks"
import Input from "@/shared/ui/Input/Input"
import { IOption } from "@/shared/model/option.model"
import { DEFAULT_COUNTRY_OPTION } from "../data/filter.data"
import { getSelected } from "../lib/filter.lib"

interface IFilterProps {
    className?: string,

}

export const Filter: FC<IFilterProps> = ({ className }) => {

    //STATE
    const [isFiltersOpen, setIsFiltersOpen] = useState<boolean>(false)
    const [countriesAsSelected, setCountriesAsSelected] = useState<IOption[]>([])

    //REF
    const inputListRef = useRef<HTMLDivElement>(null)

    //API
    const { data: countries } = useCountryAll()
    
    useEffect(() => {
        countries && setCountriesAsSelected(getSelected(countries))        
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

    return (
        <div className={cls(cl.Filter, className)}>
            <button type={'button'} className={cls(cl.button, className)} onClick={() => setIsFiltersOpen(!isFiltersOpen)}>
                <h3>
                    Фильтры
                </h3>
                <Image className={isFiltersOpen ? cl.arrowOpen : cl.arrow} src={'arrow.svg'} alt={'arrow'} width={14} height={12} />
            </button>
            <div ref={inputListRef} className={cl.inputsList}>
                <div className={cl.select}>
                    <h4>Страна</h4>
                    <Input.Select
                        options={countriesAsSelected}
                        defaultOption={DEFAULT_COUNTRY_OPTION}
                        classNameOptions={cl.countryOptions}
                    />
                </div>
            </div>
        </div>
    )
}
