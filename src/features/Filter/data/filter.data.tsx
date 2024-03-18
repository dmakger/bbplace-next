import { IDoubleTextInputOption } from "@/shared/ui/Input/DoubleText/model/doubleText.model"
import { IDoubleTextInputs } from "../model/filter.model"
import { InputDoubleText } from "@/shared/ui/Input/DoubleText"

export const DEFAULT_COUNTRY_OPTION = {id: -1, name: 'Все страны'}

export const INPUT_DOUBLE_TEXT_PRICE_NAME: IDoubleTextInputOption = {
    first: 'firstPrice',
    second: 'secondPrice'
}

export const INPUT_DOUBLE_TEXT_QUANTITY_NAME: IDoubleTextInputOption = {
    first: 'firstQuantity',
    second: 'secondQuantity'
}

export const INPUT_DOUBLE_TEXT_DEADLINE_NAME: IDoubleTextInputOption = {
    first: 'firstDeadline',
    second: 'secondDeadline'
}

export const INPUT_DOUBLE_TEXT_PLACEHOLDER: IDoubleTextInputOption = {
    first: 'От',
    second: 'До'
}

export const INPUTS_DOUBLE_TEXT_ARRAY: IDoubleTextInputs[] = [
    {
        title: 'Цена, ₽',
        input: <InputDoubleText
            name={INPUT_DOUBLE_TEXT_PRICE_NAME}
            placeholder={INPUT_DOUBLE_TEXT_PLACEHOLDER}
        />
    },
    {
        title: 'Количество, шт.',
        input: <InputDoubleText
            name={INPUT_DOUBLE_TEXT_QUANTITY_NAME}
            placeholder={INPUT_DOUBLE_TEXT_PLACEHOLDER}
        />
    },
    {
        title: 'Срок изготовления, дн.',
        input: <InputDoubleText
            name={INPUT_DOUBLE_TEXT_DEADLINE_NAME}
            placeholder={INPUT_DOUBLE_TEXT_PLACEHOLDER}
        />
    }
]