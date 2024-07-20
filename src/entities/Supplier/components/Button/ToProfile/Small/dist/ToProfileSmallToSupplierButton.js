"use strict";
exports.__esModule = true;
exports.ToProfileSmallToSupplierButton = void 0;
var classes_lib_1 = require("@/shared/lib/classes.lib");
var Button_1 = require("@/shared/ui/Button");
var pages_url_config_1 = require("@/config/pages-url.config");
var arrow_data_icon_1 = require("@/shared/ui/Icon/data/arrow.data.icon");
exports.ToProfileSmallToSupplierButton = function (_a) {
    var supplierId = _a.supplierId, className = _a.className;
    return (React.createElement(Button_1.Button, { variant: Button_1.ButtonVariant.W_ARROW_RED, href: pages_url_config_1.MAIN_PAGES.CURRENT_SUPPLIER(supplierId).path, afterImage: arrow_data_icon_1.ARROW_ICON, afterProps: { width: 15, height: 15 }, className: classes_lib_1.cls(className) }));
};
