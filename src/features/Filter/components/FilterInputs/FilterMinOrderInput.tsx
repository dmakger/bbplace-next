import Input from '@/shared/ui/Input/Input'
import cl from './_FilterInputs.module.scss'
import { EInputTextType } from '@/shared/ui/Input/ui/Text/data/text.input.data'

interface IFilterMinOrderInput{
    minOrderDefaultValue: string,
    minOrderOnChange: Function
}

export const FilterMinOrderInput = ({
    minOrderDefaultValue,
    minOrderOnChange
}: IFilterMinOrderInput) => {
    return (
        <div className={cl.inputsContainer}>
                <h4>Минимальный заказ от</h4>
                <Input.Text
                    defaultValue={minOrderDefaultValue}
                    name="minOrder"
                    type={EInputTextType.Number}
                    classNameInputText={cl.filterInput}
                    placeholder='Введите число'
                    onChange={minOrderOnChange}
                />
            </div>
    )
}
