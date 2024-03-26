import { RefObject } from 'react'
import cl from './_FilterCompaniesCatalog.module.scss'
import { IOption } from '@/shared/model/option.model'
import { cls } from '@/shared/lib/classes.lib'
import { FilterCountryOrCategoryInput, FilterMinOrderInput } from '../FilterInputs'


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
            <FilterCountryOrCategoryInput
                title='Категории'
                defaultOption={categoryDefaultOption}
                listOptions={categoryListOptions}
                onClickOption={categoryOnClickOption}
            />
            <FilterCountryOrCategoryInput
                title='Страна'
                defaultOption={countryDefaultOption}
                listOptions={countryListOptions}
                onClickOption={countryOnClickOption}
            />
            <FilterMinOrderInput
                minOrderDefaultValue={minOrderDefaultValue}
                minOrderOnChange={minOrderOnChange}
            />
        </div>
    )
}

