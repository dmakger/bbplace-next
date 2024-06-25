"use client"

import { IOption } from '@/shared/model/option.model'
import cl from './_InputListRadio.module.scss'
import Input from '../../Input'
import { useEffect, useState } from 'react'
import { cls } from '@/shared/lib/classes.lib'
import { EInputSizes, EInputVariants } from '../../model/input.model'

interface InputListRadioProps {
    variant?: EInputVariants,
    size?: EInputSizes,
    options: IOption[]
    defaultOption?: IOption
    name?: string
    onClickOption?: Function
    className?: string
}

export default function InputListRadio({ variant = EInputVariants.ROUNDED, size = EInputSizes.NONE, options, defaultOption, name, onClickOption, className }: InputListRadioProps) {
    const [activeOption, setActiveOption] = useState<IOption | undefined>()

    useEffect(() => {
        setActiveOption(defaultOption)
    }, [defaultOption])


    const handleOnItem = (it: IOption) => {
        setActiveOption(it)
        if (onClickOption) onClickOption(it)
    }

    return (
        <div className={cls(cl[variant], className)}>
            <div className={cls(variant === EInputVariants.RECTANGULAR ? cl.optionsContainer : '')}>
            {options.map((it, index) => (
                
                    <Input.Radio
                        size={size}
                        variant={variant}
                        option={it}
                        name={name}
                        isActive={activeOption ? activeOption.id === it.id : false}
                        onClick={() => handleOnItem(it)}
                        key={it.id}
                        />
            ))}
            </div>
        </div>
    )
}
