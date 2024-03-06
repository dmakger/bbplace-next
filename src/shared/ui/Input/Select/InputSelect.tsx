'use client'

import { IOption } from '@/shared/model/option.model'
import cl from './_InputSelect.module.scss'
import { useEffect, useState } from 'react'
import Input from '../Input'

interface InputSelectProps {
    options: IOption[]
    defaultOption?: IOption
    name?: string
    onClickOption?: Function
    className?: string
}

export default function InputSelect({defaultOption, options, name, onClickOption, className}: InputSelectProps) {
    const [showOptions, setShowOptions] = useState(true)
    const [activeOption, setActiveOption] = useState<IOption | undefined>()

    useEffect(() => {
        setActiveOption(defaultOption)
    }, [defaultOption])


    const handleOnItem = (it: IOption) => {
        setActiveOption(it)
        if (onClickOption) onClickOption(it)
    }

    
    return (
        <div>
            <div>{activeOption?.name}</div>
            {showOptions && 
                <div className={cl.options}>
                    {options.map(it => (
                        <Input.Radio option={it} 
                                     name={name} 
                                     isActive={activeOption ? activeOption.id === it.id : false}
                                     onClick={() => handleOnItem(it)}
                                     key={it.id} />
                    ))}
                </div>
            }
        </div>
    )
}
