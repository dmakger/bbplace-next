"use strict";
exports.__esModule = true;
exports.LKPTPage = void 0;
var classes_lib_1 = require("@/shared/lib/classes.lib");
var _LKPTPage_module_scss_1 = require("./_LKPTPage.module.scss");
exports.LKPTPage = function (_a) {
    var className = _a.className, optionsTab = _a.optionsTab, selectedOption = _a.selectedOption;
    return (React.createElement("div", { className: classes_lib_1.cls(_LKPTPage_module_scss_1["default"].LKPTPage, className) }, optionsTab.map(function (option, index) { return (React.createElement("div", { key: index, className: option.optionValue === selectedOption.value ? _LKPTPage_module_scss_1["default"].visible : _LKPTPage_module_scss_1["default"].hidden }, option.optionTab)); })));
};
