import { cls } from '@/shared/lib/classes.data'
import cl from './_InputText.module.scss'

interface InputTextProps {
    name?: string
    placeholder?: string
    className?: string
}

export function InputText({className, ...rest}: InputTextProps) {
    return (
        <input type="text" {...rest}
               className={cls(cl.input, className)} />
    )
}
