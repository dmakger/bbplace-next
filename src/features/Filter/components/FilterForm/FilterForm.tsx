import cl from './_FilterForm.module.scss'
import Input from "@/shared/ui/Input/Input"
import { ChangeEvent, FC, RefObject } from "react"
import { DEFAULT_COUNTRY_OPTION, INPUTS_DOUBLE_TEXT_ARRAY } from '../../data/filter.data'
import { IOption } from '@/shared/model/option.model'

interface IFilterFormProps {
    inputListRef: RefObject<HTMLFormElement>,
    onChange: (e: ChangeEvent<HTMLFormElement>) => void,
    countriesAsOptions: IOption[]

}

export const FilterForm: FC<IFilterFormProps> = ({
    inputListRef,
    onChange,
    countriesAsOptions
}) => {
    return (
        <form ref={inputListRef} className={cl.inputsList} onChange={onChange}>
            <div className={cl.doubleInputsContainer}>
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
            {INPUTS_DOUBLE_TEXT_ARRAY.map(it => (
                <div className={cl.doubleInputsContainer} key={it.title}>
                    <h4>{it.title}</h4>
                    {it.input}
                </div>
            ))}
        </form>
    )
}
