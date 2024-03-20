import cl from './_FilterForm.module.scss'
import Input from "@/shared/ui/Input/Input"
import { ChangeEvent, RefObject } from "react"
import { IOption } from '@/shared/model/option.model'
import { cls } from '@/shared/lib/classes.lib'
import { DEFAULT_COUNTRY_OPTION, DEFAULT_STATUS_OPTION, STATUS_OPTIONS } from '../../data/filter.data'
import { IFilterValues } from '../../model/filter.model'

interface IFilterForm {
    isFiltersOpen: boolean,
    inputListRef: RefObject<HTMLFormElement>,
    onChange: (e: ChangeEvent<HTMLFormElement>) => void,
    countriesAsOptions: IOption[],
    selectedCountry: IOption,
    setSelectedCountry: Function,
    minOrder: string,
    setMinOrder: Function,
    status: IOption, 
    setStatus: Function,
    setFilter:Function,
    filterValues: IFilterValues,
    setFilterValues: Function
}

export function FilterForm ({
    isFiltersOpen,
    inputListRef,
    onChange,
    countriesAsOptions,
    selectedCountry,
    setSelectedCountry,
    minOrder,
    setMinOrder,
    status,
    setStatus,
    setFilter,
    filterValues,
    setFilterValues
}: IFilterForm) {
    
    return (
        <form ref={inputListRef} className={cls(cl.inputsList, isFiltersOpen ? cl.withMarginTop : '')} onChange={onChange}>
            <div className={cl.inputsContainer}>
                <h4>Страна</h4>
                <Input.TextAndSelect
                    listOptions={countriesAsOptions}
                    defaultOption={selectedCountry}
                    classNameOptions={cl.countryOptions}
                    imageWidth={14}
                    imageHeight={12}
                    name='selectCountry'
                    onClickOption={setSelectedCountry}
                />
            </div>
            <div className={cl.inputsContainer}>
                <h4>Статус товара</h4>
                <Input.Select
                    name="selectStatus"
                    options={STATUS_OPTIONS}
                    defaultOption={status}
                    classNameTitle={cl.filterSelect}
                    classNameOptions={cl.countryOptions}
                    width={14}
                    height={12}
                    onClickOption={setStatus}
                />
            </div>
            <div className={cl.inputsContainer}>
                <h4>Минимальный заказ</h4>
                <Input.Text
                    value={minOrder}
                    name="minOrder"
                    type='number'
                    className={cl.filterInput}
                    placeholder='Введите число мин заказа'
                    onChange={setMinOrder}
                />
            </div>
        </form>
    )
}
