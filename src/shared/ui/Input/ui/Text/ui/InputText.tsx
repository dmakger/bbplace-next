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
    inputTypeVariant = EInputTextTypeVariants.TEXT,
    variantInputText = EInputTextVariant.DEFAULT,
    title,
    name,
    placeholder,
    required = false,
    classNameInputText,
    classNameTextArea,
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
    const textAreaRef = useRef<HTMLTextAreaElement>(null)

    //EFFECT
    useEffect(() => {
        if (inputRef.current) inputRef.current.value = defaultValue;
        if (textAreaRef.current) textAreaRef.current.value = defaultValue;
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

    const handleOnChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = e.target.value
        setInputValueLength?.(value.length)
        checkValue(value)
        onChange(value)
    }

    return (
        <WrapperTitleInput title={title}>
            {inputTypeVariant === EInputTextTypeVariants.TEXT ? <input
                className={cls(
                    cl[variant],
                    variantInputText === EInputTextVariant.W_HOVERED ? cl.wHovered : '',
                    cl.input,
                    isSuccess ? cl.success : '',
                    isWarning ? cl.error : '',
                    classNameInputText
                )}
                name={name}
                ref={inputRef}
                type={type}
                required={required}
                placeholder={placeholder}
                defaultValue={defaultValue}
                onChange={handleOnChange}
                {...rest}
            /> :
                <textarea
                    className={cls(
                        cl[variant],
                        cl.textarea,
                        isSuccess ? cl.success : '',
                        isWarning ? cl.error : '',
                        classNameTextArea)}
                    name={name}
                    ref={textAreaRef}
                    defaultValue={defaultValue}
                    required={required}
                    placeholder={placeholder}
                    onChange={handleOnChange}

                    {...rest}
                />}

        </WrapperTitleInput>
    )
}