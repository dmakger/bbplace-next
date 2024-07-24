"use strict";
exports.__esModule = true;
exports.createInputArray = void 0;
exports.createInputArray = function (inputLevels, updatedCategories, selectedOptionsCommonArray, classNames, placeholders) {
    var _a, _b;
    var inputsArray = [];
    for (var i = 0; i < inputLevels; i++) {
        inputsArray.push({
            currentOptions: i === 0 ? updatedCategories : (_b = (_a = selectedOptionsCommonArray[i - 1]) === null || _a === void 0 ? void 0 : _a.options) !== null && _b !== void 0 ? _b : [],
            defaultOption: selectedOptionsCommonArray[i],
            className: classNames[i] || '',
            placeholder: placeholders[i] || ''
        });
    }
    return inputsArray;
};
