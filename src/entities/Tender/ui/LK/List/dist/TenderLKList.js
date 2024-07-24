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
exports.TenderLKList = void 0;
var classes_lib_1 = require("@/shared/lib/classes.lib");
var _TenderLKList_module_scss_1 = require("./_TenderLKList.module.scss");
var List_1 = require("@/shared/ui/List/Default/List");
var TenderLKItem_1 = require("../Item/TenderLKItem");
var list_data_1 = require("@/shared/data/list.data");
exports.TenderLKList = function (_a) {
    var items = _a.items, onClickDelete = _a.onClickDelete, className = _a.className, rest = __rest(_a, ["items", "onClickDelete", "className"]);
    return (React.createElement(List_1.List, __assign({ items: items, direction: list_data_1.ListDirection.Wrap, component: TenderLKItem_1.TenderLKItem, componentProps: { onClickDelete: onClickDelete }, className: classes_lib_1.cls(_TenderLKList_module_scss_1["default"].list, className) }, rest)));
};
