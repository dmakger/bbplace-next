'use client'
import { ChangeEvent, useEffect, useRef, useState, KeyboardEvent } from 'react';

import { cls } from '@/shared/lib/classes.lib';
import cl from './_InputText.module.scss';
import { WrapperTitleInput } from '@/shared/ui/Wrapper/Title/Input/WrapperTitleInput';
import { EInputTextType, EInputTextVariant } from '../data/text.input.data';
import { IWrapperRectangleInputChildren } from '@/shared/ui/Wrapper/RectangleInput/model/wrapperRectangleInput.model';
import { EInputVariants, IInput } from '../../../model/input.model';
import { EInputTextTypeVariants } from '../../../Text/model/text.input.model';
import { IIcon } from '@/shared/ui/Icon/model/icon.model';
import { ImageSmart } from '@/shared/ui/Image/Smart/ImageSmart';
import { IIconProps } from '@/shared/model/button.model';
import { ButtonImageSize } from '@/shared/ui/Button/data/button.data';
import { EMAIL_VALID_RULES, TEL_N_EMAIL_VALID_RULES, TEL_VALID_RULES, isEmailValid, isTelEmailValid, isTelValid } from '@/entities/Auth/data/telNEmail.data';
import { PASSWORD_VALID_RULES, isPasswordValid } from '@/entities/Auth/data/password.data';
import { FILL_THE_FIELD } from '@/entities/Auth/data/errorMessages.data';
import { isValueExceededMaxLength } from '../lib/inputText.lib';

interface InputTextProps extends IWrapperRectangleInputChildren, IInput {
    title?: string
    variantInputText?: EInputTextVariant
    defaultValue?: string | number,
    type?: EInputTextType,
    inputTypeVariant?: EInputTextTypeVariants
    value?: string
    setValue?: Function
    beforeImage?: IIcon
    beforeProps?: IIconProps,
    disabled?: boolean,
    maxLength?: number,

    classNameInputText?: string
    classNameTextArea?: string

    onMouseEnter?: Function
    onMouseLeave?: Function
    onKeyDown?: (e: KeyboardEvent<HTMLTextAreaElement>) => void

    rows?: number
    refTextArea?: React.RefObject<HTMLTextAreaElement>
}

