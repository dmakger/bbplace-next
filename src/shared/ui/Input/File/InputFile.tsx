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
    const buttonRef = useRef<HTMLButtonElement>(null)

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
        // inputRef.current?.onmouseenter
    }

    // const handleOnMouseEnter = () => {
    //     buttonRef.current?.dispatchEvent(new Event('mouseenter'))
    // }

    // const handleOnMouseLeave = () => {
    //     buttonRef.current?.dispatchEvent(new Event('mouseleave'))
    // }

    return (
        <label className={cls(cl.block, cl[variant])}>
            <input type="file" 
                    ref={inputRef}
                    onChange={e => handleOnChange(e)}
                    // onMouseEnter={() => buttonRef.current?.onmouseenter?.()}
                    // onMouseEnter={handleOnMouseEnter}
                    // onMouseLeave={handleOnMouseLeave}
                    className={cl.input} {...rest}/>
            <Button ref={buttonRef} beforeImage={FILE_ADD_ICON}
                    title={locTitle} 
                    variant={ButtonVariant.DEFAULT}
                    onClick={handleOnClickButton}
                    // onMouseEnter={}
                    className={cl.button} />
        </label>
    )
}
