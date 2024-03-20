import { IOption } from "@/shared/model/option.model"

export const DEFAULT_COUNTRY_OPTION: IOption = {
    id: -1,
    name: 'Все страны'
}

export const DEFAULT_STATUS_OPTION: IOption = {
    id: -1,
    name: 'Любой'
}

export const IN_STOCK_STATUS_OPTION: IOption = {
    id: 0,
    name: 'В наличие'
}

export const READY_TO_SEND_STATUS_OPTION: IOption = {
    id: 1,
    name: 'Готово к отправке'
}

export const BY_ORDER_STATUS_OPTION: IOption ={
    id: 2,
    name: 'Под заказ'
}


export const STATUS_OPTIONS: IOption[] = [
    DEFAULT_STATUS_OPTION,
    IN_STOCK_STATUS_OPTION,
    READY_TO_SEND_STATUS_OPTION,
    BY_ORDER_STATUS_OPTION
]


