'use client'

import { cls } from '@/shared/lib/classes.lib';
import cl from './_InputText.module.scss';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { WrapperTitleInput } from '@/shared/ui/Wrapper/Title/Input/WrapperTitleInput';
import { EInputTextVariant } from '../data/text.input.data';
import { IWrapperRectangleInputChildren } from '@/shared/ui/Wrapper/RectangleInput/model/wrapperRectangleInput.model';
import { EInputVariants, IInput } from '../../../model/input.model';
import { EInputTextTypeVariants } from '../../../Text/model/text.input.model';
import { PASSWORD_VALID_RULES, isPasswordValid } from '@/entities/Auth/data/password.data';
import { EMAIL_VALID_RULES, isEmailValid } from '@/entities/Auth/data/email.data';

interface InputTextProps extends IWrapperRectangleInputChildren, IInput {
    title?: string;
    variantInputText?: EInputTextVariant;
    defaultValue?: string;
    type?: string;
    inputTypeVariant?: EInputTextTypeVariants;
    classNameInputText?: string;
    classNameTextArea?: string;
    disabled?: boolean;
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
    onChange = () => {},
    defaultValue = '',
    success,
    setSuccess,
    warning,
    setWarning,
    setInputValueLength,
    size,
    error = false,
    setError,
    disabled,
    setErrorMessageArray,
    ...rest
}: InputTextProps) {
    // Состояния для отображения статусов
    const [isWarning, setIsWarning] = useState<boolean>(warning ?? false);
    const [isSuccess, setIsSuccess] = useState<boolean>(success ?? false);

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

    // Обработчик изменения значения ввода
    const handleOnChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = e.target.value;
        setInputValueLength?.(value.length);
        onChange(value);
    };

    return (
        <WrapperTitleInput title={title}>
            {inputTypeVariant === EInputTextTypeVariants.TEXT ? (
                <input
                    className={cls(
                        cl[variant],
                        variantInputText === EInputTextVariant.W_HOVERED ? cl.wHovered : '',
                        cl.input,
                        isSuccess ? cl.success : '',
                        isWarning ? cl.error : '',
                        disabled ? cl.disabled : '',
                        classNameInputText
                    )}
                    name={name}
                    ref={inputRef}
                    type={type}
                    required={required}
                    placeholder={placeholder}
                    defaultValue={defaultValue}
                    onBlur={(e) => checkValue(e.target.value)}
                    onChange={handleOnChange}
                    disabled={disabled}
                    {...rest}
                />
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
