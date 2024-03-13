import { MAIN_PAGES } from "@/config/pages-url.config";
import { IMenuItem } from "@/shared/model/menu.model";

import ProductSVG from '@/shared/assets/img/product.svg'
import TenderSVG from '@/shared/assets/img/tender.svg'
import CompanySVG from '@/shared/assets/img/company.svg'


// ===={ MENU DATA }====

export const PRODUCTS_ITEM_MENU_DATA: IMenuItem = {
    link: MAIN_PAGES.PRODUCTS,
    title: "Товары",
    image: ProductSVG,
}

export const TENDERS_ITEM_MENU_DATA: IMenuItem = {
    link: MAIN_PAGES.TENDERS,
    title: "Тендеры",
    image: TenderSVG,
}

export const COMPANIES_ITEM_MENU_DATA: IMenuItem = {
    link: MAIN_PAGES.COMPANIES,
    title: "Поставщики",
    image: CompanySVG,
}


// DATA
export const MENU_DATA: IMenuItem[] = [
    PRODUCTS_ITEM_MENU_DATA,
    TENDERS_ITEM_MENU_DATA,
    COMPANIES_ITEM_MENU_DATA,
]
