import { DASHBOARD_PAGES, MAIN_PAGES } from "@/config/pages-url.config";
import { BBP_PRESENTATION_DOCUMENT, DATA_PROCESSING_DOCUMENT, DATA_PROCESSING_POLICY_DOCUMENT, OFFERT_DOCUMENT } from "@/shared/data/documents.data";
import { IMenuItem } from "@/shared/model/menu.model";

//FOOTER_TOP

//BUYERS
export const SUPPLIERS_CATALOG_LINK_ITEM: IMenuItem = {
    link: MAIN_PAGES.SUPPLIERS.path,
    title: "База поставщиков",
}

export const PRODUCTS_CATALOG_LINK_ITEM: IMenuItem = {
    link: MAIN_PAGES.PRODUCTS.path,
    title: "Оптовый каталог поставок",
}

export const NEW_TENDER_LINK_ITEM: IMenuItem = {
    link: DASHBOARD_PAGES.NEW_TENDER.path,
    title: "Оставить заявку",
}

export const BUYERS_LINK_ITEMS_ARRAY: IMenuItem[] = [
    PRODUCTS_CATALOG_LINK_ITEM,
    SUPPLIERS_CATALOG_LINK_ITEM,
    NEW_TENDER_LINK_ITEM
]


//SELLERS
export const TRY_DEMO_MODE_LINK_ITEM: IMenuItem = {
    link: MAIN_PAGES.SUPPLIERS.path,
    title: "Попробовать демо-режим",
}

export const BANNER_ADS_LINK_ITEM: IMenuItem = {
    link: MAIN_PAGES.SUPPLIERS.path,
    title: "Баннерная реклама",
}

export const SELLING_PRODUCTS_ITEM: IMenuItem = {
    link: DASHBOARD_PAGES.PRODUCTS.path,
    title: "Продавать товары",
}

export const FIND_CLIENTS_LINK_ITEM: IMenuItem = {
    link: MAIN_PAGES.BUYERS_TENDERS.path,
    title: "Найти клиентов",
}

export const TARIFFS_LINK_ITEM: IMenuItem = {
    link: MAIN_PAGES.SUPPLIERS.path,
    title: "Тарифы",
}

export const SELLERS_LINK_ITEM_ARRAY: IMenuItem[] = [
    // TRY_DEMO_MODE_LINK_ITEM,
    // BANNER_ADS_LINK_ITEM,
    SELLING_PRODUCTS_ITEM,
    FIND_CLIENTS_LINK_ITEM,
    // TARIFFS_LINK_ITEM
]

//DOCUMENTS
export const OFFERT_DOCUMENT_LINK_ITEM: IMenuItem = {
    link: MAIN_PAGES.CURRENT_DOCUMENT(OFFERT_DOCUMENT).path,
    title: 'Публичная оферта',
}
export const DATA_PROCESSING_DOCUMENT_LINK_ITEM: IMenuItem = {
    link: MAIN_PAGES.CURRENT_DOCUMENT(DATA_PROCESSING_DOCUMENT).path,
    title: 'Обработка персональных данных',
}
export const DATA_PROCESSING_POLICY_DOCUMENT_LINK_ITEM: IMenuItem = {
    link: MAIN_PAGES.CURRENT_DOCUMENT(DATA_PROCESSING_POLICY_DOCUMENT).path,
    title: 'Политика в отношении обработки персональных данных',
}

export const BBP_PRESENTATION_DOCUMENT_LINK_ITEM: IMenuItem = {
    link: MAIN_PAGES.CURRENT_DOCUMENT(BBP_PRESENTATION_DOCUMENT).path
}

export const DOCUMENTS_LINK_ITEMS_ARRAY: IMenuItem[] = [
    DATA_PROCESSING_DOCUMENT_LINK_ITEM,
    DATA_PROCESSING_POLICY_DOCUMENT_LINK_ITEM,
    OFFERT_DOCUMENT_LINK_ITEM
]

