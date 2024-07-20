"use strict";
exports.__esModule = true;
exports.MENU_DATA = exports.FAVORITE_ITEM_MENU_DATA = exports.DASHBOARD_ITEM_MENU_DATA = exports.HORIZONTAL_VIEW = void 0;
var pages_url_config_1 = require("@/config/pages-url.config");
var icons_data_1 = require("../icons.data");
exports.HORIZONTAL_VIEW = {
    id: 1, title: 'Horizontal',
    image: React.createElement(icons_data_1.HorizontalIcon, null)
};
// ===={ MENU DATA }====
exports.DASHBOARD_ITEM_MENU_DATA = {
    id: 3,
    link: pages_url_config_1.DASHBOARD_PAGES.CHATS.path,
    title: "Чат",
    image: React.createElement(icons_data_1.ChatsSVGIcon, null)
};
exports.FAVORITE_ITEM_MENU_DATA = {
    id: 4,
    link: pages_url_config_1.DASHBOARD_PAGES.FAVORITE.path,
    title: "Избранное",
    image: React.createElement(icons_data_1.FavouriteSVGIcon, null)
};
exports.MENU_DATA = [
    exports.FAVORITE_ITEM_MENU_DATA,
    exports.DASHBOARD_ITEM_MENU_DATA,
];
