'use client'
import { cls } from '@/shared/lib/classes.lib'
import cl from './_InputCheckbox.module.scss'
import { Button, ButtonVariant } from '@/shared/ui/Button'
import { CHECKBOX_SECONDARY_ICON } from '@/shared/ui/Icon/data/checkbox.data.icon'
import { useEffect, useState } from 'react'
import { IWrapperRectangleInputChildren } from '@/shared/ui/Wrapper/RectangleInput/model/wrapperRectangleInput.model'
import { IInput } from '../../../model/input.model'

interface IInputCheckbox extends IWrapperRectangleInputChildren, IInput {
  onClick?: (value: boolean) => void
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
  checked
}: IInputCheckbox) => {

  // STATE
  const [isChecked, setIsChecked] = useState<boolean>(checked || false)

  // EFFECT
  useEffect(() => {
    if (checked !== undefined) {
      setIsChecked(checked)
    }
  }, [checked])

  // FUNCTION
  const handleCheckboxChange = () => {
    const newValue = !isChecked
    setIsChecked(newValue)
    if (onClick) {
      onClick(newValue)
    }
  }

  return (
    <div className={cls(cl.InputCheckbox, className)}>
      <input
        type='checkbox'
        className={cl.input}
        name={name}
        checked={isChecked}
        required={required}
        onChange={handleCheckboxChange}
      />

      <Button
        variant={ButtonVariant.DEFAULT}
        beforeImage={CHECKBOX_SECONDARY_ICON}
        beforeProps={{ classNameImage: isChecked ? cl.image : '' }}
        className={cls(
          cl.checkbox,
          isChecked ? cl.checked : '',
          warning ? cl.warning : '',
          success ? cl.success : ''
        )}
        active={isChecked}
        onClick={handleCheckboxChange}
      />
    </div>
  )
}
