import { CORE_PARAMS } from "@/config/params/core.params.config"
import { IOption } from "@/shared/model/option.model"

// ==={ COUNTRY_FILTER }===

export const DEFAULT_COUNTRY_OPTION: IOption = {
    id: -1,
    name: CORE_PARAMS.FILTER_VALUES.COUNTRY.DEFAULT,
}

// ==={ STATUS_FILTER }===

export const DEFAULT_STATUS_OPTION: IOption = {
    id: -1,
    name: CORE_PARAMS.FILTER_VALUES.STATUS.DEFAULT,
}

export const IN_STOCK_STATUS_OPTION: IOption = {
    id: 0,
    name: CORE_PARAMS.FILTER_VALUES.STATUS.IN_STOCK,
}

export const READY_TO_SEND_STATUS_OPTION: IOption = {
    id: 1,
    name: CORE_PARAMS.FILTER_VALUES.STATUS.READY_TO_SEND,
}

export const BY_ORDER_STATUS_OPTION: IOption = {
    id: 2,
    name: CORE_PARAMS.FILTER_VALUES.STATUS.BY_ORDER,
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
    name: CORE_PARAMS.FILTER_VALUES.CATEGORY.DEFAULT,
}

// ==={ APPLICATION_FILTER }===

export const DEFAULT_APPLICATION_OPTION: IOption = {
    id: 0,
    name: CORE_PARAMS.FILTER_VALUES.APPLICATION.DEFAULT,
}

export const SELL_APPLICATION_OPTION: IOption = {
    id: 1,
    name: CORE_PARAMS.FILTER_VALUES.APPLICATION.SELL,
}

export const PURCHASE_APPLICATION_OPTION: IOption = {
    id: 2,
    name: CORE_PARAMS.FILTER_VALUES.APPLICATION.PURCHASE,
}

export const APPLICATION_OPTIONS: IOption[] = [
    DEFAULT_APPLICATION_OPTION,
    SELL_APPLICATION_OPTION,
    PURCHASE_APPLICATION_OPTION
]

