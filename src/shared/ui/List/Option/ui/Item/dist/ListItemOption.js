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
exports.ListItemOption = void 0;
var classes_lib_1 = require("@/shared/lib/classes.lib");
var _ListItemOption_module_scss_1 = require("./_ListItemOption.module.scss");
exports.ListItemOption = function (_a) {
    var item = _a.item, onClick = _a.onClick, className = _a.className, classNameText = _a.classNameText, rest = __rest(_a, ["item", "onClick", "className", "classNameText"]);
    // HANDLE
    var handleOnClickOption = function (it) {
        if (onClick)
            onClick(it);
    };
    return (React.createElement("div", __assign({ onClick: function () { return handleOnClickOption(item); }, className: classes_lib_1.cls(_ListItemOption_module_scss_1["default"].option, className) }, rest, { key: item.id }),
        React.createElement("span", { className: classNameText }, item.name)));
};
