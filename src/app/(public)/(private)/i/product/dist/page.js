"use client";
"use strict";
exports.__esModule = true;
var LKProductTableAdaptive_1 = require("@/entities/Product/ui/TableAdaptive/LKProductTableAdaptive");
var HeaderLK_1 = require("@/features/Headers/HeaderLK");
var LKPTPage_1 = require("@/features/LKPTPage");
var switchSelector_data_1 = require("@/shared/ui/SwitchSelector/data/switchSelector.data");
var Wrapper1280_1 = require("@/shared/ui/Wrapper/1280/Wrapper1280");
var WrapperAuth_1 = require("@/shared/ui/Wrapper/Auth/WrapperAuth");
var react_1 = require("react");
function LKProductPage() {
    // STATE
    var _a = react_1.useState(switchSelector_data_1.SWITCH_SELECTOR_CREATED_PRODUCTS_OPTION), selectedOption = _a[0], setSelectedOption = _a[1];
    var MY_PRODUCTS_OPTIONS_TAB = {
        // active: { optionTab: <LKProductTableAdaptive typeProduct={ProductsTypeLK.Active}/>, optionQuantity: 22 },
        // drafts: { optionTab: <LKProductTableAdaptive typeProduct={ProductsTypeLK.Draft}/>, optionQuantity: 3 },
        // woPrice: { optionTab: <LKProductTableAdaptive typeProduct={ProductsTypeLK.WithoutPrice}/>, optionQuantity: 0 },
        active: { optionTab: React.createElement(LKProductTableAdaptive_1.LKProductTableAdaptive, { typeProduct: switchSelector_data_1.ProductsTypeLK.Active }) },
        drafts: { optionTab: React.createElement(LKProductTableAdaptive_1.LKProductTableAdaptive, { typeProduct: switchSelector_data_1.ProductsTypeLK.Draft }) },
        woPrice: { optionTab: React.createElement(LKProductTableAdaptive_1.LKProductTableAdaptive, { typeProduct: switchSelector_data_1.ProductsTypeLK.WithoutPrice }) }
    };
    return (React.createElement(Wrapper1280_1["default"], null,
        React.createElement(WrapperAuth_1.WrapperAuth, null,
            React.createElement(HeaderLK_1.HeaderLKPT, { title: 'Мои товары', selectedOption: selectedOption, options: [
                    switchSelector_data_1.SWITCH_SELECTOR_CREATED_PRODUCTS_OPTION,
                    switchSelector_data_1.SWITCH_SELECTOR_WO_PRICE_PRODUCTS_OPTION,
                    switchSelector_data_1.SWITCH_SELECTOR_DRAFT_PRODUCTS_OPTION
                ], setSelectedOption: setSelectedOption, optionsTab: MY_PRODUCTS_OPTIONS_TAB }),
            React.createElement(LKPTPage_1.LKPTPage, { optionsTab: MY_PRODUCTS_OPTIONS_TAB, selectedOption: selectedOption }))));
}
exports["default"] = LKProductPage;
