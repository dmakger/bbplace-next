'use client';
"use strict";
exports.__esModule = true;
exports.SupplierListChild = exports.SupplierList = void 0;
var WrapperPagination_1 = require("@/shared/ui/Wrapper/Pagination/ui/WrapperPagination");
var supplier_api_1 = require("../../api/supplier.api");
var supplier_data_1 = require("../../data/supplier.data");
var react_1 = require("react");
var process_supplier_lib_1 = require("../../lib/process.supplier.lib");
var SupplierItem_1 = require("../Item/SupplierItem");
var react_redux_1 = require("react-redux");
var ptc_model_1 = require("@/widgets/NavBarPTC/model/ptc.model");
var ptc_storage_1 = require("@/features/storage/PTC/ptc.storage");
var WrapperSortFilter_1 = require("@/shared/ui/Wrapper/SortFilter/ui/WrapperSortFilter");
var SortFilterSidebar_1 = require("@/widgets/SortFilterSidebar");
var navigation_1 = require("next/navigation");
var backend_params_config_1 = require("@/config/params/backend.params.config");
var supplier_params_config_1 = require("@/config/params/supplier.params.config");
var SuspenseL_1 = require("@/shared/ui/Wrapper/SuspenseL/SuspenseL");
exports.SupplierList = function () {
    return (React.createElement(SuspenseL_1["default"], null,
        React.createElement(exports.SupplierListChild, null)));
};
exports.SupplierListChild = function () {
    // ROUTER
    var searchParams = navigation_1.useSearchParams();
    var newParams = backend_params_config_1.paramsToBack(searchParams);
    // STATE
    var _a = react_1.useState([]), supplierList = _a[0], setSupplierList = _a[1];
    var _b = react_1.useState(1), pageNumber = _b[0], setPageNumber = _b[1];
    //API
    var _c = supplier_api_1.SupplierAPI.useGetSuppliersQuery({ limit: supplier_data_1.SUPPLIER_ARGS_REQUEST.limit, page: pageNumber - 1, params: newParams }, { refetchOnMountOrArgChange: true }), suppliersApi = _c.data, isSupplierLoading = _c.isLoading;
    var _d = supplier_api_1.SupplierAPI.useGetCountSuppliersQuery({ limit: supplier_data_1.SUPPLIER_ARGS_REQUEST.limit, params: newParams }, { refetchOnMountOrArgChange: true }), countSuppliers = _d.data, isCountSuppliersLoading = _d.isLoading;
    var _e = supplier_api_1.SupplierAPI.useGetCountSuppliersQuery({ limit: 1, params: newParams }, { refetchOnMountOrArgChange: true }), countAllSuppliers = _e.data, isCountAllSuppliersLoading = _e.isLoading;
    // RTK
    var dispatch = react_redux_1.useDispatch();
    // EFFECT
    react_1.useEffect(function () {
        if (suppliersApi)
            setSupplierList(process_supplier_lib_1.supplierApiListToSupplierList(suppliersApi));
    }, [suppliersApi]);
    react_1.useEffect(function () {
        if (!isCountAllSuppliersLoading && suppliersApi !== undefined && countAllSuppliers) {
            dispatch(ptc_storage_1.PTCSlice.actions.setPTC({
                amount: countAllSuppliers,
                view: ptc_model_1.EPTC.SUPPLIER
            }), { refetchOnMountOrArgChange: true });
        }
    }, [dispatch, isCountAllSuppliersLoading, suppliersApi, countAllSuppliers]);
    if (isSupplierLoading && isCountSuppliersLoading)
        return React.createElement("div", null, "Loading...");
    return (React.createElement(WrapperSortFilter_1.WrapperSortFilter, { variant: SortFilterSidebar_1.ECatalogVariants.COMPANIES, pageNumberKey: supplier_params_config_1.SUPPLIER_PARAMS.NUMBER_PAGE__KEY },
        React.createElement(WrapperPagination_1.WrapperPagination, { amount: countSuppliers ? countSuppliers : 1, active: pageNumber, set: setPageNumber, keyPageParam: supplier_params_config_1.SUPPLIER_PARAMS.NUMBER_PAGE__KEY }, supplierList.map(function (it) { return (React.createElement(SupplierItem_1.SupplierItem, { supplier: it, key: it.id })); }))));
};
