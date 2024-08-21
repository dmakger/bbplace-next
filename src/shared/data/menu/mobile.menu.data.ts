import { DASHBOARD_PAGES, MAIN_PAGES } from "@/config/pages-url.config";

import { IIconVariants } from "@/shared/model/icon.model";
import { ARROW_WLINE_TERTIARY_MOBILE_ICON } from "@/shared/ui/Icon/data/arrow.data.icon";
import { SUPPORT_MENU_ICON } from "@/shared/ui/Icon/data/support.data.icon";
import { LOGO_ICON } from "@/shared/ui/Icon/data/logo.data.icon";
import { LK_MENU_ICON } from "@/shared/ui/Icon/data/lk.data.icon";
import { CATALOG_ICON } from "@/shared/ui/Icon/data/catalog.data.icon";
import { CHAT_ICON, CHAT_LK_ICON } from "@/shared/ui/Icon/data/chat.data.icon";
import { FAVOURITE_ICON_MENU } from "@/shared/ui/Icon/data/favourite.data.icon";
import { OFFICE_ICON } from "@/shared/ui/Icon/data/office.data.icon";
import { MENU_ICON } from "@/shared/ui/Icon/data/menu.data.icon";


// ===={ MOBILE MENU DATA }====

export const MAIN_ITEM_MOBILE_MENU_DATA: IIconVariants = {
  id: 1,
  link: MAIN_PAGES.HOME.path,
  title: "Главная",
  image: LOGO_ICON,
}

export const CATALOG_ITEM_MOBILE_MENU_DATA: IIconVariants = {
  id: 2,
  link: MAIN_PAGES.PRODUCTS.path,
  title: "Каталог",
  image: CATALOG_ICON
}

export const DASHBOARD_ITEM_MOBILE_MENU_DATA: IIconVariants = {
  id: 3,
  link: DASHBOARD_PAGES.CHATS(undefined).path,
  title: "Чат",
  image: CHAT_ICON
}

export const FAVOURITES_ITEM_MOBILE_MENU_DATA: IIconVariants = {
  id: 4,
  link: DASHBOARD_PAGES.FAVOURITES.path,
  title: "Избранное",
  image: FAVOURITE_ICON_MENU
}

export const LK_ITEM_MOBILE_MENU_DATA: IIconVariants = {
  id: 5,
  link: DASHBOARD_PAGES.HOME.path,
  title: "ЛК",
  image: LK_MENU_ICON
}

export const BACK_ITEM_MENU_DATA: IIconVariants = {
  id: 6,
  title: 'Назад',
  image: ARROW_WLINE_TERTIARY_MOBILE_ICON
}

export const SUPPORT_ITEM_MENU_DATA: IIconVariants = {
  id: 7,
  link: MAIN_PAGES.SUPPORT.path,
  title: 'Поддержка',
  image: SUPPORT_MENU_ICON
}

export const OFFICE_ITEM_MENU_DATA: IIconVariants = {
  id: 8,
  link: MAIN_PAGES.SUPPORT.path,
  title: 'Кабинет',
  image: OFFICE_ICON
}

export const MENU_ITEM_MENU_DATA: IIconVariants = {
  id: 9,
  title: 'Меню',
  image: MENU_ICON
}

export const CHAT_LK_ITEM_MENU_DATA: IIconVariants = {
  id: 10,
  link: MAIN_PAGES.SUPPORT.path,
  title: 'Чат',
  image: CHAT_LK_ICON
}


// // DATA WITHOUT TITLE
export const MOBILE_MENU_DATA: IIconVariants[] = [
  MAIN_ITEM_MOBILE_MENU_DATA,
  CATALOG_ITEM_MOBILE_MENU_DATA,
  // FAVORITES_WT_ITEM_MENU_DATA,
  // CHATS_WT_ITEM_MENU_DATA,
  DASHBOARD_ITEM_MOBILE_MENU_DATA,
  LK_ITEM_MOBILE_MENU_DATA
]


//NOT_AUTH_MENU_DATA
export const NOT_AUTH_MOBILE_DATA: IIconVariants[] = [
  BACK_ITEM_MENU_DATA,
  MAIN_ITEM_MOBILE_MENU_DATA,
  SUPPORT_ITEM_MENU_DATA
]

//LK_DATA
export const LK_MOBILE_DATA: IIconVariants[] = [
  MAIN_ITEM_MOBILE_MENU_DATA,
  // OFFICE_ITEM_MENU_DATA,
  DASHBOARD_ITEM_MOBILE_MENU_DATA,
  FAVOURITES_ITEM_MOBILE_MENU_DATA,
  MENU_ITEM_MENU_DATA
]

//SUPPORT_PAGE_DATA
export const SUPPORT_PAGE_MOBILE_DATA: IIconVariants[] = [
  BACK_ITEM_MENU_DATA,
  MAIN_ITEM_MOBILE_MENU_DATA,
  LK_ITEM_MOBILE_MENU_DATA
]