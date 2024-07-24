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
exports.WrapperModalBottomDropSearch = void 0;
var WrapperModalBottom_1 = require("../ui/WrapperModalBottom");
var _WrapperModalBottomDropSearch_module_scss_1 = require("./_WrapperModalBottomDropSearch.module.scss");
var Input_1 = require("@/shared/ui/Input/Input");
var search_data_icon_1 = require("@/shared/ui/Icon/data/search.data.icon");
var text_input_model_1 = require("@/shared/ui/Input/Text/model/text.input.model");
var input_model_1 = require("@/shared/ui/Input/model/input.model");
var ListOption_1 = require("@/shared/ui/List/Option/ui/List/ListOption");
exports.WrapperModalBottomDropSearch = function (_a) {
    var title = _a.title, searchQuery = _a.searchQuery, handleInputChange = _a.handleInputChange, options = _a.options, onClickOption = _a.onClickOption, rest = __rest(_a, ["title", "searchQuery", "handleInputChange", "options", "onClickOption"]);
    return (React.createElement(WrapperModalBottom_1.WrapperModalBottom, __assign({ topChildren: React.createElement("div", { className: _WrapperModalBottomDropSearch_module_scss_1["default"].searchWrapper },
            React.createElement(Input_1["default"].Text, { inputTypeVariant: text_input_model_1.EInputTextTypeVariants.TEXT, variant: input_model_1.EInputVariants.RECTANGULAR, beforeImage: search_data_icon_1.SEARCH__ICON, beforeProps: { width: 16, height: 16 }, placeholder: title, defaultValue: searchQuery, onChangeEvent: handleInputChange, autoFocus: true })), bottomChildren: React.createElement(ListOption_1.ListOption, { items: options, onClickItem: onClickOption }) }, rest)));
};
