import cl from './_FilterForm.module.scss'
import Input from "@/shared/ui/Input/Input"
import { ChangeEvent, FC, RefObject } from "react"
import { IOption } from '@/shared/model/option.model'
import { cls } from '@/shared/lib/classes.lib'
import { DEFAULT_COUNTRY_OPTION, DEFAULT_STATUS_OPTION, STATUS_OPTIONS } from '../../data/filter.data'
import { TextAndSelectInput } from '@/shared/ui/Input/TextAndSelect'

interface IFilterFormProps {
    isFiltersOpen: boolean,
    inputListRef: RefObject<HTMLFormElement>,
    onChange: (e: ChangeEvent<HTMLFormElement>) => void,
    countriesAsOptions: IOption[]
}

export const FilterForm: FC<IFilterFormProps> = ({
    isFiltersOpen,
    inputListRef,
    onChange,
    countriesAsOptions
}) => {
    return (
        <form ref={inputListRef} className={cls(cl.inputsList, isFiltersOpen ? cl.withMarginTop : '')} onChange={onChange}>
            <div className={cl.inputsContainer}>
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

            <div className={cl.inputsContainer}>
                <h4>Страна</h4>
                <TextAndSelectInput
                    listOptions={countriesAsOptions}
                    defaultOption={DEFAULT_COUNTRY_OPTION}
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
                    className={cl.filterInput}
                    placeholder='Введите число мин заказа'
                />
            </div>
        </form>
    )
}
