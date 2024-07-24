'use client';
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var _LKTenderPage_module_scss_1 = require("./_LKTenderPage.module.scss");
var Wrapper1280_1 = require("@/shared/ui/Wrapper/1280/Wrapper1280");
var SuspenseL_1 = require("@/shared/ui/Wrapper/SuspenseL/SuspenseL");
var switchSelector_data_1 = require("@/shared/ui/SwitchSelector/data/switchSelector.data");
var tender_model_1 = require("@/entities/Tender/model/tender.model");
var HeaderLK_1 = require("@/features/Headers/HeaderLK");
var LKPTPage_1 = require("@/features/LKPTPage");
var LKTenderTableAdaptive_1 = require("@/entities/Tender/ui/TableAdaptive/LKTenderTableAdaptive");
var pages_url_config_1 = require("@/config/pages-url.config");
function LKTenderPage() {
    // STATE
    var _a = react_1.useState(), tenderType = _a[0], setTenderType = _a[1];
    var _b = react_1.useState(tenderType === tender_model_1.ETenderType.PURCHASE
        ? switchSelector_data_1.SWITCH_SELECTOR_PURCHASE_TENDERS_OPTION
        : switchSelector_data_1.SWITCH_SELECTOR_SALE_TENDERS_OPTION), selectedOption = _b[0], setSelectedOption = _b[1];
    var OPTIONS_TAB = {
        sale: { optionTab: React.createElement(LKTenderTableAdaptive_1.LKTenderTableAdaptive, { tenderType: tender_model_1.ETenderType.SALE }) },
        purchase: { optionTab: React.createElement(LKTenderTableAdaptive_1.LKTenderTableAdaptive, { tenderType: tender_model_1.ETenderType.PURCHASE }) }
    };
    return (React.createElement(Wrapper1280_1["default"], null,
        React.createElement(SuspenseL_1["default"].Tender, { searchKey: 'type', set: setTenderType },
            React.createElement(HeaderLK_1.HeaderLKPT, { title: 'Мои тендеры', buttonBackProps: { href: pages_url_config_1.DASHBOARD_PAGES.HOME.path }, selectedOption: selectedOption, setSelectedOption: setSelectedOption, options: switchSelector_data_1.TENDER_TYPE_OPTIONS, optionsTab: {}, isButtonAdd: true, buttonAddProps: { href: pages_url_config_1.DASHBOARD_PAGES.NEW_TENDER.path } }),
            React.createElement(LKPTPage_1.LKPTPage, { optionsTab: OPTIONS_TAB, selectedOption: selectedOption, className: _LKTenderPage_module_scss_1["default"].block }))));
}
exports["default"] = LKTenderPage;
