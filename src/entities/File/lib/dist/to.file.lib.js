"use strict";
exports.__esModule = true;
exports.getFile = exports.fileToIFile = exports.fileListToIFileList = void 0;
var file_lib_1 = require("./file.lib");
/**
 * Перевод списка файлов в список {IFile}
 * @param files - Список файлов
 * @returns
 */
exports.fileListToIFileList = function (files) {
    return files.map(function (file) { return exports.fileToIFile(file); });
};
/**
 * Перевод File в {IFile}
 * @param file - Передаваемый file типа {IFile}
 * @returns
 */
exports.fileToIFile = function (file) {
    return {
        name: file.name,
        format: file_lib_1.getFormatFile(file.name),
        file: file
    };
};
/**
 * @returns `File` или `null`
 */
exports.getFile = function (file) {
    if (file instanceof File)
        return file;
    return file.file === undefined ? null : file.file;
};
