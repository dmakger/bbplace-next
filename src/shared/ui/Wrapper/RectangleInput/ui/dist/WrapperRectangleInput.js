'use client';
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.WrapperRectangleInput = void 0;
var classes_lib_1 = require("@/shared/lib/classes.lib");
var _WrapperRectangleInput_module_scss_1 = require("./_WrapperRectangleInput.module.scss");
var react_1 = require("react");
var tooltipDescription_data_icon_1 = require("@/shared/ui/Icon/data/tooltipDescription.data.icon");
var tooltipWarning_data_icon_1 = require("@/shared/ui/Icon/data/tooltipWarning.data.icon");
var Button_1 = require("@/shared/ui/Button");
var wrapperRectangleInput_model_1 = require("../model/wrapperRectangleInput.model");
var HoverWindow_1 = require("@/shared/ui/HoverWindow");
var hoverWindow_model_1 = require("@/shared/ui/HoverWindow/model/hoverWindow.model");
var Modal_1 = require("@/shared/ui/Modal/Modal");
var modal_data_1 = require("@/shared/data/modal.data");
var BottomInfo_1 = require("@/features/Modal/BottomInfo");
var ModalBottom_1 = require("../../ModalBottom");
var HandleSize_1 = require("@/shared/ui/Handle/Size/HandleSize");
var FileWrapList_1 = require("@/entities/File/ui/Wrap/FileWrapList");
var arrow_data_icon_1 = require("@/shared/ui/Icon/data/arrow.data.icon");
var button_model_1 = require("@/shared/ui/Button/model/button.model");
exports.WrapperRectangleInput = function (_a) {
    var className = _a.className, classNameLabel = _a.classNameLabel, classNameDescriptionWindow = _a.classNameDescriptionWindow, classNameWarningWindow = _a.classNameWarningWindow, classNameInputsContainer = _a.classNameInputsContainer, labelText = _a.labelText, children = _a.children, _b = _a.labelPosition, labelPosition = _b === void 0 ? wrapperRectangleInput_model_1.ELabelPosition.TOP : _b, linkText = _a.linkText, linkHref = _a.linkHref, bellowButtonText = _a.bellowButtonText, _c = _a.bellowButtonType, bellowButtonType = _c === void 0 ? button_model_1.ButtonType.Button : _c, _d = _a.isCanDisabledBellowButton, isCanDisabledBellowButton = _d === void 0 ? false : _d, onClickBellowButton = _a.onClickBellowButton, isLoadingBellowButton = _a.isLoadingBellowButton, _e = _a.isRequired, isRequired = _e === void 0 ? false : _e, _f = _a.isDescriptionTooltip, isDescriptionTooltip = _f === void 0 ? true : _f, _g = _a.warningTooltipText, warningTooltipText = _g === void 0 ? 'Обязательно для заполнения' : _g, descriptionTooltipText = _a.descriptionTooltipText, _h = _a.errorInputMessage, errorInputMessage = _h === void 0 ? 'Пожалуйста заполните это поле' : _h, _j = _a.fileList, fileList = _j === void 0 ? [] : _j, setFileList = _a.setFileList, _k = _a.responseFileList, responseFileList = _k === void 0 ? [] : _k, setResponseFileList = _a.setResponseFileList;
    // STATE
    var _l = react_1.useState([]), uploadedFileList = _l[0], setUploadedFileList = _l[1];
    var _m = react_1.useState(false), isWarningActive = _m[0], setIsWarningActive = _m[1];
    var _o = react_1.useState(false), isDescriptionActive = _o[0], setIsDescriptionActive = _o[1];
    var _p = react_1.useState(false), is768 = _p[0], setIs768 = _p[1];
    var _q = react_1.useState([]), errorMessageArray = _q[0], setErrorMessageArray = _q[1];
    //Для InputText
    var _r = react_1.useState(0), inputValueLength = _r[0], setInputValueLength = _r[1];
    //Для RecursiveSelectInput
    var _s = react_1.useState([]), selectedOptionsArray = _s[0], setSelectedOptionsArray = _s[1];
    //Для InputRadio
    var _t = react_1.useState(), selectedOption = _t[0], setSelectedOption = _t[1];
    //Для InputCheckbox
    var _u = react_1.useState(false), checked = _u[0], setChecked = _u[1];
    var _v = react_1.useState({}), warnings = _v[0], setWarnings = _v[1];
    var _w = react_1.useState({}), successes = _w[0], setSuccesses = _w[1];
    var _x = react_1.useState(false), warning = _x[0], setWarning = _x[1];
    var _y = react_1.useState(false), success = _y[0], setSuccess = _y[1];
    // <<<<<<< HEAD
    //EFFECT
    react_1.useEffect(function () {
        var allSuccess = Object.values(successes).every(function (v) { return v === true; });
        var anyWarning = Object.values(warnings).some(function (v) { return v === true; });
        setSuccess(allSuccess);
        setWarning(anyWarning);
    }, [successes, warnings]);
    react_1.useEffect(function () {
        if (warning)
            setIsWarningActive(true);
        else
            setIsWarningActive(false);
    }, [warning]);
    react_1.useEffect(function () {
        setErrorMessageArray([errorInputMessage]);
    }, [errorInputMessage]);
    // CHILDREN
    var clonedChildren = react_1["default"].Children.map(children, function (child, index) {
        if (react_1["default"].isValidElement(child)) {
            var id_1 = "child-" + index;
            if (successes[id_1] === undefined) {
                setSuccesses(function (prev) {
                    var _a;
                    return (__assign(__assign({}, prev), (_a = {}, _a[id_1] = false, _a)));
                });
            }
            if (warnings[id_1] === undefined) {
                setWarnings(function (prev) {
                    var _a;
                    return (__assign(__assign({}, prev), (_a = {}, _a[id_1] = false, _a)));
                });
            }
            return react_1.cloneElement(child, {
                success: successes[id_1],
                warning: warnings[id_1],
                setSuccess: function (value) { return setSuccesses(function (prev) {
                    var _a;
                    return (__assign(__assign({}, prev), (_a = {}, _a[id_1] = value, _a)));
                }); },
                setWarning: function (value) { return setWarnings(function (prev) {
                    var _a;
                    return (__assign(__assign({}, prev), (_a = {}, _a[id_1] = value, _a)));
                }); },
                setInputValueLength: setInputValueLength,
                setSelectedOptionsArray: setSelectedOptionsArray,
                selectedOption: selectedOption,
                setSelectedOption: setSelectedOption,
                checked: checked,
                setChecked: setChecked,
                setErrorMessageArray: setErrorMessageArray
            });
        }
        return child;
    });
    //FUNCTIONS
    var closeTheModal = function () {
        isDescriptionActive && setIsDescriptionActive(false);
        isWarningActive && setIsWarningActive(false);
    };
    var toggleWarningWindow = function (e) {
        e.stopPropagation();
        setIsWarningActive(function (prevState) { return !prevState; });
    };
    var toggleDescriptionWindow = function (e) {
        e.stopPropagation();
        setIsDescriptionActive(function (prevState) { return !prevState; });
    };
    var handleLabelClick = function () {
        setChecked(function (prevChecked) {
            var newChecked = !prevChecked;
            if (isRequired && !newChecked) {
                setWarning(true);
                setSuccess(false);
            }
            else if (!newChecked) {
                setSuccess(false);
            }
            else if (newChecked) {
                setWarning(false);
                setSuccess(true);
            }
            return newChecked;
        });
    };
    var isDisabled = !selectedOptionsArray.length && isCanDisabledBellowButton;
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("div", { className: classes_lib_1.cls(_WrapperRectangleInput_module_scss_1["default"].WrapperRectangleInput, className, _WrapperRectangleInput_module_scss_1["default"][labelPosition]) },
            react_1["default"].createElement("div", { className: classes_lib_1.cls(_WrapperRectangleInput_module_scss_1["default"].labelNInputsContainer, linkText ? _WrapperRectangleInput_module_scss_1["default"].columnStyle : '') },
                react_1["default"].createElement("div", { className: _WrapperRectangleInput_module_scss_1["default"].labelNTooltipContainer },
                    react_1["default"].createElement("label", { className: classes_lib_1.cls(_WrapperRectangleInput_module_scss_1["default"].label, classNameLabel), onClick: labelPosition === wrapperRectangleInput_model_1.ELabelPosition.RIGHT ? handleLabelClick : function () { } }, labelText),
                    react_1["default"].createElement("div", { className: _WrapperRectangleInput_module_scss_1["default"].tooltipsNLinkContainer },
                        linkText && react_1["default"].createElement(Button_1.Button, { title: linkText, href: linkHref, variant: Button_1.ButtonVariant.DEFAULT, className: _WrapperRectangleInput_module_scss_1["default"].buttonLink, afterImage: arrow_data_icon_1.ARROW_IN_CIRCLE, afterProps: { width: 14, height: 14 } }),
                        fileList && fileList.length > 0 && (react_1["default"].createElement(FileWrapList_1.FileWrapList, { fileList: fileList, setFileList: setFileList, responseFileList: responseFileList, setResponseFileList: setResponseFileList, className: _WrapperRectangleInput_module_scss_1["default"].fileList })),
                        react_1["default"].createElement("div", { className: _WrapperRectangleInput_module_scss_1["default"].tooltipsContainer },
                            isDescriptionTooltip && descriptionTooltipText && (react_1["default"].createElement("div", { className: _WrapperRectangleInput_module_scss_1["default"].tooltipDescCont },
                                react_1["default"].createElement(Button_1.Button, { variant: Button_1.ButtonVariant.CLEAR, className: classes_lib_1.cls(_WrapperRectangleInput_module_scss_1["default"].button, _WrapperRectangleInput_module_scss_1["default"].descButton, isDescriptionActive ? _WrapperRectangleInput_module_scss_1["default"].descriptionActive : ''), beforeImage: tooltipDescription_data_icon_1.TOOLTIP_DESCRIPTION_ICON, beforeProps: { height: 14, width: 14 }, active: isDescriptionActive, onClick: toggleDescriptionWindow }),
                                react_1["default"].createElement(HoverWindow_1.HoverWindow, { text: descriptionTooltipText, position: hoverWindow_model_1.EHoverWindowPosition.RIGHT, borderColor: hoverWindow_model_1.EHoverBorderColor.DEFAULT, show: isDescriptionActive, className: classes_lib_1.cls(_WrapperRectangleInput_module_scss_1["default"].descWindowActive, _WrapperRectangleInput_module_scss_1["default"].windowActive, classNameDescriptionWindow) }))),
                            isRequired && (react_1["default"].createElement("div", { className: _WrapperRectangleInput_module_scss_1["default"].tooltipWarnCont },
                                react_1["default"].createElement(Button_1.Button, { variant: Button_1.ButtonVariant.CLEAR, className: classes_lib_1.cls(_WrapperRectangleInput_module_scss_1["default"].button, !success ? _WrapperRectangleInput_module_scss_1["default"].warnButton : _WrapperRectangleInput_module_scss_1["default"].successButton, isWarningActive && !success ? _WrapperRectangleInput_module_scss_1["default"].warningActive : '', isWarningActive && success ? _WrapperRectangleInput_module_scss_1["default"].successActive : ''), beforeImage: tooltipWarning_data_icon_1.TOOLTIP_WARNING_ICON, active: !success ? isWarningActive : false, beforeProps: { height: 14, width: 14 }, success: success, onClick: toggleWarningWindow }),
                                react_1["default"].createElement(HoverWindow_1.HoverWindow, { text: warningTooltipText, position: hoverWindow_model_1.EHoverWindowPosition.RIGHT, borderColor: !success ? hoverWindow_model_1.EHoverBorderColor.WARNING : hoverWindow_model_1.EHoverBorderColor.DEFAULT, show: isWarningActive, className: classes_lib_1.cls(_WrapperRectangleInput_module_scss_1["default"].warnWindowActive, _WrapperRectangleInput_module_scss_1["default"].windowActive, classNameWarningWindow) })))))),
                react_1["default"].createElement("div", { className: classes_lib_1.cls(_WrapperRectangleInput_module_scss_1["default"].inputsContainer, classNameInputsContainer) }, clonedChildren)),
            warning && errorMessageArray.length > 0 && (react_1["default"].createElement("div", { className: _WrapperRectangleInput_module_scss_1["default"].errorMessage }, errorMessageArray.map(function (it, index) { return (react_1["default"].createElement("p", { key: index }, it)); }))),
            bellowButtonText &&
                react_1["default"].createElement(Button_1.Button, { variant: Button_1.ButtonVariant.FILL, loading: isLoadingBellowButton, title: bellowButtonText, className: classes_lib_1.cls(_WrapperRectangleInput_module_scss_1["default"].bellowButton, isDisabled ? _WrapperRectangleInput_module_scss_1["default"].disabled : ''), disabled: isLoadingBellowButton, onClick: onClickBellowButton, type: bellowButtonType }),
            react_1["default"].createElement(Modal_1.Modal, { view: modal_data_1.EModalView.BOTTOM, buttonNode: true, className: _WrapperRectangleInput_module_scss_1["default"].mobileModal, _isOpen: is768 && (isDescriptionActive || isWarningActive), onClickOverlay: closeTheModal },
                react_1["default"].createElement(ModalBottom_1.WrapperModalBottom, { title: labelText, bottomChildren: react_1["default"].createElement(BottomInfo_1.BottomInfoModal, { text: isDescriptionActive && descriptionTooltipText ? descriptionTooltipText : isWarningActive ? warningTooltipText : '' }), setIsOpen: closeTheModal }))),
        react_1["default"].createElement(HandleSize_1.HandleSize, { width: 768, set: setIs768 })));
    // =======
    // 	//EFFECT
    // 	useEffect(() => {
    // 		const allSuccess = Object.values(successes).every(v => v === true);
    // 		const anyWarning = Object.values(warnings).some(v => v === true);
    // 		setSuccess(allSuccess);
    // 		setWarning(anyWarning);
    // 	}, [successes, warnings]);
    // 	// CHILDREN
    // 	const clonedChildren = React.Children.map(children, (child, index) => {
    // 		if (React.isValidElement<IWrapperRectangleInputChildren>(child)) {
    // 			const id = `child-${index}`;
    // 			if (successes[id] === undefined) {
    // 				setSuccesses(prev => ({ ...prev, [id]: false }));
    // 			}
    // 			if (warnings[id] === undefined) {
    // 				setWarnings(prev => ({ ...prev, [id]: false }));
    // 			}
    // 			return cloneElement<IWrapperRectangleInputChildren>(child, {
    // 				success: successes[id],
    // 				warning: warnings[id],
    // 				setSuccess: (value: boolean) => setSuccesses(prev => ({ ...prev, [id]: value })),
    // 				setWarning: (value: boolean) => setWarnings(prev => ({ ...prev, [id]: value })),
    // 				setInputValueLength,
    // 				setSelectedOptionsArray,
    // 				checked
    // 			});
    // 		}
    // 		return child;
    // 	});
    // 	//FUNCTION
    // 	const closeTheModal = () => {
    // 		isDescriptionActive && setIsDescriptionActive(false)
    // 		isWarningActive && setIsWarningActive(false)
    // 	}
    // 	// VARIABLE
    // 	const errorInputSelectMessageArray: string[] = [
    // 		'Пожалуйста, заполните это поле!',
    // 		errorInputMessage || `Максимальная длина - 50 символов. Сейчас ${inputValueLength}`
    // 	];
    // 	const isDisabled = !selectedOptionsArray.length && isCanDisabledBellowButton;
    // 	return (
    // 		<div className={cls(cl.WrapperRectangleInput, className, cl[labelPosition])} onClick={() => setChecked(!checked)}>
    // 			<div className={cls(cl.labelNTooltipContainer)}>
    // 				<label className={cls(cl.label, classNameLabel)} >
    // 					{labelText}
    // 				</label>
    // 				<div className={cl.tooltipsContainer}>
    // 					{isDescriptionTooltip && descriptionTooltipText && (
    // 						<div className={cl.tooltipDescCont}>
    // 							<Button
    // 								variant={ButtonVariant.CLEAR}
    // 								className={cls(cl.button, cl.descButton, isDescriptionActive ? cl.descriptionActive : '')}
    // 								beforeImage={TOOLTIP_DESCRIPTION_ICON}
    // 								beforeProps={{ height: 14, width: 14 }}
    // 								active={isDescriptionActive}
    // 								onClick={() => setIsDescriptionActive(prevState => !prevState)}
    // 							/>
    // 							<HoverWindow
    // 								text={descriptionTooltipText}
    // 								position={EHoverWindowPosition.RIGHT}
    // 								borderColor={EHoverBorderColor.DEFAULT}
    // 								show={isDescriptionActive}
    // 								className={cls(cl.descWindowActive, cl.windowActive, classNameDescriptionWindow)}
    // 							/>
    // 						</div>
    // 					)}
    // 					{isRequired && (
    // 						<div className={cl.tooltipWarnCont}>
    // 							<Button
    // 								variant={ButtonVariant.CLEAR}
    // 								className={cls(
    // 									cl.button,
    // 									!success ? cl.warnButton : cl.successButton,
    // 									isWarningActive && !success ? cl.warningActive : '',
    // 									isWarningActive && success ? cl.successActive : ''
    // 								)}
    // 								beforeImage={TOOLTIP_WARNING_ICON}
    // 								active={isWarningActive}
    // 								beforeProps={{ height: 14, width: 14 }}
    // 								success={success}
    // 								onClick={() => setIsWarningActive(prevState => !prevState)}
    // 							/>
    // 							<HoverWindow
    // 								text={warningTooltipText}
    // 								position={EHoverWindowPosition.RIGHT}
    // 								borderColor={!success ? EHoverBorderColor.WARNING : EHoverBorderColor.DEFAULT}
    // 								show={isWarningActive}
    // 								className={cls(cl.warnWindowActive, cl.windowActive, classNameWarningWindow)}
    // 							/>
    // 						</div>
    // 					)}
    // 				</div>
    // 			</div>
    // 			<div className={cl.inputsContainer}>
    // 				{clonedChildren}
    // 			</div>
    // 			{fileList && fileList.length > 0 && (
    // 				<FileWrapList fileList={fileList} setFileList={setFileList}
    // 					responseFileList={responseFileList} setResponseFileList={setResponseFileList}
    // 					className={cl.fileList} />
    // 			)}
    // 			{warning && errorInputSelectMessageArray && (
    // 				<div className={cl.errorMessage}>
    // 					{errorInputSelectMessageArray.map((it, index) => (
    // 						<p key={index}>{it}</p>
    // 					))}
    // 				</div>
    // 			)}
    // 			{bellowButtonText &&
    // 				<Button variant={ButtonVariant.FILL}
    // 					title={bellowButtonText}
    // 					className={cls(cl.button, isCanDisabledBellowButton ? cl.disabled : '')}
    // 					disabled={isDisabled}
    // 					onClick={onClickBellowButton} />
    // 			}
    // 			<div className={cl.mobileModal}>
    // 				<Modal
    // 					view={EModalView.BOTTOM}
    // 					buttonNode
    // 					_isOpen={isDescriptionActive || isWarningActive}
    // 					onClickOverlay={closeTheModal}>
    // 					<WrapperModalBottom title={labelText}
    // 						bottomChildren={<BottomInfoModal
    // 							text={isDescriptionActive && descriptionTooltipText ? descriptionTooltipText : isWarningActive ? warningTooltipText : ''} />}
    // 						setIsOpen={closeTheModal} />
    // 				</Modal>
    // 			</div>
    // 		</div>
    // 	)
    // >>>>>>> origin/master
};
