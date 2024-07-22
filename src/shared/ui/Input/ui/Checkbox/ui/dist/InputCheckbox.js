'use client';
"use strict";
exports.__esModule = true;
exports.InputCheckbox = void 0;
var classes_lib_1 = require("@/shared/lib/classes.lib");
var _InputCheckbox_module_scss_1 = require("./_InputCheckbox.module.scss");
var Button_1 = require("@/shared/ui/Button");
var checkbox_data_icon_1 = require("@/shared/ui/Icon/data/checkbox.data.icon");
var react_1 = require("react");
exports.InputCheckbox = function (_a) {
    var className = _a.className, name = _a.name, _b = _a.success, success = _b === void 0 ? false : _b, setSuccess = _a.setSuccess, _c = _a.warning, warning = _c === void 0 ? false : _c, setWarning = _a.setWarning, required = _a.required, onClick = _a.onClick, checked = _a.checked, isChecked = _a.isChecked, setIsChecked = _a.setIsChecked;
    //STATE
    var _d = react_1.useState(checked || isChecked || false), isOwnChecked = _d[0], setIsOwnChecked = _d[1];
    // FUNCTION
    // const handleCheckboxChange = () => {
    //   setIsChecked(prevIsChecked => {
    //     const newValue = !prevIsChecked
    //     if (onClick)
    //       onClick(newValue)
    //     return newValue
    //   })
    // }
    // EFFECT
    react_1.useEffect(function () {
        if (checked !== undefined) {
            setIsOwnChecked(checked);
        }
        else if (isChecked !== undefined) {
            setIsOwnChecked(isChecked);
        }
    }, [checked, isChecked]);
    // FUNCTION
    var handleCheckboxChange = function () {
        var newValue = !isOwnChecked;
        setIsOwnChecked(newValue);
        if (setIsChecked)
            setIsChecked(newValue);
        if (onClick) {
            onClick(newValue);
        }
    };
    return (React.createElement("div", { className: classes_lib_1.cls(_InputCheckbox_module_scss_1["default"].InputCheckbox, className) },
        React.createElement("input", { type: "checkbox", className: _InputCheckbox_module_scss_1["default"].input, name: name, checked: isOwnChecked, required: required, onChange: handleCheckboxChange }),
        React.createElement(Button_1.Button, { variant: Button_1.ButtonVariant.DEFAULT, beforeImage: checkbox_data_icon_1.CHECKBOX_SECONDARY_ICON, beforeProps: { classNameImage: isOwnChecked ? _InputCheckbox_module_scss_1["default"].image : '' }, className: classes_lib_1.cls(_InputCheckbox_module_scss_1["default"].checkbox, isOwnChecked ? _InputCheckbox_module_scss_1["default"].checked : '', warning ? _InputCheckbox_module_scss_1["default"].warning : '', success ? _InputCheckbox_module_scss_1["default"].success : ''), active: isOwnChecked, onClick: handleCheckboxChange })));
};
