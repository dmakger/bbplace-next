'use client';
"use strict";
exports.__esModule = true;
exports.TextAndSelectInput = void 0;
var react_1 = require("react");
var image_1 = require("next/image");
var _InputTextAndSelect_module_scss_1 = require("./_InputTextAndSelect.module.scss");
var classes_lib_1 = require("@/shared/lib/classes.lib");
var WrapperClickOutside_1 = require("@/shared/ui/Wrapper/ClickOutside/WrapperClickOutside");
var WrapperTitleInput_1 = require("@/shared/ui/Wrapper/Title/Input/WrapperTitleInput");
var xmark_data_icon_1 = require("@/shared/ui/Icon/data/xmark.data.icon");
var Button_1 = require("@/shared/ui/Button");
var arrow_data_icon_1 = require("@/shared/ui/Icon/data/arrow.data.icon");
var input_model_1 = require("../../../model/input.model");
var Input_1 = require("../../../Input");
var searchGray_svg_1 = require("@/../public/searchGray.svg");
var recursiveSelect_model_1 = require("../../RecursiveSelect/model/recursiveSelect.model");
var HandleSize_1 = require("@/shared/ui/Handle/Size/HandleSize");
var modal_data_1 = require("@/shared/data/modal.data");
var Modal_1 = require("@/shared/ui/Modal/Modal");
var WrapperModalBottomDropSearch_1 = require("@/shared/ui/Wrapper/ModalBottom/DropSearch/WrapperModalBottomDropSearch");
function TextAndSelectInput(_a) {
    var required = _a.required, setSelectedOption = _a.setSelectedOption, error = _a.error, name = _a.name, placeholder = _a.placeholder, _b = _a.variant, variant = _b === void 0 ? input_model_1.EInputVariants.ROUNDED : _b, _c = _a.variantRecursive, variantRecursive = _c === void 0 ? recursiveSelect_model_1.ERecursiveSelectVariant.SINGLE : _c, _d = _a.options, options = _d === void 0 ? [] : _d, defaultOption = _a.defaultOption, onClickOption = _a.onClickOption, setIsListOpen = _a.setIsListOpen, _e = _a.arrowSizes, arrowSizes = _e === void 0 ? { width: 10, height: 10 } : _e, title = _a.title, titleModal = _a.titleModal, className = _a.className, classNameOptions = _a.classNameOptions, classNameMainInput = _a.classNameMainInput, disabled = _a.disabled, success = _a.success, setWarning = _a.setWarning, setSuccess = _a.setSuccess;
    //STATE
    var _f = react_1.useState(''), searchQuery = _f[0], setSearchQuery = _f[1];
    var _g = react_1.useState(false), showOptions = _g[0], setShowOptions = _g[1];
    var _h = react_1.useState(), activeOption = _h[0], setActiveOption = _h[1];
    var _j = react_1.useState(false), isHovered = _j[0], setIsHovered = _j[1];
    var _k = react_1.useState(false), isWarning = _k[0], setIsWarning = _k[1];
    var _l = react_1.useState(false), isSuccess = _l[0], setIsSuccess = _l[1];
    var _m = react_1.useState(false), is768 = _m[0], setIs768 = _m[1];
    // MEMO
    var filteredOptions = react_1.useMemo(function () {
        if (!options)
            return [];
        return options.filter(function (option) { return option.name.toLowerCase().includes(searchQuery.toLowerCase()); });
    }, [options, searchQuery]);
    // REF
    var inputSelectRef = react_1.useRef(null);
    // EFFECT
    react_1.useEffect(function () {
        setActiveOption(defaultOption);
    }, [defaultOption]);
    react_1.useEffect(function () {
        if (activeOption === undefined) {
            setIsSuccess(false);
        }
        activeOption !== undefined && setSelectedOption && setSelectedOption(activeOption);
    }, [activeOption]);
    react_1.useEffect(function () {
        setWarning && setWarning(isWarning);
    }, [isWarning]);
    react_1.useEffect(function () {
        if (error) {
            setWarning && setWarning(true);
            setSuccess && setSuccess(false);
            setIsSuccess(false);
            setIsWarning(true);
        }
    }, [error]);
    react_1.useEffect(function () {
        setSearchQuery('');
        setIsListOpen && setIsListOpen(showOptions);
    }, [showOptions]);
    // HANDLE
    var handleOnMouseEnter = function () {
        setIsHovered(true);
    };
    var handleOnMouseLeave = function () {
        setIsHovered(false);
    };
    // ==={ CLICK }===
    var resetInputValue = function () {
        setSearchQuery('');
        setIsHovered(false);
    };
    var toggleShowOptions = function () { return setShowOptions(function (prevShowOptions) { return !prevShowOptions; }); };
    var handleOnItem = function (it) {
        var _a;
        if (variant == input_model_1.EInputVariants.RECTANGULAR) {
            setIsSuccess(true);
            setIsWarning(false);
        }
        if (onClickOption)
            onClickOption(it);
        setActiveOption(it);
        if (!((_a = it.options) === null || _a === void 0 ? void 0 : _a.length)) {
            setSuccess && setSuccess(true);
            if (variantRecursive === recursiveSelect_model_1.ERecursiveSelectVariant.MULTIPLE) {
                setIsSuccess(false);
            }
        }
        setShowOptions(false);
    };
    // ==={ CHANGE }===
    var checkChangeValue = function (e) {
        if (variant == input_model_1.EInputVariants.RECTANGULAR && !(options === null || options === void 0 ? void 0 : options.some(function (it) { return it.name.toLowerCase().includes(e.target.value.trim().toLowerCase()); }))) {
            setIsWarning(true);
            setIsSuccess(false);
        }
        else {
            setIsWarning(false);
            setIsSuccess(true);
        }
    };
    var handleInputChange = function (e) {
        console.log('qwe handleInputChange', e.target.value);
        checkChangeValue(e);
        setSearchQuery(e.target.value.toLowerCase().replaceAll('  ', ' ').trim());
        if (e.target.value === '')
            setIsWarning(true);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(HandleSize_1.HandleSize, { width: 768, set: setIs768 }),
        React.createElement(WrapperClickOutside_1["default"], { _ref: inputSelectRef, isShow: showOptions, handle: toggleShowOptions, className: classes_lib_1.cls(_InputTextAndSelect_module_scss_1["default"].block, variant === input_model_1.EInputVariants.ROUNDED && showOptions ? _InputTextAndSelect_module_scss_1["default"].show : variant === input_model_1.EInputVariants.RECTANGULAR && showOptions ? _InputTextAndSelect_module_scss_1["default"].showOptionsRectangular : '', className) },
            React.createElement(WrapperTitleInput_1.WrapperTitleInput, { title: title },
                React.createElement("div", { onClick: !disabled ? toggleShowOptions : function () { }, className: _InputTextAndSelect_module_scss_1["default"].visible },
                    React.createElement("div", { className: classes_lib_1.cls(_InputTextAndSelect_module_scss_1["default"].mainInput, _InputTextAndSelect_module_scss_1["default"][variant], showOptions && variant === input_model_1.EInputVariants.RECTANGULAR ? _InputTextAndSelect_module_scss_1["default"].rectangularListOpen : '', isWarning ? _InputTextAndSelect_module_scss_1["default"].error : isSuccess ? _InputTextAndSelect_module_scss_1["default"].success : '', disabled ? _InputTextAndSelect_module_scss_1["default"].disabled : '', classNameMainInput) },
                        showOptions ? (variant === input_model_1.EInputVariants.ROUNDED ? (React.createElement("input", { type: "text", value: searchQuery, onClick: function (e) { return e.stopPropagation(); }, onChange: handleInputChange, autoFocus: true, className: _InputTextAndSelect_module_scss_1["default"].input, required: required })) : (React.createElement("div", { className: _InputTextAndSelect_module_scss_1["default"].inputContainer },
                            React.createElement(image_1["default"], { src: searchGray_svg_1["default"], alt: "Поиск", width: 19, height: 19, className: _InputTextAndSelect_module_scss_1["default"].imageSearch }),
                            React.createElement("input", { type: "text", value: searchQuery, onClick: function (e) { return e.stopPropagation(); }, onChange: handleInputChange, autoFocus: true, className: _InputTextAndSelect_module_scss_1["default"].input })))) : (React.createElement("p", { className: classes_lib_1.cls(_InputTextAndSelect_module_scss_1["default"].selectedOption, !activeOption && placeholder ? _InputTextAndSelect_module_scss_1["default"].placeholder : '', disabled ? _InputTextAndSelect_module_scss_1["default"].disabledPlaceholder : '') }, !activeOption && placeholder ? placeholder : activeOption === null || activeOption === void 0 ? void 0 : activeOption.name)),
                        React.createElement(Button_1.Button, { variant: Button_1.ButtonVariant.DEFAULT, beforeImage: arrow_data_icon_1.ARROW_TERTIARY_WO_ICON, beforeProps: { width: arrowSizes.width, height: arrowSizes.height }, disabled: disabled, className: classes_lib_1.cls(_InputTextAndSelect_module_scss_1["default"].arrowContainer, showOptions ? _InputTextAndSelect_module_scss_1["default"].activeArrow : '') })))),
            !is768 ? (React.createElement(React.Fragment, null, filteredOptions.length ? (React.createElement(Input_1["default"].List.Radio, { variant: variant, options: filteredOptions, defaultOption: activeOption, name: name, onClickOption: handleOnItem, className: classes_lib_1.cls(_InputTextAndSelect_module_scss_1["default"].options, classNameOptions, showOptions ? _InputTextAndSelect_module_scss_1["default"].show : '') })) : (React.createElement(React.Fragment, null,
                variant === input_model_1.EInputVariants.ROUNDED &&
                    React.createElement("p", { className: _InputTextAndSelect_module_scss_1["default"].noResult }, "\u041A \u0441\u043E\u0436\u0430\u043B\u0435\u043D\u0438\u044E, \u0442\u0430\u043A\u043E\u0433\u043E \u0432\u0430\u0440\u0438\u0430\u043D\u0442\u0430 \u043D\u0435\u0442 (X_X)"),
                showOptions && variant === input_model_1.EInputVariants.RECTANGULAR &&
                    React.createElement("div", { className: _InputTextAndSelect_module_scss_1["default"].noResultRect },
                        React.createElement("span", null, "\u041D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E"),
                        React.createElement(Button_1.Button, { variant: Button_1.ButtonVariant.DEFAULT, onMouseEnter: handleOnMouseEnter, onMouseLeave: handleOnMouseLeave, onClick: resetInputValue, beforeImage: xmark_data_icon_1.XMARK_ICON, beforeProps: { width: 14, height: 14 }, className: _InputTextAndSelect_module_scss_1["default"].xmarkButton })))))) : (React.createElement(Modal_1.Modal, { view: modal_data_1.EModalView.BOTTOM, buttonNode: true, _isOpen: showOptions, onClickOverlay: toggleShowOptions },
                React.createElement(WrapperModalBottomDropSearch_1.WrapperModalBottomDropSearch, { title: titleModal, searchQuery: searchQuery, handleInputChange: handleInputChange, options: filteredOptions, setIsOpen: toggleShowOptions, onClickOption: handleOnItem, classNameBottomChild: _InputTextAndSelect_module_scss_1["default"].modalBottomChild }))))));
}
exports.TextAndSelectInput = TextAndSelectInput;
