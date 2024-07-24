'use client';
"use strict";
exports.__esModule = true;
exports.WrapperLKPT = void 0;
var _WrapperLKPT_module_scss_1 = require("./_WrapperLKPT.module.scss");
var HeaderLK_1 = require("@/features/Headers/HeaderLK");
var LKPTPage_1 = require("@/features/LKPTPage");
var classes_lib_1 = require("@/shared/lib/classes.lib");
var switchSelector_data_1 = require("@/shared/ui/SwitchSelector/data/switchSelector.data");
var react_1 = require("react");
exports.WrapperLKPT = function (_a) {
    var _b = _a.startPage, startPage = _b === void 0 ? switchSelector_data_1.SWITCH_SELECTOR_PRODUCT_PAGE_SINGLE : _b, _c = _a.pageTitle, pageTitle = _c === void 0 ? 'Новый товар' : _c, optionsTab = _a.optionsTab, options = _a.options, buttonBackProps = _a.buttonBackProps, isButtonAdd = _a.isButtonAdd, buttonAddProps = _a.buttonAddProps, className = _a.className, classNamePage = _a.classNamePage;
    //STATE
    var _d = react_1.useState(startPage), selectedPage = _d[0], setSelectedPage = _d[1];
    var _e = react_1.useState([]), optionsTabArray = _e[0], setOptionsTabArray = _e[1];
    //EFFECT
    react_1.useEffect(function () {
        var convertToArray = function (optionsTab) {
            return Object.values(optionsTab).filter(function (option) { return option !== undefined; });
        };
        setOptionsTabArray(convertToArray(optionsTab));
    }, [optionsTab]);
    return (React.createElement("div", { className: classes_lib_1.cls(_WrapperLKPT_module_scss_1["default"].WrapperLKPT, className) },
        React.createElement(HeaderLK_1.HeaderLKPT, { title: pageTitle, options: options, optionsTab: optionsTab, selectedOption: selectedPage, setSelectedOption: setSelectedPage, buttonBackProps: buttonBackProps, isButtonAdd: isButtonAdd, buttonAddProps: buttonAddProps }),
        React.createElement(LKPTPage_1.LKPTPage, { optionsTab: optionsTabArray, selectedOption: selectedPage, className: classNamePage })));
};
