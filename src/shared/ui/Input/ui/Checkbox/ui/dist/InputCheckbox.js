"use strict";
exports.__esModule = true;
exports.InputCheckbox = void 0;
var react_1 = require("react");
var classes_lib_1 = require("@/shared/lib/classes.lib");
var _InputCheckbox_module_scss_1 = require("./_InputCheckbox.module.scss");
var Button_1 = require("@/shared/ui/Button");
var checkbox_data_icon_1 = require("@/shared/ui/Icon/data/checkbox.data.icon");
var checkbox_model_1 = require("../model/checkbox.model");
exports.InputCheckbox = function (_a) {
    var className = _a.className, name = _a.name, _b = _a.variantCheckbox, variantCheckbox = _b === void 0 ? checkbox_model_1.ECheckboxVariant.TERTIARY : _b, _c = _a.checkMarkSizes, checkMarkSizes = _c === void 0 ? {
        width: 20,
        height: 15
    } : _c, _d = _a.success, success = _d === void 0 ? false : _d, _e = _a.warning, warning = _e === void 0 ? false : _e, required = _a.required, setSuccess = _a.setSuccess, setWarning = _a.setWarning, onClick = _a.onClick, checked = _a.checked, setChecked = _a.setChecked, isChecked = _a.isChecked, setIsChecked = _a.setIsChecked, error = _a.error;
    // STATE
    var _f = react_1.useState(checked || isChecked || false), isOwnChecked = _f[0], setIsOwnChecked = _f[1];
    var _g = react_1.useState(true), isInitialRender = _g[0], setIsInitialRender = _g[1]; // Состояние для отслеживания первичной отрисовки
    // EFFECTS
    react_1.useEffect(function () {
        // Обновление checked, если он пришел извне
        if (checked !== undefined && checked !== isOwnChecked) {
            setIsOwnChecked(checked);
        }
        else if (isChecked !== undefined && isChecked !== isOwnChecked) {
            setIsOwnChecked(isChecked);
        }
    }, [checked, isChecked]);
    react_1.useEffect(function () {
        // Обновление состояний success и warning при изменении isOwnChecked
        if (!isInitialRender) {
            if (required && !isOwnChecked) {
                setWarning && setWarning(true);
                setSuccess && setSuccess(false);
            }
            else if (!isOwnChecked) {
                setSuccess && setSuccess(false);
            }
            else if (isOwnChecked) {
                setWarning && setWarning(false);
                setSuccess && setSuccess(true);
            }
            // Вызов onClick callback
            onClick && onClick(isOwnChecked);
            // Обновление checked, если установлен setChecked
            setChecked && setChecked(isOwnChecked);
        }
        else {
            setIsInitialRender(false); // Устанавливаем false после первичной отрисовки
        }
    }, [isOwnChecked]);
    react_1.useEffect(function () {
        // Обработка ошибки
        if (error) {
            setWarning && setWarning(true);
            setSuccess && setSuccess(false);
        }
    }, [error]);
    // HANDLER
    var handleCheckboxChange = function () {
        var newValue = !isOwnChecked;
        setIsOwnChecked(newValue);
        if (setIsChecked)
            setIsChecked(newValue);
        if (onClick) {
            onClick(newValue);
        }
    };
    return (react_1["default"].createElement("div", { className: classes_lib_1.cls(_InputCheckbox_module_scss_1["default"].InputCheckbox, _InputCheckbox_module_scss_1["default"][variantCheckbox], className) },
        react_1["default"].createElement("input", { type: "checkbox", className: _InputCheckbox_module_scss_1["default"].input, name: name, checked: isOwnChecked, required: required, onChange: handleCheckboxChange }),
        react_1["default"].createElement(Button_1.Button, { variant: Button_1.ButtonVariant.DEFAULT, beforeImage: variantCheckbox === checkbox_model_1.ECheckboxVariant.SECONDARY ? checkbox_data_icon_1.CHECKBOX_SECONDARY_ICON : checkbox_data_icon_1.CHECKBOX_TERTIARY_ICON, beforeProps: {
                width: checkMarkSizes.width,
                height: checkMarkSizes.height,
                classNameImage: isOwnChecked ? _InputCheckbox_module_scss_1["default"].image : ''
            }, className: classes_lib_1.cls(_InputCheckbox_module_scss_1["default"].checkbox, isOwnChecked ? _InputCheckbox_module_scss_1["default"].checked : '', warning ? _InputCheckbox_module_scss_1["default"].warning : '', success ? _InputCheckbox_module_scss_1["default"].success : ''), active: isOwnChecked, onClick: handleCheckboxChange })));
};
