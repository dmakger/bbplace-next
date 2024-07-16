import { DASHBOARD_PAGES, MAIN_PAGES } from "@/config/pages-url.config";
import { IIconVariants } from "@/shared/model/icon.model";
import { IMenuItem } from '../../../shared/model/menu.model';

import { ARROW_WLINE_TERTIARY_MOBILE_ICON } from '../../../shared/ui/Icon/data/arrow.data.icon';
import { SUPPORT_MENU_ICON } from '../../../shared/ui/Icon/data/support.data.icon';
import { LOGO_ICON } from '../../../shared/ui/Icon/data/logo.data.icon';
import { CATALOG_ICON } from "../../../shared/ui/Icon/data/catalog.data.icon";
import { CHAT_ICON } from '../../../shared/ui/Icon/data/chat.data.icon';
import { LK_ICON } from '../../../shared/ui/Icon/data/lk.data.icon';
import { FAVOURITE_ICON_MENU } from '../../../shared/ui/Icon/data/favourite.data.icon';

export const MAIN_ITEM_MOBILE_MENU_DATA: IIconVariants = {
  id: 1,
  link: MAIN_PAGES.HOME,
  title: "Главная",
  image: LOGO_ICON,
}

export const CATALOG_ITEM_MOBILE_MENU_DATA: IIconVariants = {
  id: 2,
  link: MAIN_PAGES.CATALOG,
  title: "Каталог",
  image: CATALOG_ICON
}

export const DASHBOARD_ITEM_MOBILE_MENU_DATA: IIconVariants = {
  id: 3,
  link: DASHBOARD_PAGES.CHATS,
  title: "Чат",
  image: CHAT_ICON
}

export const FAVORITE_ITEM_MOBILE_MENU_DATA: IIconVariants = {
  id: 4,
  link: DASHBOARD_PAGES.FAVORITE,
  title: "Избранное",
  image: FAVOURITE_ICON_MENU
}

export const LK_ITEM_MOBILE_MENU_DATA: IIconVariants = {
  id: 5,
  link: DASHBOARD_PAGES.HOME,
  title: "ЛК",
  image: LK_ICON
}

export const BACK_ITEM_MENU_DATA: IIconVariants = {
  id: 6,
  link: MAIN_PAGES.HOME,
  title: 'Назад',
  image: ARROW_WLINE_TERTIARY_MOBILE_ICON
}

export const SUPPORT_ITEM_MENU_DATA: IIconVariants = {
  id: 7,
  link: MAIN_PAGES.SUPPORT,
  title: 'Поддержка',
  image: SUPPORT_MENU_ICON 
}


export const MOBILE_MENU_DATA: IIconVariants[] = [
  MAIN_ITEM_MOBILE_MENU_DATA,
  CATALOG_ITEM_MOBILE_MENU_DATA,
  DASHBOARD_ITEM_MOBILE_MENU_DATA,
  FAVORITE_ITEM_MOBILE_MENU_DATA,
  LK_ITEM_MOBILE_MENU_DATA,
]

// //NOT_AUTH_DATA
export const NOT_AUTH_MOBILE_DATA: IMenuItem[] = [
  BACK_ITEM_MENU_DATA,
  MAIN_ITEM_MOBILE_MENU_DATA,
  SUPPORT_ITEM_MENU_DATA
]
