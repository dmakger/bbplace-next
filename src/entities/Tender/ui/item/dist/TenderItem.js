'use client';
"use strict";
exports.__esModule = true;
exports.TenderItem = void 0;
var classes_lib_1 = require("@/shared/lib/classes.lib");
var _TenderItem_module_scss_1 = require("./_TenderItem.module.scss");
var Button_1 = require("@/shared/ui/Button");
var TenderType_1 = require("../../components/TenderType/TenderType");
var navigation_1 = require("next/navigation");
var react_1 = require("react");
var tender_lib_1 = require("../../lib/tender.lib");
var category_metrics_api_1 = require("@/entities/Metrics/api/category.metrics.api");
var CreatedAt_1 = require("@/shared/ui/CreatedAt");
var SupplierWNav_1 = require("@/entities/Supplier/ui/WNav/SupplierWNav");
var HandleSize_1 = require("@/shared/ui/Handle/Size/HandleSize");
var view_supplier_data_1 = require("@/entities/Supplier/data/view.supplier.data");
var supplier_data_1 = require("@/entities/Supplier/data/supplier.data");
var Text_1 = require("@/shared/ui/Text");
var text_model_1 = require("@/shared/model/text.model");
var Category_1 = require("@/entities/Metrics/ui/Category");
var FavouriteAutoToTenderButton_1 = require("../../components/Buttons/Favourite/Auto/FavouriteAutoToTenderButton");
var view_product_data_1 = require("../../data/view.product.data");
var arrow_data_icon_1 = require("@/shared/ui/Icon/data/arrow.data.icon");
var htt_tender_lib_1 = require("@/shared/ui/Text/lib/htt.tender.lib");
var link_1 = require("next/link");
var pages_url_config_1 = require("@/config/pages-url.config");
exports.TenderItem = function (_a) {
    var tender = _a.tender, _b = _a.tender, id = _b.id, categoryId = _b.categoryId, ownerId = _b.ownerId, createdAt = _b.createdAt, className = _a.className;
    //STATE
    var _c = react_1.useState(), tenderCategory = _c[0], setTenderCategory = _c[1];
    var _d = react_1.useState(), tenderType = _d[0], setTenderType = _d[1];
    var _e = react_1.useState(false), is768 = _e[0], setIs768 = _e[1];
    //API
    var categories = category_metrics_api_1.CategoryAPI.useGetCategoriesQuery().data;
    //EFFECT
    react_1.useEffect(function () {
        categories && setTenderCategory(categories.find(function (category) { return category.id === categoryId; }));
    }, [categories]);
    react_1.useEffect(function () {
        setTenderType(tender_lib_1.getTenderType(tender));
    }, [tender]);
    //NAVIGATE
    var push = navigation_1.useRouter().push;
    var goToTheTenderMobile = function () {
        if (is768) {
            push("tender/" + id);
        }
    };
    var goToTheTenderDesktop = function () {
        push("tender/" + id);
    };
    var handleInfoClick = function (e) {
        e.stopPropagation();
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("section", { className: classes_lib_1.cls(_TenderItem_module_scss_1["default"].TenderCard, className), onClick: goToTheTenderMobile },
            React.createElement("div", { className: _TenderItem_module_scss_1["default"].topContainer, onClick: handleInfoClick },
                React.createElement("div", { className: _TenderItem_module_scss_1["default"].info },
                    tenderType && React.createElement(TenderType_1.TenderType, { tenderType: tenderType }),
                    tenderCategory && React.createElement(Category_1.CategoryItem, { category: tenderCategory })),
                React.createElement(FavouriteAutoToTenderButton_1.FavouriteAutoToTenderButton, { tenderId: tender.id, view: view_product_data_1.ETenderFavouriteViewItem.SMALL_FILL })),
            React.createElement("div", { className: _TenderItem_module_scss_1["default"].middleContainer },
                React.createElement(link_1["default"], { href: pages_url_config_1.MAIN_PAGES.CURRENT_TENDER({ id: tender.id, type: tender.type }).path, className: _TenderItem_module_scss_1["default"].cardTitle }, tender.name),
                React.createElement(Text_1.HeadingToTextTable, { data: htt_tender_lib_1.getDataTenderInfo({ tender: tender }), variant: text_model_1.EHeadingToTextVariants.ROW, hasSpace: true, classNameMainBlock: _TenderItem_module_scss_1["default"].TenderInfo, classNameHeadingItem: _TenderItem_module_scss_1["default"].heading, classNameTextItem: _TenderItem_module_scss_1["default"].text })),
            React.createElement("div", { className: _TenderItem_module_scss_1["default"].bottomContainer },
                React.createElement("div", { className: _TenderItem_module_scss_1["default"].supplierBlock, onClick: handleInfoClick },
                    React.createElement(SupplierWNav_1.SupplierWNav, { className: _TenderItem_module_scss_1["default"].supplier, classNameSmallSupplier: _TenderItem_module_scss_1["default"].smallSupplier, id: ownerId, view: is768 ? supplier_data_1.ESupplierView.SMALL : supplier_data_1.ESupplierView.LARGE_GRAY, subscribeView: view_supplier_data_1.ESupplierSubscribeViewItem.SMALL, navs: [
                            is768 ? view_supplier_data_1.ESupplierToChatViewItem.LARGE : view_supplier_data_1.ESupplierToChatViewItem.LARGE_WIDE,
                        ] })),
                React.createElement(CreatedAt_1.CreatedAt, { createdAt: createdAt }),
                React.createElement("div", { className: _TenderItem_module_scss_1["default"].buttonToTender, onClick: handleInfoClick },
                    React.createElement(Button_1.Button, { variant: Button_1.ButtonVariant.W_ARROW_RED, onClick: goToTheTenderDesktop, title: "\u0412 \u0442\u0435\u043D\u0434\u0435\u0440", afterImage: arrow_data_icon_1.ARROW_ICON, afterProps: { width: 14, height: 14 } }))),
            React.createElement("div", { className: _TenderItem_module_scss_1["default"].mobileLine })),
        React.createElement(HandleSize_1.HandleSize, { width: 768, set: setIs768 })));
};
