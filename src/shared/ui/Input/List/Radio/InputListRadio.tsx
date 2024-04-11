"use client"

import { IOption } from '@/shared/model/option.model'
import cl from './_InputListRadio.module.scss'
import Input from '../../Input'
import { useEffect, useState } from 'react'
import { cls } from '@/shared/lib/classes.lib'
import { useAppSelector } from '@/storage/hooks'
import { translateOptions } from '@/shared/lib/options.lib'
import { LANG_LIST_DATA } from '@/shared/data/menu/lang.menu.data'
import { ITranslate } from '@/shared/model/translate.model'

interface InputListRadioProps {
    options: IOption[]
    defaultOption?: IOption
    name?: string
    onClickOption?: Function
    className?: string,
    translatedArray?: ITranslate[]
}

export default function InputListRadio({
    options,
    defaultOption,
    name,
    onClickOption,
    className,
    translatedArray
}: InputListRadioProps) {
    const [activeOption, setActiveOption] = useState<IOption | undefined>()
    const [translatedOptions, setTranslatedOptions] = useState<string[]>([])


    useEffect(() => {
        setActiveOption(defaultOption)
    }, [defaultOption])


    const handleOnItem = (it: IOption) => {
        setActiveOption(it)
        if (onClickOption) onClickOption(it)
    }

    const language = useAppSelector(state => state.translate.language)

    useEffect(() => {
        options.map(option => LANG_LIST_DATA.some(it => it.name === option.name) ?
            translatedOptions.push(option.name) : setTranslatedOptions(translateOptions(translatedArray ? translatedArray : [], options, language)))
    }, [options, language])


    return (
        <div className={cls(cl.options, className)}>
            {options.map((it, index) => (
                <Input.Radio option={it}
                    translatedOption={translatedOptions[index]}
                    name={name}
                    isActive={activeOption ? activeOption.id === it.id : false}
                    onClick={() => handleOnItem(it)}
                    key={it.id} />
            ))}
        </div>
    )
}
