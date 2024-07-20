'use client';
"use strict";
exports.__esModule = true;
exports.MenuButtonSupport = void 0;
var ButtonGrayToBlack_1 = require("@/shared/ui/Button/data/GrayToBlack/ButtonGrayToBlack");
var navigation_1 = require("next/navigation");
var pages_url_config_1 = require("@/config/pages-url.config");
exports.MenuButtonSupport = function (_a) {
    var className = _a.className;
    var router = navigation_1.useRouter();
    var handleOnClick = function () {
        router.push(pages_url_config_1.MAIN_PAGES.SUPPORT.path);
    };
    return (React.createElement(ButtonGrayToBlack_1.ButtonGrayToBlack, { title: 'Поддержка', onClick: handleOnClick, className: className }));
};
