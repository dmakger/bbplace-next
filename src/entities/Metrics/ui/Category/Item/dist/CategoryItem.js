"use strict";
exports.__esModule = true;
exports.CategoryItem = void 0;
var _CategoryItem_module_scss_1 = require("./_CategoryItem.module.scss");
var classes_lib_1 = require("@/shared/lib/classes.lib");
var link_1 = require("next/link");
var pages_url_config_1 = require("@/config/pages-url.config");
var image_1 = require("next/image");
exports.CategoryItem = function (_a) {
    var category = _a.category, className = _a.className, _b = _a.onMouseEnter, onMouseEnter = _b === void 0 ? function () { } : _b, _c = _a.linkHref, linkHref = _c === void 0 ? '' : _c, hasSubcategories = _a.hasSubcategories, toggleShowCategories = _a.toggleShowCategories;
    var getLinkHref = function (category) {
        if ('subcategories' in category) {
            if (!category.subcategories.length) {
                // ВМЕСТО: `${MAIN_PAGES.PRODUCTS.path}?category=${category.id}`;
                return pages_url_config_1.MAIN_PAGES.PRODUCTS + "?category=" + category.id;
            }
        }
        return linkHref;
    };
    var hideCategoriesSidebar = function () {
        toggleShowCategories && toggleShowCategories(false);
    };
    var handleMouseEnter = function (e) {
        if (onMouseEnter)
            onMouseEnter(e, category);
    };
    return (React.createElement(link_1["default"], { href: getLinkHref(category), className: classes_lib_1.cls(_CategoryItem_module_scss_1["default"].category, className), onMouseEnter: handleMouseEnter, onClick: hideCategoriesSidebar },
        React.createElement("span", { className: _CategoryItem_module_scss_1["default"].name }, category.name),
        hasSubcategories && React.createElement(image_1["default"], { src: 'arrow.svg', className: _CategoryItem_module_scss_1["default"].arrow, alt: 'arrow', width: 10, height: 10 })));
};
