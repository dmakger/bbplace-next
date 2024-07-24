"use strict";
exports.__esModule = true;
exports.DetailedPageInfo = void 0;
var react_1 = require("react");
var classes_lib_1 = require("@/shared/lib/classes.lib");
var _DetailedPageInfo_module_scss_1 = require("./_DetailedPageInfo.module.scss");
var SwitchSelector_1 = require("@/shared/ui/SwitchSelector");
var detailedPageInfo_lib_1 = require("../lib/detailedPageInfo.lib");
exports.DetailedPageInfo = function (_a) {
    var className = _a.className, options = _a.options, defaultOption = _a.defaultOption, optionsTab = _a.optionsTab;
    var _b = react_1.useState(defaultOption), selectedOption = _b[0], setSelectedOption = _b[1];
    var productPageOptionsArray = detailedPageInfo_lib_1.convertObjectToArray(optionsTab);
    return (react_1["default"].createElement("div", { className: classes_lib_1.cls(_DetailedPageInfo_module_scss_1["default"].DetailedPageInfo, className) },
        react_1["default"].createElement(SwitchSelector_1.SwitchSelector, { className: _DetailedPageInfo_module_scss_1["default"].switchSelectorButton, options: options, selectedOption: selectedOption, setSelectedOption: setSelectedOption, optionsTab: optionsTab }),
        react_1["default"].createElement("div", { className: _DetailedPageInfo_module_scss_1["default"].optionsTabContainer }, optionsTab && productPageOptionsArray.map(function (it) { return (react_1["default"].createElement(react_1["default"].Fragment, { key: it.key }, it.value.optionTab)); }))));
};
