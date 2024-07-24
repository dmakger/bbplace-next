'use client';
"use strict";
exports.__esModule = true;
exports.SuspenseLTender = void 0;
var navigation_1 = require("next/navigation");
var tender_lib_1 = require("@/entities/Tender/lib/tender.lib");
exports.SuspenseLTender = function (_a) {
    var _b = _a.searchKey, searchKey = _b === void 0 ? 'type' : _b, set = _a.set, children = _a.children;
    var searchParams = navigation_1.useSearchParams();
    set(tender_lib_1.toTenderType(searchParams.get(searchKey)));
    return children;
};
