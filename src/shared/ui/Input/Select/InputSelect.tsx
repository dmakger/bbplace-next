'use client'

import { IOption } from '@/shared/model/option.model'
import cl from './_InputSelect.module.scss'
import { useState } from 'react'
import Input from '../Input'

interface InputSelectProps {
    options: IOption[]
    defaultOption?: IOption
    name?: string
    className?: string
}

export default async function InputSelect({defaultOption, options, name, className}: InputSelectProps) {
    const [showOptions, setShowOptions] = useState(true)
    const [activeOption, setActiveIndexOption] = useState(defaultOption)
    
    return (
        <div>
            <div>{activeOption?.name}</div>
            {showOptions && 
                <div className={cl.options}>
                    {/* {options.map(it => (
                        <Input.Radio option={it} name={name} key={it.id} />
                    ))} */}
                </div>
            }
        </div>
    )
}
