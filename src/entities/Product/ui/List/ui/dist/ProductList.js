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
exports.ProductListChild = exports.ProductList = void 0;
var react_1 = require("react");
var _ProductList_module_scss_1 = require("./_ProductList.module.scss");
var view_product_model_1 = require("../../../model/view.product.model");
var product_api_1 = require("../../../api/product.api");
var product_lib_1 = require("../../../lib/product.lib");
var product_data_1 = require("../../../data/product.data");
var react_redux_1 = require("react-redux");
var ptc_storage_1 = require("@/features/storage/PTC/ptc.storage");
var ptc_model_1 = require("@/widgets/NavBarPTC/model/ptc.model");
var ProductAutoList_1 = require("../Auto/ProductAutoList");
var WrapperPagination_1 = require("@/shared/ui/Wrapper/Pagination/ui/WrapperPagination");
var product_params_config_1 = require("@/config/params/product.params.config");
var SortFilterSidebar_1 = require("@/widgets/SortFilterSidebar");
var WrapperSortFilter_1 = require("@/shared/ui/Wrapper/SortFilter/ui/WrapperSortFilter");
var currency_metrics_api_1 = require("@/entities/Metrics/api/currency.metrics.api");
var metrics_metrics_api_1 = require("@/entities/Metrics/api/metrics.metrics.api");
var navigation_1 = require("next/navigation");
var backend_params_config_1 = require("@/config/params/backend.params.config");
var SuspenseL_1 = require("@/shared/ui/Wrapper/SuspenseL/SuspenseL");
var params_product_lib_1 = require("@/entities/Product/lib/params.product.lib");
var lodash_1 = require("lodash");
exports.ProductList = function (_a) {
    var rest = __rest(_a, []);
    return (React.createElement(SuspenseL_1["default"], null,
        React.createElement(exports.ProductListChild, __assign({}, rest))));
};
exports.ProductListChild = function (_a) {
    var view = _a.view, className = _a.className;
    // ROUTER
    var searchParams = navigation_1.useSearchParams();
    var backParams = backend_params_config_1.paramsToBack(searchParams);
    // STATE
    var _b = react_1.useState({}), prevBackParams = _b[0], setPrevBackParams = _b[1];
    var _c = react_1.useState([]), productList = _c[0], setProductList = _c[1];
    var _d = react_1.useState(1), pageNumber = _d[0], setPageNumber = _d[1];
    var _e = react_1.useState(view_product_model_1.DEFAULT_VIEW_PRODUCT), viewProductList = _e[0], setViewProductList = _e[1];
    // API
    var currencyList = currency_metrics_api_1.CurrencyAPI.useGetCurrenciesQuery().data;
    var metrics = metrics_metrics_api_1.MetricsAPI.useGetMetricsQuery().data;
    var _f = product_api_1.ProductAPI.useGetProductsQuery({ limit: product_data_1.PRODUCT_ARGS_REQUEST.limit, page: pageNumber - 1, params: backParams }, { refetchOnMountOrArgChange: true }), productsAPI = _f.data, isProductLoading = _f.isLoading;
    var _g = product_api_1.ProductAPI.useGetCountProductsQuery({ limit: product_data_1.PRODUCT_ARGS_REQUEST.limit, params: backParams }, { refetchOnMountOrArgChange: true }), countProducts = _g.data, isCountProductsLoading = _g.isLoading;
    var _h = product_api_1.ProductAPI.useGetCountProductsQuery({ limit: 1, params: backParams }, { refetchOnMountOrArgChange: true }), countAllProducts = _h.data, isCountAllProductsLoading = _h.isLoading;
    // RTK
    var dispatch = react_redux_1.useDispatch();
    // EFFECT
    react_1.useEffect(function () {
        if (view !== undefined) {
            setViewProductList(view);
            return;
        }
        var productView = product_params_config_1.PRODUCT_PARAMS.getView(searchParams.get(product_params_config_1.PRODUCT_PARAMS.VIEW__KEY));
        setViewProductList(params_product_lib_1.getViewProductByParam(productView));
    }, [view, searchParams]);
    react_1.useEffect(function () {
        if (productsAPI)
            setProductList(product_lib_1.productApiListToProductList(productsAPI, metrics, currencyList));
    }, [productsAPI, metrics, currencyList]);
    react_1.useEffect(function () {
        if (!lodash_1.isEqual(backParams, prevBackParams)) {
            setPrevBackParams(backParams);
        }
    }, [backParams]);
    react_1.useEffect(function () {
        if (!isCountAllProductsLoading && countAllProducts !== undefined) {
            dispatch(ptc_storage_1.PTCSlice.actions.setPTC({
                amount: countAllProducts,
                view: ptc_model_1.EPTC.PRODUCT
            }));
        }
    }, [dispatch, countAllProducts, isCountAllProductsLoading]);
    react_1.useEffect(function () {
        if (searchParams) {
            var pageParam = searchParams.get(product_params_config_1.PRODUCT_PARAMS.NUMBER_PAGE__KEY);
            if (pageParam) {
                setPageNumber(+pageParam);
            }
        }
    }, [searchParams]);
    if (isProductLoading && isCountProductsLoading)
        return React.createElement("div", null, "Loading...");
    return (React.createElement(WrapperSortFilter_1.WrapperSortFilter, { variant: SortFilterSidebar_1.ECatalogVariants.PRODUCTS, pageNumberKey: product_params_config_1.PRODUCT_PARAMS.NUMBER_PAGE__KEY },
        React.createElement(WrapperPagination_1.WrapperPagination, { amount: countProducts || 1, active: pageNumber, keyPageParam: product_params_config_1.PRODUCT_PARAMS.NUMBER_PAGE__KEY, set: setPageNumber, className: _ProductList_module_scss_1["default"].block },
            React.createElement(ProductAutoList_1.ProductAutoList, { products: productList, view: viewProductList, className: className }))));
};
