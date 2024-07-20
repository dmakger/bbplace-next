"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.DASHBOARD_PAGES = exports.MAIN_PAGES = void 0;
var tender_model_1 = require("@/entities/Tender/model/tender.model");
var Route = /** @class */ (function () {
    function Route(root) {
        this.root = root;
    }
    Route.prototype.createPath = function (subPath, onlyAuth) {
        if (onlyAuth === void 0) { onlyAuth = false; }
        var path = "" + this.root + subPath;
        return {
            path: path,
            onlyAuth: onlyAuth,
            toString: function () { return path; }
        };
    };
    Route.prototype.createDynamicPath = function (subPath, onlyAuth) {
        var _this = this;
        if (onlyAuth === void 0) { onlyAuth = false; }
        return function (params) { return (_this.createPath(subPath(params), onlyAuth)); };
    };
    return Route;
}());
// ======={ MAIN }=======
var MAIN = /** @class */ (function (_super) {
    __extends(MAIN, _super);
    function MAIN() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.HOME = _this.createPath('/');
        _this.CATALOG = _this.createPath('/catalog');
        _this.PRODUCTS = _this.createPath('/product');
        _this.TENDERS = _this.createPath('/tender');
        _this.SUPPLIERS = _this.createPath('/supplier');
        _this.SUPPORT = _this.createPath('/support');
        _this.CURRENT_SUPPLIER = _this.createDynamicPath(function (id) { return "/supplier/" + id; }, true);
        _this.CURRENT_PRODUCT = _this.createDynamicPath(function (id) { return "/product/" + id; }, true);
        _this.CURRENT_TENDER = _this.createDynamicPath(function (params) { return "/tender/" + params.id + "/" + (params.type || tender_model_1.ETenderType.PURCHASE); }, true);
        return _this;
    }
    return MAIN;
}(Route));
exports.MAIN_PAGES = new MAIN('');
var DASHBOARD = /** @class */ (function (_super) {
    __extends(DASHBOARD, _super);
    function DASHBOARD() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.HOME = _this.createPath('/', true);
        _this.PROFILE_EDIT = _this.createPath('/edit', true);
        _this.FAVORITE = _this.createPath('/favorite', true);
        _this.CHATS = _this.createPath('/chat', true);
        _this.PRODUCTS = _this.createPath('/product', true);
        _this.TENDERS = _this.createPath('/tender', true);
        _this.CURRENT_CHAT = _this.createDynamicPath(function (id) { return "/chat/" + id; }, true);
        _this.EDIT_PRODUCT = _this.createDynamicPath(function (id) { return "/product/edit/" + id; }, true);
        return _this;
    }
    return DASHBOARD;
}(Route));
exports.DASHBOARD_PAGES = new DASHBOARD('/i');
// ==={ ПРИМЕНЕНИЕ }===
// DASHBOARD_PAGES.PRODUCTS
// MAIN_PAGES.CURRENT_TENDER({id: 123})
// MAIN_PAGES.CURRENT_TENDER({id: 123, type: ETenderType.SALE})
