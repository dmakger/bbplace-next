'use client';

import { cls } from '@/shared/lib/classes.lib';
import cl from './_InputCheckbox.module.scss';
import { Button, ButtonVariant } from '@/shared/ui/Button';
import { CHECKBOX_SECONDARY_ICON } from '@/shared/ui/Icon/data/checkbox.data.icon';
import { useEffect, useState } from 'react';
import { IWrapperRectangleInputChildren } from '@/shared/ui/Wrapper/RectangleInput/model/wrapperRectangleInput.model';
import { IInput } from '../../../model/input.model';

export interface IInputCheckbox extends IWrapperRectangleInputChildren, IInput {
  onClick?: (value: boolean) => void;
  isChecked?: boolean;
  setIsChecked?: (value: boolean) => void;
}

export const InputCheckbox = ({
  className,
  name,
  success = false,
  setSuccess,
  warning = false,
  setWarning,
  required,
  onClick,
  checked,
  isChecked,
  setIsChecked,
}: IInputCheckbox) => {

  //STATE
  const [isOwnChecked, setIsOwnChecked] = useState<boolean>(checked || isChecked || false);

  // FUNCTION
  // const handleCheckboxChange = () => {
  //   setIsChecked(prevIsChecked => {
  //     const newValue = !prevIsChecked
  //     if (onClick)
  //       onClick(newValue)
  //     return newValue
  //   })
  // }

  // EFFECT
  useEffect(() => {
    if (checked !== undefined) {
      setIsOwnChecked(checked);
    } else if (isChecked !== undefined) {
      setIsOwnChecked(isChecked);
    }
  }, [checked, isChecked]);

  // FUNCTION
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
    <div className={cls(cl.InputCheckbox, className)}>
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
        beforeImage={CHECKBOX_SECONDARY_ICON}
        beforeProps={{ classNameImage: isOwnChecked ? cl.image : '' }}
        className={cls(
          cl.checkbox,
          isOwnChecked ? cl.checked : '',
          warning ? cl.warning : '',
          success ? cl.success : ''
        )}
        active={isOwnChecked}
        onClick={handleCheckboxChange}
      />
    </div>
  );
};
