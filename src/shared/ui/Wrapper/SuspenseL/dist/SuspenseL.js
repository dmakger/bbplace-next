"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Loading_1 = require("../../Loading/Loading");
var SuspenseLTender_1 = require("./Tender/SuspenseLTender");
var SuspenseLAny_1 = require("./Any/SuspenseLAny");
function SuspenseL(_a) {
    var children = _a.children;
    return (React.createElement(react_1.Suspense, { fallback: React.createElement(Loading_1.Loading, null) }, children));
}
exports["default"] = SuspenseL;
SuspenseL.Tender = SuspenseLTender_1.SuspenseLTender;
SuspenseL.Any = SuspenseLAny_1.SuspenseLAny;
