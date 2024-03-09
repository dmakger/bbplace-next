import { IMenuItem } from "@/shared/model/menu.model";
import { CHATS_WT_MENU_DATA, FAVORITES_WT_MENU_DATA } from "./dashboard.menu.data";
import { DASHBOARD_PAGES, MAIN_PAGES } from "@/config/pages-url.config";

import LogoSVG from '@/shared/assets/img/logo.svg'
import CatalogSVG from '@/shared/assets/img/catalog.svg'
import LkSVG from '@/shared/assets/img/lk.svg'


// ===={ MOBILE MENU DATA }====

export const MAIN_MENU_DATA: IMenuItem = {
    link: MAIN_PAGES.HOME,
    title: "Главная",
    image: LogoSVG,
}

export const CATALOG_MENU_DATA: IMenuItem = {
    link: MAIN_PAGES.CATALOG,
    title: "Каталог",
    image: CatalogSVG,
}

export const DASHBOARD_MENU_DATA: IMenuItem = {
    link: DASHBOARD_PAGES.HOME,
    title: "ЛК",
    image: LkSVG,
}


// DATA WITHOUT TITLE
export const MOBILE_MENU_DATA: IMenuItem[] = [
    MAIN_MENU_DATA,
    CATALOG_MENU_DATA,
    FAVORITES_WT_MENU_DATA,
    CHATS_WT_MENU_DATA,
    DASHBOARD_MENU_DATA,
]
