'use client';
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
exports.__esModule = true;
exports.HeaderLKPT = void 0;
var classes_lib_1 = require("@/shared/lib/classes.lib");
var _HeaderLKPT_module_scss_1 = require("./_HeaderLKPT.module.scss");
var Button_1 = require("@/shared/ui/Button");
var button_model_1 = require("@/shared/model/button.model");
var SwitchSelector_1 = require("@/shared/ui/SwitchSelector");
var navigation_1 = require("next/navigation");
var pages_url_config_1 = require("@/config/pages-url.config");
var switchSelector_model_1 = require("@/shared/ui/SwitchSelector/model/switchSelector.model");
var ButtonArrowWLine_1 = require("@/shared/ui/Button/data/Arrow/WLine/ButtonArrowWLine");
var button_model_2 = require("@/shared/ui/Button/model/button.model");
/**
 * LKPT - Личный Кабинет Product Tender
 */
exports.HeaderLKPT = function (_a) {
    var title = _a.title, buttonBackProps = _a.buttonBackProps, _b = _a.isButtonAdd, isButtonAdd = _b === void 0 ? true : _b, buttonAddProps = _a.buttonAddProps, selectedOption = _a.selectedOption, setSelectedOption = _a.setSelectedOption, options = _a.options, optionsTab = _a.optionsTab, className = _a.className;
    //ROUTER
    var router = navigation_1.useRouter();
    //FUNCTION
    var backNavigation = function () {
        router.push(pages_url_config_1.DASHBOARD_PAGES.HOME.path);
    };
    return (React.createElement("div", { className: classes_lib_1.cls(_HeaderLKPT_module_scss_1["default"].HeaderLKPT, className) },
        React.createElement("div", { className: _HeaderLKPT_module_scss_1["default"].leftContainer },
            React.createElement("div", { className: _HeaderLKPT_module_scss_1["default"].backNTitle },
                React.createElement(ButtonArrowWLine_1.ButtonArrowWLine, __assign({ className: _HeaderLKPT_module_scss_1["default"].backButton, axis: button_model_1.Axis.Bottom, 
                    // onClick={backNavigation}
                    sizes: { width: 17, height: 17 } }, buttonBackProps)),
                React.createElement("span", { className: _HeaderLKPT_module_scss_1["default"].headerTitle }, title)),
            React.createElement(SwitchSelector_1.SwitchSelector, { className: _HeaderLKPT_module_scss_1["default"].switchSelector, options: options, 
                // options={[
                //     SWITCH_SELECTOR_CREATED_PRODUCTS_OPTION, 
                //     SWITCH_SELECTOR_WO_PRICE_PRODUCTS_OPTION, 
                //     SWITCH_SELECTOR_DRAFT_PRODUCTS_OPTION
                // ]} 
                setSelectedOption: setSelectedOption, selectedOption: selectedOption, optionsTab: optionsTab, variant: switchSelector_model_1.ESwitchSelectorVariants.TABS })),
        isButtonAdd &&
            React.createElement("div", { className: _HeaderLKPT_module_scss_1["default"].addButtonContainer },
                React.createElement(Button_1.Button, __assign({ variant: Button_1.ButtonVariant.FILL, color: button_model_2.ButtonColor.Primary, title: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C", className: _HeaderLKPT_module_scss_1["default"].addButton, classNameLink: _HeaderLKPT_module_scss_1["default"].addButtonLink }, buttonAddProps)))));
};
