'use client';
"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.ProductLK = void 0;
var classes_lib_1 = require("@/shared/lib/classes.lib");
var _ProductLK_module_scss_1 = require("./_ProductLK.module.scss");
var ImageAPI_1 = require("@/shared/ui/Image/API/ImageAPI");
var category_metrics_api_1 = require("@/entities/Metrics/api/category.metrics.api");
var gear_data_icon_1 = require("@/shared/ui/Icon/data/gear.data.icon");
var Button_1 = require("@/shared/ui/Button");
var Checkbox_1 = require("@/shared/ui/Input/ui/Checkbox");
var product_api_1 = require("@/entities/Product/api/product.api");
var query_1 = require("@reduxjs/toolkit/query");
var productLK_model_1 = require("../../model/productLK.model");
var pages_url_config_1 = require("@/config/pages-url.config");
var product_lib_1 = require("@/entities/Product/lib/product.lib");
var react_1 = require("react");
var currency_metrics_api_1 = require("@/entities/Metrics/api/currency.metrics.api");
var metrics_metrics_api_1 = require("@/entities/Metrics/api/metrics.metrics.api");
var ButtonArrowWOLine_1 = require("@/shared/ui/Button/data/Arrow/WOLine/ButtonArrowWOLine");
var button_model_1 = require("@/shared/model/button.model");
var BottomInfo_1 = require("@/features/Modal/BottomInfo");
var bottomInfoModal_model_1 = require("@/features/Modal/BottomInfo/model/bottomInfoModal.model");
exports.ProductLK = function (_a) {
    var _b;
    var className = _a.className, _c = _a.variant, variant = _c === void 0 ? productLK_model_1.EProductLKVariants.DEFAULT : _c, product = _a.product, choosenProduct = _a.choosenProduct, setChoosenProduct = _a.setChoosenProduct, setGroupProducts = _a.setGroupProducts, setIsOpenSettings = _a.setIsOpenSettings, isOpenGroup = _a.isOpenGroup, setIsOpenGroup = _a.setIsOpenGroup, checkedProductsId = _a.checkedProductsId, setCheckedProducts = _a.setCheckedProducts;
    //STATE
    var _d = react_1.useState(0), groupProductsLength = _d[0], setGroupProductsLength = _d[1];
    var _e = react_1.useState(false), isChecked = _e[0], setIsChecked = _e[1];
    //API
    var category = category_metrics_api_1.CategoryAPI.useGetCategoryByIdQuery(product === null || product === void 0 ? void 0 : product.categoryId).data;
    var productAPIListGroup = product_api_1.ProductAPI.useGetProductsByGroupQuery(product.groupId ? product.groupId : query_1.skipToken, { refetchOnMountOrArgChange: true }).data;
    var currencyList = currency_metrics_api_1.CurrencyAPI.useGetCurrenciesQuery().data;
    var metrics = metrics_metrics_api_1.MetricsAPI.useGetMetricsQuery().data;
    //EFFECT
    react_1.useEffect(function () {
        if (checkedProductsId)
            setIsChecked(checkedProductsId.includes(product.id));
    }, [checkedProductsId]);
    react_1.useEffect(function () {
        if (setGroupProducts && productAPIListGroup && currencyList && metrics) {
            setGroupProducts(product_lib_1.productApiListToProductList(productAPIListGroup, metrics, currencyList).filter(function (it) { return it.id !== product.id; }));
        }
        productAPIListGroup && setGroupProductsLength(productAPIListGroup.filter(function (it) { return it.id !== product.id; }).length);
    }, [productAPIListGroup, currencyList, metrics]);
    react_1.useEffect(function () {
        if (checkedProductsId && setCheckedProducts && isChecked && !checkedProductsId.includes(product.id))
            setCheckedProducts(__spreadArrays(checkedProductsId, [product.id]));
        else if (!isChecked && setCheckedProducts)
            setCheckedProducts(checkedProductsId === null || checkedProductsId === void 0 ? void 0 : checkedProductsId.filter(function (it) { return it !== product.id; }));
    }, [isChecked]);
    //FUNCTION
    var showSettingsModal = function (product) {
        if (setChoosenProduct)
            setChoosenProduct(product);
        if (setIsOpenSettings)
            setIsOpenSettings(true);
    };
    var showGroupModal = function (product) {
        if (setChoosenProduct)
            setChoosenProduct(product);
        if (setIsOpenGroup)
            setIsOpenGroup(true);
    };
    if (!product)
        return null;
    return (React.createElement("div", { className: classes_lib_1.cls(_ProductLK_module_scss_1["default"].LKProduct, className) },
        variant === productLK_model_1.EProductLKVariants.DEFAULT && category && React.createElement("span", { className: _ProductLK_module_scss_1["default"].category }, category[0].name),
        React.createElement("div", { className: _ProductLK_module_scss_1["default"].imageContainer },
            React.createElement(ImageAPI_1.ImageAPI, { src: product.media.attachments[0] }),
            React.createElement(Checkbox_1.InputCheckbox, { className: _ProductLK_module_scss_1["default"].checkbox, setIsChecked: setIsChecked, isChecked: isChecked }),
            React.createElement("div", { className: _ProductLK_module_scss_1["default"].settings }, variant === productLK_model_1.EProductLKVariants.DEFAULT
                ? React.createElement(Button_1.Button, { variant: Button_1.ButtonVariant.DEFAULT, className: _ProductLK_module_scss_1["default"].iconWrapper, beforeImage: gear_data_icon_1.GEAR_ICON, onClick: function () { return showSettingsModal(product); } }) :
                React.createElement(BottomInfo_1.BottomInfoModal, { variant: bottomInfoModal_model_1.EBottomInfoVariant.SETTINGS, classNameButtonContainer: _ProductLK_module_scss_1["default"].groupSettings, product: product, setIsOpen: setIsOpenGroup ? setIsOpenGroup : function () { }, isTitle: false }))),
        React.createElement("div", { className: _ProductLK_module_scss_1["default"].infoContainer },
            React.createElement(Button_1.Button, { variant: Button_1.ButtonVariant.DEFAULT, className: _ProductLK_module_scss_1["default"].productName, title: (_b = product.name) !== null && _b !== void 0 ? _b : '', href: pages_url_config_1.MAIN_PAGES.CURRENT_PRODUCT(product.id).path }),
            React.createElement("div", { className: _ProductLK_module_scss_1["default"].bottomContainer },
                React.createElement("div", { className: _ProductLK_module_scss_1["default"].productRestInfo },
                    React.createElement("p", { className: _ProductLK_module_scss_1["default"].productColor }, product.media.color),
                    React.createElement("span", { className: _ProductLK_module_scss_1["default"].productArticle }, product.media.article)),
                variant === productLK_model_1.EProductLKVariants.DEFAULT && groupProductsLength > 1 && React.createElement("div", { className: _ProductLK_module_scss_1["default"].groupNavigate },
                    React.createElement("p", { className: _ProductLK_module_scss_1["default"].groupLength },
                        "+",
                        groupProductsLength),
                    React.createElement(ButtonArrowWOLine_1.ButtonArrowWOLine
                    // onClick={showGroupModal}
                    , { 
                        // onClick={showGroupModal}
                        axis: choosenProduct && choosenProduct.id === product.id && isOpenGroup ? button_model_1.Axis.Top : button_model_1.Axis.Default, onClick: function () { return showGroupModal(product); } }))))));
};
