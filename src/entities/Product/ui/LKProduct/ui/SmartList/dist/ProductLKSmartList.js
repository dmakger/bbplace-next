"use client";
"use strict";
exports.__esModule = true;
exports.ProductLKSmartList = void 0;
var react_1 = require("react");
var classes_lib_1 = require("@/shared/lib/classes.lib");
var _ProductLKSmartList_module_scss_1 = require("./_ProductLKSmartList.module.scss");
var product_api_1 = require("@/entities/Product/api/product.api");
var currency_metrics_api_1 = require("@/entities/Metrics/api/currency.metrics.api");
var metrics_metrics_api_1 = require("@/entities/Metrics/api/metrics.metrics.api");
var hooks_1 = require("@/storage/hooks");
var product_lib_1 = require("@/entities/Product/lib/product.lib");
var SuspenseL_1 = require("@/shared/ui/Wrapper/SuspenseL/SuspenseL");
var LKSubheader_1 = require("@/features/LKSubheader");
var ProductLKList_1 = require("../list/ProductLKList");
var Modal_1 = require("@/shared/ui/Modal/Modal");
var BottomInfo_1 = require("@/features/Modal/BottomInfo");
var bottomInfoModal_model_1 = require("@/features/Modal/BottomInfo/model/bottomInfoModal.model");
var modal_data_1 = require("@/shared/data/modal.data");
var ModalBottom_1 = require("@/shared/ui/Wrapper/ModalBottom");
var productLK_model_1 = require("../../model/productLK.model");
var switchSelector_data_1 = require("@/shared/ui/SwitchSelector/data/switchSelector.data");
var query_1 = require("@reduxjs/toolkit/query");
exports.ProductLKSmartList = function (_a) {
    var typeProduct = _a.typeProduct, className = _a.className;
    //STATE
    var _b = react_1.useState(false), isOpenSettings = _b[0], setIsOpenSettings = _b[1];
    var _c = react_1.useState(false), isOpenGroup = _c[0], setIsOpenGroup = _c[1];
    var _d = react_1.useState([]), products = _d[0], setProducts = _d[1];
    var _e = react_1.useState(), choosenProduct = _e[0], setChoosenProduct = _e[1];
    var _f = react_1.useState([]), groupProducts = _f[0], setGroupProducts = _f[1];
    var _g = react_1.useState([]), checkedProductsId = _g[0], setCheckedProductsId = _g[1];
    // RTK
    var userId = hooks_1.useAppSelector(function (state) { return state.user; }).id;
    //API
    // const { data: activeProductsAPI } = ProductAPI.useGetProductsByUserQuery({ userId: `55736903-ec19-4ea8-a591-fb03369910b0`, limit: 100000000, page: 0 }, { refetchOnMountOrArgChange: true })
    var activeProductsAPI = product_api_1.ProductAPI.useGetProductsByUserQuery(typeProduct === switchSelector_data_1.ProductsTypeLK.Active ? { userId: userId, limit: 100000000, page: 0 } : query_1.skipToken, { refetchOnMountOrArgChange: true }).data;
    // const { data: draftsProductsAPI } = ProductAPI.useGetDraftsByUserQuery({ limit: 100000000, page: 0 }, { refetchOnMountOrArgChange: true })
    var draftsProductsAPI = product_api_1.ProductAPI.useGetDraftsByUserQuery(typeProduct === switchSelector_data_1.ProductsTypeLK.Draft ? { limit: 100000000, page: 0 } : query_1.skipToken, { refetchOnMountOrArgChange: true }).data;
    var currencyList = currency_metrics_api_1.CurrencyAPI.useGetCurrenciesQuery().data;
    var metrics = metrics_metrics_api_1.MetricsAPI.useGetMetricsQuery().data;
    //EFFECT
    react_1.useEffect(function () {
        if (activeProductsAPI && metrics && currencyList) {
            setProducts(product_lib_1.productApiListToProductList(activeProductsAPI, metrics, currencyList));
        }
        if (draftsProductsAPI && metrics && currencyList) {
            setProducts(product_lib_1.productApiListToProductList(draftsProductsAPI, metrics, currencyList));
        }
    }, [activeProductsAPI, draftsProductsAPI, metrics, currencyList]);
    //FUNCTIONS
    var closeTheModal = react_1.useCallback(function () {
        if (isOpenSettings)
            setIsOpenSettings(false);
        if (isOpenGroup)
            setIsOpenGroup(false);
    }, [isOpenSettings, isOpenGroup]);
    return (React.createElement(SuspenseL_1["default"], null,
        React.createElement(LKSubheader_1.LKSubheader, { checkedItemsNumber: checkedProductsId.length, className: checkedProductsId.length ? _ProductLKSmartList_module_scss_1["default"].showSubheader : '', checkedProductsId: checkedProductsId, setCheckedProductsId: setCheckedProductsId }),
        products.length > 0 && (React.createElement(ProductLKList_1.ProductLKList, { products: products, setIsOpenSettings: setIsOpenSettings, isOpenGroup: isOpenGroup, setIsOpenGroup: setIsOpenGroup, choosenProduct: choosenProduct, setChoosenProduct: setChoosenProduct, setGroupProducts: setGroupProducts, checkedProductsId: checkedProductsId, setCheckedProducts: setCheckedProductsId, variant: productLK_model_1.EProductLKVariants.DEFAULT })),
        React.createElement(Modal_1.Modal, { view: modal_data_1.EModalView.BOTTOM, buttonNode: true, _isOpen: isOpenSettings || isOpenGroup, onClickOverlay: closeTheModal },
            React.createElement(ModalBottom_1.WrapperModalBottom, { setIsOpen: closeTheModal, title: isOpenSettings ? "Выбор действия" : isOpenGroup && !checkedProductsId.length ? 'Варианты товара' : '', className: checkedProductsId.length ? _ProductLKSmartList_module_scss_1["default"].noPadding : '', classNameTitle: !checkedProductsId.length && isOpenGroup ? _ProductLKSmartList_module_scss_1["default"].showTitle : '', classNameTopChild: isOpenGroup ? _ProductLKSmartList_module_scss_1["default"].noMarginTop : '', topChildren: isOpenGroup && (React.createElement(LKSubheader_1.LKSubheader, { checkedItemsNumber: checkedProductsId.length, className: classes_lib_1.cls(_ProductLKSmartList_module_scss_1["default"].subHeaderModal, checkedProductsId.length ? _ProductLKSmartList_module_scss_1["default"].showSubheader : ''), checkedProductsId: checkedProductsId, setCheckedProductsId: setCheckedProductsId })), bottomChildren: isOpenSettings ? (products.length > 0 && (React.createElement(BottomInfo_1.BottomInfoModal, { variant: bottomInfoModal_model_1.EBottomInfoVariant.SETTINGS, product: choosenProduct, setIsOpen: setIsOpenSettings }))) : (isOpenGroup && groupProducts.length > 0 && (React.createElement(ProductLKList_1.ProductLKList, { products: groupProducts, variant: productLK_model_1.EProductLKVariants.GROUP_ITEM, checkedProductsId: checkedProductsId, setCheckedProducts: setCheckedProductsId }))), classNameBottomChild: isOpenGroup ? _ProductLKSmartList_module_scss_1["default"].paddingTop : '', isBorderTopOnBottomChild: isOpenGroup && groupProducts.length > 2 }))));
};
