'use client'
import { cls } from '@/shared/lib/classes.lib'
import cl from './_InputCheckbox.module.scss'
import { Button, ButtonVariant } from '@/shared/ui/Button'
import { CHECKBOX_SECONDARY_ICON } from '@/shared/ui/Icon/data/checkbox.data.icon'
import { useEffect, useRef, useState } from 'react'
import { IWrapperRectangleInputChildren } from '@/shared/ui/Wrapper/RectangleInput/model/wrapperRectangleInput.model'

interface IInputCheckbox extends IWrapperRectangleInputChildren{
  className?: string,
  success?: boolean,
  setSuccess?: Function,
  warning?: boolean,
  setWarning?: Function,
  required?: boolean,
  onClick?: Function
}

export const InputCheckbox = ({
  className,
  success = false,
  setSuccess,
  warning = false,
  setWarning,
  required,
  onClick,
  checked,
  setChecked
}: IInputCheckbox) => {

  //STATE
  const [isChecked, setIsChecked] = useState<boolean>(false)  

  //REF
  const inputRef = useRef<HTMLInputElement>(null)

  const handleCheckboxChange = () => {
    const newValue = !isChecked
    setIsChecked(newValue)
    if (inputRef.current) {
      inputRef.current.checked = newValue            
    }
    if (onClick) {
      onClick(newValue)
    }
  }

  //EFFECT
  useEffect(() => {
    if(checked && setChecked){
      setIsChecked(checked)
      setChecked(checked)
    }
  }, [checked])

  return (
    <div className={cls(cl.InputCheckbox, className)}>
      <input type='checkbox'
        className={cl.input}
        checked={checked}
        ref={inputRef}
        required={required}
        onChange={handleCheckboxChange}
      />

      <Button variant={ButtonVariant.DEFAULT}
        beforeImage={CHECKBOX_SECONDARY_ICON}
        beforeProps={{ classNameImage: isChecked ? cl.image : '' }}
        className={cls(
          cl.checkbox,
          isChecked ? cl.checked : '',
          warning ? cl.warning : '',
          success ? cl.success : '')}
        active={isChecked}
        onClick={handleCheckboxChange}
      />
    </div>
  )
}
