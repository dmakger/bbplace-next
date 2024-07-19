'use client'

import { ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useRef, useState } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_InputFile.module.scss'
import { IWrapperRectangleInputChildren } from "../../../../Wrapper/RectangleInput/model/wrapperRectangleInput.model";
import { EInputVariants, IInput } from "../../../model/input.model";
import { Button, ButtonVariant } from "../../../../Button";
import { FILE_ADD_ICON, FILE_ADD_ICON_DISABLED } from "../../../../Icon/data/file.data.icon";
import { getInputFilePrompt } from "../lib/file.input.lib";
import { IFile } from "@/entities/File/model/file.model";
import { fileListToIFileList } from "@/entities/File/lib/to.file.lib";

interface InputFileProps extends IWrapperRectangleInputChildren, IInput {
    classNameField?: string,
    title?: string
    multiple?: boolean
    setFiles?: Dispatch<SetStateAction<IFile[]>>,
    disabled?: boolean,
}

/**
 * 
 * @param multiple - изначально true. Если {true}, то принимает 1 и более файлов, если {false}, то принимает строго 1 файл 
 * @returns 
 */
export const InputFile:FC<InputFileProps> = ({
    classNameField,
    title,
    multiple=true,
    setFiles,
    
    variant=EInputVariants.ROUNDED,
    onChange, 

    success,
    setSuccess,
    warning,
    setWarning,
    setInputValueLength,
    size,
    disabled,
    ...rest
}) => {
    // REF
    const inputRef = useRef<HTMLInputElement>(null)

    // STATE
    const [locTitle, setLocTitle] = useState<string>(getInputFilePrompt(multiple))

    // EFFECT
    useEffect(() => {
        if (title) {
            setLocTitle(title)
        } else {
            setLocTitle(getInputFilePrompt(multiple))
        }
    }, [title, multiple])

    // HANDLE
    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (onChange) onChange(e)
        
        if (setFiles && e.target.files && e.target.files.length > 0) {
            const fileArray = fileListToIFileList(Array.from(e.target.files))
            console.log(fileArray[0])
            if (!multiple)
                setFiles([fileArray[0]])
            else
                setFiles(prevFiles => [...prevFiles, ...fileArray])
        }
    }

    const handleOnClickButton = () => {
        inputRef.current?.click()
    }

    return (
        <Button variant={ButtonVariant.DEFAULT}
                beforeImage={!disabled ? FILE_ADD_ICON : FILE_ADD_ICON_DISABLED}
                title={locTitle} 
                onClick={handleOnClickButton}
                className={cls(cl.block, cl[variant], disabled ? cl.disabled : '', classNameField)}
                classNameText={cl.text}
                classNameTextHovered={cl.textHovered}
                classNameTextDisabled={cl.textDisabled}
                >
            <input type="file" 
                    multiple={multiple}
                    ref={inputRef}
                    onChange={e => handleOnChange(e)}
                    className={cl.input}
                    disabled={disabled} {...rest}/>
        </Button>
    )
}
