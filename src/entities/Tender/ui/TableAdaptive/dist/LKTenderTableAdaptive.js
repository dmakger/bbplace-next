'use client';
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.LKTenderTableAdaptive = void 0;
var react_1 = require("react");
var _LKTenderTableAdaptive_module_scss_1 = require("./_LKTenderTableAdaptive.module.scss");
var TenderLKList_1 = require("../LK/List/TenderLKList");
var LKTenderTable_1 = require("@/features/Table/ui/Tender/LK/ui/LKTenderTable");
var tender_api_1 = require("@/entities/Tender/api/tender.api");
var process_tender_lib_1 = require("@/entities/Tender/lib/process.tender.lib");
var currency_metrics_api_1 = require("@/entities/Metrics/api/currency.metrics.api");
var metrics_metrics_api_1 = require("@/entities/Metrics/api/metrics.metrics.api");
var category_metrics_api_1 = require("@/entities/Metrics/api/category.metrics.api");
var hooks_1 = require("@/storage/hooks");
var navigation_1 = require("next/navigation");
var tender_lib_1 = require("@/entities/Tender/lib/tender.lib");
var query_1 = require("@reduxjs/toolkit/query");
var HandleSize_1 = require("@/shared/ui/Handle/Size/HandleSize");
exports.LKTenderTableAdaptive = function (_a) {
    var tenderType = _a.tenderType, className = _a.className;
    // PARAMS
    var params = navigation_1.useParams();
    var tenderTypeSuccess = tenderType ? tenderType : tender_lib_1.toTenderType(params.type);
    // STATE
    var _b = react_1.useState(false), is768 = _b[0], setIs768 = _b[1];
    var _c = react_1.useState([]), tenders = _c[0], setTenders = _c[1];
    var _d = react_1.useState([]), categoryList = _d[0], setCategoryList = _d[1];
    // RTK
    var userId = hooks_1.useAppSelector(function (state) { return state.user; }).id;
    // API
    var _e = tender_api_1.TenderAPI.useGetUserTendersQuery(userId ? { userId: userId, type: tenderTypeSuccess } : query_1.skipToken), tendersAPI = _e.data, isTendersLoading = _e.isLoading;
    var currencyList = currency_metrics_api_1.CurrencyAPI.useGetCurrenciesQuery().data;
    var metrics = metrics_metrics_api_1.MetricsAPI.useGetMetricsQuery().data;
    var getCategory = category_metrics_api_1.CategoryAPI.useGetCategoryMutation()[0];
    var deleteTender = tender_api_1.TenderAPI.useDeleteTenderMutation()[0];
    // ======={ EFFECT }=======
    // SET CATEGORIES
    react_1.useEffect(function () {
        if (!tendersAPI)
            return;
        var fetchCategories = function () { return __awaiter(void 0, void 0, void 0, function () {
            var categories, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, Promise.all(tendersAPI.map(function (it) { return __awaiter(void 0, void 0, void 0, function () {
                                var categoryResponse;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, getCategory(it.categoryId).unwrap()];
                                        case 1:
                                            categoryResponse = _a.sent();
                                            return [2 /*return*/, categoryResponse[0]]; // Assuming the response is an array and we need the first element
                                    }
                                });
                            }); }))];
                    case 1:
                        categories = _a.sent();
                        setCategoryList(categories);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error("Failed to fetch categories", error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        fetchCategories();
    }, [tendersAPI, getCategory]);
    // SET TENDERS
    react_1.useEffect(function () {
        if (tendersAPI && metrics && currencyList && categoryList) {
            setTenders(function () {
                return tendersAPI.map(function (it, index) { return (__assign(__assign({}, process_tender_lib_1.tenderAPIToTender({ tenderAPI: it, metrics: metrics, currencyList: currencyList })), { category: categoryList[index] })); });
            });
        }
    }, [tendersAPI, metrics, currencyList, categoryList]);
    // ======={ HANDLE }=======
    var onClickDelete = function (tenderId, type) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (type === undefined || tenders === undefined)
                        return [2 /*return*/];
                    // deleteTender()
                    return [4 /*yield*/, deleteTender({ tenderId: tenderId, type: type }).unwrap().then(function () {
                            setTenders(function (prevTenders) { return prevTenders.filter(function (it) { return it.id !== tenderId; }); });
                        })];
                case 1:
                    // deleteTender()
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement(React.Fragment, null,
        is768 ? (React.createElement(TenderLKList_1.TenderLKList, { items: tenders, onClickDelete: onClickDelete, className: _LKTenderTableAdaptive_module_scss_1["default"].list })) : (React.createElement(LKTenderTable_1.LKTenderTable, { tenderType: tenderType, defaultTenders: tenders, onClickDeleteTender: onClickDelete })),
        React.createElement(HandleSize_1.HandleSize, { set: setIs768, width: 768 })));
};
