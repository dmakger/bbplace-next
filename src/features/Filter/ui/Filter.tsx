'use client'

import { FC, FormEvent, useEffect, useRef, useState } from "react"
import cl from './_Filter.module.scss'
import Image from "next/image"
import { cls } from "@/shared/lib/classes.lib"
import { useCountryAll } from "@/entities/Metrics/hooks/useCountry.hooks"
import Input from "@/shared/ui/Input/Input"
import { IOption } from "@/shared/model/option.model"
import { DEFAULT_COUNTRY_OPTION, INPUT_DOUBLE_TEXT_NAME, INPUT_DOUBLE_TEXT_PLACEHOLDER } from "../data/filter.data"
import { getSelected } from "../lib/filter.lib"
import { InputDoubleText } from "@/shared/ui/Input/DoubleText"

interface IFilterProps {
    className?: string,
}

export const Filter: FC<IFilterProps> = ({ className }) => {

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
            formData.forEach((value, key) => {
                tempDataStorage[key] = value
            })
            setSelectedCountry(tempDataStorage['selectCountry']);
        }
        
    };

    return (
        <div className={cls(cl.Filter, className)}>
            <button type={'button'} className={cls(cl.button, className)} onClick={() => setIsFiltersOpen(!isFiltersOpen)}>
                <h3>
                    Фильтры
                </h3>
                <Image className={isFiltersOpen ? cl.arrowOpen : cl.arrow} src={'arrow.svg'} alt={'arrow'} width={14} height={12} />
            </button>
            <form ref={inputListRef} className={cl.inputsList} onChange={handleSubmit}>
                <div>
                    <h4>Страна</h4>
                    <Input.Select
                        name="selectCountry"
                        options={countriesAsOptions}
                        defaultOption={DEFAULT_COUNTRY_OPTION}
                        classNameTitle={cl.filterSelect}
                        classNameOptions={cl.countryOptions}
                        width={14}
                        height={12}
                    />
                </div>
                {/* <div>
                    <h4>Минимальный заказ</h4>
                    <Input.Text className={cl.filterInput}
                     placeholder=""/>
                </div> */}
                <div className={cl.doubleInputsContainer}>
                    <h4>Цена, ₽</h4>
                    <InputDoubleText 
                    name={INPUT_DOUBLE_TEXT_NAME}
                    placeholder={INPUT_DOUBLE_TEXT_PLACEHOLDER}
                    />
                </div>
            </form>
        </div>
    )
}
