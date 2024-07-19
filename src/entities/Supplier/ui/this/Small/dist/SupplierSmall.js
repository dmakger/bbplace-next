"use strict";
exports.__esModule = true;
exports.SupplierSmall = void 0;
var classes_lib_1 = require("@/shared/lib/classes.lib");
var _SupplierSmall_module_scss_1 = require("./_SupplierSmall.module.scss");
var getters_supplier_lib_1 = require("@/entities/Supplier/lib/getters.supplier.lib");
var link_1 = require("next/link");
var pages_url_config_1 = require("@/config/pages-url.config");
exports.SupplierSmall = function (_a) {
    var supplier = _a.supplier, className = _a.className;
    return (React.createElement(link_1["default"], { href: pages_url_config_1.MAIN_PAGES.CURRENT_SUPPLIER(supplier.id).path, className: classes_lib_1.cls(_SupplierSmall_module_scss_1["default"].block, className) },
        React.createElement("span", { className: _SupplierSmall_module_scss_1["default"].name }, getters_supplier_lib_1.getNameSupplier(supplier))));
};
