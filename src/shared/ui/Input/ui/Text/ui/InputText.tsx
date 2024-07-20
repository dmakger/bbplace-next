'use client'

import { cls } from '@/shared/lib/classes.lib'
import cl from './_InputText.module.scss';
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { WrapperTitleInput } from '@/shared/ui/Wrapper/Title/Input/WrapperTitleInput';
import { EInputTextVariant } from '../data/text.input.data';
import { IWrapperRectangleInputChildren } from '@/shared/ui/Wrapper/RectangleInput/model/wrapperRectangleInput.model';
import { EInputSizes, EInputVariants, IInput } from '../../../model/input.model';
import { EInputTextTypeVariants } from '../../../Text/model/text.input.model';
import { IIcon } from '@/shared/ui/Icon/model/icon.model';
import { ImageSmart } from '@/shared/ui/Image/Smart/ImageSmart';
import { IIconProps } from '@/shared/model/button.model';
import { ButtonImageSize } from '@/shared/ui/Button/data/button.data'
import { EMAIL_VALID_RULES, isEmailValid } from '@/entities/Auth/data/email.data'
import { PASSWORD_VALID_RULES, isPasswordValid } from '@/entities/Auth/data/password.data'

interface InputTextProps extends IWrapperRectangleInputChildren, IInput{
    title?: string
    variantInputText?: EInputTextVariant
    defaultValue?: string,
    type?: string,
    inputTypeVariant?: EInputTextTypeVariants
    
    beforeImage?: IIcon
    beforeProps?: IIconProps,
    disabled?: boolean,

    classNameInputText?: string
    classNameTextArea?: string

    onMouseEnter?: Function
    onMouseLeave?: Function
}

export function InputText({
    variant = EInputVariants.ROUNDED,
    inputTypeVariant = EInputTextTypeVariants.TEXT,
    variantInputText = EInputTextVariant.DEFAULT,
    title,
    name, placeholder,
    required = false,
    className, 
    classNameInputText,
    classNameTextArea,
    type = 'text',
    beforeImage, beforeProps,
    onChange = () => { }, onChangeEvent=()=>{},
    defaultValue = '',
    success, setSuccess, warning, setWarning,
    setInputValueLength,
    size,
    error = false,
    setError,
    disabled,
    setErrorMessageArray,
    // Состояния для отображения статусов
    onMouseEnter=()=>{}, onMouseLeave=()=>{},
    ...rest }: InputTextProps) {

    //STATE
    const [isWarning, setIsWarning] = useState<boolean>(warning ?? false);
    const [isSuccess, setIsSuccess] = useState<boolean>(success ?? false);
    const [isHovered, setIsHovered] = useState<boolean>(false)
    const [isPressed, setIsPressed] = useState<boolean>(false)

    // Ref для элементов ввода
    const inputRef = useRef<HTMLInputElement>(null);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    // Эффект для обработки ошибок
    useEffect(() => {
        if (error) {
            // Ошибка обнаружена
            if (textAreaRef.current) textAreaRef.current.value = '';
            if (inputRef.current) inputRef.current.value = '';

            // Обновление состояний ошибок и успеха
            setError?.(true);
            setWarning?.(true);
            setIsWarning(true);
            setSuccess?.(false);
            setIsSuccess(false);
        }
    }, [error]);

    // Функция для проверки значения ввода
    const checkValue = (value: string) => {
        let isErr = value.trim() === '';

        if (isErr) {
            setError?.(true);
            setWarning?.(true);
            setIsWarning(true);
            setSuccess?.(false);
            setIsSuccess(false);
            setErrorMessageArray?.(['Пожалуйста, заполните это поле']);
            return;
        }

        //EMAIL
        if (type === 'email') {
            isErr = !isEmailValid(value);
            if (isErr) setErrorMessageArray?.([EMAIL_VALID_RULES]);
        }

        //PASSWORD
        if (type === 'password') {
            isErr = !isPasswordValid(value);
            if (isErr) setErrorMessageArray?.([PASSWORD_VALID_RULES]);
        }

        setError?.(isErr);
        setWarning?.(isErr);
        setIsWarning(isErr);
        setSuccess?.(!isErr);
        setIsSuccess(!isErr);
    };

    // HANDLE
    const handleOnClickWrapperInput = () => {
        inputRef.current?.focus()
    }

    const handleOnChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = e.target.value
        setInputValueLength?.(value.length)
        checkValue(value)
        onChange(value)
        onChangeEvent(e)
    }

    const handleOnMouseEnter = () => {
        setIsHovered(true)
        onMouseEnter()
    }
    const handleOnMouseLeave = () => {
        setIsHovered(false)
        setIsPressed(false)
        onMouseLeave()
    }
    
    const handleOnMouseDown = () => {
        setIsPressed(true)
        setIsHovered(true)
    }
    const handleOnMouseUp = () => {
        setIsPressed(false)
        setIsHovered(true)
    }
    

    return (
        <WrapperTitleInput title={title}>
            {inputTypeVariant === EInputTextTypeVariants.TEXT ? (
                <div onClick={handleOnClickWrapperInput} 
                    onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave} 
                    onMouseDown={handleOnMouseDown} onMouseUp={handleOnMouseUp}
                    className={cls(
                        cl.wrapperInput,
                        cl[variant],
                        variantInputText === EInputTextVariant.W_HOVERED ? cl.wHovered : '',
                        cl.input,
                        isSuccess ? cl.success : '',
                        isWarning ? cl.error : '',
                        disabled ? cl.disabled : '',
                        className
                    )}>
                    {beforeImage &&
                        <ImageSmart {...beforeProps} icon={beforeImage} 
                                    width={beforeProps && beforeProps.width ? beforeProps.width: ButtonImageSize.DefaultSize} 
                                    height={beforeProps && beforeProps.height ? beforeProps.height: ButtonImageSize.DefaultSize} 
                                    isHovered={isHovered} isSuccess={isSuccess} isPressed={isPressed} 
                                    className={cls(beforeProps?.className, cl.imageInput)} />

                    }
                    <input className={cls(cl.input, classNameInputText)}
                        name={name}
                        ref={inputRef}
                        type={type}
                        required={required}
                        placeholder={placeholder}
                        defaultValue={defaultValue}
                        onChange={handleOnChange}
                        onBlur={(e) => checkValue(e.target.value)}
                        disabled={disabled}
                        // onClick={e => e.stopPropagation()}
                        {...rest}
                        />
                </div>
            ) : (
                <textarea
                    className={cls(
                        cl[variant],
                        cl.textarea,
                        isSuccess ? cl.success : '',
                        isWarning ? cl.error : '',
                        classNameTextArea
                    )}
                    name={name}
                    ref={textAreaRef}
                    defaultValue={defaultValue}
                    required={required}
                    placeholder={placeholder}
                    onChange={handleOnChange}
                    onBlur={(e) => checkValue(e.target.value)}
                    {...rest}
                />
            )}
        </WrapperTitleInput>
    );
}
