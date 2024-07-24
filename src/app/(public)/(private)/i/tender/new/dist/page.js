'use client';
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var tender_model_1 = require("@/entities/Tender/model/tender.model");
var switchSelector_data_1 = require("@/shared/ui/SwitchSelector/data/switchSelector.data");
var Wrapper1280_1 = require("@/shared/ui/Wrapper/1280/Wrapper1280");
var PageTenderNew_1 = require("@/widgets/Pages/LK/Tender/New/PageTenderNew");
var LKPT_1 = require("@/shared/ui/Wrapper/LKPT");
var SuspenseL_1 = require("@/shared/ui/Wrapper/SuspenseL/SuspenseL");
var pages_url_config_1 = require("@/config/pages-url.config");
function LKTenderNewPage() {
    // STATE
    var _a = react_1.useState(), tenderType = _a[0], setTenderType = _a[1];
    var OPTIONS_TAB = {
        sale: {
            optionTab: React.createElement(PageTenderNew_1.PageTenderNew, { type: tender_model_1.ETenderType.SALE }),
            optionValue: String(switchSelector_data_1.SWITCH_SELECTOR_SALE_TENDERS_OPTION.value)
        },
        purchase: {
            optionTab: React.createElement(PageTenderNew_1.PageTenderNew, { type: tender_model_1.ETenderType.PURCHASE }),
            optionValue: String(switchSelector_data_1.SWITCH_SELECTOR_PURCHASE_TENDERS_OPTION.value)
        }
    };
    return (React.createElement(Wrapper1280_1["default"], null,
        React.createElement(SuspenseL_1["default"].Tender, { searchKey: 'type', set: setTenderType },
            React.createElement(LKPT_1.WrapperLKPT, { pageTitle: "\u041D\u043E\u0432\u044B\u0439 \u0442\u0435\u043D\u0434\u0435\u0440", isButtonAdd: false, buttonBackProps: { href: pages_url_config_1.DASHBOARD_PAGES.TENDERS.path }, options: switchSelector_data_1.TENDER_TYPE_OPTIONS, optionsTab: OPTIONS_TAB, startPage: tenderType === tender_model_1.ETenderType.PURCHASE ? switchSelector_data_1.SWITCH_SELECTOR_PURCHASE_TENDERS_OPTION : switchSelector_data_1.SWITCH_SELECTOR_SALE_TENDERS_OPTION }))));
}
exports["default"] = LKTenderNewPage;
