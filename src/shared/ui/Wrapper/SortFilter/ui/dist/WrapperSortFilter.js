"use strict";
exports.__esModule = true;
exports.WrapperSortFilter = void 0;
var classes_lib_1 = require("@/shared/lib/classes.lib");
var _WrapperSortFilter_module_scss_1 = require("./_WrapperSortFilter.module.scss");
var SortFilterSidebar_1 = require("@/widgets/SortFilterSidebar");
var SuspenseL_1 = require("@/shared/ui/Wrapper/SuspenseL/SuspenseL");
exports.WrapperSortFilter = function (_a) {
    var _b = _a.variant, variant = _b === void 0 ? SortFilterSidebar_1.ECatalogVariants.NONE : _b, pageNumberKey = _a.pageNumberKey, children = _a.children, className = _a.className;
    return (React.createElement("div", { className: classes_lib_1.cls(_WrapperSortFilter_module_scss_1["default"].wrapper, className) },
        React.createElement(SuspenseL_1["default"], null,
            children,
            React.createElement(SortFilterSidebar_1.SortFilterSidebar, { variant: variant, pageNumberKey: pageNumberKey, className: _WrapperSortFilter_module_scss_1["default"].sidebar }))));
};
