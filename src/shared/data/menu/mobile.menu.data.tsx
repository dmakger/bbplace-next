import { DASHBOARD_PAGES, MAIN_PAGES } from "@/config/pages-url.config";
import { IIconVariants } from "@/shared/model/icon.model"
import { CatalogSVGIcon, ChatsSVGIcon, FavouriteSVGIcon, LKSVGIcon, LogoSVGIcon } from "../icons.data";

export const MAIN_ITEM_MOBILE_MENU_DATA: IIconVariants = {
    id: 1,
    link: MAIN_PAGES.HOME,
    title: "Главная",
    image: <LogoSVGIcon />
}
  
  export const CATALOG_ITEM_MOBILE_MENU_DATA: IIconVariants = {
    id: 2,
    link: MAIN_PAGES.CATALOG,
    title: "Каталог",
    image: <CatalogSVGIcon/>,
  }
  
  export const DASHBOARD_ITEM_MOBILE_MENU_DATA: IIconVariants = {
    id: 3,
    link: DASHBOARD_PAGES.CHATS,
    title: "Чат",
    image: <ChatsSVGIcon />,
  }
  
  export const FAVORITE_ITEM_MOBILE_MENU_DATA: IIconVariants = {
    id: 4,
    link: DASHBOARD_PAGES.FAVORITE,
    title: "Избранное",
    image: <FavouriteSVGIcon/>,
  }
  
  export const LK_ITEM_MOBILE_MENU_DATA: IIconVariants = {
    id: 5,
    link: DASHBOARD_PAGES.PROFILE_EDIT,
    title: "ЛК",
    image: <LKSVGIcon />,
}

  export const MOBILE_MENU_DATA: IIconVariants[] = [
    MAIN_ITEM_MOBILE_MENU_DATA,
    CATALOG_ITEM_MOBILE_MENU_DATA,
    DASHBOARD_ITEM_MOBILE_MENU_DATA,
    FAVORITE_ITEM_MOBILE_MENU_DATA,
    LK_ITEM_MOBILE_MENU_DATA,
  ]
