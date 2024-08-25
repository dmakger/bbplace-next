import { IOption } from "@/shared/model/option.model";

export const PRODUCT_PTC_ITEM_DATA: IOption = {id: 1, name: "Товары", value: 'products' }
export const TENDER_PTC_ITEM_DATA: IOption = {id: 2, name: "Тендеры", value: 'tenders'}
export const COMPANY_PTC_ITEM_DATA: IOption = {id: 3, name: "Поставщики", value: 'suppliers'}

export const PTC_LIST_DATA: IOption[] = [
    PRODUCT_PTC_ITEM_DATA,
    TENDER_PTC_ITEM_DATA,
    COMPANY_PTC_ITEM_DATA,
]