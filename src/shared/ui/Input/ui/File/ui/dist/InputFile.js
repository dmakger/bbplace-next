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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
var getter_file_lib_1 = require("@/entities/File/lib/getter.file.lib");
// TODO: Добавить уведомледния об успешной / не успешной загрузке
/**
 *
 * @param multiple - изначально true. Если {true}, то принимает 1 и более файлов, если {false}, то принимает строго 1 файл
 * @returns
 */
exports.InputFile = function (_a) {
    var title = _a.title, _b = _a.multiple, multiple = _b === void 0 ? true : _b, setFileList = _a.setFileList, setResponseFileList = _a.setResponseFileList, _c = _a.variant, variant = _c === void 0 ? input_model_1.EInputVariants.ROUNDED : _c, onChange = _a.onChange, success = _a.success, setSuccess = _a.setSuccess, warning = _a.warning, setWarning = _a.setWarning, setInputValueLength = _a.setInputValueLength, size = _a.size, rest = __rest(_a, ["title", "multiple", "setFileList", "setResponseFileList", "variant", "onChange", "success", "setSuccess", "warning", "setWarning", "setInputValueLength", "size"]);
    // REF
    var inputRef = react_1.useRef(null);
    // STATE
    var _d = react_1.useState(file_input_lib_1.getInputFilePrompt(multiple)), locTitle = _d[0], setLocTitle = _d[1];
    // API
    var uploadFile = file_api_1.FileAPI.useUploadFileMutation()[0];
    var getFile = file_api_1.FileAPI.useGetFileMutation()[0];
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
        if (setFileList && setResponseFileList && e.target.files && e.target.files.length > 0) {
            var fileArray = to_file_lib_1.fileListToIFileList(Array.from(e.target.files));
            upload_file_lib_1.uploadFileList(multiple ? fileArray : [fileArray[0]], uploadFile).then(function (uploadedFileList) {
                getFileList(uploadedFileList).then(function (r) {
                    var newFileList = r.newFileList, newResponseFileList = r.newResponseFileList;
                    if (newFileList.length === 0 || newResponseFileList.length === 0)
                        return;
                    if (multiple) {
                        setFileList([newFileList[0]]);
                        setResponseFileList([newResponseFileList[0]]);
                    }
                    else {
                        setFileList(function (prev) { return __spreadArrays(prev, newFileList); });
                        setResponseFileList(function (prev) { return __spreadArrays(prev, newResponseFileList); });
                    }
                });
            }, function (e) { console.error(e); });
        }
    };
    // Получение загруженных файлов
    var getFileList = function (uploadedFileList) { return __awaiter(void 0, void 0, void 0, function () {
        var newFileList, newResponseFileList, filePromises;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    newFileList = [];
                    newResponseFileList = [];
                    filePromises = uploadedFileList.map(function (it) { return __awaiter(void 0, void 0, void 0, function () {
                        var result;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (it === null)
                                        return [2 /*return*/];
                                    return [4 /*yield*/, getter_file_lib_1.getFileItemOfServer(it, getFile, true)];
                                case 1:
                                    result = _a.sent();
                                    if (result !== null) {
                                        newFileList.push(result);
                                        newResponseFileList.push(it);
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [4 /*yield*/, Promise.all(filePromises)];
                case 1:
                    _a.sent();
                    return [2 /*return*/, {
                            newFileList: newFileList,
                            newResponseFileList: newResponseFileList
                        }];
            }
        });
    }); };
    var handleOnClickButton = function () {
        var _a;
        (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.click();
    };
    return (React.createElement(Button_1.Button, { variant: Button_1.ButtonVariant.DEFAULT, beforeImage: file_data_icon_1.FILE_ADD_ICON, title: locTitle, onClick: handleOnClickButton, className: classes_lib_1.cls(_InputFile_module_scss_1["default"].block, _InputFile_module_scss_1["default"][variant]), classNameText: _InputFile_module_scss_1["default"].text, classNameTextHovered: _InputFile_module_scss_1["default"].textHovered, classNameTextDisabled: _InputFile_module_scss_1["default"].textDisabled },
        React.createElement("input", __assign({ type: "file", multiple: multiple, ref: inputRef, onChange: function (e) { return handleOnChange(e); }, className: _InputFile_module_scss_1["default"].input }, rest))));
};
