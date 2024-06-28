import { IOption } from "@/shared/model/option.model"

export const SWITCH_SELECTOR_DESCRIPTION_OPTION: IOption = {
    id: 1,
    name: 'Описание',
    value: 'description'
}

export const SWITCH_SELECTOR_CHARACTERISTIC_OPTION: IOption = {
    id: 2,
    name: 'Характеристики',
    value: 'characteristics'
}

export const SWITCH_SELECTOR_REVIEWS_OPTION: IOption = {
    id: 3,
    name: 'Отзывы',
    value: 'reviews'
}

export const SWITCH_SELECTOR_SUPPLIER_OPTION: IOption = {
    id: 4,
    name: 'Поставщик',
    value: 'supplier'
}

//LK_PRODUCT_PAGE

export const SWITCH_SELECTOR_CREATED_PRODUCTS_OPTION: IOption = {
    id: 5,
    name: 'Cозданные',
    value: 'active'
}

export const SWITCH_SELECTOR_WO_PRICE_PRODUCTS_OPTION: IOption = {
    id: 6,
    name: 'Без цен',
    value: 'woPrice'
}

export const SWITCH_SELECTOR_DRAFT_PRODUCTS_OPTION: IOption = {
    id: 7,
    name: 'Черновики',
    value: 'drafts'
}

export const PRODUCT_PAGE_OPTIONS_ARRAY: IOption[] = [
    SWITCH_SELECTOR_CREATED_PRODUCTS_OPTION,
    SWITCH_SELECTOR_WO_PRICE_PRODUCTS_OPTION,
    SWITCH_SELECTOR_DRAFT_PRODUCTS_OPTION
]

//TENDER

export const SWITCH_SELECTOR_PURCHASE_TENDERS_OPTION: IOption = {
    id: 8,
    name: 'Покупка',
    value: 'purchaseTenders'
}

export const SWITCH_SELECTOR_SALE_TENDERS_OPTION: IOption = {
    id: 9,
    name: 'Продажа',
    value: 'saleTenders'
}

//LK_PRODUCT_PAGE_CREATE

export const SWITCH_SELECTOR_PRODUCT_PAGE_SINGLE: IOption = {
    id: 10,
    name: 'Формой',
    value: 'single'
}

export const SWITCH_SELECTOR_PRODUCT_PAGE_MULTIPLE: IOption = {
    id: 11,
    name: 'Таблицей',
    value: 'multiple'
}

export const LK_PRODUCT_PAGE_CREATE: IOption[] = [
    SWITCH_SELECTOR_PRODUCT_PAGE_MULTIPLE,
    SWITCH_SELECTOR_PRODUCT_PAGE_SINGLE
]