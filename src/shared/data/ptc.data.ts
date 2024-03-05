import { IOption } from "@/shared/model/option.model";

export const ALL_PTC_ITEM_DATA: IOption = {id: 1, name: "Все"}
export const PRODUCT_PTC_ITEM_DATA: IOption = {id: 2, name: "Товары"}
export const TENDER_PTC_ITEM_DATA: IOption = {id: 3, name: "Тендеры"}
export const COMPANY_PTC_ITEM_DATA: IOption = {id: 4, name: "Компании"}

export const PTC_LIST_DATA: IOption[] = [
    ALL_PTC_ITEM_DATA,
    PRODUCT_PTC_ITEM_DATA,
    TENDER_PTC_ITEM_DATA,
    COMPANY_PTC_ITEM_DATA,
]