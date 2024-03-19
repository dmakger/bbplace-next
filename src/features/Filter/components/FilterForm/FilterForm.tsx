import cl from './_FilterForm.module.scss'
import Input from "@/shared/ui/Input/Input"
import { ChangeEvent, RefObject } from "react"
import { IOption } from '@/shared/model/option.model'
import { cls } from '@/shared/lib/classes.lib'
import { DEFAULT_COUNTRY_OPTION, DEFAULT_STATUS_OPTION, STATUS_OPTIONS } from '../../data/filter.data'

interface IFilterForm {
    isFiltersOpen: boolean,
    inputListRef: RefObject<HTMLFormElement>,
    onChange: (e: ChangeEvent<HTMLFormElement>) => void,
    countriesAsOptions: IOption[]
}

export function FilterForm ({
    isFiltersOpen,
    inputListRef,
    onChange,
    countriesAsOptions
}: IFilterForm) {
    return (
        <form ref={inputListRef} className={cls(cl.inputsList, isFiltersOpen ? cl.withMarginTop : '')} onChange={onChange}>
            <div className={cl.inputsContainer}>
                <h4>Страна</h4>
                <Input.TextAndSelect
                    listOptions={countriesAsOptions}
                    defaultOption={DEFAULT_COUNTRY_OPTION}
                    classNameOptions={cl.countryOptions}
                    imageWidth={14}
                    imageHeight={12}
                    name='selectCountry'
                />
            </div>
            <div className={cl.inputsContainer}>
                <h4>Статус товара</h4>
                <Input.Select
                    name="selectStatus"
                    options={STATUS_OPTIONS}
                    defaultOption={DEFAULT_STATUS_OPTION}
                    classNameTitle={cl.filterSelect}
                    classNameOptions={cl.countryOptions}
                    width={14}
                    height={12}
                />
            </div>
            <div className={cl.inputsContainer}>
                <h4>Минимальный заказ</h4>
                <Input.Text
                    name="minOrder"
                    type='number'
                    className={cl.filterInput}
                    placeholder='Введите число мин заказа'
                />
            </div>
        </form>
    )
}
