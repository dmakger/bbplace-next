import { DASHBOARD_PAGES, MAIN_PAGES } from "@/config/pages-url.config"
import { IMenuItem } from "@/shared/model/menu.model"
import { EMenuButtonVariant, IMenuButton } from "@/shared/ui/Button/model/button.model"

//LK
export const HOME_LK_ITEM_MENU_DATA: IMenuItem = {
    link: DASHBOARD_PAGES.HOME.path,
    title: "В профиль покупателя",
}

export const NOTIFICATION_ITEM_LK_MENU_DATA: IMenuItem = {
    link: DASHBOARD_PAGES.CHATS(undefined).path,
    title: "Уведомления",
}

export const SUPPORT_LK_ITEM_MENU_DATA: IMenuItem = {
    link: MAIN_PAGES.SUPPORT.path,
    title: "Поддержка",
}

export const BUYER_HOME_LK_MENU_DATA:  IMenuItem = {
    link: DASHBOARD_PAGES.HOME.path,
    title: "В профиль покупателя",
}

export const SELLER_HOME_LK_MENU_DATA: IMenuItem = {
    link: DASHBOARD_PAGES.HOME.path,
    title: "В профиль продавца",
}

export const REVIEWS_LK_MENU_DATA: IMenuItem = {
    link: DASHBOARD_PAGES.REVIEWS.path,
    title: 'Отзывы',
}

export const FAVOURITES_LK_MENU_DATA: IMenuItem = {
    link: DASHBOARD_PAGES.FAVOURITES.path,
    title: 'Избранное',
}


//LANG
export const LANG_EN_LK_ITEM_MENU_DATA: IMenuButton = {
    title: 'In English',
    variant: EMenuButtonVariant.LOCALIZATION
}

export const LANG_RUS_LK_ITEM_MENU_DATA: IMenuButton = {
    title: 'Русский язык',
    variant: EMenuButtonVariant.LOCALIZATION
}

//PROFILE_BUTTONS
export const PROFILE_BUTTONS_LK_ITEM_MENU_DATA: IMenuButton = {
    variant: EMenuButtonVariant.PROFILE_BUTTONS
}


export const LK_MENU_DATA: IMenuItem[] | IMenuButton[] = [
    // NOTIFICATION_ITEM_LK_MENU_DATA,
    SUPPORT_LK_ITEM_MENU_DATA,
    LANG_EN_LK_ITEM_MENU_DATA,
    PROFILE_BUTTONS_LK_ITEM_MENU_DATA
]

//TENDER
export const MY_TENDERS_ITEM_MENU_DATA: IMenuItem = {
    link: DASHBOARD_PAGES.TENDERS.path,
    title: "Мои тендеры",
}

export const NEW_TENDER_ITEM_MENU_DATA: IMenuItem = {
    link: DASHBOARD_PAGES.NEW_TENDER.path,
    title: "Добавить тендер",
}

export const TENDER_DROPDOWN_MENU_DATA: IMenuItem[] = [
    MY_TENDERS_ITEM_MENU_DATA,
    NEW_TENDER_ITEM_MENU_DATA
]

//PRODUCT
export const MY_PRODUCTS_ITEM_MENU_DATA: IMenuItem = {
    link: DASHBOARD_PAGES.PRODUCTS.path,
    title: "Мои товары",
}

export const NEW_PRODUCT_ITEM_MENU_DATA: IMenuItem = {
    link: DASHBOARD_PAGES.NEW_PRODUCT.path,
    title: "Добавить товар",
}

export const PRICES_N_DISCOUNTS_ITEM_MENU_DATA: IMenuItem = {
    link: DASHBOARD_PAGES.PRICES_N_DISCOUNTS.path,
    title: "Цены и скидки",
}

export const PRODUCT_DROPDOWN_MENU_DATA: IMenuItem[] = [
    MY_PRODUCTS_ITEM_MENU_DATA,
    NEW_PRODUCT_ITEM_MENU_DATA,
    PRICES_N_DISCOUNTS_ITEM_MENU_DATA
]
