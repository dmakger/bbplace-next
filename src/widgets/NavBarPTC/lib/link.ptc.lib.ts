import { MAIN_PAGES } from "@/config/pages-url.config";
import { PRODUCTS_ITEM_MENU_WEB_DATA } from "@/widgets/Menu/WEB";
import { COMPANIES_ITEM_MENU_WEB_DATA, TENDERS_ITEM_MENU_WEB_DATA } from "@/widgets/Menu/WEB/data/menu.web.data";


export const getPTCVariantByPathname = (pathname: string) => {
    if (pathname === MAIN_PAGES.TENDERS)
        return TENDERS_ITEM_MENU_WEB_DATA
    if (pathname === MAIN_PAGES.SUPPLIERS)
        return COMPANIES_ITEM_MENU_WEB_DATA
    return PRODUCTS_ITEM_MENU_WEB_DATA
}

