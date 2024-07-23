import React, { useEffect, useState } from 'react';
import { cls } from '@/shared/lib/classes.lib';
import cl from './_InputCheckbox.module.scss';
import { Button, ButtonVariant } from '@/shared/ui/Button';
import { CHECKBOX_SECONDARY_ICON, CHECKBOX_TERTIARY_ICON } from '@/shared/ui/Icon/data/checkbox.data.icon';
import { IWrapperRectangleInputChildren } from '@/shared/ui/Wrapper/RectangleInput/model/wrapperRectangleInput.model';
import { IInput } from '../../../model/input.model';
import { ECheckboxVariant } from '../model/checkbox.model';
import { IImageSizes } from '@/shared/model/image.model';

export interface IInputCheckbox extends IWrapperRectangleInputChildren, IInput {
  onClick?: (value: boolean) => void;
  isChecked?: boolean;
  setIsChecked?: (value: boolean) => void;
  variantCheckbox?: ECheckboxVariant;
  checkMarkSizes?: IImageSizes;
}

export const InputCheckbox = ({
  className,
  name,
  variantCheckbox = ECheckboxVariant.TERTIARY,
  checkMarkSizes = {
    width: 20,
    height: 15,
  },
  success = false,
  warning = false,
  required,
  setSuccess,
  setWarning,
  onClick,
  checked,
  setсhecked,
  isChecked,
  setIsChecked,
  error,
}: IInputCheckbox) => {
  // STATE
  const [isOwnChecked, setIsOwnChecked] = useState<boolean>(checked || isChecked || false);
  const [isInitialRender, setIsInitialRender] = useState<boolean>(true); // Состояние для отслеживания первичной отрисовки

  // EFFECTS
  useEffect(() => {
    // Обновление checked, если он пришел извне
    if (checked !== undefined && checked !== isOwnChecked) {
      setIsOwnChecked(checked);
    } else if (isChecked !== undefined && isChecked !== isOwnChecked) {
      setIsOwnChecked(isChecked);
    }
  }, [checked, isChecked]);

  useEffect(() => {
    // Обновление состояний success и warning при изменении isOwnChecked
    if (!isInitialRender) {
      if (required && !isOwnChecked) {
        setWarning && setWarning(true);
        setSuccess && setSuccess(false);
      } else if (!isOwnChecked) {
        setSuccess && setSuccess(false);
      } else if (isOwnChecked) {
        setWarning && setWarning(false);
        setSuccess && setSuccess(true);
      }
      // Вызов onClick callback
      onClick && onClick(isOwnChecked);
      // Обновление checked, если установлен setсhecked
      setсhecked && setсhecked(isOwnChecked);
    } else {
      setIsInitialRender(false); // Устанавливаем false после первичной отрисовки
    }
  }, [isOwnChecked]);

  useEffect(() => {
    // Обработка ошибки
    if (error) {
      setWarning && setWarning(true);
      setSuccess && setSuccess(false);
    }
  }, [error]);

  // HANDLER
  const handleCheckboxChange = () => {
    const newValue = !isOwnChecked;
    setIsOwnChecked(newValue);
    if (setIsChecked)
      setIsChecked(newValue);
    if (onClick) {
      onClick(newValue);
    }
  };

  return (
    <div className={cls(cl.InputCheckbox, cl[variantCheckbox], className)}>
      <input
        type="checkbox"
        className={cl.input}
        name={name}
        checked={isOwnChecked}
        required={required}
        onChange={handleCheckboxChange}
      />
      <Button
        variant={ButtonVariant.DEFAULT}
        beforeImage={variantCheckbox === ECheckboxVariant.SECONDARY ? CHECKBOX_SECONDARY_ICON : CHECKBOX_TERTIARY_ICON}
        beforeProps={{
          width: checkMarkSizes.width,
          height: checkMarkSizes.height,
          classNameImage: isOwnChecked ? cl.image : '',
        }}
        className={cls(cl.checkbox, isOwnChecked ? cl.checked : '', warning ? cl.warning : '', success ? cl.success : '')}
        active={isOwnChecked}
        onClick={handleCheckboxChange}
      />
    </div>
  );
};
