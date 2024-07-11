import { DASHBOARD_PAGES, MAIN_PAGES } from "@/config/pages-url.config";

import { IIconVariants } from "@/shared/model/icon.model";
import { ARROW_WLINE_TERTIARY_ICON } from "@/shared/ui/Icon/data/arrow.data.icon";
import { SUPPORT_ICON } from "@/shared/ui/Icon/data/support.data.icon";
import { LOGO_ICON } from "@/shared/ui/Icon/data/logo.data.icon";
import { LK_ICON } from "@/shared/ui/Icon/data/lk.data.icon";
import { CATALOG_ICON } from "@/shared/ui/Icon/data/catalog.data.icon";


// ===={ MOBILE MENU DATA }====

export const MAIN_ITEM_MENU_DATA: IIconVariants = {
    id: 1,
    link: MAIN_PAGES.HOME,
    title: "Главная",
    image: LOGO_ICON,
}

export const CATALOG_ITEM_MENU_DATA: IIconVariants = {
    id: 2,
    link: MAIN_PAGES.CATALOG,
    title: "Каталог",
    image: CATALOG_ICON,
}

export const DASHBOARD_ITEM_MENU_DATA: IIconVariants = {
    id: 3,
    link: DASHBOARD_PAGES.HOME,
    title: "ЛК",
    image: LK_ICON,
}

export const BACK_ITEM_MENU_DATA: IIconVariants = {
    id: 6,
    link: MAIN_PAGES.HOME,
    title: 'Назад',
    image: ARROW_WLINE_TERTIARY_ICON
}

export const SUPPORT_ITEM_MENU_DATA: IIconVariants = {
    id: 7,
    link: MAIN_PAGES.LOGIN,
    title: 'Поддержка',
    image: SUPPORT_ICON 
}


// // DATA WITHOUT TITLE
export const MOBILE_MENU_DATA: IIconVariants[] = [
    MAIN_ITEM_MENU_DATA,
    CATALOG_ITEM_MENU_DATA,
    // FAVORITES_WT_ITEM_MENU_DATA,
    // CHATS_WT_ITEM_MENU_DATA,
    DASHBOARD_ITEM_MENU_DATA,
]


//NOT_AUTH_DATA
export const NOT_AUTH_MOBILE_DATA: IIconVariants[] = [
    BACK_ITEM_MENU_DATA,
    MAIN_ITEM_MENU_DATA,
    SUPPORT_ITEM_MENU_DATA
]