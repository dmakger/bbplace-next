import { IOption } from "@/shared/model/option.model"

// ===={ ENUM }==== 
export enum SwitchSelectorFavourite {
    Product = 'product',
    Purchase = 'purchase',
    Sale = 'sale',
    Supplier = 'supplier',
}


// ===={ OPTION }====
export const SWITCH_SELECTOR__PRODUCT_FAVOURITE__OPTION: IOption = {
    id: 13,
    name: 'Товары',
    value: SwitchSelectorFavourite.Product,
}

export const SWITCH_SELECTOR__PURCHASE_TENDER_FAVOURITE__OPTION: IOption = {
    id: 14,
    name: 'Покупка',
    value: SwitchSelectorFavourite.Purchase,
    caption: 'Тендер'
}

export const SWITCH_SELECTOR__SALE_TENDER_FAVOURITE__OPTION: IOption = {
    id: 15,
    name: 'Продажа',
    value: SwitchSelectorFavourite.Sale,
    caption: 'Тендер'
}

export const SWITCH_SELECTOR__SUPPLIER_FAVOURITE__OPTION: IOption = {
    id: 16,
    name: 'Поставщики',
    value: SwitchSelectorFavourite.Supplier,
}


// ===={ LIST }====
export const SWITCH_SELECTOR__FAVOURITE__OPTIONS: IOption[] = [
    SWITCH_SELECTOR__PRODUCT_FAVOURITE__OPTION,
    SWITCH_SELECTOR__PURCHASE_TENDER_FAVOURITE__OPTION,
    SWITCH_SELECTOR__SALE_TENDER_FAVOURITE__OPTION,
    // SWITCH_SELECTOR__SUPPLIER_FAVOURITE__OPTION,
]