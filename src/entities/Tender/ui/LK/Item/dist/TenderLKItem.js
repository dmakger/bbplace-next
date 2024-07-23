"use strict";
exports.__esModule = true;
exports.TenderLKItem = void 0;
var classes_lib_1 = require("@/shared/lib/classes.lib");
var _TenderLKItem_module_scss_1 = require("./_TenderLKItem.module.scss");
var Button_1 = require("@/shared/ui/Button");
var button_model_1 = require("@/shared/ui/Button/model/button.model");
var trash_data_icon_1 = require("@/shared/ui/Icon/data/trash.data.icon");
var OptionT_1 = require("@/shared/ui/Option/ui/this/OptionT");
var option_data_1 = require("@/shared/data/option.data");
exports.TenderLKItem = function (_a) {
    var tender = _a.item, onClickDelete = _a.onClickDelete, className = _a.className;
    return (React.createElement("div", { className: classes_lib_1.cls(_TenderLKItem_module_scss_1["default"].block, className) },
        tender.category && (React.createElement("span", { className: _TenderLKItem_module_scss_1["default"].category }, tender.category.name)),
        React.createElement("div", { className: _TenderLKItem_module_scss_1["default"].nameWrapper },
            React.createElement("span", { className: _TenderLKItem_module_scss_1["default"].name }, tender.name)),
        React.createElement(OptionT_1.OptionT, { variant: option_data_1.OptionVariant.TO_BLUE, text: tender.name, className: _TenderLKItem_module_scss_1["default"].option, classNameText: _TenderLKItem_module_scss_1["default"].optionText }),
        React.createElement("div", { className: _TenderLKItem_module_scss_1["default"].bottom },
            React.createElement("div", { className: _TenderLKItem_module_scss_1["default"].files }),
            React.createElement(Button_1.Button, { variant: Button_1.ButtonVariant.CONTENT, color: button_model_1.ButtonColor.Negative, size: button_model_1.ButtonSize.Medium, beforeImage: trash_data_icon_1.TRASH_NEGATIVE_TO_WHITE_ICON, onClick: onClickDelete, className: classes_lib_1.cls(_TenderLKItem_module_scss_1["default"]["delete"], className) }))));
};
