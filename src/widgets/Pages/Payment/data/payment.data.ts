import { IOption } from "@/shared/model/option.model";

const PAYMENT_BY_CARD_OPTION: IOption = {
    id: 1,
    name: 'Банковская карточка'
}

// const PAYMENT_BY_CARD_OPTION: IOption = {
//     id: 2,
//     name: 'Банковской карточкой'
// }

export const PAYMENT_METHOD_OPTIONS_ARRAY: IOption[] = [
    PAYMENT_BY_CARD_OPTION
]