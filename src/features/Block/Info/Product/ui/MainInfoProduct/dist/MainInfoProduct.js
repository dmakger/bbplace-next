"use strict";
exports.__esModule = true;
exports.MainInfoProduct = void 0;
var classes_lib_1 = require("@/shared/lib/classes.lib");
var _MainInfoProduct_module_scss_1 = require("./_MainInfoProduct.module.scss");
var pages_url_config_1 = require("@/config/pages-url.config");
var BlockInfoProduct_1 = require("../BlockInfoProduct/BlockInfoProduct");
var option_product_lib_1 = require("@/entities/Product/lib/option.product.lib");
var OptionList_1 = require("@/shared/ui/Option/ui/List/OptionList");
var Button_1 = require("@/shared/ui/Button");
exports.MainInfoProduct = function (_a) {
    var _b, _c;
    var className = _a.className, product = _a.product, inView = _a.inView, productSizes = _a.productSizes, productListGroup = _a.productListGroup, choosenSize = _a.choosenSize, chooseSize = _a.chooseSize;
    return (React.createElement("div", { className: classes_lib_1.cls(_MainInfoProduct_module_scss_1["default"].MainInfoProduct, className) },
        React.createElement(BlockInfoProduct_1.BlockInfoProduct, { product: product, className: classes_lib_1.cls(_MainInfoProduct_module_scss_1["default"].wholesaleProduct, inView ? _MainInfoProduct_module_scss_1["default"].hidden : '') }),
        React.createElement(OptionList_1.OptionList, { title: "\u0426\u0432\u0435\u0442: ", optionList: option_product_lib_1.productListToOptionList(productListGroup), activeIds: [product.id], isOnHover: true }),
        productSizes.length > 0 && React.createElement(OptionList_1.OptionList, { title: "\u0420\u0430\u0437\u043C\u0435\u0440: ", optionList: productSizes, activeIds: [(_b = choosenSize[0]) === null || _b === void 0 ? void 0 : _b.id], onClickItem: chooseSize, classNameItem: _MainInfoProduct_module_scss_1["default"].optionItem, isSizes: true }),
        React.createElement("div", { className: _MainInfoProduct_module_scss_1["default"].buttonContainer },
            React.createElement(Button_1.Button, { variant: Button_1.ButtonVariant.BACKGROUND_RED, href: pages_url_config_1.DASHBOARD_PAGES.CHATS((_c = product.ownerId) !== null && _c !== void 0 ? _c : '').path, title: "\u0417\u0430\u043A\u0430\u0437\u0430\u0442\u044C" }))));
};
