'use client'

import { cls } from '@/shared/lib/classes.lib'
import cl from './_InputText.module.scss'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { WrapperTitleInput } from '@/shared/ui/Wrapper/Title/Input/WrapperTitleInput'
import { EInputTextVariant } from '../data/text.input.data'
import { IWrapperRectangleInputChildren } from '@/shared/ui/Wrapper/RectangleInput/model/wrapperRectangleInput.model'
import { EInputSizes, EInputVariants, IInput } from '../../../model/input.model'

interface InputTextProps extends IWrapperRectangleInputChildren, IInput{
    title?: string
    variantInputText?: EInputTextVariant
    defaultValue?: string,
    type?: string
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
        let isErr = false;
        isErr = value.trim() === '';
        if(type === 'email'){
            isErr = !(value.includes('@') && value.includes('.'));
           
        } 
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
                onBlur={(e) => checkValue(e.target.value)}
                {...rest}
            />
        </WrapperTitleInput>
    )
}