"use strict";
exports.__esModule = true;
exports.getPTCViewByPathname = exports.getPTCVariantByPathname = void 0;
var pages_url_config_1 = require("@/config/pages-url.config");
var WEB_1 = require("@/widgets/Menu/WEB");
var menu_web_data_1 = require("@/widgets/Menu/WEB/data/menu.web.data");
var SortFilterSidebar_1 = require("@/widgets/SortFilterSidebar");
exports.getPTCVariantByPathname = function (pathname) {
    if (pathname === pages_url_config_1.MAIN_PAGES.TENDERS.path)
        return menu_web_data_1.TENDERS_ITEM_MENU_WEB_DATA;
    if (pathname === pages_url_config_1.MAIN_PAGES.SUPPLIERS.path)
        return menu_web_data_1.COMPANIES_ITEM_MENU_WEB_DATA;
    return WEB_1.PRODUCTS_ITEM_MENU_WEB_DATA;
};
exports.getPTCViewByPathname = function (pathname) {
    if (pathname === pages_url_config_1.MAIN_PAGES.TENDERS.path)
        return SortFilterSidebar_1.ECatalogVariants.TENDERS;
    if (pathname === pages_url_config_1.MAIN_PAGES.SUPPLIERS.path)
        return SortFilterSidebar_1.ECatalogVariants.COMPANIES;
    if (pathname === pages_url_config_1.MAIN_PAGES.PRODUCTS.path)
        return SortFilterSidebar_1.ECatalogVariants.PRODUCTS;
    return SortFilterSidebar_1.ECatalogVariants.NONE;
};
