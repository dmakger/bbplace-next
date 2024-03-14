import { DASHBOARD_PAGES } from "@/config/pages-url.config";

import FavoriteSVG from '@/shared/assets/img/favorite.svg'
import ChatSVG from '@/shared/assets/img/chat.svg'
import { IIconVariants } from "@/shared/model/icon.model";


// ===={ DASHBOARD MENU DATA }====

export const FAVORITES_WOT_ITEM_MENU_DATA: IIconVariants = {
    id: 1,
    link: DASHBOARD_PAGES.FAVORITE,
    image: FavoriteSVG,
}

export const CHATS_WOT_ITEM_MENU_DATA: IIconVariants = {
    id: 2,
    link: DASHBOARD_PAGES.CHATS,
    image: ChatSVG,
}


// DATA WITHOUT TITLE
export const DASHBOARD_WOT_MENU_DATA: IIconVariants[] = [
    FAVORITES_WOT_ITEM_MENU_DATA,
    CHATS_WOT_ITEM_MENU_DATA,
]



// ===={ DASHBOARD WITH TITLE MENU DATA }====

export const FAVORITES_WT_ITEM_MENU_DATA: IIconVariants = {
    title: 'Избранное',
    ...FAVORITES_WOT_ITEM_MENU_DATA
}

export const CHATS_WT_ITEM_MENU_DATA: IIconVariants = {
    title: 'Чат',
    ...CHATS_WOT_ITEM_MENU_DATA
}


// DATA WITH TITLE
export const DASHBOARD_WT_MENU_DATA: IIconVariants[] = [
    FAVORITES_WT_ITEM_MENU_DATA,
    CHATS_WT_ITEM_MENU_DATA,
]