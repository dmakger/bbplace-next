'use client'
import { cls } from '@/shared/lib/classes.lib';
import cl from './_WrapperRectangleInput.module.scss';
import React, { ReactNode, cloneElement, useEffect, useState } from 'react';
import { TOOLTIP_DESCRIPTION_ICON } from '@/shared/ui/Icon/data/tooltipDescription.data.icon';
import { TOOLTIP_WARNING_ICON } from '@/shared/ui/Icon/data/tooltipWarning.data.icon';
import { Button, ButtonVariant } from '@/shared/ui/Button';
import { IChildProps } from '../model/wrapperRectangleInput.model';
import { HoverWindow } from '@/shared/ui/HoverWindow';
import { EHoverBorderColor, EHoverWindowPosition } from '@/shared/ui/HoverWindow/model/hoverWindow.model';

interface IWrapperRectangleInput {
  className?: string
  classNameLabel?: string,
  classNameDescriptionWindow?: string,
  classNameWarningWindow?: string,
  labelText: string
  children: ReactNode,
  isRequired?: boolean
  isDescriptionTooltip?: boolean
  warningTooltipText?: string,
  descriptionTooltipText?: string,
  errorInputSelectMessage?: string
}

export const WrapperRectangleInput = ({
  className,
  classNameLabel,
  classNameDescriptionWindow,
  classNameWarningWindow,
  labelText,
  children,
  isRequired = false,
  isDescriptionTooltip = true,
  warningTooltipText,
  descriptionTooltipText,
  errorInputSelectMessage = 'Выберите категорию из списка'
}: IWrapperRectangleInput) => {

  // STATE
  const [isWarningActive, setIsWarningActive] = useState<boolean>(false)
  const [isDescriptionActive, setIsDescriptionActive] = useState<boolean>(false);
  const [warnings, setWarnings] = useState<Record<string, boolean>>({});
  const [successes, setSuccesses] = useState<Record<string, boolean>>({});
  const [inputValueLength, setInputValueLength] = useState<number>(0)
  const [isListOpen, setIsListOpen] = useState<boolean>(false)
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
    if (React.isValidElement<IChildProps>(child)) {
      const id = `child-${index}`;
      if (successes[id] === undefined) {
        setSuccesses(prev => ({ ...prev, [id]: false }));
      }
      if (warnings[id] === undefined) {
        setWarnings(prev => ({ ...prev, [id]: false }));
      }
      return cloneElement<IChildProps>(child, {
        success: successes[id],
        warning: warnings[id],
        setSuccess: (value: boolean) => setSuccesses(prev => ({ ...prev, [id]: value })),
        setWarning: (value: boolean) => setWarnings(prev => ({ ...prev, [id]: value })),
        setInputValueLength,
        setIsListOpen
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
    <div className={cls(cl.WrapperRectangleInput, className)}>
      <div className={cl.labelNTooltipContainer}>
        <label className={cls(cl.label, classNameLabel)}>
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
                borderColor={!success ? EHoverBorderColor.WARNING : EHoverBorderColor.SUCCESS}
                show={isWarningActive}
                className={cls(cl.warnWindowActive, classNameWarningWindow)}
              />
            </div>
          )}
        </div>
      </div>
      
      <div className={cls(cl.inputsContainer, isListOpen ? cl.listOpen : '')}>
        {clonedChildren}
      </div>

      {warning && isRequired && (
        <div className={cl.errorMessage}>
          {errorInputTextMessageArray.map((it, index) => (
            <p key={index}>{it}</p>
          ))}
        </div>
      )}
    </div>
  )
}
