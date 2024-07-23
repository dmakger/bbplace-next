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
exports.ListOption = void 0;
var ListItemOption_1 = require("../Item/ListItemOption");
var List_1 = require("../../../Default/List");
exports.ListOption = function (_a) {
    var items = _a.items, direction = _a.direction, onClickItem = _a.onClickItem, componentProps = _a.componentProps, className = _a.className, classNameItem = _a.classNameItem, classNameOptionText = _a.classNameOptionText;
    // HANDLE
    var handleOnClickOption = function (it) {
        if (onClickItem)
            onClickItem(it);
    };
    return (React.createElement(List_1.List, { items: items, direction: direction, component: ListItemOption_1.ListItemOption, componentProps: __assign(__assign({}, componentProps), { onClick: handleOnClickOption, className: classNameItem, classNameText: classNameOptionText }), className: className }));
};
