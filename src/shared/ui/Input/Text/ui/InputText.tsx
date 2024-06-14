'use client'

import { cls } from '@/shared/lib/classes.lib'
import cl from './_InputText.module.scss'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
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
    type?: string,
    success?: boolean
    setSuccess?: Function
    warning?: boolean,
    setWarning?: Function
    setInputValueLength?: Function
}

export function InputText({
    variant = EInputVariants.ROUNDED,
    size = EInputSizes.NONE,
    title,
    variantInputText = EInputTextVariant.DEFAULT,
    className,
    type = 'text',
    onChange = () => { },
    defaultValue = '',
    success,
    setSuccess,
    warning,
    setWarning,
    setInputValueLength,
    ...rest }: InputTextProps) {

    //STATE
    const [isWarning, setIsWarning] = useState<boolean>(warning ?? false);
    const [isSuccess, setIsSuccess] = useState<boolean>(success ?? false);

    //REF
    const inputRef = useRef<HTMLInputElement>(null)

    //EFFECT
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.value = defaultValue
        }
    }, [defaultValue])



    //FUNCTIONS
    const checkValue = (value: string) => {
        const isErr = value.trim() === ''

        if (setWarning && setSuccess) {
            setWarning(isErr)
            setIsWarning(isErr)
            setSuccess(!isErr)
            setIsSuccess(!isErr)
        }
    }

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setInputValueLength?.(value.length)
        checkValue(value)
        onChange(value)
    }

    return (
        <WrapperTitleInput title={title}>
            <input
                className={cls(
                    cl[variant],
                    variantInputText === EInputTextVariant.W_HOVERED ? cl.wHovered : '',
                    cl.input,
                    cl[size],
                    isSuccess ? cl.success : '',
                    isWarning ? cl.error : '',
                    className
                )}
                ref={inputRef}
                type={type}
                defaultValue={defaultValue}
                onChange={handleOnChange}
                {...rest}
            />
        </WrapperTitleInput>
    )
}