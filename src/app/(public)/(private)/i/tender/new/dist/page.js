'use client';
"use strict";
exports.__esModule = true;
var navigation_1 = require("next/navigation");
var react_1 = require("react");
var tender_lib_1 = require("@/entities/Tender/lib/tender.lib");
var tender_model_1 = require("@/entities/Tender/model/tender.model");
var HeaderLK_1 = require("@/features/Headers/HeaderLK");
var switchSelector_data_1 = require("@/shared/ui/SwitchSelector/data/switchSelector.data");
var Wrapper1280_1 = require("@/shared/ui/Wrapper/1280/Wrapper1280");
var LKPTPage_1 = require("@/features/LKPTPage");
var PageTenderNew_1 = require("@/widgets/Pages/LK/Tender/New/PageTenderNew");
// export default function LKTenderNewPage() {
//     return (
//         <SuspenseL>
//             <LKTenderNewChild />
//         </SuspenseL>
//     );
// };
// export const LKTenderNewChild: FC = () => {
function LKTenderNewPage() {
    // ROUTER
    var searchParams = navigation_1.useSearchParams();
    // STATE
    var _a = react_1.useState(tender_lib_1.toTenderType(searchParams.get('type')) === tender_model_1.ETenderType.PURCHASE
        ? switchSelector_data_1.SWITCH_SELECTOR_PURCHASE_TENDERS_OPTION
        : switchSelector_data_1.SWITCH_SELECTOR_SALE_TENDERS_OPTION), selectedOption = _a[0], setSelectedOption = _a[1];
    var OPTIONS_TAB = {
        sale: { optionTab: React.createElement(PageTenderNew_1.PageTenderNew, { type: tender_model_1.ETenderType.SALE }) },
        purchase: { optionTab: React.createElement(PageTenderNew_1.PageTenderNew, { type: tender_model_1.ETenderType.PURCHASE }) }
    };
    return (React.createElement(Wrapper1280_1["default"], null,
        React.createElement(HeaderLK_1.HeaderLKPT, { title: 'Новый тендер', selectedOption: selectedOption, setSelectedOption: setSelectedOption, options: switchSelector_data_1.TENDER_TYPE_OPTIONS, optionsTab: {}, isButtonAdd: false }),
        React.createElement(LKPTPage_1.LKPTPage, { optionsTab: OPTIONS_TAB, selectedOption: selectedOption })));
}
exports["default"] = LKTenderNewPage;
