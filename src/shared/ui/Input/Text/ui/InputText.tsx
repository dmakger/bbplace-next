'use client'

import { cls } from '@/shared/lib/classes.lib'
import cl from './_InputText.module.scss'
import { ChangeEvent, useEffect, useRef } from 'react'

interface InputTextProps {
    name?: string
    placeholder?: string
    className?: string,
    onChange?: Function,
    defaultValue?: string,
    value?: string,
    type?: string
}

export function InputText({
    className,
    type = 'text',
    onChange = () => {},
    defaultValue = '',
    value,
    ...rest }: InputTextProps) {

    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.value = defaultValue   
        }
    }, [defaultValue])

    return (
        <input className={cls(cl.input, className)}
            value={value}
            ref={inputRef}
            type={type}
            defaultValue={defaultValue}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
            {...rest}
        />
    )
}
