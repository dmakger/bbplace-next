"use client";
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.ViewButtonsButtonChild = exports.ViewButtonsButton = void 0;
var react_1 = require("react");
var classes_lib_1 = require("@/shared/lib/classes.lib");
var _ViewButtonsProduct_module_scss_1 = require("./_ViewButtonsProduct.module.scss");
var GalleryViewButton_1 = require("@/shared/ui/Button/data/GalleryView/GalleryViewButton");
var ListViewButton_1 = require("@/shared/ui/Button/data/ListView/ListViewButton");
var pages_url_config_1 = require("@/config/pages-url.config");
var navigation_1 = require("next/navigation");
var product_params_config_1 = require("@/config/params/product.params.config");
var SuspenseL_1 = require("@/shared/ui/Wrapper/SuspenseL/SuspenseL");
exports.ViewButtonsButton = function (_a) {
    var rest = __rest(_a, []);
    return (React.createElement(SuspenseL_1["default"], null,
        React.createElement(exports.ViewButtonsButtonChild, __assign({}, rest))));
};
exports.ViewButtonsButtonChild = function (_a) {
    var className = _a.className;
    // PATH
    var searchParams = navigation_1.useSearchParams();
    // STATE
    var _b = react_1.useState(null), productView = _b[0], setProductView = _b[1];
    var _c = react_1.useState(searchParams.toString()), galleryParams = _c[0], setGalleryParams = _c[1];
    var _d = react_1.useState(searchParams.toString()), listParams = _d[0], setListParams = _d[1];
    // EFFECT
    react_1.useEffect(function () {
        var _productView = product_params_config_1.PRODUCT_PARAMS.getView(searchParams.get(product_params_config_1.PRODUCT_PARAMS.VIEW__KEY));
        if (_productView !== productView)
            setProductView(_productView);
    }, [searchParams, productView]);
    react_1.useEffect(function () {
        var params = new URLSearchParams(searchParams.toString());
        setGalleryParams(function (prevState) {
            var _galleryParams = new URLSearchParams(params.toString());
            _galleryParams.set(product_params_config_1.PRODUCT_PARAMS.VIEW__KEY, product_params_config_1.PRODUCT_PARAMS.VERTICAL_VIEW__VALUE);
            var strGalleryParams = _galleryParams.toString();
            return strGalleryParams !== prevState ? strGalleryParams : prevState;
        });
        setListParams(function (prevState) {
            var _listParams = new URLSearchParams(params.toString());
            _listParams.set(product_params_config_1.PRODUCT_PARAMS.VIEW__KEY, product_params_config_1.PRODUCT_PARAMS.HORIZONTAL_VIEW__VALUE);
            var strListParams = _listParams.toString();
            return strListParams !== prevState ? strListParams : prevState;
        });
    }, [searchParams]);
    // ON CLICK
    var handleOnClick = function (_view) {
        setProductView(_view);
    };
    return (React.createElement("div", { className: classes_lib_1.cls(_ViewButtonsProduct_module_scss_1["default"].block, className) },
        React.createElement(GalleryViewButton_1.GalleryViewButton, { href: pages_url_config_1.MAIN_PAGES.PRODUCTS + "?" + galleryParams.toString(), isActive: productView === product_params_config_1.PRODUCT_PARAMS.VERTICAL_VIEW__VALUE, onClick: function () { return handleOnClick(product_params_config_1.PRODUCT_PARAMS.VERTICAL_VIEW__VALUE); } }),
        React.createElement(ListViewButton_1.ListViewButton, { href: pages_url_config_1.MAIN_PAGES.PRODUCTS + "?" + listParams.toString(), isActive: productView === product_params_config_1.PRODUCT_PARAMS.HORIZONTAL_VIEW__VALUE, onClick: function () { return handleOnClick(product_params_config_1.PRODUCT_PARAMS.HORIZONTAL_VIEW__VALUE); } })));
};
