"use strict";
exports.__esModule = true;
exports.PageTenderNew = void 0;
var classes_lib_1 = require("@/shared/lib/classes.lib");
var _PageTenderNew_module_scss_1 = require("./_PageTenderNew.module.scss");
var Subblock_1 = require("@/shared/ui/Subblock");
var SubblockChild_1 = require("@/shared/ui/Subblock/components/Child/SubblockChild");
var FormTenderAutoNew_1 = require("@/features/Form/Tender/New/Auto/FormTenderAutoNew");
exports.PageTenderNew = function (_a) {
    var type = _a.type, className = _a.className, classNameForm = _a.classNameForm;
    var adviceText = [
        'Вы можете сменить тип размещения, например, с покупки на продажу, в любой момент.',
        'Значения уже заполненных схожих полей сохранятся.',
    ];
    return (React.createElement("div", { className: classes_lib_1.cls(_PageTenderNew_module_scss_1["default"].block, className) },
        React.createElement(Subblock_1.Subblock, { title: "\u0421\u043E\u0432\u0435\u0442", wModal: true, mobileButtonTitle: '\u0421\u043E\u0432\u0435\u0442', modalTitle: "\u0421\u043E\u0432\u0435\u0442", children: (React.createElement(SubblockChild_1["default"].Text, { textList: adviceText })), className: _PageTenderNew_module_scss_1["default"].subblock }),
        React.createElement(FormTenderAutoNew_1.FormTenderAutoNew, { type: type, className: classNameForm })));
};
