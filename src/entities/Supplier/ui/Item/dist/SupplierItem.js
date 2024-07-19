'use client';
"use strict";
exports.__esModule = true;
exports.SupplierItem = void 0;
var SupplierCategoryItem_1 = require("../../components/SupplierCategoryItem/SupplierCategoryItem");
var _SupplierItem_module_scss_1 = require("./_SupplierItem.module.scss");
var review_api_1 = require("@/entities/Review/api/review.api");
var review_data_1 = require("@/entities/Review/data/review.data");
var view_supplier_data_1 = require("../../data/view.supplier.data");
var SupplierWNav_1 = require("../WNav/SupplierWNav");
var htt_supplier_lib_1 = require("@/shared/ui/Text/lib/htt.supplier.lib");
var product_api_1 = require("@/entities/Product/api/product.api");
var AtSupplierCard_1 = require("@/entities/Product/ui/AtSupplierCard");
var NavSupplier_1 = require("../../components/Nav/NavSupplier");
var HandleSize_1 = require("@/shared/ui/Handle/Size/HandleSize");
var react_1 = require("react");
var Text_1 = require("@/shared/ui/Text");
var product_lib_1 = require("@/entities/Product/lib/product.lib");
var text_model_1 = require("@/shared/model/text.model");
var ScrollSlider_1 = require("@/features/ScrollSlider");
var Button_1 = require("@/shared/ui/Button");
var pages_url_config_1 = require("@/config/pages-url.config");
exports.SupplierItem = function (_a) {
    var _b, _c;
    var supplier = _a.supplier;
    // STATE
    var _d = react_1.useState(false), is768 = _d[0], setIs768 = _d[1];
    var _e = react_1.useState(false), is560 = _e[0], setIs560 = _e[1];
    var _f = react_1.useState(false), is445 = _f[0], setIs445 = _f[1];
    var _g = react_1.useState(false), is355 = _g[0], setIs355 = _g[1];
    var _h = react_1.useState([]), supplierProducts = _h[0], setSupplierProducts = _h[1];
    //API
    var supplierRating = review_api_1.ReviewAPI.useGetSupplierScoreQuery(supplier.id).data;
    var supplierReviews = review_api_1.ReviewAPI.useGetSellerReviewsQuery({ supplierId: supplier.id, limit: review_data_1.REVIEW_LIMIT !== null && review_data_1.REVIEW_LIMIT !== void 0 ? review_data_1.REVIEW_LIMIT : 0, page: review_data_1.REVIEW_START_PAGE }).data;
    var supplierProductsAPI = product_api_1.ProductAPI.useGetProductsByUserQuery({ userId: supplier.id }).data;
    //EFFECT
    react_1.useEffect(function () {
        if (supplierProductsAPI)
            setSupplierProducts(product_lib_1.productApiListToProductList(supplierProductsAPI));
    }, [supplierProductsAPI]);
    var isButton = supplierProducts && supplierProducts.length > 2;
    return (React.createElement(React.Fragment, null,
        React.createElement("section", { className: _SupplierItem_module_scss_1["default"].SupplierItem },
            React.createElement(SupplierWNav_1.SupplierWNav, { classNameName: _SupplierItem_module_scss_1["default"].supplierName, id: supplier.id, navs: [
                    is768 ? view_supplier_data_1.ESupplierSubscribeViewItem.NONE : view_supplier_data_1.ESupplierSubscribeViewItem.LARGE,
                    is768 ? view_supplier_data_1.ESupplierToChatViewItem.NONE : view_supplier_data_1.ESupplierToChatViewItem.LARGE_WIDE,
                    is768 ? view_supplier_data_1.ESupplierToProfileViewItem.NONE : view_supplier_data_1.ESupplierToProfileViewItem.SMALL
                ] }),
            React.createElement("div", { className: _SupplierItem_module_scss_1["default"].bottomContainer },
                React.createElement("div", { className: _SupplierItem_module_scss_1["default"].bottomLeftContainer },
                    ((_b = supplier.category) === null || _b === void 0 ? void 0 : _b.some(function (it) { return it !== null; })) && React.createElement(SupplierCategoryItem_1.SupplierCategoryItem, { category: supplier.category }),
                    React.createElement("div", { className: _SupplierItem_module_scss_1["default"].line }),
                    React.createElement(Text_1.HeadingToTextTable, { variant: text_model_1.EHeadingToTextVariants.COLUMN, data: htt_supplier_lib_1.getDataHeadingToTextSupplierTable({
                            variant: text_model_1.IGetDataHeadingToTextSupplierTableVariant.SUPPLIER_PAGE,
                            supplier: supplier,
                            supplierRating: supplierRating !== null && supplierRating !== void 0 ? supplierRating : 0,
                            supplierReviews: (_c = supplierReviews === null || supplierReviews === void 0 ? void 0 : supplierReviews.length) !== null && _c !== void 0 ? _c : 0,
                            isCountryNeeded: true
                        }), classNameMain: _SupplierItem_module_scss_1["default"].table, classNameHeadingItem: _SupplierItem_module_scss_1["default"].headingItem, classNameTextItem: _SupplierItem_module_scss_1["default"].textItem, classNameColumn: _SupplierItem_module_scss_1["default"].columnTable }),
                    React.createElement(NavSupplier_1.NavSupplier, { supplierId: supplier.id, views: [
                            is560 ? view_supplier_data_1.ESupplierSubscribeViewItem.SMALL : (is768 ? view_supplier_data_1.ESupplierSubscribeViewItem.LARGE : view_supplier_data_1.ESupplierSubscribeViewItem.NONE),
                            is355 ? view_supplier_data_1.ESupplierToChatViewItem.LARGE : (is768 ? view_supplier_data_1.ESupplierToChatViewItem.LARGE_WIDE : view_supplier_data_1.ESupplierToChatViewItem.NONE),
                            is445 ? view_supplier_data_1.ESupplierToProfileViewItem.SMALL : (is768 ? view_supplier_data_1.ESupplierToProfileViewItem.LARGE : view_supplier_data_1.ESupplierToProfileViewItem.NONE)
                        ] })),
                React.createElement("div", { className: _SupplierItem_module_scss_1["default"].bottomRightContainer },
                    React.createElement(ScrollSlider_1.ScrollSlider, { slides: supplierProducts, component: AtSupplierCard_1.ProductASC, classNameSlidesContainer: !isButton ? _SupplierItem_module_scss_1["default"].noButton : '' }, isButton && React.createElement(Button_1.Button, { variant: Button_1.ButtonVariant.BACKGROUND_RED_HUGE, href: pages_url_config_1.MAIN_PAGES.CURRENT_SUPPLIER(supplier.id).path }, "\u0412\u0441\u0435 \u0442\u043E\u0432\u0430\u0440\u044B"))))),
        React.createElement(HandleSize_1.HandleSize, { width: 768, set: setIs768 }),
        React.createElement(HandleSize_1.HandleSize, { width: 560, set: setIs560 }),
        React.createElement(HandleSize_1.HandleSize, { width: 445, set: setIs445 }),
        React.createElement(HandleSize_1.HandleSize, { width: 355, set: setIs355 })));
};
