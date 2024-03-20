import cl from './_FilterForm.module.scss'
import Input from "@/shared/ui/Input/Input"
import { RefObject } from "react"
import { IOption } from '@/shared/model/option.model'
import { cls } from '@/shared/lib/classes.lib'
import { STATUS_OPTIONS } from '../../data/filter.data'

interface IFilterForm {
    isFiltersOpen: boolean,
    inputListRef: RefObject<HTMLDivElement>,
    countriesAsOptions: IOption[],
    selectedCountry: IOption,
    setSelectedCountry: Function,
    minOrder: string,
    setMinOrder: Function,
    status: IOption, 
    setStatus: Function,
}

export const FilterForm = ({
    isFiltersOpen,
    inputListRef,
    countriesAsOptions,
    selectedCountry,
    setSelectedCountry,
    minOrder,
    setMinOrder,
    status,
    setStatus,
}: IFilterForm) => {
    
    return (
        <div ref={inputListRef} className={cls(cl.inputsList, isFiltersOpen ? cl.withMarginTop : '')}>
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
                    defaultValue={minOrder}
                    name="minOrder"
                    type='number'
                    className={cl.filterInput}
                    placeholder='Введите число'
                    onChange={setMinOrder}
                />
            </div>
        </div>
    )
}
