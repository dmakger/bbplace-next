"use strict";
exports.__esModule = true;
exports.FormTenderSaleNew = void 0;
var react_1 = require("react");
var classes_lib_1 = require("@/shared/lib/classes.lib");
var _FormTenderSaleNew_module_scss_1 = require("./_FormTenderSaleNew.module.scss");
var Input_1 = require("@/shared/ui/Input/Input");
var RectangleInput_1 = require("@/shared/ui/Wrapper/RectangleInput");
var input_model_1 = require("@/shared/ui/Input/model/input.model");
var category_metrics_api_1 = require("@/entities/Metrics/api/category.metrics.api");
var option_category_metrics_lib_1 = require("@/entities/Metrics/lib/option.category.metrics.lib");
var metrics_metrics_api_1 = require("@/entities/Metrics/api/metrics.metrics.api");
var option_metric_metrics_lib_1 = require("@/entities/Metrics/lib/option.metric.metrics.lib");
var currency_metrics_api_1 = require("@/entities/Metrics/api/currency.metrics.api");
var option_currency_metrics_lib_1 = require("@/entities/Metrics/lib/option.currency.metrics.lib");
var text_input_model_1 = require("@/shared/ui/Input/Text/model/text.input.model");
var Button_1 = require("@/shared/ui/Button");
var button_model_1 = require("@/shared/ui/Button/model/button.model");
var wrapperRectangleInput_model_1 = require("@/shared/ui/Wrapper/RectangleInput/model/wrapperRectangleInput.model");
var formData_lib_1 = require("@/shared/lib/formData.lib");
var tender_api_1 = require("@/entities/Tender/api/tender.api");
var file_api_1 = require("@/entities/File/api/file.api");
exports.FormTenderSaleNew = function (_a) {
    var className = _a.className;
    // STATE
    var _b = react_1.useState([]), categoryOptions = _b[0], setCategoryOptions = _b[1];
    var _c = react_1.useState([]), metricOptions = _c[0], setMetricOptions = _c[1];
    var _d = react_1.useState([]), currencyOptions = _d[0], setCurrencyOptions = _d[1];
    var _e = react_1.useState(true), userShareContact = _e[0], setUserShareContact = _e[1];
    var _f = react_1.useState(null), selectedCategoryOption = _f[0], setSelectedCategoryOption = _f[1];
    var _g = react_1.useState(null), selectedMinOrderOption = _g[0], setSelectedMinOrderOption = _g[1];
    var _h = react_1.useState(null), selectedCurrencyOption = _h[0], setSelectedCurrencyOption = _h[1];
    var _j = react_1.useState([]), uploadedFileList = _j[0], setUploadedFileList = _j[1];
    // API
    var categoryList = category_metrics_api_1.CategoryAPI.useGetCategoriesByIdQuery(undefined).data;
    var metricList = metrics_metrics_api_1.MetricsAPI.useGetMetricsQuery().data;
    var currencyList = currency_metrics_api_1.CurrencyAPI.useGetCurrenciesQuery().data;
    var createSaleTender = tender_api_1.TenderAPI.useCreateSaleTenderMutation()[0];
    var uploadFile = file_api_1.FileAPI.useUploadFileMutation()[0];
    // REF
    var formRef = react_1.useRef(null);
    // EFFECT
    // category
    react_1.useEffect(function () {
        if (!categoryList)
            return;
        setCategoryOptions(option_category_metrics_lib_1.categoryListToOptionList(categoryList));
    }, [categoryList]);
    // metric
    react_1.useEffect(function () {
        if (!metricList)
            return;
        setMetricOptions(option_metric_metrics_lib_1.metricListToOptionList(metricList));
    }, [metricList]);
    // currency
    react_1.useEffect(function () {
        if (!currencyList)
            return;
        setCurrencyOptions(option_currency_metrics_lib_1.currencyListToOptionList(currencyList));
    }, [currencyList]);
    // ==={ HANDLE }===
    // ON SUBMIT
    var handleOnSubmit = function (e) {
        e.preventDefault();
        if (!formRef.current)
            return;
        var formData = formData_lib_1.getFormData(formRef.current);
        console.log('qwe formData', formData, selectedCategoryOption, selectedMinOrderOption, selectedCurrencyOption, uploadedFileList);
        // const fileList = uploadFileList(selectedFileList, uploadFile)
        // console.log('qwe fileList', fileList)
        // const apiData: IPropsTenderSale = {
        //     name: formData.name,
        //     categoryId: selectedCategoryOption!.id,
        //     price: formData.price,
        //     currency: `${selectedCurrencyOption!.params!.code}`,
        //     minOrder: formData.minOrder,
        //     minOrderUnits: `${selectedMinOrderOption!.params!.shortName}`,
        //     bulkDiscounts: null,
        //     description: formData.description,
        //     shareContacts: true,
        //     attachments: ""
        // }
        // createSaleTender()
    };
    return (React.createElement("form", { onSubmit: handleOnSubmit, ref: formRef, className: classes_lib_1.cls(_FormTenderSaleNew_module_scss_1["default"].form, className) },
        React.createElement(RectangleInput_1.WrapperRectangleInput, { labelText: "Наименование", isRequired: true },
            React.createElement(Input_1["default"].Text, { name: 'name', placeholder: "\u0414\u043E 50 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432", defaultValue: "123", required: true, variant: input_model_1.EInputVariants.RECTANGULAR })),
        React.createElement(RectangleInput_1.WrapperRectangleInput, { labelText: "Категория", isRequired: true },
            React.createElement(Input_1["default"].TextAndSelect, { name: 'category', placeholder: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044E", defaultOption: categoryOptions[0], options: categoryOptions, onClickOption: setSelectedCategoryOption, titleModal: "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F", required: true, variant: input_model_1.EInputVariants.RECTANGULAR })),
        React.createElement(RectangleInput_1.WrapperRectangleInput, { labelText: "Минимальный заказ", isRequired: true },
            React.createElement(Input_1["default"].Text, { name: 'minOrder', placeholder: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0447\u0438\u0441\u043B\u043E", defaultValue: "123", required: true, variant: input_model_1.EInputVariants.RECTANGULAR }),
            React.createElement(Input_1["default"].TextAndSelect, { name: 'selectMinOrder', placeholder: "\u0418\u0437\u043C\u0435\u0440\u0435\u043D\u0438\u0435", defaultOption: metricOptions[0], options: metricOptions, onClickOption: setSelectedMinOrderOption, titleModal: "\u0418\u0437\u043C\u0435\u0440\u0435\u043D\u0438\u0435", required: true, variant: input_model_1.EInputVariants.RECTANGULAR })),
        React.createElement(RectangleInput_1.WrapperRectangleInput, { labelText: "Цена" },
            React.createElement(Input_1["default"].Text, { name: 'price', placeholder: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0447\u0438\u0441\u043B\u043E", defaultValue: "123", variant: input_model_1.EInputVariants.RECTANGULAR }),
            React.createElement(Input_1["default"].TextAndSelect, { name: 'currency', placeholder: "\u0412\u0430\u043B\u044E\u0442\u0430", defaultOption: currencyOptions[0], options: currencyOptions, onClickOption: setSelectedCurrencyOption, titleModal: "\u0412\u0430\u043B\u044E\u0442\u0430", variant: input_model_1.EInputVariants.RECTANGULAR })),
        React.createElement(RectangleInput_1.WrapperRectangleInput, { labelText: "Описание", isRequired: true },
            React.createElement(Input_1["default"].Text, { name: 'description', placeholder: "\u041D\u0430\u0447\u043D\u0438\u0442\u0435 \u0432\u0432\u043E\u0434\u0438\u0442\u044C", defaultValue: "123", required: true, variant: input_model_1.EInputVariants.RECTANGULAR, inputTypeVariant: text_input_model_1.EInputTextTypeVariants.TEXTAREA })),
        React.createElement(RectangleInput_1.WrapperRectangleInput, { labelText: "Файлы", fileList: uploadedFileList, setFileList: setUploadedFileList },
            React.createElement(Input_1["default"].File, { name: 'files', placeholder: "\u041D\u0430\u0447\u043D\u0438\u0442\u0435 \u0432\u0432\u043E\u0434\u0438\u0442\u044C", setFiles: setUploadedFileList, variant: input_model_1.EInputVariants.RECTANGULAR })),
        React.createElement(RectangleInput_1.WrapperRectangleInput, { labelText: '\u041F\u043E\u0434\u0435\u043B\u0438\u0442\u044C\u0441\u044F \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u0430\u043C\u0438', labelPosition: wrapperRectangleInput_model_1.ELabelPosition.RIGHT },
            React.createElement(Input_1["default"].Checkbox, { isChecked: userShareContact, setIsChecked: setUserShareContact, setChecked: setUserShareContact })),
        React.createElement(Button_1.Button, { variant: Button_1.ButtonVariant.FILL, color: button_model_1.ButtonColor.Primary, size: button_model_1.ButtonSize.Big, type: button_model_1.ButtonType.Submit, disabled: !userShareContact, title: "\u041E\u043F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u0442\u044C \u0442\u0435\u043D\u0434\u0435\u0440" })));
};
