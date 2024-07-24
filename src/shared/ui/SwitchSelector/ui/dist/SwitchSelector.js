'use client';
"use strict";
exports.__esModule = true;
exports.SwitchSelector = void 0;
var classes_lib_1 = require("@/shared/lib/classes.lib");
var _SwitchSelector_module_scss_1 = require("./_SwitchSelector.module.scss");
var react_1 = require("react");
var image_1 = require("next/image");
var switchSelector_model_1 = require("../model/switchSelector.model");
var navigation_1 = require("next/navigation");
exports.SwitchSelector = function (_a) {
    var _b = _a.variant, variant = _b === void 0 ? switchSelector_model_1.ESwitchSelectorVariants.DEFAULT : _b, className = _a.className, _c = _a.options, options = _c === void 0 ? [] : _c, selectedOption = _a.selectedOption, setSelectedOption = _a.setSelectedOption, optionsTab = _a.optionsTab;
    //STATE
    var _d = react_1.useState({ width: 0, left: 0 }), lineStyle = _d[0], setLineStyle = _d[1];
    var _e = react_1.useState(false), isAtTop = _e[0], setIsAtTop = _e[1];
    //REF
    var switchSelectorRef = react_1.useRef(null);
    var selectedOptionRef = react_1.useRef(null);
    //ROUTER
    var router = navigation_1.useRouter();
    //EFFECT
    react_1.useEffect(function () {
        if (selectedOptionRef.current && variant === switchSelector_model_1.ESwitchSelectorVariants.DEFAULT) {
            setLineStyle({
                width: selectedOptionRef.current.offsetWidth,
                left: selectedOptionRef.current.offsetLeft
            });
        }
    }, [options, selectedOption]);
    react_1.useEffect(function () {
        var handleScroll = function () {
            if (switchSelectorRef.current) {
                var rect = switchSelectorRef.current.getBoundingClientRect();
                setIsAtTop(rect.top <= 0);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return function () { return window.removeEventListener('scroll', handleScroll); };
    }, []);
    //FUNCTIONS
    var selectOption = function (option) {
        setSelectedOption(option);
        var element = document.getElementById('value' in option ? String(option.value) : '');
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        if (variant === switchSelector_model_1.ESwitchSelectorVariants.TABS) {
            options.length > 1 && router.push("?type=" + option.value);
        }
    };
    var isChecked = react_1.useCallback(function (selectOption, mapItem) {
        return selectOption.id === mapItem.id;
    }, [selectedOption]);
    var scrollToTop = function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    return (React.createElement("div", { className: classes_lib_1.cls(_SwitchSelector_module_scss_1["default"].SwitchSelector, _SwitchSelector_module_scss_1["default"][variant], isAtTop ? _SwitchSelector_module_scss_1["default"].sticky : '', className), ref: switchSelectorRef },
        React.createElement("div", { className: _SwitchSelector_module_scss_1["default"].optionsContainer },
            React.createElement("div", { className: _SwitchSelector_module_scss_1["default"].leftContainer }, options.map(function (it) {
                var _a, _b;
                var optionValue = (_a = it.value) !== null && _a !== void 0 ? _a : '';
                var optionQuantity = optionsTab && ((_b = optionsTab[optionValue]) === null || _b === void 0 ? void 0 : _b.optionQuantity);
                return (React.createElement("button", { className: classes_lib_1.cls(_SwitchSelector_module_scss_1["default"].option, options.length > 1 ? _SwitchSelector_module_scss_1["default"].optionHover : '', isChecked(selectedOption, it) ? _SwitchSelector_module_scss_1["default"].choosen : ''), ref: isChecked(selectedOption, it) ? selectedOptionRef : null, key: it.id, onClick: function () { return selectOption(it); } },
                    React.createElement("input", { type: "radio", id: String(it.id), name: it.name, checked: isChecked(selectedOption, it), onChange: function () { } }),
                    React.createElement("label", { htmlFor: String(it.id) },
                        it.name,
                        optionQuantity !== undefined && React.createElement("span", { className: _SwitchSelector_module_scss_1["default"].optionQuantity }, optionQuantity))));
            })),
            variant === switchSelector_model_1.ESwitchSelectorVariants.DEFAULT && React.createElement("button", { className: _SwitchSelector_module_scss_1["default"].arrowUp, onClick: scrollToTop },
                React.createElement(image_1["default"], { src: '/arrowUp.svg', alt: "", width: 16, height: 16 }))),
        variant === switchSelector_model_1.ESwitchSelectorVariants.DEFAULT && options.length > 1 && React.createElement("span", { className: classes_lib_1.cls(_SwitchSelector_module_scss_1["default"].choosenLine, isAtTop ? _SwitchSelector_module_scss_1["default"].stickyChoosenLine : ''), style: { width: lineStyle.width + "px", left: lineStyle.left + "px" } })));
};
