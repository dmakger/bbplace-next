'use client';

import { cls } from '@/lib/classes'
import cl from './_InputText.module.scss'

interface InputTextProps {
    name?: string
    placeholder?: string
    className?: string
}

export default function InputText({className, ...rest}: InputTextProps) {
    return (
        <input type="text" {...rest}
               className={cls(cl.input, className)} />
    )
}
