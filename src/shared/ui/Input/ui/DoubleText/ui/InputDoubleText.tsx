'use client'

import { cls } from "@/shared/lib/classes.lib"
import cl from './_InputDoubleTextDoubleText.module.scss'
import { InputText } from "../../Text"
import { IDoubleTextInputOption } from "../model/doubleText.model"
import { ChangeEvent, useState } from "react"

interface IDoubleTextProps{
    name?: IDoubleTextInputOption,
    placeholder?: IDoubleTextInputOption
    className?: string,
    classNameInputs?: IDoubleTextInputOption
}

export function InputDoubleText({
    name,
    placeholder,
    className,
    classNameInputs,
}: IDoubleTextProps) {

    const [firstPrice, setFirstPrice] = useState<string>('')
    const [secondPrice, setSecondPrice] = useState<string>('')

    return (
        <div className={cls(cl.InputDoubleText, className)}>
            <InputText
                className={cls(cl.inputsText, classNameInputs && classNameInputs.first)}
                name={name && name.first}
                placeholder={placeholder && placeholder.first}
                onChange={(e:ChangeEvent<HTMLInputElement>) => setFirstPrice(e.target.value)}
            />
            <InputText
                className={cls(cl.inputsText, classNameInputs && classNameInputs.second)}
                name={name && name.second}
                placeholder={placeholder && placeholder.second}
                onChange={(e:ChangeEvent<HTMLInputElement>) => setSecondPrice(e.target.value)}
            />
        </div>
    )
}
