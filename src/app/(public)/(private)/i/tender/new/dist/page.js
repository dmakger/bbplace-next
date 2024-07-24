'use client';
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var tender_model_1 = require("@/entities/Tender/model/tender.model");
var HeaderLK_1 = require("@/features/Headers/HeaderLK");
var switchSelector_data_1 = require("@/shared/ui/SwitchSelector/data/switchSelector.data");
var Wrapper1280_1 = require("@/shared/ui/Wrapper/1280/Wrapper1280");
var LKPTPage_1 = require("@/features/LKPTPage");
var PageTenderNew_1 = require("@/widgets/Pages/LK/Tender/New/PageTenderNew");
var SuspenseL_1 = require("@/shared/ui/Wrapper/SuspenseL/SuspenseL");
var pages_url_config_1 = require("@/config/pages-url.config");
function LKTenderNewPage() {
    // STATE
    var _a = react_1.useState(), tenderType = _a[0], setTenderType = _a[1];
    var _b = react_1.useState(tenderType === tender_model_1.ETenderType.PURCHASE
        ? switchSelector_data_1.SWITCH_SELECTOR_PURCHASE_TENDERS_OPTION
        : switchSelector_data_1.SWITCH_SELECTOR_SALE_TENDERS_OPTION), selectedOption = _b[0], setSelectedOption = _b[1];
    var OPTIONS_TAB = {
        sale: { optionTab: React.createElement(PageTenderNew_1.PageTenderNew, { type: tender_model_1.ETenderType.SALE }) },
        purchase: { optionTab: React.createElement(PageTenderNew_1.PageTenderNew, { type: tender_model_1.ETenderType.PURCHASE }) }
    };
    return (React.createElement(Wrapper1280_1["default"], null,
        React.createElement(SuspenseL_1["default"].Tender, { searchKey: 'type', set: setTenderType },
            React.createElement(HeaderLK_1.HeaderLKPT, { title: 'Новый тендер', buttonBackProps: { href: pages_url_config_1.DASHBOARD_PAGES.TENDERS.path }, selectedOption: selectedOption, setSelectedOption: setSelectedOption, options: switchSelector_data_1.TENDER_TYPE_OPTIONS, optionsTab: {}, isButtonAdd: false }),
            React.createElement(LKPTPage_1.LKPTPage, { optionsTab: OPTIONS_TAB, selectedOption: selectedOption }))));
}
exports["default"] = LKTenderNewPage;
