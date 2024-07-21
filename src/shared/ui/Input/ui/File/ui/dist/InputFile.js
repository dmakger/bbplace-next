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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.InputFile = void 0;
var react_1 = require("react");
var classes_lib_1 = require("@/shared/lib/classes.lib");
var _InputFile_module_scss_1 = require("./_InputFile.module.scss");
var input_model_1 = require("../../../model/input.model");
var Button_1 = require("../../../../Button");
var file_data_icon_1 = require("../../../../Icon/data/file.data.icon");
var file_input_lib_1 = require("../lib/file.input.lib");
var to_file_lib_1 = require("@/entities/File/lib/to.file.lib");
var file_api_1 = require("@/entities/File/api/file.api");
var upload_file_lib_1 = require("@/entities/File/lib/upload.file.lib");
// TODO: Добавить уведомледния об успешной / не успешной загрузке
/**
 *
 * @param multiple - изначально true. Если {true}, то принимает 1 и более файлов, если {false}, то принимает строго 1 файл
 * @returns
 */
exports.InputFile = function (_a) {
    var title = _a.title, _b = _a.multiple, multiple = _b === void 0 ? true : _b, setFileList = _a.setFileList, _c = _a.variant, variant = _c === void 0 ? input_model_1.EInputVariants.ROUNDED : _c, onChange = _a.onChange, success = _a.success, setSuccess = _a.setSuccess, warning = _a.warning, setWarning = _a.setWarning, setInputValueLength = _a.setInputValueLength, size = _a.size, rest = __rest(_a, ["title", "multiple", "setFileList", "variant", "onChange", "success", "setSuccess", "warning", "setWarning", "setInputValueLength", "size"]);
    // REF
    var inputRef = react_1.useRef(null);
    // STATE
    var _d = react_1.useState(file_input_lib_1.getInputFilePrompt(multiple)), locTitle = _d[0], setLocTitle = _d[1];
    // API
    var uploadFile = file_api_1.FileAPI.useUploadFileMutation()[0];
    // EFFECT
    react_1.useEffect(function () {
        if (title) {
            setLocTitle(title);
        }
        else {
            setLocTitle(file_input_lib_1.getInputFilePrompt(multiple));
        }
    }, [title, multiple]);
    // HANDLE
    var handleOnChange = function (e) {
        if (onChange)
            onChange(e);
        if (setFileList && e.target.files && e.target.files.length > 0) {
            var fileArray = to_file_lib_1.fileListToIFileList(Array.from(e.target.files));
            upload_file_lib_1.uploadFileList(multiple ? fileArray : [fileArray[0]], uploadFile).then(function (uploadedFileList) {
                var responseFileList = uploadedFileList.filter(function (file) { return file !== null; });
                if (responseFileList.length === 0)
                    return;
                setFileList(function (prevUploadedFiles) {
                    return multiple ? __spreadArrays(prevUploadedFiles, responseFileList) : [responseFileList[0]];
                });
            }, function (e) { console.error(e); });
        }
    };
    var handleOnClickButton = function () {
        var _a;
        (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.click();
    };
    return (React.createElement(Button_1.Button, { variant: Button_1.ButtonVariant.DEFAULT, beforeImage: file_data_icon_1.FILE_ADD_ICON, title: locTitle, onClick: handleOnClickButton, className: classes_lib_1.cls(_InputFile_module_scss_1["default"].block, _InputFile_module_scss_1["default"][variant]), classNameText: _InputFile_module_scss_1["default"].text, classNameTextHovered: _InputFile_module_scss_1["default"].textHovered, classNameTextDisabled: _InputFile_module_scss_1["default"].textDisabled },
        React.createElement("input", __assign({ type: "file", multiple: multiple, ref: inputRef, onChange: function (e) { return handleOnChange(e); }, className: _InputFile_module_scss_1["default"].input }, rest))));
};