export function InputText({
    variant = EInputVariants.ROUNDED,
    inputTypeVariant = EInputTextTypeVariants.TEXT,
    variantInputText = EInputTextVariant.DEFAULT,
    title,
    value,
    setValue,
    autoFocus,
    name, placeholder,
    required = false,
    className,
    classNameInputText,
    classNameTextArea,
    type = EInputTextType.Text,
    beforeImage, beforeProps,
    onChange = () => { }, onChangeEvent = () => { },
    defaultValue,
    success, setSuccess, warning, setWarning,
    setInputValueLength,
    size,
    error = false,
    setError,
    disabled,
    maxLength,
    setErrorMessageArray,
    // Состояния для отображения статусов
    onMouseEnter = () => { }, onMouseLeave = () => { },
    onKeyDown=()=>{},

    checkboxId,
    setChecked,
    setSelectedOption,
    selectedOption,
    setSelectedOptionsArray,

    rows,
    refTextArea: refOutTextArea,
    ...rest }: InputTextProps) {

    //STATE
    const [localValue, setLocalValue] = useState<string | number>(defaultValue || value || '');
    
    const [isWarning, setIsWarning] = useState<boolean>(warning ?? false);
    const [isSuccess, setIsSuccess] = useState<boolean>(success ?? false);
    const [isHovered, setIsHovered] = useState<boolean>(false)
    const [isPressed, setIsPressed] = useState<boolean>(false)

    // Ref для элементов ввода
    const inputRef = useRef<HTMLInputElement>(null);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    //EFFECT
    // для синхронизации defaultValue с внутренним состоянием
    useEffect(() => {
        if (defaultValue !== undefined) {
            setLocalValue(defaultValue);
        }
    }, [defaultValue]);

    useEffect(() => {
        if (value !== undefined) {
            setLocalValue(value);
        }
    }, [value]);

    useEffect(() => {
        if (error) {
            // Ошибка обнаружена
            if (textAreaRef.current) textAreaRef.current.value = '';
            if (inputRef.current) inputRef.current.value = '';

            // Обновление состояний ошибок и успеха
            setWarning?.(true);
            setIsWarning(true);
            setSuccess?.(false);
            setIsSuccess(false);
        }
    }, [error]);


    useEffect(() => {
        const trimmedValue = String(localValue)?.trim();
        
        if (!trimmedValue) {
          setIsSuccess(false);
          setSuccess?.(false);
        } else {
          checkValue(trimmedValue);
        }
        
      }, [value]);

    // Функция для проверки значения ввода
    const checkValue = (value: string) => {

        let isErr = false;
        isErr = required && value.trim() === '';

        if(!required && value.trim() === ''){
            isErr = false
        }
    
        if (isErr) {
            setWarning?.(true);
            setIsWarning(true);
            setSuccess?.(false);
            setIsSuccess(false);
            setErrorMessageArray?.([FILL_THE_FIELD]);
            return;
        }

        //EMAIL
        if (type === EInputTextType.Email) {
            isErr = !isEmailValid(value);
            if (isErr) setErrorMessageArray?.([EMAIL_VALID_RULES]);
        }

        //TEL_N_EMAIL
        if(type === EInputTextType.Tel_Email){
            isErr = !isTelEmailValid(value);            
            if (isErr) setErrorMessageArray?.([TEL_N_EMAIL_VALID_RULES]);
        }

        //TEL
        if(type === EInputTextType.Tel && value.trim() !== ''){            
            isErr = !isTelValid(value);                        
            if (isErr) setErrorMessageArray?.([TEL_VALID_RULES]);            
        }

        //PASSWORD
        if (type === EInputTextType.Password) {
            isErr = !isPasswordValid(value);
            if (isErr) setErrorMessageArray?.([PASSWORD_VALID_RULES]);
        }

        if(maxLength){
            isErr = !!isValueExceededMaxLength(value, maxLength)
            if (isErr) setErrorMessageArray?.([isValueExceededMaxLength(value, maxLength)]);
        } 

        setWarning?.(isErr);
        setIsWarning(isErr);
        required && setSuccess?.(!isErr);
        required && setIsSuccess(!isErr);
        setError?.(false)
        
    };

    // HANDLE
    const handleOnClickWrapperInput = () => {
        inputRef.current?.focus()
    }

    const handleOnChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = e.target.value
        setLocalValue(value);
        setInputValueLength?.(value.length)
        setValue?.(value)
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
                            width={beforeProps && beforeProps.width ? beforeProps.width : ButtonImageSize.DefaultSize}
                            height={beforeProps && beforeProps.height ? beforeProps.height : ButtonImageSize.DefaultSize}
                            isHovered={isHovered} isSuccess={isSuccess} isPressed={isPressed}
                            className={cls(beforeProps?.className, cl.imageInput)} />

                    }
                    <input className={cls(cl.input, classNameInputText)}
                        name={name}
                        ref={inputRef}
                        type={type}
                        value={localValue}
                        maxLength={maxLength}
                        required={required}
                        placeholder={placeholder}
                        autoFocus={autoFocus}
                        // defaultValue={defaultValue}
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
                    value={value}
                    ref={refOutTextArea ?? textAreaRef}
                    defaultValue={defaultValue}
                    required={required}
                    placeholder={placeholder}
                    autoFocus={autoFocus}
                    rows={rows}
                    onChange={handleOnChange}
                    onBlur={(e) => checkValue(e.target.value)}
                    onKeyDown={onKeyDown}
                    {...rest}
                />
            )}
        </WrapperTitleInput>
    );
}
