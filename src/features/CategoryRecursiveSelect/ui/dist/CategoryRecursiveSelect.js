'use client';
"use strict";
exports.__esModule = true;
exports.CategoryRecursiveSelect = void 0;
var _CategoryRecursiveSelect_module_scss_1 = require("./_CategoryRecursiveSelect.module.scss");
var RectangleInput_1 = require("@/shared/ui/Wrapper/RectangleInput");
var Input_1 = require("@/shared/ui/Input/Input");
var recursiveSelect_model_1 = require("@/shared/ui/Input/ui/RecursiveSelect/model/recursiveSelect.model");
var react_1 = require("react");
var category_metrics_api_1 = require("@/entities/Metrics/api/category.metrics.api");
var option_lib_1 = require("@/shared/lib/option.lib");
var RecursiveSelect_1 = require("@/shared/ui/Input/ui/RecursiveSelect");
exports.CategoryRecursiveSelect = function (_a) {
    var className = _a.className, _b = _a.labelText, labelText = _b === void 0 ? '' : _b, _c = _a.variant, variant = _c === void 0 ? recursiveSelect_model_1.ERecursiveSelectVariant.SINGLE : _c, classNameLabel = _a.classNameLabel, setSelectedCategoriesId = _a.setSelectedCategoriesId, onClickBellowButton = _a.onClickBellowButton, _d = _a.inputsLevel, inputsLevel = _d === void 0 ? 4 : _d, _e = _a.classNamesInputArray, classNamesInputArray = _e === void 0 ? [_CategoryRecursiveSelect_module_scss_1["default"].firstSelect, _CategoryRecursiveSelect_module_scss_1["default"].otherSelect, _CategoryRecursiveSelect_module_scss_1["default"].otherSelect, _CategoryRecursiveSelect_module_scss_1["default"].lastSelect] : _e, _f = _a.placeholdersInputsArray, placeholdersInputsArray = _f === void 0 ? [
        'Выберите категорию',
        'Категория второго уровня',
        'Категория третьего уровня',
        'Категория четвертого уровня'
    ] : _f, _g = _a.buttonWrapperText, buttonWrapperText = _g === void 0 ? '' : _g, isCanDisabledBellowButton = _a.isCanDisabledBellowButton, _h = _a.isDescriptionTooltip, isDescriptionTooltip = _h === void 0 ? false : _h, _j = _a.isRequired, isRequired = _j === void 0 ? false : _j, _k = _a.descriptionTooltipText, descriptionTooltipText = _k === void 0 ? '' : _k, classNameDescriptionWindow = _a.classNameDescriptionWindow, _l = _a.warningTooltipText, warningTooltipText = _l === void 0 ? 'Обязательно для заполнения' : _l, classNameWarningWindow = _a.classNameWarningWindow, errorInputMessage = _a.errorInputMessage;
    //STATE
    var _m = react_1.useState([]), selectedOptions = _m[0], setSelectedOptions = _m[1];
    var _o = react_1.useState([]), updatedCategories = _o[0], setUpdatedCategories = _o[1];
    var _p = react_1.useState([]), selectedOptionsCommonArray = _p[0], setSelectedOptionsCommonArray = _p[1];
    //API
    var categories = category_metrics_api_1.CategoryAPI.useGetCategoriesWithSubcategoriesQuery().data;
    //EFFECT
    react_1.useEffect(function () {
        if (categories) {
            var options = option_lib_1.getOptionsFromCategoriesWithSubcategories(categories.filter(function (it) { return it.name !== 'Нет категории'; }));
            setUpdatedCategories(options !== null && options !== void 0 ? options : []);
        }
    }, [categories]);
    react_1.useEffect(function () {
        setSelectedCategoriesId && setSelectedCategoriesId(selectedOptions.map(function (it) { return it.id; }));
    }, [selectedOptionsCommonArray]);
    //INPUTS_ARRAY
    var inputsArray = RecursiveSelect_1.createInputArray(inputsLevel, updatedCategories, selectedOptionsCommonArray, classNamesInputArray !== null && classNamesInputArray !== void 0 ? classNamesInputArray : [], placeholdersInputsArray !== null && placeholdersInputsArray !== void 0 ? placeholdersInputsArray : []);
    return (React.createElement(RectangleInput_1.WrapperRectangleInput, { labelText: labelText, classNameLabel: classNameLabel, bellowButtonText: buttonWrapperText, className: className, isDescriptionTooltip: isDescriptionTooltip, isRequired: isRequired, descriptionTooltipText: descriptionTooltipText, warningTooltipText: warningTooltipText, classNameDescriptionWindow: classNameDescriptionWindow, classNameWarningWindow: classNameWarningWindow, onClickBellowButton: onClickBellowButton, errorInputMessage: errorInputMessage, isCanDisabledBellowButton: true },
        React.createElement(Input_1["default"].RecursiveSelect, { variantRecursive: variant, inputLevels: inputsArray.length, selectedOptions: selectedOptions, setSelectedOptions: setSelectedOptions, selectedOptionsCommonArray: selectedOptionsCommonArray, setSelectedOptionsCommonArray: setSelectedOptionsCommonArray, inputsProps: inputsArray, arrowSizes: { width: 16, height: 15 } })));
};
