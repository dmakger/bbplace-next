import { DASHBOARD_PAGES, MAIN_PAGES } from "@/config/pages-url.config";
import { IMenuItem } from "@/shared/model/menu.model";

export const FAVORITES_LK_MENU_DATA: IMenuItem = {
    link: DASHBOARD_PAGES.FAVORITE,
    title: "Избранное",
}

export const CHATS_LK_MENU_DATA: IMenuItem = {
    link: DASHBOARD_PAGES.CHATS,
    title: "Сообщения",
}

export const SUPPORT_LK_MENU_DATA: IMenuItem = {
    link: MAIN_PAGES.SUPPORT,
    title: "Поддержка",
}

export const LOGOUT_LK_MENU_DATA: IMenuItem = {
    link: MAIN_PAGES.HOME,
    title: "Выйти из аккаунта",
}

export const LK_MODAL_MENU_DATA: IMenuItem[] = [
    FAVORITES_LK_MENU_DATA,
    CHATS_LK_MENU_DATA,
    SUPPORT_LK_MENU_DATA,
    LOGOUT_LK_MENU_DATA
]