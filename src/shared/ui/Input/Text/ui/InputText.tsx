'use client'

import { cls } from '@/shared/lib/classes.lib'
import cl from './_InputText.module.scss'
import { ChangeEvent, useEffect, useRef } from 'react'
import { WrapperTitleInput } from '@/shared/ui/Wrapper/Title/Input/WrapperTitleInput'
import { EInputTextVariant } from '../data/text.input.data'
import { EInputSizes, EInputVariants } from '../../model/input.model'

interface InputTextProps {
    variant?: EInputVariants,
    size?: EInputSizes,
    title?: string
    variantInputText?: EInputTextVariant
    name?: string
    placeholder?: string
    className?: string,
    onChange?: Function,
    defaultValue?: string,
    type?: string
}

export function InputText({
    variant = EInputVariants.RECTANGULAR,
    size = EInputSizes.NONE,
    title,
    variantInputText=EInputTextVariant.DEFAULT,
    className,
    type = 'text',
    onChange = () => {},
    defaultValue = '',
    ...rest }: InputTextProps) {

    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.value = defaultValue   
        }
    }, [defaultValue])

    return (
        <WrapperTitleInput title={title}>
            <input className={cls(cl[variant], variantInputText === EInputTextVariant.W_HOVERED ? cl.wHovered : '', cl.input, cl[size],className)}
                   ref={inputRef}
                   type={type}
                   defaultValue={defaultValue}
                   onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
                   {...rest} />
        </WrapperTitleInput>
    )
}
