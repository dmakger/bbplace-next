'use client'
import { cls } from '@/shared/lib/classes.lib';
import cl from './_WrapperRectangleInput.module.scss';
import React, { Dispatch, MouseEvent, ReactNode, SetStateAction, cloneElement, useEffect, useState } from 'react';
import { TOOLTIP_DESCRIPTION_ICON } from '@/shared/ui/Icon/data/tooltipDescription.data.icon';
import { TOOLTIP_WARNING_ICON } from '@/shared/ui/Icon/data/tooltipWarning.data.icon';
import { Button, ButtonVariant } from '@/shared/ui/Button';
import { ELabelPosition, IWrapperRectangleInputChildren } from '../model/wrapperRectangleInput.model';
import { HoverWindow } from '@/shared/ui/HoverWindow';
import { EHoverBorderColor, EHoverWindowPosition } from '@/shared/ui/HoverWindow/model/hoverWindow.model';
import { IOption } from '@/shared/model/option.model';
import { Modal } from '@/shared/ui/Modal/ui/Modal/Modal';
import { EModalView } from '@/shared/data/modal.data';
import { BottomInfoModal } from '@/features/Modal/BottomInfo';
import { WrapperModalBottom } from '../../ModalBottom';
import { HandleSize } from '@/shared/ui/Handle/Size/HandleSize';
import { IFile } from '@/entities/File/model/file.model';
import { FileWrapList } from '@/entities/File/ui/Wrap/FileWrapList';
import { ARROW_IN_CIRCLE } from '@/shared/ui/Icon/data/arrow.data.icon';
import { ButtonType } from '@/shared/ui/Button/model/button.model';
import { IResponseFile } from '@/entities/File/model/props.file.model';

interface IWrapperRectangleInput {
  className?: string
  classNameLabel?: string,
  classNameDescriptionWindow?: string,
  classNameWarningWindow?: string,
  classNameInputsContainer?: string,

  labelText: string,
  labelPosition?: ELabelPosition,
  children: ReactNode,

  linkText?: string,
  linkHref?: string,

  bellowButtonText?: string,
  bellowButtonType?: ButtonType,
  isCanDisabledBellowButton?: boolean,
  onClickBellowButton?: Function,
  isLoadingBellowButton?: boolean,

  isRequired?: boolean
  isDescriptionTooltip?: boolean
  warningTooltipText?: string,
  descriptionTooltipText?: string,
  errorInputMessage?: string,

	fileList?: IFile[]
	setFileList?: Dispatch<SetStateAction<IFile[]>>
	responseFileList?: IResponseFile[]
	setResponseFileList?: Dispatch<SetStateAction<IResponseFile[]>>
}

