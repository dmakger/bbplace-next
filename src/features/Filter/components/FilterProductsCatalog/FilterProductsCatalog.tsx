import Input from '@/shared/ui/Input/Input'
import cl from './_FilterProductsCatalog.module.scss'
import { IOption } from '@/shared/model/option.model'
import { STATUS_OPTIONS } from '../../data/filter.data'
import { RefObject } from 'react'
import { cls } from '@/shared/lib/classes.lib'


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
                <h4>Статус товара</h4>
                <Input.Select
                    name="selectStatus"
                    options={STATUS_OPTIONS}
                    defaultOption={statusDefaultOption}
                    classNameOptions={cl.filterOptions}
                    width={14}
                    height={12}
                    onClickOption={statusOnClickOption}
                />
            </div>
            <div className={cl.inputsContainer}>
                <h4>Минимальный заказ</h4>
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

