import { IOption } from "@/shared/model/option.model"

// ==={ COUNTRY_FILTER }===

export const DEFAULT_COUNTRY_OPTION: IOption = {
    id: -1,
    name: 'Все страны'
}

// ==={ STATUS_FILTER }===

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

export const BY_ORDER_STATUS_OPTION: IOption = {
    id: 2,
    name: 'Под заказ'
}


export const STATUS_OPTIONS: IOption[] = [
    DEFAULT_STATUS_OPTION,
    IN_STOCK_STATUS_OPTION,
    READY_TO_SEND_STATUS_OPTION,
    BY_ORDER_STATUS_OPTION
]

// ==={ CATEGORY_FILTER }===


export const DEFAULT_CATEGORY_OPTION: IOption = { 
    id: -1,
    name: 'Любая'
}


// ==={ APPLICATION_FILTER }===

export const DEFAULT_APPLICATION_OPTION: IOption = {
    id: 0,
    name: 'Продажа и покупка'
}

export const SELL_APPLICATION_OPTION: IOption = {
    id: 1,
    name: 'Продажа'
}

export const PURCHASE_APPLICATION_OPTION: IOption = {
    id: 2,
    name: 'Покупка'
}

export const APPLICATION_OPTIONS: IOption[] = [
    DEFAULT_APPLICATION_OPTION,
    SELL_APPLICATION_OPTION,
    PURCHASE_APPLICATION_OPTION
]

