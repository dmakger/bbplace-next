'use client'

import Image from 'next/image'

import { IOption } from '@/shared/model/option.model'
import cl from './_InputSelect.module.scss'
import { useEffect, useRef, useState } from 'react'
import Input from '../Input'
import { cls } from '@/shared/lib/classes.data'
import WrapperClickOutside from '../../Wrapper/ClickOutside/WrapperClickOutside'

interface InputSelectProps {
    options: IOption[]
    defaultOption?: IOption
    name?: string
    onClickOption?: Function
    className?: string
    classNameTitle?: string
    classNameOptions?: string
}

export default function InputSelect({defaultOption, options, name, onClickOption, className, classNameTitle, classNameOptions}: InputSelectProps) {
    // STATE
    const [showOptions, setShowOptions] = useState(false)
    const [activeOption, setActiveOption] = useState<IOption | undefined>()

    // REF
    const inputSelectRef = useRef<HTMLDivElement>(null);

    // EFFECT
    useEffect(() => {
        setActiveOption(defaultOption)
    }, [defaultOption])


    // ==={ CLICK }===
    const toggleShowOptions = () => {
        setShowOptions(!showOptions)
    }

    const handleOnTitle = () => {
        setShowOptions(prevState => !prevState)
    }

    const handleOnItem = (it: IOption) => {
        setActiveOption(it)
        if (onClickOption) onClickOption(it)
        setShowOptions(false)
    }    
    
    return (
        <WrapperClickOutside _ref={inputSelectRef} isShow={showOptions} handle={toggleShowOptions} className={cls(cl.block, showOptions ? cl.show : '', className)}>
            <button type={'button'} onClick={handleOnTitle} className={cls(cl.button, classNameTitle)}>
                <span className={cl.title}>{activeOption?.name}</span>
                <Image src={'arrow.svg'} alt={'arrow'} width={10} height={10} />
            </button>
            <Input.List.Radio options={options} 
                                defaultOption={activeOption} 
                                name={name} 
                                onClickOption={handleOnItem} 
                                className={cls(cl.options, classNameOptions)} />
        </WrapperClickOutside>
    )
}
