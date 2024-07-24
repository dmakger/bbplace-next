'use client';
"use strict";
exports.__esModule = true;
exports.SearchChild = exports.Search = void 0;
var react_1 = require("react");
var _Search_module_scss_1 = require("./_Search.module.scss");
var Input_1 = require("@/shared/ui/Input/Input");
var ButtonSearch_1 = require("@/shared/ui/Button/data/Search/ButtonSearch");
var Select_1 = require("@/features/Select");
var navigation_1 = require("next/navigation");
var hooks_1 = require("@/storage/hooks");
var formData_lib_1 = require("@/shared/lib/formData.lib");
var SuspenseL_1 = require("@/shared/ui/Wrapper/SuspenseL/SuspenseL");
exports.Search = function () {
    return (React.createElement(SuspenseL_1["default"], null,
        React.createElement(exports.SearchChild, null)));
};
exports.SearchChild = function () {
    //STATE
    var view = hooks_1.useAppSelector(function (state) { return state.ptc; }).view;
    //REF
    var formRef = react_1.useRef(null);
    var searchParams = navigation_1.useSearchParams();
    //ROUTER
    var router = navigation_1.useRouter();
    var handleOnSubmit = function (e) {
        e.preventDefault();
        if (!formRef.current)
            return;
        var data = formData_lib_1.getFormData(formRef.current);
        if (data.search !== '') {
            var searchString_1 = new URLSearchParams;
            searchParams.forEach(function (value, key) {
                return searchString_1.append(key, value);
            });
            searchString_1.set('search', data.search);
            router.push(window.location.origin + "/" + view + "?" + searchString_1.toString());
        }
    };
    return (React.createElement("form", { className: _Search_module_scss_1["default"].search, onSubmit: handleOnSubmit, ref: formRef },
        React.createElement(Select_1.PTCSelect, { classNameTitle: _Search_module_scss_1["default"].select, classNameButton: _Search_module_scss_1["default"].buttonSelect }),
        React.createElement(Input_1["default"].Text, { name: 'search', placeholder: "\u041F\u043E\u0438\u0441\u043A...", className: _Search_module_scss_1["default"].text, classNameInputText: _Search_module_scss_1["default"].textInput }),
        React.createElement(ButtonSearch_1["default"], { className: _Search_module_scss_1["default"].button })));
};
