'use client';
"use strict";
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
exports.__esModule = true;
exports.BottomInfoModal = void 0;
var classes_lib_1 = require("@/shared/lib/classes.lib");
var _BottomInfoModal_module_scss_1 = require("./_BottomInfoModal.module.scss");
var bottomInfoModal_model_1 = require("../model/bottomInfoModal.model");
var Button_1 = require("@/shared/ui/Button");
var button_model_1 = require("@/shared/ui/Button/model/button.model");
var edit_data_icon_1 = require("@/shared/ui/Icon/data/edit.data.icon");
var trash_data_icon_1 = require("@/shared/ui/Icon/data/trash.data.icon");
var product_api_1 = require("@/entities/Product/api/product.api");
var pages_url_config_1 = require("@/config/pages-url.config");
var navigation_1 = require("next/navigation");
exports.BottomInfoModal = function (_a) {
    var className = _a.className, classNameText = _a.classNameText, classNameButton = _a.classNameButton, classNameButtonContainer = _a.classNameButtonContainer, _b = _a.variant, variant = _b === void 0 ? bottomInfoModal_model_1.EBottomInfoVariant.TEXT : _b, text = _a.text, product = _a.product, _c = _a.isTitle, isTitle = _c === void 0 ? true : _c, setIsOpen = _a.setIsOpen;
    //API
    var deleteProduct = product_api_1.ProductAPI.useDeleteProductMutation()[0];
    var deleteDraft = product_api_1.ProductAPI.useDeleteDraftMutation()[0];
    //ROUTER
    var router = navigation_1.useRouter();
    //FUNCTION
    var delProduct = function (id) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(product === null || product === void 0 ? void 0 : product.media.attachments.length)) return [3 /*break*/, 2];
                    return [4 /*yield*/, deleteProduct(id)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, deleteDraft(id)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    setIsOpen && setIsOpen(false);
                    return [2 /*return*/];
            }
        });
    }); };
    var navigateToEditProduct = function (productId) {
        router.push(pages_url_config_1.DASHBOARD_PAGES.EDIT_PRODUCT(productId).path);
    };
    return (React.createElement("div", { className: classes_lib_1.cls(_BottomInfoModal_module_scss_1["default"].BottomInfo, className) },
        variant === bottomInfoModal_model_1.EBottomInfoVariant.SETTINGS && React.createElement("div", { className: classes_lib_1.cls(_BottomInfoModal_module_scss_1["default"].buttonsContainer, !isTitle ? _BottomInfoModal_module_scss_1["default"].noPadding : '', classNameButtonContainer) },
            React.createElement(Button_1.Button, { title: isTitle ? 'Удалить' : '', variant: Button_1.ButtonVariant.TONAL, color: button_model_1.ButtonColor.Negative, size: button_model_1.ButtonSize.Medium, beforeImage: trash_data_icon_1.TRASH_ICON, beforeProps: { width: 20, height: 20 }, onClick: function () { return delProduct(product ? product.id : 0); }, className: classNameButton }),
            React.createElement(Button_1.Button, { title: isTitle ? 'Редактировать' : '', variant: Button_1.ButtonVariant.TONAL, color: button_model_1.ButtonColor.Secondary, size: button_model_1.ButtonSize.Medium, beforeImage: edit_data_icon_1.EDIT_ICON, beforeProps: { width: 20, height: 20 }, onClick: navigateToEditProduct, className: classNameButton })),
        variant === bottomInfoModal_model_1.EBottomInfoVariant.TEXT && React.createElement("p", { className: classes_lib_1.cls(_BottomInfoModal_module_scss_1["default"].bottomText, classNameText) }, text)));
};
