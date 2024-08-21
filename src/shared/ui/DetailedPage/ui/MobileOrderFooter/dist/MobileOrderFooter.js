"use strict";
exports.__esModule = true;
exports.MobileOrderFooter = void 0;
var classes_lib_1 = require("@/shared/lib/classes.lib");
var _MobileOrderFooter_module_scss_1 = require("./_MobileOrderFooter.module.scss");
var PriceQuantity_1 = require("@/shared/ui/PriceQuantity/PriceQuantity");
var Button_1 = require("@/shared/ui/Button");
var pages_url_config_1 = require("@/config/pages-url.config");
var button_model_1 = require("@/shared/ui/Button/model/button.model");
exports.MobileOrderFooter = function (_a) {
    var className = _a.className, _b = _a.firstStart, firstStart = _b === void 0 ? 'За ' : _b, supplierId = _a.supplierId, wholesalePrices = _a.wholesalePrices, _c = _a.isTop, isTop = _c === void 0 ? false : _c, classNamePriceQuantity = _a.classNamePriceQuantity;
    return (React.createElement("div", { className: classes_lib_1.cls(isTop ? _MobileOrderFooter_module_scss_1["default"].topMobileOrderFooter : _MobileOrderFooter_module_scss_1["default"].MobileOrderFooter, _MobileOrderFooter_module_scss_1["default"].block, className) },
        React.createElement(PriceQuantity_1.PriceQuantity, { wholesales: wholesalePrices !== null && wholesalePrices !== void 0 ? wholesalePrices : [], className: classes_lib_1.cls(_MobileOrderFooter_module_scss_1["default"].priceQuantity, classNamePriceQuantity), classNameWholesaleBlock: _MobileOrderFooter_module_scss_1["default"].wholesaleBlock, firstStart: firstStart, classNameQuantity: _MobileOrderFooter_module_scss_1["default"].quantity, classNamePrice: _MobileOrderFooter_module_scss_1["default"].price, classNameOneItem: _MobileOrderFooter_module_scss_1["default"].onRequest }),
        React.createElement("div", { className: _MobileOrderFooter_module_scss_1["default"].buttonContainer },
            React.createElement(Button_1.Button, { variant: Button_1.ButtonVariant.BACKGROUND_RED, size: button_model_1.ButtonSize.Medium, classNameLink: _MobileOrderFooter_module_scss_1["default"].button, href: pages_url_config_1.DASHBOARD_PAGES.CHATS(supplierId !== null && supplierId !== void 0 ? supplierId : '').path, title: "\u0417\u0430\u043A\u0430\u0437\u0430\u0442\u044C" }))));
};
