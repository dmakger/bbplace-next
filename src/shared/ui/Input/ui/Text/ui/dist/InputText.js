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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.InputText = void 0;
var classes_lib_1 = require("@/shared/lib/classes.lib");
var _InputText_module_scss_1 = require("./_InputText.module.scss");
var react_1 = require("react");
var WrapperTitleInput_1 = require("@/shared/ui/Wrapper/Title/Input/WrapperTitleInput");
var text_input_data_1 = require("../data/text.input.data");
var input_model_1 = require("../../../model/input.model");
var text_input_model_1 = require("../../../Text/model/text.input.model");
var ImageSmart_1 = require("@/shared/ui/Image/Smart/ImageSmart");
var button_data_1 = require("@/shared/ui/Button/data/button.data");
function InputText(_a) {
    var _b = _a.variant, variant = _b === void 0 ? input_model_1.EInputVariants.ROUNDED : _b, _c = _a.inputTypeVariant, inputTypeVariant = _c === void 0 ? text_input_model_1.EInputTextTypeVariants.TEXT : _c, _d = _a.variantInputText, variantInputText = _d === void 0 ? text_input_data_1.EInputTextVariant.DEFAULT : _d, title = _a.title, name = _a.name, placeholder = _a.placeholder, _e = _a.required, required = _e === void 0 ? false : _e, className = _a.className, classNameInputText = _a.classNameInputText, classNameTextArea = _a.classNameTextArea, _f = _a.type, type = _f === void 0 ? 'text' : _f, beforeImage = _a.beforeImage, beforeProps = _a.beforeProps, _g = _a.onChange, onChange = _g === void 0 ? function () { } : _g, _h = _a.onChangeEvent, onChangeEvent = _h === void 0 ? function () { } : _h, _j = _a.defaultValue, defaultValue = _j === void 0 ? '' : _j, success = _a.success, setSuccess = _a.setSuccess, warning = _a.warning, setWarning = _a.setWarning, setInputValueLength = _a.setInputValueLength, size = _a.size, _k = _a.onMouseEnter, onMouseEnter = _k === void 0 ? function () { } : _k, _l = _a.onMouseLeave, onMouseLeave = _l === void 0 ? function () { } : _l, rest = __rest(_a, ["variant", "inputTypeVariant", "variantInputText", "title", "name", "placeholder", "required", "className", "classNameInputText", "classNameTextArea", "type", "beforeImage", "beforeProps", "onChange", "onChangeEvent", "defaultValue", "success", "setSuccess", "warning", "setWarning", "setInputValueLength", "size", "onMouseEnter", "onMouseLeave"]);
    //STATE
    var _m = react_1.useState(warning !== null && warning !== void 0 ? warning : false), isWarning = _m[0], setIsWarning = _m[1];
    var _o = react_1.useState(success !== null && success !== void 0 ? success : false), isSuccess = _o[0], setIsSuccess = _o[1];
    var _p = react_1.useState(false), isHovered = _p[0], setIsHovered = _p[1];
    var _q = react_1.useState(false), isPressed = _q[0], setIsPressed = _q[1];
    //REF
    var inputRef = react_1.useRef(null);
    var textAreaRef = react_1.useRef(null);
    //EFFECT
    react_1.useEffect(function () {
        if (inputRef.current)
            inputRef.current.value = defaultValue;
        if (textAreaRef.current)
            textAreaRef.current.value = defaultValue;
    }, [defaultValue]);
    //FUNCTIONS
    var checkValue = function (value) {
        var isErr = value.trim() === '';
        if (setWarning && setSuccess) {
            setWarning(isErr);
            setIsWarning(isErr);
            setSuccess(!isErr);
            setIsSuccess(!isErr);
        }
    };
    // HANDLE
    var handleOnClickWrapperInput = function () {
        var _a;
        (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
    };
    var handleOnChange = function (e) {
        var value = e.target.value;
        setInputValueLength === null || setInputValueLength === void 0 ? void 0 : setInputValueLength(value.length);
        checkValue(value);
        onChange(value);
        onChangeEvent(e);
    };
    var handleOnMouseEnter = function () {
        setIsHovered(true);
        onMouseEnter();
    };
    var handleOnMouseLeave = function () {
        setIsHovered(false);
        setIsPressed(false);
        onMouseLeave();
    };
    var handleOnMouseDown = function () {
        setIsPressed(true);
        setIsHovered(true);
    };
    var handleOnMouseUp = function () {
        setIsPressed(false);
        setIsHovered(true);
    };
    return (React.createElement(WrapperTitleInput_1.WrapperTitleInput, { title: title }, inputTypeVariant === text_input_model_1.EInputTextTypeVariants.TEXT ? (React.createElement("div", { onClick: handleOnClickWrapperInput, onMouseEnter: handleOnMouseEnter, onMouseLeave: handleOnMouseLeave, onMouseDown: handleOnMouseDown, onMouseUp: handleOnMouseUp, className: classes_lib_1.cls(_InputText_module_scss_1["default"].wrapperInput, _InputText_module_scss_1["default"][variant], variantInputText === text_input_data_1.EInputTextVariant.W_HOVERED ? _InputText_module_scss_1["default"].wHovered : '', _InputText_module_scss_1["default"].input, isSuccess ? _InputText_module_scss_1["default"].success : '', isWarning ? _InputText_module_scss_1["default"].error : '', className) },
        beforeImage &&
            React.createElement(ImageSmart_1.ImageSmart, __assign({}, beforeProps, { icon: beforeImage, width: beforeProps && beforeProps.width ? beforeProps.width : button_data_1.ButtonImageSize.DefaultSize, height: beforeProps && beforeProps.height ? beforeProps.height : button_data_1.ButtonImageSize.DefaultSize, isHovered: isHovered, isSuccess: isSuccess, isPressed: isPressed, className: classes_lib_1.cls(beforeProps === null || beforeProps === void 0 ? void 0 : beforeProps.className, _InputText_module_scss_1["default"].imageInput) })),
        React.createElement("input", __assign({ className: classes_lib_1.cls(_InputText_module_scss_1["default"].input, classNameInputText), name: name, ref: inputRef, type: type, required: required, placeholder: placeholder, defaultValue: defaultValue, onChange: handleOnChange }, rest)))) : (React.createElement("textarea", __assign({ className: classes_lib_1.cls(_InputText_module_scss_1["default"][variant], _InputText_module_scss_1["default"].textarea, isSuccess ? _InputText_module_scss_1["default"].success : '', isWarning ? _InputText_module_scss_1["default"].error : '', classNameTextArea), name: name, ref: textAreaRef, defaultValue: defaultValue, required: required, placeholder: placeholder, onChange: handleOnChange }, rest)))));
}
exports.InputText = InputText;