export const WrapperRectangleInput = ({
  className,
  classNameLabel,
  classNameDescriptionWindow,
  classNameWarningWindow,
  classNameInputsContainer,

  labelText,
  children,
  labelPosition = ELabelPosition.TOP,

  linkText,
  linkHref,

  bellowButtonText,
  bellowButtonType = ButtonType.Button,
  isCanDisabledBellowButton = false,
  onClickBellowButton,
  isLoadingBellowButton,

  isRequired = false,
  isDescriptionTooltip = true,
  warningTooltipText = 'Обязательно для заполнения',
  descriptionTooltipText,
  errorInputMessage = 'Пожалуйста заполните это поле',
  fileList = [],
  setFileList,
  responseFileList=[],
  setResponseFileList,
}: IWrapperRectangleInput) => {

	// STATE
	const [uploadedFileList, setUploadedFileList] = useState<IFile[]>([]);

  const [isWarningActive, setIsWarningActive] = useState<boolean>(false)
  const [isDescriptionActive, setIsDescriptionActive] = useState<boolean>(false);
  const [is768, setIs768] = useState<boolean>(false)
  const [errorMessageArray, setErrorMessageArray] = useState<string[]>([])

	//Для InputText
	const [inputValueLength, setInputValueLength] = useState<number>(0)

  //Для RecursiveSelectInput
  const [selectedOptionsArray, setSelectedOptionsArray] = useState<IOption[]>([])

  //Для InputRadio
  const [selectedOption, setSelectedOption] = useState<IOption>()

  //Для InputCheckbox
  const [checked, setChecked] = useState<boolean>(false)

	const [warnings, setWarnings] = useState<Record<string, boolean>>({});
	const [successes, setSuccesses] = useState<Record<string, boolean>>({});
	const [warning, setWarning] = useState<boolean>(false);
	const [success, setSuccess] = useState<boolean>(false);

  //EFFECT
  useEffect(() => {
    const allSuccess = Object.values(successes).every(v => v === true);
    const anyWarning = Object.values(warnings).some(v => v === true);
    setSuccess(allSuccess);
    setWarning(anyWarning);
  }, [successes, warnings]);


  useEffect(() => {
    if (warning) setIsWarningActive(true)
    else setIsWarningActive(false)
  }, [warning])

  useEffect(() => {
    setErrorMessageArray([errorInputMessage])
  }, [errorInputMessage])

  // CHILDREN
  const clonedChildren = React.Children.map(children, (child, index) => {
    if (React.isValidElement<IWrapperRectangleInputChildren>(child)) {
      const id = `child-${index}`;
      if (successes[id] === undefined) {
        setSuccesses(prev => ({ ...prev, [id]: false }));
      }
      if (warnings[id] === undefined) {
        setWarnings(prev => ({ ...prev, [id]: false }));
      }
      return cloneElement<IWrapperRectangleInputChildren>(child, {
        success: successes[id],
        warning: warnings[id],
        setSuccess: (value: boolean) => setSuccesses(prev => ({ ...prev, [id]: value })),
        setWarning: (value: boolean) => setWarnings(prev => ({ ...prev, [id]: value })),
        setInputValueLength,
        setSelectedOptionsArray,
        selectedOption,
        setSelectedOption,
        checked,
        setChecked,
        setErrorMessageArray
      });
    }
    return child;
  });

  //FUNCTIONS
  const closeTheModal = () => {
    isDescriptionActive && setIsDescriptionActive(false)
    isWarningActive && setIsWarningActive(false)
  }

  const toggleWarningWindow = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsWarningActive(prevState => !prevState);
  }

  const toggleDescriptionWindow = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsDescriptionActive(prevState => !prevState);
  };

  const handleLabelClick = () => {
    setChecked(prevChecked => {
      const newChecked = !prevChecked;
      if (isRequired && !newChecked) {
        setWarning(true);
        setSuccess(false);
      } else if (!newChecked) {
        setSuccess(false);
      } else if (newChecked) {
        setWarning(false);
        setSuccess(true);
      }
      return newChecked;
    });
  }


  const isDisabled = !selectedOptionsArray.length && isCanDisabledBellowButton;

  return (
    <>
      <div className={cls(cl.WrapperRectangleInput, className, cl[labelPosition])}>
        <div className={cls(cl.labelNInputsContainer, linkText ? cl.columnStyle : '')}>
          <div className={cl.labelNTooltipContainer}>
            <label className={cls(cl.label, classNameLabel)} onClick={labelPosition === ELabelPosition.RIGHT ? handleLabelClick : () => { }}>
              {labelText}
            </label>

            <div className={cl.tooltipsNLinkContainer}>

              {linkText && <Button title={linkText}
                linkTarget='_blank'
                href={linkHref}
                variant={ButtonVariant.DEFAULT}
                className={cl.buttonLink}
                afterImage={ARROW_IN_CIRCLE}
                afterProps={{ width: 14, height: 14 }} />}

              {fileList && fileList.length > 0 && (
                <FileWrapList fileList={fileList} setFileList={setFileList} 
                        responseFileList={responseFileList} setResponseFileList={setResponseFileList} 
                      className={cl.fileList}/>
              )}

              <div className={cl.tooltipsContainer}>
                {isDescriptionTooltip && descriptionTooltipText && (
                  <div className={cl.tooltipDescCont}>
                    <Button
                      variant={ButtonVariant.CLEAR}
                      className={cls(cl.button, cl.descButton, isDescriptionActive ? cl.descriptionActive : '')}
                      beforeImage={TOOLTIP_DESCRIPTION_ICON}
                      beforeProps={{ height: 14, width: 14 }}
                      active={isDescriptionActive}
                      onClick={toggleDescriptionWindow}
                    />
                    <HoverWindow
                      text={descriptionTooltipText}
                      position={EHoverWindowPosition.RIGHT}
                      borderColor={EHoverBorderColor.DEFAULT}
                      show={isDescriptionActive}
                      className={cls(cl.descWindowActive, cl.windowActive, classNameDescriptionWindow)}
                    />
                  </div>
                )}
                {isRequired && (
                  <div className={cl.tooltipWarnCont}>
                    <Button
                      variant={ButtonVariant.CLEAR}
                      className={cls(
                        cl.button,
                        !success ? cl.warnButton : cl.successButton,
                        isWarningActive && !success ? cl.warningActive : '',
                        isWarningActive && success ? cl.successActive : ''
                      )}
                      beforeImage={TOOLTIP_WARNING_ICON}
                      active={!success ? isWarningActive : false}
                      beforeProps={{ height: 14, width: 14 }}
                      success={success}
                      onClick={toggleWarningWindow}
                    />
                    <HoverWindow
                      text={warningTooltipText}
                      position={EHoverWindowPosition.RIGHT}
                      borderColor={!success ? EHoverBorderColor.WARNING : EHoverBorderColor.DEFAULT}
                      show={isWarningActive}
                      className={cls(cl.warnWindowActive, cl.windowActive, classNameWarningWindow)}
                    />
                  </div>
                )}
              </div>
            </div>

          </div>

          <div className={cls(cl.inputsContainer, classNameInputsContainer)}>
            {clonedChildren}
          </div>

        </div>

        {warning && errorMessageArray.length > 0 && (
          <div className={cl.errorMessage}>
            {errorMessageArray.map((it, index) => (
              <p key={index}>{it}</p>
            ))}
          </div>
        )}

        {bellowButtonText &&
          <Button variant={ButtonVariant.FILL}
            loading={isLoadingBellowButton}
            title={bellowButtonText}
            className={cls(cl.bellowButton, isDisabled ? cl.disabled : '')}
            disabled={isLoadingBellowButton}
            onClick={onClickBellowButton}
            type={bellowButtonType}
          />
        }
        <Modal
          view={EModalView.BOTTOM}
          buttonNode
          className={cl.mobileModal}
          isOpen={is768 && (isDescriptionActive || isWarningActive)}
          onClickOverlay={closeTheModal}
        >
          <WrapperModalBottom title={labelText}
            bottomChildren={<BottomInfoModal
              text={isDescriptionActive && descriptionTooltipText ? descriptionTooltipText : isWarningActive ? warningTooltipText : ''} />}
            setIsOpen={closeTheModal} />
        </Modal>
      </div>
      <HandleSize width={768} set={setIs768} />
    </>

  )
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
}
