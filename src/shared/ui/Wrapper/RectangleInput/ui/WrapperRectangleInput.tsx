'use client'
import { cls } from '@/shared/lib/classes.lib';
import cl from './_WrapperRectangleInput.module.scss';
import React, { ReactNode, cloneElement, useState } from 'react';
import { TOOLTIP_DESCRIPTION_ICON } from '@/shared/ui/Icon/data/tooltipDescription.data.icon';
import { TOOLTIP_WARNING_ICON } from '@/shared/ui/Icon/data/tooltipWarning.data.icon';
import { Button, ButtonVariant } from '@/shared/ui/Button';
import { IChildProps } from '../model/wrapperRectangleInput.model';

interface IWrapperRectangleInput {
  className?: string
  classNameLabel?: string
  labelText: string
  children: ReactNode,
  isRequired?: boolean
  isDescriptionTooltip?: boolean
  tooltipText?: string,
  errorInputSelectMessage?: string
}

export const WrapperRectangleInput = ({
  className,
  classNameLabel,
  labelText,
  children,
  isRequired = false,
  isDescriptionTooltip = false,
  tooltipText,
  errorInputSelectMessage = 'Выберите категорию из списка'
}: IWrapperRectangleInput) => {

  //STATE
  const [isWarningActive, setIsWarningActive] = useState<boolean>(false)
  const [isDescriptionActive, setIsDescriptionActive] = useState<boolean>(false);
  const [warning, setWarning] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [inputValueLength, setInputValueLength] = useState<number>(0)
  const [isListOpen, setIsListOpen] = useState<boolean>(false)


  //CHILDREN
  const clonedChildren = React.Children.map(children, child => {
    if (React.isValidElement<IChildProps>(child)) {
      return cloneElement<IChildProps>(child, { success, setSuccess, warning, setWarning, setInputValueLength, setIsListOpen});
    }
    return child;
  });

  //VARIABLE
  const errorInputTextMessageArray:string[] = [
    'Пожалуйста, заполните это поле!',
    `Максимальная длина - 50 символов. Сейчас ${inputValueLength}`
  ]

  const errorInputSelectMessageArray:string[] = [
    errorInputSelectMessage
  ]


  return (
    <div className={cls(cl.WrapperRectangleInput, className)}>
      <div className={cl.labelNTooltipContainer}>
        <label className={cls(cl.label, classNameLabel)}>
          {labelText}
        </label>
        <div className={cl.tooltipsContainer}>
          {!isDescriptionTooltip && <Button variant={ButtonVariant.CLEAR}
            className={cls(cl.button, cl.descButton, isDescriptionActive ? cl.descriptionActive : '')}
            beforeImage={TOOLTIP_DESCRIPTION_ICON}
            beforeProps={{ height: 14, width: 14 }}
            active={isDescriptionActive}
            onClick={() => setIsDescriptionActive(prevState => !prevState)} />}

          {!isRequired && <Button variant={ButtonVariant.CLEAR}
            className={cls(cl.button, !success ? cl.warnButton : cl.successButton, isWarningActive && !success ? cl.warningActive : '', isWarningActive && success ? cl.descriptionActive : '')}
            beforeImage={TOOLTIP_WARNING_ICON}
            beforeProps={{ height: 14, width: 14 }}
            success={success}
            onClick={() => setIsWarningActive(prevState => !prevState)}/>}
        </div>
      </div>
      <div className={cls(cl.inputsContainer, isListOpen ? cl.listOpen : '')}>
        {clonedChildren}
      </div>
      {warning && <div className={cl.errorMessage}>
        {errorInputTextMessageArray.map(it => (
          <p>{it}</p>
        ))}
      </div>}
    </div>
  )
}
