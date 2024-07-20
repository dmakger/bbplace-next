"use strict";
exports.__esModule = true;
exports.ToChatSmallToSupplierButton = void 0;
var _ToChatSmallToSupplierButton_module_scss_1 = require("./_ToChatSmallToSupplierButton.module.scss");
var classes_lib_1 = require("@/shared/lib/classes.lib");
var ToChatIcon_1 = require("@/shared/ui/Icon/ui/ToChat/ToChatIcon");
var Button_1 = require("@/shared/ui/Button");
var pages_url_config_1 = require("@/config/pages-url.config");
exports.ToChatSmallToSupplierButton = function (_a) {
    var supplierId = _a.supplierId, className = _a.className, _b = _a.isWide, isWide = _b === void 0 ? false : _b;
    return (React.createElement(Button_1.Button, { variant: Button_1.ButtonVariant.BACKGROUND_GRAY, href: pages_url_config_1.DASHBOARD_PAGES.CURRENT_CHAT(supplierId).path, className: classes_lib_1.cls(className, isWide ? _ToChatSmallToSupplierButton_module_scss_1["default"].buttonWide : '') },
        React.createElement(ToChatIcon_1.ToChatIcon, null)));
};
