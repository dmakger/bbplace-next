'use client';
"use strict";
exports.__esModule = true;
exports.InputRadio = void 0;
var image_1 = require("next/image");
var classes_lib_1 = require("@/shared/lib/classes.lib");
var _InputRadio_module_scss_1 = require("./_InputRadio.module.scss");
var input_model_1 = require("../../../model/input.model");
var Button_1 = require("@/shared/ui/Button");
var checkbox_data_icon_1 = require("@/shared/ui/Icon/data/checkbox.data.icon");
var react_1 = require("react");
var radio_model_1 = require("../model/radio.model");
function InputRadio(_a) {
    var _b = _a.variant, variant = _b === void 0 ? input_model_1.EInputVariants.ROUNDED : _b, _c = _a.variantRadio, variantRadio = _c === void 0 ? radio_model_1.ERadioVariant.LIST : _c, option = _a.option, _d = _a.isActive, isActive = _d === void 0 ? false : _d, name = _a.name, _e = _a.required, required = _e === void 0 ? false : _e, onClick = _a.onClick, _f = _a.checkMarkSizes, checkMarkSizes = _f === void 0 ? {
        width: 20,
        height: 15
    } : _f, className = _a.className, warning = _a.warning, success = _a.success, selectedOption = _a.selectedOption, setSelectedOption = _a.setSelectedOption, setWarning = _a.setWarning, setSuccess = _a.setSuccess, error = _a.error;
    // STATE
    var _g = react_1.useState(false), isOwnChecked = _g[0], setIsOwnChecked = _g[1];
    // EFFECT
    react_1.useEffect(function () {
        if ((selectedOption === null || selectedOption === void 0 ? void 0 : selectedOption.id) !== option.id) {
            setIsOwnChecked(false);
        }
        if (selectedOption) {
            setWarning && setWarning(false);
            setSuccess && setSuccess(true);
        }
    }, [selectedOption]);
    react_1.useEffect(function () {
        if (error && !selectedOption) {
            setWarning && setWarning(true);
            setSuccess && setSuccess(false);
        }
    }, [error]);
    // FUNCTION
    var handleRadioClick = function (opt) {
        setWarning && setWarning(false);
        setSuccess && setSuccess(true);
        if ((selectedOption === null || selectedOption === void 0 ? void 0 : selectedOption.id) !== opt.id) {
            setIsOwnChecked(true);
            setSelectedOption && setSelectedOption(opt);
        }
    };
    var handleOnClick = function () {
        handleRadioClick(option);
        if (onClick)
            onClick();
    };
    return (React.createElement("label", { onClick: handleOnClick, className: classes_lib_1.cls(_InputRadio_module_scss_1["default"].block, _InputRadio_module_scss_1["default"][variant], (variantRadio === radio_model_1.ERadioVariant.LIST ? isActive : isOwnChecked) ? _InputRadio_module_scss_1["default"].active : '', className, variantRadio === radio_model_1.ERadioVariant.SINGLE ? _InputRadio_module_scss_1["default"].singleRadio : '', variantRadio === radio_model_1.ERadioVariant.LIST && variant === input_model_1.EInputVariants.RECTANGULAR ? _InputRadio_module_scss_1["default"].listRadio : '') },
        React.createElement("input", { type: "radio", name: name, value: option.value ? option.value : option.id, defaultChecked: isActive, required: required, className: _InputRadio_module_scss_1["default"].input, checked: isOwnChecked, onChange: handleOnClick }),
        variantRadio === radio_model_1.ERadioVariant.SINGLE && (React.createElement(Button_1.Button, { variant: Button_1.ButtonVariant.DEFAULT, beforeImage: checkbox_data_icon_1.CHECKBOX_TERTIARY_ICON, beforeProps: { width: checkMarkSizes.width, height: checkMarkSizes.height, classNameImage: isOwnChecked ? _InputRadio_module_scss_1["default"].checkMark : '' }, className: classes_lib_1.cls(_InputRadio_module_scss_1["default"].radio, isOwnChecked ? _InputRadio_module_scss_1["default"].checked : '', warning ? _InputRadio_module_scss_1["default"].warning : '', success ? _InputRadio_module_scss_1["default"].success : ''), active: isOwnChecked, onClick: handleOnClick })),
        React.createElement("span", { className: _InputRadio_module_scss_1["default"].text }, option.name),
        variant === input_model_1.EInputVariants.ROUNDED && React.createElement(image_1["default"], { src: 'check-mark.svg', alt: 'check', width: 8, height: 8, className: _InputRadio_module_scss_1["default"].checkMark })));
}
exports.InputRadio = InputRadio;
