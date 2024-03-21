import { RefObject } from 'react'
import cl from './_FilterCompaniesCatalog.module.scss'
import Input from '@/shared/ui/Input/Input'
import { IOption } from '@/shared/model/option.model'
import { cls } from '@/shared/lib/classes.lib'

interface IFilterCompaniesCatalog {
    isFiltersOpen: boolean,
    inputListRef: RefObject<HTMLDivElement>,
    categoryDefaultOption: IOption,
    categoryListOptions: IOption[],
    categoryOnClickOption: Function,
    countryListOptions: IOption[],
    countryDefaultOption: IOption,
    countryOnClickOption: Function,
    minOrderDefaultValue: string,
    minOrderOnChange: Function,
}

export const FilterCompaniesCatalog = ({
    isFiltersOpen,
    inputListRef,
    categoryDefaultOption,
    categoryListOptions,
    categoryOnClickOption,
    countryListOptions,
    countryDefaultOption,
    countryOnClickOption,
    minOrderDefaultValue,
    minOrderOnChange,

}: IFilterCompaniesCatalog) => {
    return (
        <div ref={inputListRef} className={cls(cl.FilterCompaniesCatalog, isFiltersOpen ? cl.withMarginTop : '')}>
            <div className={cl.inputsContainer}>
                <h4>Категория</h4>
                 <Input.TextAndSelect
                    listOptions={categoryListOptions}
                    defaultOption={categoryDefaultOption}
                    classNameOptions={cl.filterOptions}
                    imageWidth={14}
                    imageHeight={12}
                    name='selectCategory'
                    onClickOption={categoryOnClickOption}
                />
            </div>
            <div className={cl.inputsContainer}>
                <h4>Страна</h4>
                <Input.TextAndSelect
                    listOptions={countryListOptions}
                    defaultOption={countryDefaultOption}
                    classNameOptions={cl.filterOptions}
                    imageWidth={14}
                    imageHeight={12}
                    name='selectCountry'
                    onClickOption={countryOnClickOption}
                />
            </div>
            <div className={cl.inputsContainer}>
                <h4>Минимальный заказ от</h4>
                <Input.Text
                    defaultValue={minOrderDefaultValue}
                    name="minOrder"
                    type='number'
                    className={cl.filterInput}
                    placeholder='Введите число'
                    onChange={minOrderOnChange}
                />
            </div>
        </div>
    )
}

