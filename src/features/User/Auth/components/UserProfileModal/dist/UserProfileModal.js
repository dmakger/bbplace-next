"use strict";
exports.__esModule = true;
exports.UserProfileModal = void 0;
var User_1 = require("@/entities/User");
var UserProfileModal_module_scss_1 = require("./UserProfileModal.module.scss");
var hooks_1 = require("@/storage/hooks");
var userAuth_data_1 = require("../../data/userAuth.data");
var Button_1 = require("@/shared/ui/Button");
var classes_lib_1 = require("@/shared/lib/classes.lib");
var pages_url_config_1 = require("@/config/pages-url.config");
exports.UserProfileModal = function (_a) {
    var isShowProfileModal = _a.isShowProfileModal;
    // RTK
    var user = hooks_1.useAppSelector(function (state) { return state.user; });
    var actionCreators = hooks_1.useActionCreators();
    // HANDLE
    var logOut = function () {
        actionCreators.setNotAuth();
    };
    // HTML
    return (React.createElement("section", { className: classes_lib_1.cls(UserProfileModal_module_scss_1["default"].UserProfileModal, isShowProfileModal ? UserProfileModal_module_scss_1["default"].visible : '') },
        React.createElement("div", { className: UserProfileModal_module_scss_1["default"].topContainer },
            React.createElement("div", { className: UserProfileModal_module_scss_1["default"].user },
                React.createElement("p", { className: UserProfileModal_module_scss_1["default"].greetings },
                    "\u0417\u0434\u0440\u0430\u0432\u0441\u0442\u0432\u0443\u0439\u0442\u0435, ",
                    React.createElement("span", null, user.fullName)),
                React.createElement(User_1.User, null)),
            React.createElement(Button_1.Button, { variant: Button_1.ButtonVariant.BACKGROUND_GRAY, title: "Личный кабинет", href: pages_url_config_1.DASHBOARD_PAGES.HOME.path, className: UserProfileModal_module_scss_1["default"].lk })),
        React.createElement("div", { className: UserProfileModal_module_scss_1["default"].bottomContainer }, userAuth_data_1.LK_MODAL_MENU_DATA.map(function (it) { return (React.createElement(Button_1.Button, { variant: Button_1.ButtonVariant.ALMOST_RECTANGULAR, title: it.title, href: it.link, className: classes_lib_1.cls(UserProfileModal_module_scss_1["default"].menuButtons, it.link === pages_url_config_1.MAIN_PAGES.HOME.path ? UserProfileModal_module_scss_1["default"].logOutButton : ''), onClick: it.link === pages_url_config_1.MAIN_PAGES.HOME.path ? logOut : function () { }, key: it.link })); }))));
};
exports["default"] = exports.UserProfileModal;
