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
exports.__esModule = true;
exports.NavBarPTCChild = exports.NavBarPTC = void 0;
var react_1 = require("react");
var _NavBarPTC_module_scss_1 = require("./_NavBarPTC.module.scss");
var classes_lib_1 = require("@/shared/lib/classes.lib");
var WEB_1 = require("@/widgets/Menu/WEB");
var navigation_1 = require("next/navigation");
var ViewsNavBarPTC_1 = require("../components/ViewsNavBarPTC");
var hooks_1 = require("@/storage/hooks");
var text_ptc_lib_1 = require("../lib/text.ptc.lib");
var SortModal_1 = require("@/features/Modal/Sort/SortModal");
var link_ptc_lib_1 = require("../lib/link.ptc.lib");
var core_params_config_1 = require("@/config/params/core.params.config");
var SuspenseL_1 = require("@/shared/ui/Wrapper/SuspenseL/SuspenseL");
exports.NavBarPTC = function (_a) {
    var rest = __rest(_a, []);
    return (React.createElement(SuspenseL_1["default"], null,
        React.createElement(exports.NavBarPTCChild, __assign({}, rest))));
};
exports.NavBarPTCChild = function (_a) {
    // RTK
    var ptcState = hooks_1.useAppSelector(function (state) { return state.ptc; });
    // ROUTER
    var pathname = navigation_1.usePathname();
    var searchParams = navigation_1.useSearchParams();
    var router = navigation_1.useRouter();
    //STATE
    var _b = react_1.useState(link_ptc_lib_1.getPTCViewByPathname(pathname)), filterView = _b[0], setFilterView = _b[1];
    var _c = react_1.useState(link_ptc_lib_1.getPTCVariantByPathname(pathname)), selectedOption = _c[0], setSelectedOption = _c[1];
    //EFFECT
    react_1.useEffect(function () {
        setSelectedOption(link_ptc_lib_1.getPTCVariantByPathname(pathname));
    }, [pathname]);
    // ON CLICK
    var handleOnClickMenuItem = function (el) {
        if (el.link === undefined)
            return;
        setSelectedOption(el);
        setFilterView(link_ptc_lib_1.getPTCViewByPathname(el.link));
        var categoryValue = searchParams.get(core_params_config_1.CORE_PARAMS.CATEGORY);
        var param = "";
        if (categoryValue !== null)
            param = core_params_config_1.CORE_PARAMS.CATEGORY + "=" + categoryValue;
        router.push(el.link + "?" + param);
    };
    return (React.createElement("section", { className: _NavBarPTC_module_scss_1["default"].NavBarPTC },
        React.createElement("div", { className: _NavBarPTC_module_scss_1["default"].leftContainer },
            React.createElement("div", { className: _NavBarPTC_module_scss_1["default"].navBarPTCItemContainer }, WEB_1.MENU_WEB_DATA.map(function (el) { return (React.createElement("button", { onClick: function () { return handleOnClickMenuItem(el); }, className: _NavBarPTC_module_scss_1["default"].navBarItem, key: el.link },
                React.createElement("p", { className: classes_lib_1.cls(_NavBarPTC_module_scss_1["default"].switchItem, (selectedOption === null || selectedOption === void 0 ? void 0 : selectedOption.link) === el.link ? _NavBarPTC_module_scss_1["default"].selected : '') }, el.title),
                React.createElement("span", { className: classes_lib_1.cls(_NavBarPTC_module_scss_1["default"].switchItemBorderBottom, (selectedOption === null || selectedOption === void 0 ? void 0 : selectedOption.link) === el.link ? _NavBarPTC_module_scss_1["default"].selectedSpan : '') }))); })),
            React.createElement("div", { className: _NavBarPTC_module_scss_1["default"].mobileSortContainer },
                React.createElement(SortModal_1.SortModal, { variant: filterView }))),
        React.createElement("div", { className: _NavBarPTC_module_scss_1["default"].rightContainer },
            React.createElement("p", { className: _NavBarPTC_module_scss_1["default"].resultNumber },
                ptcState.amount,
                " ",
                text_ptc_lib_1.getPTCTextByNumber(ptcState.amount, ptcState.view)),
            selectedOption &&
                React.createElement(ViewsNavBarPTC_1.ViewsNavBarPTC, { ptcLink: selectedOption.link }),
            React.createElement(SortModal_1.SortModal, { variant: filterView, hasOutline: true, classNameModal: _NavBarPTC_module_scss_1["default"].sortModal, classNameButton: _NavBarPTC_module_scss_1["default"].sortButton }))));
};
