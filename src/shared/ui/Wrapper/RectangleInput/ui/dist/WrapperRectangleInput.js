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
exports.WrapperRectangleInput = void 0;
var classes_lib_1 = require("@/shared/lib/classes.lib");
var _WrapperRectangleInput_module_scss_1 = require("./_WrapperRectangleInput.module.scss");
var react_1 = require("react");
var tooltipDescription_data_icon_1 = require("@/shared/ui/Icon/data/tooltipDescription.data.icon");
var tooltipWarning_data_icon_1 = require("@/shared/ui/Icon/data/tooltipWarning.data.icon");
var Button_1 = require("@/shared/ui/Button");
var wrapperRectangleInput_model_1 = require("../model/wrapperRectangleInput.model");
var HoverWindow_1 = require("@/shared/ui/HoverWindow");
var hoverWindow_model_1 = require("@/shared/ui/HoverWindow/model/hoverWindow.model");
var Modal_1 = require("@/shared/ui/Modal/Modal");
var modal_data_1 = require("@/shared/data/modal.data");
var BottomInfo_1 = require("@/features/Modal/BottomInfo");
var ModalBottom_1 = require("../../ModalBottom");
var FileWrapList_1 = require("@/entities/File/ui/Wrap/FileWrapList");
exports.WrapperRectangleInput = function (_a) {
    var className = _a.className, classNameLabel = _a.classNameLabel, classNameDescriptionWindow = _a.classNameDescriptionWindow, classNameWarningWindow = _a.classNameWarningWindow, labelText = _a.labelText, children = _a.children, buttonText = _a.buttonText, onClickBellowButton = _a.onClickBellowButton, _b = _a.isRequired, isRequired = _b === void 0 ? false : _b, _c = _a.isDescriptionTooltip, isDescriptionTooltip = _c === void 0 ? true : _c, _d = _a.warningTooltipText, warningTooltipText = _d === void 0 ? 'Обязательно для заполнения' : _d, descriptionTooltipText = _a.descriptionTooltipText, _e = _a.errorInputMessage, errorInputMessage = _e === void 0 ? 'Выберите категорию из списка' : _e, _f = _a.labelPosition, labelPosition = _f === void 0 ? wrapperRectangleInput_model_1.ELabelPosition.TOP : _f, _g = _a.fileList, fileList = _g === void 0 ? [] : _g, setFileList = _a.setFileList, _h = _a.responseFileList, responseFileList = _h === void 0 ? [] : _h, setResponseFileList = _a.setResponseFileList;
    // STATE
    var _j = react_1.useState([]), uploadedFileList = _j[0], setUploadedFileList = _j[1];
    var _k = react_1.useState(false), isWarningActive = _k[0], setIsWarningActive = _k[1];
    var _l = react_1.useState(false), isDescriptionActive = _l[0], setIsDescriptionActive = _l[1];
    //Для InputText
    var _m = react_1.useState(0), inputValueLength = _m[0], setInputValueLength = _m[1];
    //Для RecursiveSelectInput
    var _o = react_1.useState([]), selectedOptionsArray = _o[0], setSelectedOptionsArray = _o[1];
    //Для InputCheckbox
    var _p = react_1.useState(false), checked = _p[0], setChecked = _p[1];
    var _q = react_1.useState({}), warnings = _q[0], setWarnings = _q[1];
    var _r = react_1.useState({}), successes = _r[0], setSuccesses = _r[1];
    var _s = react_1.useState(false), warning = _s[0], setWarning = _s[1];
    var _t = react_1.useState(false), success = _t[0], setSuccess = _t[1];
    //EFFECT
    react_1.useEffect(function () {
        var allSuccess = Object.values(successes).every(function (v) { return v === true; });
        var anyWarning = Object.values(warnings).some(function (v) { return v === true; });
        setSuccess(allSuccess);
        setWarning(anyWarning);
    }, [successes, warnings]);
    // CHILDREN
    var clonedChildren = react_1["default"].Children.map(children, function (child, index) {
        if (react_1["default"].isValidElement(child)) {
            var id_1 = "child-" + index;
            if (successes[id_1] === undefined) {
                setSuccesses(function (prev) {
                    var _a;
                    return (__assign(__assign({}, prev), (_a = {}, _a[id_1] = false, _a)));
                });
            }
            if (warnings[id_1] === undefined) {
                setWarnings(function (prev) {
                    var _a;
                    return (__assign(__assign({}, prev), (_a = {}, _a[id_1] = false, _a)));
                });
            }
            return react_1.cloneElement(child, {
                success: successes[id_1],
                warning: warnings[id_1],
                setSuccess: function (value) { return setSuccesses(function (prev) {
                    var _a;
                    return (__assign(__assign({}, prev), (_a = {}, _a[id_1] = value, _a)));
                }); },
                setWarning: function (value) { return setWarnings(function (prev) {
                    var _a;
                    return (__assign(__assign({}, prev), (_a = {}, _a[id_1] = value, _a)));
                }); },
                setInputValueLength: setInputValueLength,
                setSelectedOptionsArray: setSelectedOptionsArray,
                checked: checked
            });
        }
        return child;
    });
    //FUNCTION
    var closeTheModal = function () {
        isDescriptionActive && setIsDescriptionActive(false);
        isWarningActive && setIsWarningActive(false);
    };
    // VARIABLE
    var errorInputSelectMessageArray = [
        'Пожалуйста, заполните это поле!',
        errorInputMessage || "\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u0430\u044F \u0434\u043B\u0438\u043D\u0430 - 50 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432. \u0421\u0435\u0439\u0447\u0430\u0441 " + inputValueLength
    ];
    return (react_1["default"].createElement("div", { className: classes_lib_1.cls(_WrapperRectangleInput_module_scss_1["default"].WrapperRectangleInput, className, _WrapperRectangleInput_module_scss_1["default"][labelPosition]), onClick: function () { return setChecked(!checked); } },
        react_1["default"].createElement("div", { className: classes_lib_1.cls(_WrapperRectangleInput_module_scss_1["default"].labelNTooltipContainer) },
            react_1["default"].createElement("label", { className: classes_lib_1.cls(_WrapperRectangleInput_module_scss_1["default"].label, classNameLabel) }, labelText),
            react_1["default"].createElement("div", { className: _WrapperRectangleInput_module_scss_1["default"].tooltipsContainer },
                isDescriptionTooltip && descriptionTooltipText && (react_1["default"].createElement("div", { className: _WrapperRectangleInput_module_scss_1["default"].tooltipDescCont },
                    react_1["default"].createElement(Button_1.Button, { variant: Button_1.ButtonVariant.CLEAR, className: classes_lib_1.cls(_WrapperRectangleInput_module_scss_1["default"].button, _WrapperRectangleInput_module_scss_1["default"].descButton, isDescriptionActive ? _WrapperRectangleInput_module_scss_1["default"].descriptionActive : ''), beforeImage: tooltipDescription_data_icon_1.TOOLTIP_DESCRIPTION_ICON, beforeProps: { height: 14, width: 14 }, active: isDescriptionActive, onClick: function () { return setIsDescriptionActive(function (prevState) { return !prevState; }); } }),
                    react_1["default"].createElement(HoverWindow_1.HoverWindow, { text: descriptionTooltipText, position: hoverWindow_model_1.EHoverWindowPosition.RIGHT, borderColor: hoverWindow_model_1.EHoverBorderColor.DEFAULT, show: isDescriptionActive, className: classes_lib_1.cls(_WrapperRectangleInput_module_scss_1["default"].descWindowActive, _WrapperRectangleInput_module_scss_1["default"].windowActive, classNameDescriptionWindow) }))),
                isRequired && (react_1["default"].createElement("div", { className: _WrapperRectangleInput_module_scss_1["default"].tooltipWarnCont },
                    react_1["default"].createElement(Button_1.Button, { variant: Button_1.ButtonVariant.CLEAR, className: classes_lib_1.cls(_WrapperRectangleInput_module_scss_1["default"].button, !success ? _WrapperRectangleInput_module_scss_1["default"].warnButton : _WrapperRectangleInput_module_scss_1["default"].successButton, isWarningActive && !success ? _WrapperRectangleInput_module_scss_1["default"].warningActive : '', isWarningActive && success ? _WrapperRectangleInput_module_scss_1["default"].successActive : ''), beforeImage: tooltipWarning_data_icon_1.TOOLTIP_WARNING_ICON, active: isWarningActive, beforeProps: { height: 14, width: 14 }, success: success, onClick: function () { return setIsWarningActive(function (prevState) { return !prevState; }); } }),
                    react_1["default"].createElement(HoverWindow_1.HoverWindow, { text: warningTooltipText, position: hoverWindow_model_1.EHoverWindowPosition.RIGHT, borderColor: !success ? hoverWindow_model_1.EHoverBorderColor.WARNING : hoverWindow_model_1.EHoverBorderColor.DEFAULT, show: isWarningActive, className: classes_lib_1.cls(_WrapperRectangleInput_module_scss_1["default"].warnWindowActive, _WrapperRectangleInput_module_scss_1["default"].windowActive, classNameWarningWindow) }))))),
        react_1["default"].createElement("div", { className: _WrapperRectangleInput_module_scss_1["default"].inputsContainer }, clonedChildren),
        fileList && fileList.length > 0 && (react_1["default"].createElement(FileWrapList_1.FileWrapList, { fileList: fileList, setFileList: setFileList, responseFileList: responseFileList, setResponseFileList: setResponseFileList, className: _WrapperRectangleInput_module_scss_1["default"].fileList })),
        warning && errorInputSelectMessageArray && (react_1["default"].createElement("div", { className: _WrapperRectangleInput_module_scss_1["default"].errorMessage }, errorInputSelectMessageArray.map(function (it, index) { return (react_1["default"].createElement("p", { key: index }, it)); }))),
        buttonText &&
            react_1["default"].createElement(Button_1.Button, { variant: Button_1.ButtonVariant.FILL, title: buttonText, className: classes_lib_1.cls(_WrapperRectangleInput_module_scss_1["default"].button, !selectedOptionsArray.length ? _WrapperRectangleInput_module_scss_1["default"].disabled : ''), disabled: !selectedOptionsArray.length, onClick: onClickBellowButton }),
        react_1["default"].createElement("div", { className: _WrapperRectangleInput_module_scss_1["default"].mobileModal },
            react_1["default"].createElement(Modal_1.Modal, { view: modal_data_1.EModalView.BOTTOM, buttonNode: true, _isOpen: isDescriptionActive || isWarningActive, onClickOverlay: closeTheModal },
                react_1["default"].createElement(ModalBottom_1.WrapperModalBottom, { title: labelText, bottomChildren: react_1["default"].createElement(BottomInfo_1.BottomInfoModal, { text: isDescriptionActive && descriptionTooltipText ? descriptionTooltipText : isWarningActive ? warningTooltipText : '' }), setIsOpen: closeTheModal })))));
};
