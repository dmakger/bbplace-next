"use strict";
exports.__esModule = true;
exports.ToChatLargeToSupplierButton = void 0;
var classes_lib_1 = require("@/shared/lib/classes.lib");
var _ToChatLargeToSupplierButton_module_scss_1 = require("./_ToChatLargeToSupplierButton.module.scss");
var Button_1 = require("@/shared/ui/Button");
var pages_url_config_1 = require("@/config/pages-url.config");
var button_model_1 = require("@/shared/ui/Button/model/button.model");
exports.ToChatLargeToSupplierButton = function (_a) {
    var supplierId = _a.supplierId, _b = _a.isWide, isWide = _b === void 0 ? false : _b, className = _a.className;
    return (React.createElement(Button_1.Button, { variant: Button_1.ButtonVariant.TONAL, color: button_model_1.ButtonColor.Secondary, size: button_model_1.ButtonSize.Medium, href: pages_url_config_1.DASHBOARD_PAGES.CURRENT_CHAT(supplierId).path, className: classes_lib_1.cls(isWide ? _ToChatLargeToSupplierButton_module_scss_1["default"].button : _ToChatLargeToSupplierButton_module_scss_1["default"].buttonNarrow, className), title: '\u0421\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435' }));
};
