"use strict";
exports.__esModule = true;
exports.MOBILE_MENU_DATA = exports.DASHBOARD_ITEM_MENU_DATA = exports.CATALOG_ITEM_MENU_DATA = exports.MAIN_ITEM_MENU_DATA = void 0;
var pages_url_config_1 = require("@/config/pages-url.config");
var logo_svg_1 = require("@/shared/assets/img/logo.svg");
var catalog_svg_1 = require("@/shared/assets/img/catalog.svg");
var lk_svg_1 = require("@/shared/assets/img/lk.svg");
// ===={ MOBILE MENU DATA }====
exports.MAIN_ITEM_MENU_DATA = {
    link: pages_url_config_1.MAIN_PAGES.HOME.path,
    title: "Главная",
    image: logo_svg_1["default"]
};
exports.CATALOG_ITEM_MENU_DATA = {
    link: pages_url_config_1.MAIN_PAGES.CATALOG.path,
    title: "Каталог",
    image: catalog_svg_1["default"]
};
exports.DASHBOARD_ITEM_MENU_DATA = {
    link: pages_url_config_1.DASHBOARD_PAGES.HOME.path,
    title: "ЛК",
    image: lk_svg_1["default"]
};
// // DATA WITHOUT TITLE
exports.MOBILE_MENU_DATA = [
    exports.MAIN_ITEM_MENU_DATA,
    exports.CATALOG_ITEM_MENU_DATA,
    // FAVORITES_WT_ITEM_MENU_DATA,
    // CHATS_WT_ITEM_MENU_DATA,
    exports.DASHBOARD_ITEM_MENU_DATA,
];
