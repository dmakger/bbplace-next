'use client'
import { cls } from '@/shared/lib/classes.lib';
import cl from './_WrapperRectangleInput.module.scss';
import React, { ReactNode, cloneElement, useEffect, useState } from 'react';
import { TOOLTIP_DESCRIPTION_ICON } from '@/shared/ui/Icon/data/tooltipDescription.data.icon';
import { TOOLTIP_WARNING_ICON } from '@/shared/ui/Icon/data/tooltipWarning.data.icon';
import { Button, ButtonVariant } from '@/shared/ui/Button';
import { ELabelPosition, IWrapperRectangleInputChildren } from '../model/wrapperRectangleInput.model';
import { HoverWindow } from '@/shared/ui/HoverWindow';
import { EHoverBorderColor, EHoverWindowPosition } from '@/shared/ui/HoverWindow/model/hoverWindow.model';
import { IOption } from '@/shared/model/option.model';

interface IWrapperRectangleInput {
  className?: string
  classNameLabel?: string,
  classNameDescriptionWindow?: string,
  classNameWarningWindow?: string,
  labelText: string
  children: ReactNode,
  buttonText?: string,
  onClickBellowButton?: Function,
  isRequired?: boolean
  isDescriptionTooltip?: boolean
  warningTooltipText?: string,
  descriptionTooltipText?: string,
  errorInputSelectMessage?: string,
  labelPosition?: ELabelPosition
}

export const WrapperRectangleInput = ({
  className,
  classNameLabel,
  classNameDescriptionWindow,
  classNameWarningWindow,
  labelText,
  children,
  buttonText,
  onClickBellowButton,
  isRequired = false,
  isDescriptionTooltip = true,
  warningTooltipText,
  descriptionTooltipText,
  errorInputSelectMessage = 'Выберите категорию из списка',
  labelPosition = ELabelPosition.TOP
}: IWrapperRectangleInput) => {

  // STATE
  const [isWarningActive, setIsWarningActive] = useState<boolean>(false)
  const [isDescriptionActive, setIsDescriptionActive] = useState<boolean>(false);

  //Для InputText
  const [inputValueLength, setInputValueLength] = useState<number>(0)

  //Для RecursiveSelectInput
  const [selectedOptionsArray, setSelectedOptionsArray] = useState<IOption[]>([])

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
        checked
      });
    }
    return child;
  });

  // VARIABLE
  const errorInputTextMessageArray: string[] = [
    'Пожалуйста, заполните это поле!',
    `Максимальная длина - 50 символов. Сейчас ${inputValueLength}`
  ];

  const errorInputSelectMessageArray: string[] = [
    errorInputSelectMessage
  ];

  return (
    <div className={cls(cl.WrapperRectangleInput, className, cl[labelPosition])} onClick={() => setChecked(!checked)}>
      <div className={cls(cl.labelNTooltipContainer)}>
        <label className={cls(cl.label, classNameLabel)} >
          {labelText}
        </label>
        <div className={cl.tooltipsContainer}>
          {isDescriptionTooltip && descriptionTooltipText && (
            <div className={cl.tooltipDescCont}>
              <Button
                variant={ButtonVariant.CLEAR}
                className={cls(cl.button, cl.descButton, isDescriptionActive ? cl.descriptionActive : '')}
                beforeImage={TOOLTIP_DESCRIPTION_ICON}
                beforeProps={{ height: 14, width: 14 }}
                active={isDescriptionActive}
                onClick={() => setIsDescriptionActive(prevState => !prevState)}
              />
              <HoverWindow
                text={descriptionTooltipText}
                position={EHoverWindowPosition.RIGHT}
                borderColor={EHoverBorderColor.DEFAULT}
                show={isDescriptionActive}
                className={cls(cl.descWindowActive, classNameDescriptionWindow)}
              />
            </div>
          )}
          {isRequired && warningTooltipText && (
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
                active={isWarningActive}
                beforeProps={{ height: 14, width: 14 }}
                success={success}
                onClick={() => setIsWarningActive(prevState => !prevState)}
              />
              <HoverWindow
                text={warningTooltipText}
                position={EHoverWindowPosition.RIGHT}
                borderColor={!success ? EHoverBorderColor.WARNING : EHoverBorderColor.DEFAULT}
                show={isWarningActive}
                className={cls(cl.warnWindowActive, classNameWarningWindow)}
              />
            </div>
          )}
        </div>
      </div>

      <div className={cl.inputsContainer}>
        {clonedChildren}
      </div>

      {warning && (
        <div className={cl.errorMessage}>
          {errorInputTextMessageArray.map((it, index) => (
            <p key={index}>{it}</p>
          ))}
        </div>
      )}

      {buttonText && <Button variant={ButtonVariant.FILL}
        title={buttonText}
        className={cls(cl.button, !selectedOptionsArray.length ? cl.disabled : '')}
        disabled={!selectedOptionsArray.length}
        onClick={onClickBellowButton} />}
    </div>
  )
}
