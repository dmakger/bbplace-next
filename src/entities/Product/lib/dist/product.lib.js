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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.processProduct = exports.productToProductAPI = exports.productApiToProduct = exports.productApiListToProductList = void 0;
var currency_metrics_lib_1 = require("@/entities/Metrics/lib/currency.metrics.lib");
var base_metrics_metrics_lib_1 = require("@/entities/Metrics/lib/metrics/base.metrics.metrics.lib");
exports.productApiListToProductList = function (productListAPI, metrics, currencyList) {
    return productListAPI.map(function (it) { return exports.productApiToProduct({ productAPI: it, metrics: metrics, currencyList: currencyList }); });
};
// PRODUCT API => PRODUCT 
// Из {IProductAPI} ===> {IProduct}
exports.productApiToProduct = function (_a) {
    var productAPI = _a.productAPI, metrics = _a.metrics, currencyList = _a.currencyList, _b = _a.hasSupplier, hasSupplier = _b === void 0 ? false : _b;
    var media = JSON.parse(productAPI.media);
    var characteristics = JSON.parse(productAPI.characteristics);
    return exports.processProduct(__assign(__assign({}, productAPI), { media: media,
        characteristics: characteristics }), metrics, currencyList);
};
// PRODUCT => PRODUCT API
// Из {IProduct} ===> {IProductAPI}
exports.productToProductAPI = function (product) {
    var media = JSON.stringify(product.media);
    var characteristics = JSON.stringify(product.characteristics);
    return __assign(__assign({}, product), { media: media,
        characteristics: characteristics });
};
// ============={ PROCESS }================
// Обработка
exports.processProduct = function (product, metrics, currencyList, hasSupplier) {
    var _product = __assign({}, product);
    _product = processProductWholesalePrices(_product, metrics, currencyList);
    _product.media.wholesalePrices = _product.media.wholesalePrices.map(function (it) { return (__assign(__assign({}, it), { quantity: +it.quantity })); });
    return _product;
};
/**
 * ОБРАБОТКА WHOLESALE:
 * 1. Если в `wholesalePrices`, `metrics` является id-шником, то превращает её в объект `IMetrics`
 * 2. Если в `wholesalePrices` нет `metrics`, то добавляет его как объект `IMetrics`
 * 3. Если `price` строка, то превращает её в `Float`
 * 4. Превращает `currency` из (number | string) в `ICurrency`
 */
var processProductWholesalePrices = function (product, metrics, currencyList) {
    var _product = __assign({}, product);
    if (!metrics)
        return _product;
    var wholesalePricesWMetrics = __spreadArrays(_product.media.wholesalePrices);
    var priceUnits = base_metrics_metrics_lib_1.metricsToObject(_product.media.priceUnits, metrics);
    var currency = currency_metrics_lib_1.currencyToObject(_product.media.currency, currencyList);
    wholesalePricesWMetrics = wholesalePricesWMetrics.map(function (it) {
        var price = typeof it.price === 'string' ? parseFloat(it.price) : it.price;
        var ans = __assign(__assign({}, it), { price: price, currency: currency });
        if (it.metrics === undefined)
            return __assign(__assign({}, ans), { metrics: priceUnits });
        return __assign(__assign({}, ans), { metrics: base_metrics_metrics_lib_1.metricsToObject(it.metrics, metrics) });
    });
    return __assign(__assign({}, _product), { media: __assign(__assign({}, _product.media), { priceUnits: priceUnits, currency: currency, wholesalePrices: wholesalePricesWMetrics }) });
};
// // ДОБАВЛЕНИЕ В ПРОДУКТ {SUPPLIER}
// const 
