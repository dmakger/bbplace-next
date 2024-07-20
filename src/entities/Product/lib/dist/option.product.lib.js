"use strict";
exports.__esModule = true;
exports.productToOption = exports.productListToOptionList = void 0;
var pages_url_config_1 = require("@/config/pages-url.config");
exports.productListToOptionList = function (productList) {
    return productList.map(function (it) { return exports.productToOption(it); });
};
exports.productToOption = function (product) {
    return {
        id: product.id,
        name: product.media.color,
        params: {
            image: product.media.attachments[0],
            href: pages_url_config_1.MAIN_PAGES.CURRENT_PRODUCT(product.id).path
        }
    };
};
