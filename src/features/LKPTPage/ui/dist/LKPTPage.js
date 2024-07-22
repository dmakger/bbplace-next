"use strict";
exports.__esModule = true;
exports.LKPTPage = void 0;
var classes_lib_1 = require("@/shared/lib/classes.lib");
var _LKPTPage_module_scss_1 = require("./_LKPTPage.module.scss");
exports.LKPTPage = function (_a) {
    var _b;
    var className = _a.className, optionsTab = _a.optionsTab, selectedOption = _a.selectedOption;
    return (React.createElement("div", { className: classes_lib_1.cls(_LKPTPage_module_scss_1["default"].LKPTPage, className) }, selectedOption && selectedOption.value && optionsTab[selectedOption.value] &&
        React.createElement(React.Fragment, null, (_b = optionsTab[selectedOption.value]) === null || _b === void 0 ? void 0 : _b.optionTab)));
};
