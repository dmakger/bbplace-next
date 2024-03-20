"use client"

import { IOption } from '@/shared/model/option.model'
import cl from './_InputListRadio.module.scss'
import Input from '../../Input'
import { useEffect, useState } from 'react'
import { cls } from '@/shared/lib/classes.lib'

interface InputListRadioProps {
    options: IOption[]
    defaultOption?: IOption
    name?: string
    onClickOption?: Function
    className?: string
}

export default function InputListRadio({options, defaultOption, name, onClickOption, className}: InputListRadioProps) {
    const [activeOption, setActiveOption] = useState<IOption | undefined>()

    useEffect(() => {
        setActiveOption(defaultOption)
    }, [defaultOption])


    const handleOnItem = (it: IOption) => {
        setActiveOption(it)
        if (onClickOption) onClickOption(it)
    }

    return (
        <div className={cls(cl.options, className)}>
            {options.map(it => (
                <Input.Radio option={it} 
                                name={name} 
                                isActive={activeOption ? activeOption.id === it.id : false}
                                onClick={() => handleOnItem(it)}
                                key={it.id} />
            ))}
        </div>
    )
}
