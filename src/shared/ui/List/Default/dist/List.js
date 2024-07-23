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
exports.__esModule = true;
exports.List = void 0;
var classes_lib_1 = require("@/shared/lib/classes.lib");
var _List_module_scss_1 = require("./_List.module.scss");
var list_data_1 = require("@/shared/data/list.data");
exports.List = function (_a) {
    var items = _a.items, ListItemComponent = _a.component, componentProps = _a.componentProps, _b = _a.direction, direction = _b === void 0 ? list_data_1.DEFAULT__LIST_DIRECTION : _b, className = _a.className;
    return (React.createElement("div", { className: classes_lib_1.cls(_List_module_scss_1["default"].list, _List_module_scss_1["default"][direction], className) }, items.map(function (it) { return (React.createElement(ListItemComponent, __assign({}, componentProps, { item: it }))); })));
};
