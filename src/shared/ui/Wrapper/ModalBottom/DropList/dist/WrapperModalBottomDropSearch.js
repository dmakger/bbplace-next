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
exports.WrapperModalBottomDropList = void 0;
var WrapperModalBottom_1 = require("../ui/WrapperModalBottom");
var ListOption_1 = require("@/shared/ui/List/Option/ui/List/ListOption");
exports.WrapperModalBottomDropList = function (_a) {
    var options = _a.options, onClickOption = _a.onClickOption, rest = __rest(_a, ["options", "onClickOption"]);
    return (React.createElement(WrapperModalBottom_1.WrapperModalBottom, __assign({ bottomChildren: React.createElement(ListOption_1.ListOption, { items: options, onClickOption: onClickOption }) }, rest)));
};
