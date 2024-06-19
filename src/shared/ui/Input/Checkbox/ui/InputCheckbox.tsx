'use client'
import { cls } from '@/shared/lib/classes.lib'
import cl from './_InputCheckbox.module.scss'
import { Button, ButtonVariant } from '@/shared/ui/Button'
import { CHECKBOX_SECONDARY_ICON } from '@/shared/ui/Icon/data/checkbox.data.icon'
import { useRef, useState } from 'react'

interface IInputCheckbox {
  className?: string,
  success?: boolean
  setSuccess?: Function
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
  onClick
}: IInputCheckbox) => {

  //STATE
  const [isChecked, setIsChecked] = useState<boolean>(false)

  //REF
  const inputRef = useRef<HTMLInputElement>(null)


  return (
    <div className={cls(cl.InputCheckbox, className)}>
      <input type='checkbox'
        className={cl.input}
        defaultChecked={isChecked}
        ref={inputRef}
        required={required} />

      <Button variant={ButtonVariant.DEFAULT}
        beforeImage={CHECKBOX_SECONDARY_ICON}
        beforeProps={{classNameImage: isChecked ? cl.image : ''}}
        className={cls(
          cl.checkbox,
          isChecked ? cl.checked : '',
          warning ? cl.warning : '',
          success ? cl.success : '')}
        active={isChecked}
        onClick={() => setIsChecked(!isChecked)}
      />
    </div>
  )
}
