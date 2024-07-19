"use strict";
exports.__esModule = true;
exports.LK_MODAL_MENU_DATA = exports.LOGOUT_LK_MENU_DATA = exports.SUPPORT_LK_MENU_DATA = exports.CHATS_LK_MENU_DATA = exports.FAVORITES_LK_MENU_DATA = void 0;
var pages_url_config_1 = require("@/config/pages-url.config");
exports.FAVORITES_LK_MENU_DATA = {
    link: pages_url_config_1.DASHBOARD_PAGES.FAVORITE.path,
    title: "Избранное"
};
exports.CHATS_LK_MENU_DATA = {
    link: pages_url_config_1.DASHBOARD_PAGES.CHATS.path,
    title: "Сообщения"
};
exports.SUPPORT_LK_MENU_DATA = {
    link: pages_url_config_1.MAIN_PAGES.SUPPORT.path,
    title: "Поддержка"
};
exports.LOGOUT_LK_MENU_DATA = {
    link: pages_url_config_1.MAIN_PAGES.HOME.path,
    title: "Выйти из аккаунта"
};
exports.LK_MODAL_MENU_DATA = [
    exports.FAVORITES_LK_MENU_DATA,
    exports.CHATS_LK_MENU_DATA,
    exports.SUPPORT_LK_MENU_DATA,
    exports.LOGOUT_LK_MENU_DATA
];
