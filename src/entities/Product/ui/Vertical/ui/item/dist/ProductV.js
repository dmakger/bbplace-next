"use strict";
exports.__esModule = true;
exports.ProductV = void 0;
var classes_lib_1 = require("@/shared/lib/classes.lib");
var _ProductV_module_scss_1 = require("./_ProductV.module.scss");
var react_1 = require("react");
var diapason_metrics_metrics_lib_1 = require("@/entities/Metrics/lib/metrics/diapason.metrics.metrics.lib");
var ImageAPI_1 = require("@/shared/ui/Image/API/ImageAPI");
var view_supplier_data_1 = require("@/entities/Supplier/data/view.supplier.data");
var supplier_data_1 = require("@/entities/Supplier/data/supplier.data");
var SupplierWNav_1 = require("@/entities/Supplier/ui/WNav/SupplierWNav");
var WholesaleDiapason_1 = require("@/entities/Metrics/ui/Wholesale/Diapason/WholesaleDiapason");
var QuantityMetrics_1 = require("@/shared/ui/QuantityMetrics/QuantityMetrics");
var HandleSize_1 = require("@/shared/ui/Handle/Size/HandleSize");
var link_1 = require("next/link");
var pages_url_config_1 = require("@/config/pages-url.config");
var FavouriteAutoToProductButton_1 = require("@/entities/Product/components/Buttons/Favourite/Auto/FavouriteAutoToProductButton");
var view_product_data_1 = require("@/entities/Product/data/view.product.data");
exports.ProductV = function (_a) {
    var product = _a.product, className = _a.className;
    // VARS  
    var _b = diapason_metrics_metrics_lib_1.getMinMax(product.media.wholesalePrices, product.media.sizes), minWholesale = _b[0], maxWholesale = _b[1];
    // STATE
    var _c = react_1.useState(false), is768 = _c[0], setIs768 = _c[1];
    return (React.createElement(React.Fragment, null,
        React.createElement("section", { className: classes_lib_1.cls(_ProductV_module_scss_1["default"].block, className) },
            React.createElement("div", { className: _ProductV_module_scss_1["default"].top },
                React.createElement(ImageAPI_1.ImageAPI, { src: product.media.attachments[0], width: 271, height: 271, className: _ProductV_module_scss_1["default"].image }),
                React.createElement(FavouriteAutoToProductButton_1.FavouriteAutoToProductButton, { productId: product.id, view: view_product_data_1.EProductFavouriteViewItem.SMALL_FILL, className: _ProductV_module_scss_1["default"].favourite })),
            React.createElement("div", { className: _ProductV_module_scss_1["default"].content },
                React.createElement("div", { className: _ProductV_module_scss_1["default"].middle },
                    React.createElement(link_1["default"], { href: pages_url_config_1.MAIN_PAGES.CURRENT_PRODUCT(product.id).path, className: _ProductV_module_scss_1["default"].name }, product.name),
                    React.createElement("div", { className: _ProductV_module_scss_1["default"].priceWrapper },
                        React.createElement(WholesaleDiapason_1.WholesaleDiapason, { minWholesale: minWholesale, maxWholesale: maxWholesale, currency: product.media.currency, classNameText: _ProductV_module_scss_1["default"].price }),
                        React.createElement(QuantityMetrics_1.QuantityMetrics, { heading: 'Мин. Кол-во', wholesale: minWholesale, className: _ProductV_module_scss_1["default"].quantity, classNameText: _ProductV_module_scss_1["default"].quantityText }))),
                React.createElement("div", { className: _ProductV_module_scss_1["default"].line }),
                React.createElement(SupplierWNav_1.SupplierWNav, { id: product.ownerId, view: is768 ? supplier_data_1.ESupplierView.SMALL : supplier_data_1.ESupplierView.LARGE_WHITE, axis: supplier_data_1.ESupplierAxis.VERTICAL, className: _ProductV_module_scss_1["default"].supplier, classNameNavs: _ProductV_module_scss_1["default"].supplierNavs, classNameNavsItem: _ProductV_module_scss_1["default"].supplierNavsItem, navs: [
                        is768 ? view_supplier_data_1.ESupplierSubscribeViewItem.NONE : view_supplier_data_1.ESupplierSubscribeViewItem.SMALL_WIDE,
                        is768 ? view_supplier_data_1.ESupplierToChatViewItem.SMALL_WIDE : view_supplier_data_1.ESupplierToChatViewItem.LARGE,
                    ] }))),
        React.createElement(HandleSize_1.HandleSize, { width: 768, set: setIs768 })));
};
