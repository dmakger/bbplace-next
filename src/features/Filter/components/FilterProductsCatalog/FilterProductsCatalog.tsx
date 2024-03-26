import cl from './_FilterProductsCatalog.module.scss'
import { IOption } from '@/shared/model/option.model'
import { STATUS_OPTIONS } from '../../data/filter.data'
import { RefObject } from 'react'
import { cls } from '@/shared/lib/classes.lib'
import { FilterCountryOrCategoryInput, FilterMinOrderInput, FilterStatusOrApplicationInput } from '../FilterInputs'

interface IFilterProductsCatalog {
    isFiltersOpen: boolean,
    countryListOptions: IOption[],
    countryDefaultOption: IOption,
    countryOnClickOption: Function,
    statusDefaultOption: IOption,
    statusOnClickOption: Function,
    minOrderDefaultValue: string,
    minOrderOnChange: Function,
    inputListRef: RefObject<HTMLDivElement>,
}

export const FilterProductsCatalog = ({
    isFiltersOpen,
    countryListOptions,
    countryDefaultOption,
    countryOnClickOption,
    statusDefaultOption,
    statusOnClickOption,
    minOrderDefaultValue,
    minOrderOnChange,
    inputListRef
}: IFilterProductsCatalog) => {
    return (
        <div ref={inputListRef} className={cls(cl.FilterProductsCatalog, isFiltersOpen ? cl.withMarginTop : '')}>
            <FilterCountryOrCategoryInput
                title='Страна'
                defaultOption={countryDefaultOption}
                listOptions={countryListOptions}
                onClickOption={countryOnClickOption}
            />
            <FilterStatusOrApplicationInput
                title='Статус товара'
                listOptions={STATUS_OPTIONS}
                defaultOption={statusDefaultOption}
                onClickOption={statusOnClickOption}
            />
            <FilterMinOrderInput
                minOrderDefaultValue={minOrderDefaultValue}
                minOrderOnChange={minOrderOnChange}
            />
        </div>
    )
}

