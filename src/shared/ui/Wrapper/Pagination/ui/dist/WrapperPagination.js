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
exports.WrapperPaginationChild = exports.WrapperPagination = void 0;
var react_1 = require("react");
var classes_lib_1 = require("@/shared/lib/classes.lib");
var _WrapperPagination_module_scss_1 = require("./_WrapperPagination.module.scss");
var Pagination_1 = require("@/widgets/Pagination/ui/Pagination");
var navigation_1 = require("next/navigation");
var HandleSize_1 = require("@/shared/ui/Handle/Size/HandleSize");
var SuspenseL_1 = require("@/shared/ui/Wrapper/SuspenseL/SuspenseL");
exports.WrapperPagination = function (_a) {
    var rest = __rest(_a, []);
    return (React.createElement(SuspenseL_1["default"], null,
        React.createElement(exports.WrapperPaginationChild, __assign({}, rest))));
};
exports.WrapperPaginationChild = function (_a) {
    var amount = _a.amount, active = _a.active, keyPageParam = _a.keyPageParam, set = _a.set, _b = _a.defaultPageNumber, defaultPageNumber = _b === void 0 ? 1 : _b, children = _a.children, className = _a.className;
    // ROUTER
    var pathname = navigation_1.usePathname();
    var searchParams = navigation_1.useSearchParams();
    var currentPageNumber = searchParams.get(keyPageParam);
    var router = navigation_1.useRouter();
    // STATE
    var _c = react_1.useState(1), amountCore = _c[0], setAmountCore = _c[1];
    var _d = react_1.useState(defaultPageNumber), pageNumber = _d[0], setPageNumber = _d[1];
    var _e = react_1.useState(9), amountContent = _e[0], setAmountContent = _e[1];
    var _f = react_1.useState(false), is768 = _f[0], setIs768 = _f[1];
    // EFFECT
    react_1.useEffect(function () {
        if (amountCore !== amount)
            setAmountCore(amount);
    }, [amount]);
    react_1.useEffect(function () {
        setPageNumber(function (prevState) {
            var _currentPageNumber = currentPageNumber === null ? defaultPageNumber : parseInt(currentPageNumber);
            return _currentPageNumber === prevState ? prevState : _currentPageNumber;
        });
    }, [defaultPageNumber, currentPageNumber]);
    react_1.useEffect(function () {
        if (active !== pageNumber) {
            set(pageNumber);
        }
    }, [active, searchParams]);
    react_1.useEffect(function () {
        var newAmountContent = is768 ? 4 : 9;
        if (newAmountContent !== amountContent)
            setAmountContent(newAmountContent);
    }, [is768]);
    // ON CLICK
    var handleOnClickItem = function (n) {
        var params = new URLSearchParams(searchParams.toString());
        params.set(keyPageParam, "" + n);
        router.push(pathname + "?" + params.toString());
        setPageNumber(n);
    };
    return (React.createElement("div", { className: classes_lib_1.cls(_WrapperPagination_module_scss_1["default"].block, className) },
        children,
        amountCore > 1 &&
            React.createElement(Pagination_1.Pagination, { active: pageNumber, amount: amountCore, amountContent: amountContent, onClickItem: handleOnClickItem, className: _WrapperPagination_module_scss_1["default"].pagination }),
        React.createElement(HandleSize_1.HandleSize, { width: 768, set: setIs768 })));
};
