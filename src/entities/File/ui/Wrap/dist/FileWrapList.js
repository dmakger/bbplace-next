"use strict";
exports.__esModule = true;
exports.FileWrapList = void 0;
var react_1 = require("react");
var lodash_1 = require("lodash");
var classes_lib_1 = require("@/shared/lib/classes.lib");
var _FileWrapList_module_scss_1 = require("./_FileWrapList.module.scss");
var FileItemAttachment_1 = require("../Item/ui/Attachment/FileItemAttachment");
exports.FileWrapList = function (_a) {
    var fileList = _a.fileList, setFileList = _a.setFileList, responseFileList = _a.responseFileList, setResponseFileList = _a.setResponseFileList, onClickDeleteItem = _a.onClickDeleteItem, className = _a.className;
    // HANDLE
    var onClickDelete = react_1.useCallback(function (file, responseFile) {
        if (onClickDeleteItem)
            onClickDeleteItem(file);
        if (setFileList && setResponseFileList) {
            setFileList(function (prev) { return prev.filter(function (it) { return !lodash_1.isEqual(it, file); }); });
            setResponseFileList(function (prev) { return prev.filter(function (it) { return !lodash_1.isEqual(it, responseFile); }); });
        }
    }, [onClickDeleteItem, setFileList]);
    return (React.createElement("div", { className: classes_lib_1.cls(_FileWrapList_module_scss_1["default"].list, className) }, fileList.map(function (file, index) { return (React.createElement(FileItemAttachment_1.FileItemAttachment, { file: file, onClickDelete: function () { return onClickDelete(file, responseFileList[index]); }, key: index + " " + file.url + " " + file.name })); })));
};
