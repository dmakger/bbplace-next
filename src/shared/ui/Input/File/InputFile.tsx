'use client'

import { ChangeEvent, FC, useEffect, useRef, useState } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_InputFile.module.scss'
import { IWrapperRectangleInputChildren } from "../../Wrapper/RectangleInput/model/wrapperRectangleInput.model";
import { EInputVariants, IInput } from "../model/input.model";
import { Button, ButtonVariant } from "../../Button";
import { FILE_ADD_ICON } from "../../Icon/data/file.data.icon";

interface InputFileProps extends IWrapperRectangleInputChildren, IInput {
    title?: string
}

export const InputFile:FC<InputFileProps> = ({
    title, 
    variant=EInputVariants.ROUNDED,
    onChange, 

    success,
    setSuccess,
    warning,
    setWarning,
    setInputValueLength,
    size,
    ...rest
}) => {
    // REF
    const inputRef = useRef<HTMLInputElement>(null)

    // STATE
    const [locTitle, setLocTitle] = useState('Нажмите или перенесите файлы в эту область')

    // EFFECT
    useEffect(() => {
        if (title)
            setLocTitle(title)
    }, [title])

    // HANDLE
    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (onChange) onChange(e)
    }

    const handleOnClickButton = () => {
        inputRef.current?.click()
    }

    return (
        <Button variant={ButtonVariant.DEFAULT}
                beforeImage={FILE_ADD_ICON}
                title={locTitle} 
                onClick={handleOnClickButton}
                className={cls(cl.block, cl[variant])}
                classNameText={cl.text}
                classNameTextHovered={cl.textHovered}
                classNameTextDisabled={cl.textDisabled}>
            <input type="file" 
                    ref={inputRef}
                    onChange={e => handleOnChange(e)}
                    className={cl.input} {...rest}/>
        </Button>
    )
}
