'use client';
"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.RecursiveSelectInput = void 0;
var classes_lib_1 = require("@/shared/lib/classes.lib");
var _RecursiveSelectInput_module_scss_1 = require("./_RecursiveSelectInput.module.scss");
var input_model_1 = require("../../../model/input.model");
var Input_1 = require("../../../Input");
var react_1 = require("react");
var OptionsAttachmentItem_1 = require("@/shared/ui/Form/OptionsAttachmentItem");
var optionsAttachment_model_1 = require("@/shared/ui/Form/OptionsAttachmentItem/model/optionsAttachment.model");
var recursiveSelect_model_1 = require("../model/recursiveSelect.model");
exports.RecursiveSelectInput = function (_a) {
    var _b = _a.variant, variant = _b === void 0 ? input_model_1.EInputVariants.RECTANGULAR : _b, _c = _a.variantRecursive, variantRecursive = _c === void 0 ? recursiveSelect_model_1.ERecursiveSelectVariant.SINGLE : _c, className = _a.className, _d = _a.arrowSizes, arrowSizes = _d === void 0 ? {
        width: 10,
        height: 10
    } : _d, selectedOptionsCommonArray = _a.selectedOptionsCommonArray, setSelectedOptionsCommonArray = _a.setSelectedOptionsCommonArray, selectedOptions = _a.selectedOptions, setSelectedOptions = _a.setSelectedOptions, inputsProps = _a.inputsProps, setWarning = _a.setWarning, success = _a.success, setSelectedOptionsArray = _a.setSelectedOptionsArray, setSuccess = _a.setSuccess;
    //STATE
    var _e = react_1.useState(), deletingOption = _e[0], setDeletingOption = _e[1];
    //FUNCTION
    var addSelectedOption = function (option, level) {
        var _a;
        var newSelectedOptionsCategory = __spreadArrays(selectedOptionsCommonArray);
        newSelectedOptionsCategory[level] = option;
        newSelectedOptionsCategory.length = level + 1;
        setSelectedOptionsCommonArray(newSelectedOptionsCategory);
        if (!((_a = option.options) === null || _a === void 0 ? void 0 : _a.length) && !selectedOptions.find(function (it) { return it.id === option.id; })) {
            if (variantRecursive == recursiveSelect_model_1.ERecursiveSelectVariant.SINGLE)
                return setSelectedOptions([option]);
            setSelectedOptions(__spreadArrays(selectedOptions, [option]));
            setSelectedOptionsArray && setSelectedOptionsArray(__spreadArrays(selectedOptions, [option])); //Для связи с WrapperRectangleInput
            setSelectedOptionsCommonArray([]);
        }
    };
    var handleDeleteItem = function (option) {
        setDeletingOption(option.id);
        setTimeout(function () {
            var updatedSelectedOptions = selectedOptions.filter(function (item) { return item.id !== option.id; });
            setSelectedOptions(updatedSelectedOptions);
            if (variantRecursive === recursiveSelect_model_1.ERecursiveSelectVariant.SINGLE) {
                setSelectedOptionsCommonArray([]);
                setSuccess && setSuccess(false);
            }
            setSelectedOptionsArray && setSelectedOptionsArray(updatedSelectedOptions); //Для связи с WrapperRectangleInput
            setDeletingOption(0);
        }, 300);
    };
    //RENDER_SELECT
    var renderSelect = function (options, placeholder, defaultOption, level, className) { return (React.createElement(Input_1["default"].TextAndSelect, { variantRecursive: variantRecursive, options: options, placeholder: placeholder, defaultOption: defaultOption, variant: variant, arrowSizes: arrowSizes, classNameMainInput: className, disabled: !options.length, onClickOption: function (option) { return addSelectedOption(option, level); }, key: level, success: success, setSuccess: setSuccess, setWarning: setWarning })); };
    return (React.createElement("div", { className: classes_lib_1.cls(_RecursiveSelectInput_module_scss_1["default"].RecursiveSelect, _RecursiveSelectInput_module_scss_1["default"][variant], className) },
        (variantRecursive === recursiveSelect_model_1.ERecursiveSelectVariant.SINGLE ? !selectedOptions.length : true) && inputsProps.map(function (inputProps, index) { return (renderSelect(inputProps.currentOptions, inputProps.placeholder, selectedOptionsCommonArray[index], index, inputProps.className)); }),
        selectedOptions.length > 0 && React.createElement("div", { className: _RecursiveSelectInput_module_scss_1["default"].optionsContainer }, selectedOptions.map(function (option) { return (React.createElement(OptionsAttachmentItem_1.OptionsAttachmentItem, { size: optionsAttachment_model_1.EOptionsAttachmentSize.BIG, className: classes_lib_1.cls(_RecursiveSelectInput_module_scss_1["default"].optionsAttachmentShow, deletingOption === option.id ? _RecursiveSelectInput_module_scss_1["default"].optionsAttachmentHide : ''), key: option.id, title: option.name, handleDelete: function () { return handleDeleteItem(option); } })); }))));
};
