import { MAIN_PAGES } from "@/config/pages-url.config";
import { IMenuItem } from "@/shared/model/menu.model";

//BUYERS
export const SUPPLIERS_CATALOG_LINK_ITEM: IMenuItem = {
    link: MAIN_PAGES.SUPPLIERS.path,
    title: "База поставщиков",
}

export const BUYERS_LINK_ITEMS_ARRAY: IMenuItem[] = [
    SUPPLIERS_CATALOG_LINK_ITEM
]


//SELLERS
export const TARIFFS_LINK_ITEM: IMenuItem = {
    link: MAIN_PAGES.SUPPLIERS.path,
    title: "Тарифы",
}

export const SELLERS_LINK_ITEM_ARRAY: IMenuItem[] = [
    TARIFFS_LINK_ITEM
]

//DOCUMENTS
export const OFFERT_DOCUMENT_LINK_ITEM: IMenuItem = {
    link: MAIN_PAGES.SUPPLIERS.path,
    title: 'Публичная оферта',
}
export const DATA_PROCESSING_DOCUMENT_LINK_ITEM: IMenuItem = {
    link: MAIN_PAGES.SUPPLIERS.path,
    title: 'Обработка персональных данных',
}
export const DATA_PROCESSING_POLICY_DOCUMENT_LINK_ITEM: IMenuItem = {
    link: MAIN_PAGES.SUPPLIERS.path,
    title: 'Политика в отношении обработки персональных данных',
}

export const DOCUMENTS_LINK_ITEMS_ARRAY: IMenuItem[] = [
    DATA_PROCESSING_DOCUMENT_LINK_ITEM,
    DATA_PROCESSING_POLICY_DOCUMENT_LINK_ITEM,
    OFFERT_DOCUMENT_LINK_ITEM
]