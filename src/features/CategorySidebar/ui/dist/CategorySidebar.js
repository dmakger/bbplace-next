'use client';
"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.CategorySidebar = void 0;
var WrapperClickOutside_1 = require("@/shared/ui/Wrapper/ClickOutside/WrapperClickOutside");
var _CategorySidebar_module_scss_1 = require("./_CategorySidebar.module.scss");
var react_1 = require("react");
var classes_lib_1 = require("@/shared/lib/classes.lib");
var category_metrics_api_1 = require("@/entities/Metrics/api/category.metrics.api");
var CategoryColumn_1 = require("../components/CategoryColumn/CategoryColumn");
exports.CategorySidebar = function (_a) {
    var isShowCategories = _a.isShowCategories, toggleShowCategories = _a.toggleShowCategories;
    //STATE
    var _b = react_1.useState([]), selectedCategoriesArray = _b[0], setSelectedCategoriesArray = _b[1];
    var _c = react_1.useState([]), filteredCategories = _c[0], setFilteredCategories = _c[1];
    //API
    var categories = category_metrics_api_1.CategoryAPI.useGetCategoriesWithSubcategoriesQuery().data;
    //REF
    var ref = react_1.useRef(null);
    //EFFECT
    react_1.useEffect(function () {
        if (categories)
            setFilteredCategories(categories.filter(function (it) { return it.name !== 'Нет категории'; }));
    }, [categories]);
    react_1.useEffect(function () {
        if (!isShowCategories) {
            setSelectedCategoriesArray([]);
        }
    }, [isShowCategories]);
    var handleHoverCategory = function (index, it) {
        var newSelectedOptions = __spreadArrays(selectedCategoriesArray);
        if (it.depth === 0) {
            newSelectedOptions = [it];
        }
        else if (it.depth >= newSelectedOptions.length) {
            newSelectedOptions.push(it);
        }
        else {
            newSelectedOptions = newSelectedOptions.slice(0, it.depth);
            newSelectedOptions[it.depth] = it;
        }
        setSelectedCategoriesArray(newSelectedOptions);
    };
    return (React.createElement(WrapperClickOutside_1["default"], { isShow: isShowCategories, _ref: ref, handle: toggleShowCategories },
        React.createElement("div", { className: classes_lib_1.cls(_CategorySidebar_module_scss_1["default"].CategorySidebar, isShowCategories ? _CategorySidebar_module_scss_1["default"].show : '') },
            React.createElement(CategoryColumn_1.CategoryColumn, { className: classes_lib_1.cls(isShowCategories ? _CategorySidebar_module_scss_1["default"].addMainColumn : ''), categories: filteredCategories || [], onHover: handleHoverCategory }),
            selectedCategoriesArray && selectedCategoriesArray.map(function (it) {
                return it.subcategories.length > 0 ? (React.createElement(CategoryColumn_1.CategoryColumn, { key: it.id, categories: it.subcategories, onHover: handleHoverCategory, className: classes_lib_1.cls(_CategorySidebar_module_scss_1["default"].subColumn, selectedCategoriesArray.length > it.depth ? _CategorySidebar_module_scss_1["default"].addColumn : ''), toggleShowCategories: toggleShowCategories })) : null;
            }))));
};
