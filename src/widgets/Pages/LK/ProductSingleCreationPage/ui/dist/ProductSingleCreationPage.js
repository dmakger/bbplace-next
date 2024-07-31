"use strict";
exports.__esModule = true;
exports.ProductSingleCreationPage = void 0;
var classes_lib_1 = require("@/shared/lib/classes.lib");
var _ProductSingleCreationPage_module_scss_1 = require("./_ProductSingleCreationPage.module.scss");
var react_1 = require("react");
var Button_1 = require("@/shared/ui/Button");
var button_model_1 = require("@/shared/ui/Button/model/button.model");
var VariationInfoProductForm_1 = require("@/features/Form/Product/ui/Variation/VariationInfoProductForm");
exports.ProductSingleCreationPage = function (_a) {
    var className = _a.className;
    // REF
    var formSubmitRef = react_1.useRef();
    var additionalFormSubmitRef = react_1.useRef();
    // STATE
    var _b = react_1.useState(), mainInfoData = _b[0], setMainInfoData = _b[1];
    var _c = react_1.useState(), additionalInfoData = _c[0], setAdditionalInfoData = _c[1];
    // HANDLE
    var handleOnClick = function () {
        if (formSubmitRef.current) {
            formSubmitRef.current();
        }
        if (additionalFormSubmitRef.current) {
            additionalFormSubmitRef.current();
        }
    };
    console.log('qwe additionalInfoData', additionalInfoData);
    return (React.createElement("div", { className: classes_lib_1.cls(_ProductSingleCreationPage_module_scss_1["default"].ProductSingleCreationPage, className) },
        React.createElement("div", { className: _ProductSingleCreationPage_module_scss_1["default"].mid },
            React.createElement(VariationInfoProductForm_1.VariationInfoProductForm, { setData: setAdditionalInfoData, triggerSubmit: function (submitFn) { additionalFormSubmitRef.current = submitFn; } }),
            React.createElement(Button_1.Button, { variant: button_model_1.ButtonVariant.FILL, size: button_model_1.ButtonSize.Big, title: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0442\u043E\u0432\u0430\u0440", onClick: handleOnClick }))));
};
