import { cls } from '@/shared/lib/classes.lib';
import cl from './_WrapperRectangleInput.module.scss';
import { ReactNode } from 'react';
import WarningIcon from '@/shared/assets/img/WarningIcon/WarningIcon.svg';
import TooltipIcon from '@/shared/assets/img/Tooltip/TooltipIcon.svg'
import Image from 'next/image';

interface IWrapperRectangleInput {
  className?: string
  classNameLabel?: string
  labelText: string
  children: ReactNode,
  isRequired?: boolean
  isDescriptionTooltip?: boolean
}

export const WrapperRectangleInput = ({
  className,
  classNameLabel,
  labelText,
  children,
  isRequired = false,
  isDescriptionTooltip = false
}: IWrapperRectangleInput) => {
  return (
    <div className={cls(cl.WrapperRectangleInput, className)}>
      <div className={cl.labelNTooltipContainer}>
        <label className={cls(cl.label, classNameLabel)}>
          {labelText}
        </label>
        <div className={cl.tooltipsContainer}>
          {!isDescriptionTooltip && <div className={cl.descriptionIconContainer}>
            <Image src={TooltipIcon} alt='desc' width={14} height={14} className={cl.descriptionIcon} />
          </div>}
          {!isRequired && <div className={cl.warningIconContainer}>
            <Image src={WarningIcon} alt='warn' width={14} height={14} className={cl.warningIcon} />
          </div>}
        </div>
      </div>
      <div className={cl.inputsContainer}>
        {children}
      </div>
      <p className={cl.errorMessage}>
        Пожалуйста, заполните это поле!
      </p>
    </div>
  )
}
