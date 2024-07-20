"use strict";
exports.__esModule = true;
exports.BaseSupplier = void 0;
var classes_lib_1 = require("@/shared/lib/classes.lib");
var _BaseSupplier_module_scss_1 = require("./_BaseSupplier.module.scss");
var ImageAPI_1 = require("@/shared/ui/Image/API/ImageAPI");
var BottomLineSupplier_1 = require("../BottomLine/BottomLineSupplier");
var getters_supplier_lib_1 = require("../../lib/getters.supplier.lib");
var view_supplier_data_1 = require("../../data/view.supplier.data");
var SubscribeAutoToSupplierButton_1 = require("../Button/Subscribe/Auto/SubscribeAutoToSupplierButton");
var link_1 = require("next/link");
var pages_url_config_1 = require("@/config/pages-url.config");
exports.BaseSupplier = function (_a) {
    var _b, _c;
    var supplier = _a.supplier, supplierRating = _a.supplierRating, numberOfReviews = _a.numberOfReviews, _d = _a.hasImage, hasImage = _d === void 0 ? false : _d, _e = _a.subscribeView, subscribeView = _e === void 0 ? view_supplier_data_1.ESupplierSubscribeViewItem.NONE : _e, _f = _a.isGray, isGray = _f === void 0 ? false : _f, _g = _a.isForDescPage, isForDescPage = _g === void 0 ? false : _g, className = _a.className, classNameName = _a.classNameName, classNameVerified = _a.classNameVerified, imageSizes = _a.imageSizes;
    var html = (React.createElement(React.Fragment, null,
        hasImage &&
            React.createElement(ImageAPI_1.ImageAPI, { src: (_b = supplier.photoId) === null || _b === void 0 ? void 0 : _b.key, alt: (_c = supplier.photoId) === null || _c === void 0 ? void 0 : _c.name, className: _BaseSupplier_module_scss_1["default"].image, width: imageSizes === null || imageSizes === void 0 ? void 0 : imageSizes.width, height: imageSizes === null || imageSizes === void 0 ? void 0 : imageSizes.height }),
        React.createElement("div", { className: classes_lib_1.cls(_BaseSupplier_module_scss_1["default"].content, isForDescPage ? _BaseSupplier_module_scss_1["default"].DescPageContent : '') },
            React.createElement("span", { className: classes_lib_1.cls(_BaseSupplier_module_scss_1["default"].name, isForDescPage ? _BaseSupplier_module_scss_1["default"].bigName : '', classNameName) }, getters_supplier_lib_1.getNameSupplier(supplier)),
            React.createElement(BottomLineSupplier_1.BottomLineSupplier, { supplier: supplier, supplierRating: supplierRating, numberOfReviews: numberOfReviews, isForDescPage: isForDescPage, classNameVerified: classNameVerified })),
        React.createElement(SubscribeAutoToSupplierButton_1.SubscribeAutoToSupplierButton, { view: subscribeView, supplierId: supplier.id })));
    if (isForDescPage)
        return (React.createElement("div", { className: _BaseSupplier_module_scss_1["default"].isForDescPage }, html));
    return (React.createElement(link_1["default"], { href: pages_url_config_1.MAIN_PAGES.CURRENT_SUPPLIER(supplier.id).path, className: classes_lib_1.cls(_BaseSupplier_module_scss_1["default"].block, isGray ? _BaseSupplier_module_scss_1["default"].gray : '', className) }, html));
};
