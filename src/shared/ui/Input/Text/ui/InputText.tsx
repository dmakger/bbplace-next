import { cls } from '@/shared/lib/classes.lib'
import cl from './_InputText.module.scss'
import { ChangeEvent } from 'react'

interface InputTextProps {
    name?: string
    placeholder?: string
    className?: string,
    onChange?: (e:ChangeEvent<HTMLInputElement>) => void
    type?: string
}

export function InputText({className, type = 'text', ...rest}: InputTextProps) {
    return (
        <input type={type} {...rest}
               className={cls(cl.input, className)} />
    )
}
