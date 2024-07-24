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
exports.ButtonArrowWLine = void 0;
var classes_lib_1 = require("@/shared/lib/classes.lib");
var _ButtonArrowWLine_module_scss_1 = require("./_ButtonArrowWLine.module.scss");
var Button_1 = require("../../../ui/Button");
var arrow_data_icon_1 = require("@/shared/ui/Icon/data/arrow.data.icon");
var button_model_1 = require("../../../model/button.model");
exports.ButtonArrowWLine = function (_a) {
    var axis = _a.axis, onClick = _a.onClick, sizes = _a.sizes, className = _a.className, rest = __rest(_a, ["axis", "onClick", "sizes", "className"]);
    return (React.createElement(Button_1.Button, __assign({ afterImage: arrow_data_icon_1.ARROW_WLINE_SECONDARY_ICON, afterProps: { axis: axis, width: sizes === null || sizes === void 0 ? void 0 : sizes.width, height: sizes === null || sizes === void 0 ? void 0 : sizes.height }, variant: button_model_1.ButtonVariant.DEFAULT, onClick: onClick, className: classes_lib_1.cls(_ButtonArrowWLine_module_scss_1["default"].button, className) }, rest)));
};
