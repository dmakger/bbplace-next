import { DASHBOARD_PAGES } from "@/config/pages-url.config";
import { IIconVariants } from "@/shared/model/icon.model";
import { ChatsSVGIcon, FavouriteSVGIcon, HorizontalIcon } from "../icons.data";

export const HORIZONTAL_VIEW: IIconVariants = {
    id: 1, title: 'Horizontal', image: <HorizontalIcon />
}

// ===={ MENU DATA }====

export const DASHBOARD_ITEM_MENU_DATA: IIconVariants = {
    id: 3,
    link: DASHBOARD_PAGES.CHATS.path,
    title: "Чат",
    image: <ChatsSVGIcon />,
}

export const FAVORITE_ITEM_MENU_DATA: IIconVariants = {
    id: 4,
    link: DASHBOARD_PAGES.FAVORITE.path,
    title: "Избранное",
    image: <FavouriteSVGIcon/>,
}

export const MENU_DATA: IIconVariants[] = [
    FAVORITE_ITEM_MENU_DATA,
    DASHBOARD_ITEM_MENU_DATA,
  ]
