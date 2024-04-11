import { IOption } from "@/shared/model/option.model";

export const PRODUCT_PTC_ITEM_DATA: IOption = {id: 1, name: "Товары"}
export const TENDER_PTC_ITEM_DATA: IOption = {id: 2, name: "Тендеры"}
export const SUPPLIERS_PTC_ITEM_DATA: IOption = {id: 3, name: "Поставщики"}

export const PTC_LIST_DATA: IOption[] = [
    PRODUCT_PTC_ITEM_DATA,
    TENDER_PTC_ITEM_DATA,
    SUPPLIERS_PTC_ITEM_DATA
]