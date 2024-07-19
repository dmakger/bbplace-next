import { MAIN_PAGES } from "@/config/pages-url.config";
import { PRODUCTS_ITEM_MENU_WEB_DATA } from "@/widgets/Menu/WEB";
import { COMPANIES_ITEM_MENU_WEB_DATA, TENDERS_ITEM_MENU_WEB_DATA } from "@/widgets/Menu/WEB/data/menu.web.data";
import { ECatalogVariants } from "@/widgets/SortFilterSidebar";


export const getPTCVariantByPathname = (pathname: string) => {
    if (pathname === MAIN_PAGES.TENDERS.path)
        return TENDERS_ITEM_MENU_WEB_DATA
    if (pathname === MAIN_PAGES.SUPPLIERS.path)
        return COMPANIES_ITEM_MENU_WEB_DATA
    return PRODUCTS_ITEM_MENU_WEB_DATA
}


export const getPTCViewByPathname = (pathname: string) => {
    if (pathname === MAIN_PAGES.TENDERS.path)
        return ECatalogVariants.TENDERS
    if (pathname === MAIN_PAGES.SUPPLIERS.path)
        return ECatalogVariants.COMPANIES
    if (pathname === MAIN_PAGES.PRODUCTS.path)
        return ECatalogVariants.PRODUCTS
    return ECatalogVariants.NONE
}



