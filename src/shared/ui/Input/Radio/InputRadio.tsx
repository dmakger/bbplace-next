'use client'

import { cls } from "@/shared/lib/classes.data"
import cl from './_InputRadio.module.scss'
import { IOption } from "@/shared/model/option.model"
import { useEffect, useState } from "react"

interface InputRadioProps {
    option: IOption
    isActive?: boolean
    name?: string
    required?: boolean
    className?: string
}

export default async function InputRadio({option, isActive=false, name, required=false, className}: InputRadioProps) {
    const [value, setValue] = useState<IOption['value']>()

    useEffect(() => {
        setValue(option.value ? option.value : option.id)
    }, [option])
    
    return (
        <label className={cls(cl.block, isActive ? cl.active : '', className)}>
            <input type="radio" name={name} value={value} defaultChecked={isActive} required={required}>InputRadio</input>
            <span className={cl.circle}>
                 <span className={cl.fillCircle} />
             </span>
             <span className={cl.text}>{option.name}</span>
        </label>
    )
}
