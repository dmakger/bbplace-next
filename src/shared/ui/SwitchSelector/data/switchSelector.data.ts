import { IOption } from "@/shared/model/option.model"


export enum ProductsTypeLK {
    Active = 'active',
    Draft = 'draft',
    WithoutPrice = 'woPrice',
}


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
    value: ProductsTypeLK.Active,
}

export const SWITCH_SELECTOR_WO_PRICE_PRODUCTS_OPTION: IOption = {
    id: 6,
    name: 'Без цен',
    value: ProductsTypeLK.WithoutPrice,
}

export const SWITCH_SELECTOR_DRAFT_PRODUCTS_OPTION: IOption = {
    id: 7,
    name: 'Черновики',
    value: ProductsTypeLK.Draft,
}

export const PRODUCT_PAGE_OPTIONS_ARRAY: IOption[] = [
    SWITCH_SELECTOR_CREATED_PRODUCTS_OPTION,
    // SWITCH_SELECTOR_WO_PRICE_PRODUCTS_OPTION,
    SWITCH_SELECTOR_DRAFT_PRODUCTS_OPTION
]


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

//LK_PRODUCT_PAGE_EDIT

export const SWITCH_SELECTOR_PRODUCT_EDIT_PAGE_SINGLE: IOption = {
    id: 13,
    name: 'Редактирование товара',
    value: 'single'
}

export const LK_PRODUCT_PAGE_EDIT: IOption[] = [
    SWITCH_SELECTOR_PRODUCT_EDIT_PAGE_SINGLE,
]

//LK_PRICES_N_DISCOUNTS

export const SWITCH_SELECTOR_PRICES_N_DISCOUNTS: IOption = {
    id: 12,
    name: 'Цены и скидки',
    value: 'pricesNDiscounts'
}


//LK_PROFILE_EDIT
export const SWITCH_SELECTOR_PROFILE_EDIT: IOption = {
    id: 13,
    name: 'Редактирование',
    value: 'profileEdit'
}


// CHATS
export const SWITCH_SELECTOR__CHAT__OPTION: IOption = {
    id: 17,
    name: "Чат",
    value: "chat",
}

export const LK_CHATS_PAGE: IOption[] = [
    SWITCH_SELECTOR__CHAT__OPTION,
]