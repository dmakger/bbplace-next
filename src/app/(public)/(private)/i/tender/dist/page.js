"use strict";
exports.__esModule = true;
var LKTenderTableAdaptive_1 = require("@/entities/Tender/ui/TableAdaptive/LKTenderTableAdaptive");
var Wrapper1280_1 = require("@/shared/ui/Wrapper/1280/Wrapper1280");
var WrapperAuth_1 = require("@/shared/ui/Wrapper/Auth/WrapperAuth");
function LKTenderPage() {
    return (React.createElement(Wrapper1280_1["default"], null,
        React.createElement(WrapperAuth_1.WrapperAuth, null,
            React.createElement(LKTenderTableAdaptive_1.LKTenderTableAdaptive, null))));
}
exports["default"] = LKTenderPage;
