"use strict";
exports.__esModule = true;
exports.ToProfileLargeToSupplierButton = void 0;
var classes_lib_1 = require("@/shared/lib/classes.lib");
var _ToProfileLargeToSupplierButton_module_scss_1 = require("./_ToProfileLargeToSupplierButton.module.scss");
var Button_1 = require("@/shared/ui/Button");
var pages_url_config_1 = require("@/config/pages-url.config");
var button_model_1 = require("@/shared/ui/Button/model/button.model");
exports.ToProfileLargeToSupplierButton = function (_a) {
    var supplierId = _a.supplierId, className = _a.className;
    return (React.createElement(Button_1.Button, { variant: Button_1.ButtonVariant.TONAL, color: button_model_1.ButtonColor.Secondary, size: button_model_1.ButtonSize.Medium, href: pages_url_config_1.MAIN_PAGES.CURRENT_SUPPLIER(supplierId).path, className: classes_lib_1.cls(_ToProfileLargeToSupplierButton_module_scss_1["default"].button, className), title: 'Профиль' }));
};
