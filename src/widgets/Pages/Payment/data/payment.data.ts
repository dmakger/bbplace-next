import { IOption } from "@/shared/model/option.model";

//PAYMENT_METHOD

export const PAYMENT_BY_CARD_OPTION: IOption = {
    id: 1,
    name: 'Банковская карточка'
}

export const PAYMENT_BY_PAYMENT_ACCOUNT_OPTION: IOption = {
    id: 2,
    name: 'Расчётный счёт'
}

export const PAYMENT_METHOD_OPTIONS_ARRAY: IOption[] = [
    PAYMENT_BY_CARD_OPTION,
    PAYMENT_BY_PAYMENT_ACCOUNT_OPTION
]

//PAYMENT_CURRENCY

const PAYMENT_RUB_CURRENCY_OPTION: IOption = {
    id: 1,
    name: 'RUB'
}

const PAYMENT_BYN_CURRENCY_OPTION: IOption = {
    id: 2,
    name: 'BYN'
}

const PAYMENT_NYC_CURRENCY_OPTION: IOption = {
    id: 3,
    name: 'NYC'
}

export const PAYMENT_CURRENCY_OPTIONS_ARRAY: IOption[] = [
    PAYMENT_RUB_CURRENCY_OPTION,
    PAYMENT_BYN_CURRENCY_OPTION,
    PAYMENT_NYC_CURRENCY_OPTION
]

//ERRORS_MESSAGE
export const TARIFFS_TYPE_ERRORS_MESSAGE = 'Выберите тарифный план';
export const TARIFFS_DURATION_ERRORS_MESSAGE = 'Выберите длительность тарифного плана';

export const PAYMENT_METHOD_ERRORS_MESSAGE = 'Выберите способ оплаты';
export const PAYMENT_CURRENCY_ERRORS_MESSAGE = 'Выберите валюту';
