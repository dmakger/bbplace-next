'use client';
"use strict";
exports.__esModule = true;
exports.SuspenseLAny = void 0;
var navigation_1 = require("next/navigation");
var react_1 = require("react");
exports.SuspenseLAny = function (_a) {
    var data = _a.data, children = _a.children;
    var searchParams = navigation_1.useSearchParams();
    react_1.useEffect(function () {
        data.forEach(function (_a) {
            var _b, _c;
            var searchKey = _a.searchKey, set = _a.set, defaultValue = _a.defaultValue;
            var value = (_c = (_b = searchParams.get(searchKey)) !== null && _b !== void 0 ? _b : defaultValue) !== null && _c !== void 0 ? _c : null;
            set(value);
        });
    }, [data]);
    return children;
};
