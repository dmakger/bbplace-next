import { cls } from '@/shared/lib/classes.lib'
import cl from './_InputText.module.scss'
import { ChangeEvent } from 'react'

interface InputTextProps {
    name?: string
    placeholder?: string
    className?: string,
    onChange?: (e:ChangeEvent<HTMLInputElement>) => void
}

export function InputText({className, ...rest}: InputTextProps) {
    return (
        <input type="text" {...rest}
               className={cls(cl.input, className)} />
    )
}
