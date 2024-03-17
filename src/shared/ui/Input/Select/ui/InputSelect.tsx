'use client'

import Image from 'next/image'

import { IOption } from '@/shared/model/option.model'
import cl from './_InputSelect.module.scss'
import { useEffect, useRef, useState } from 'react'
import Input from '../../Input'
import { cls } from '@/shared/lib/classes.lib'
import WrapperClickOutside from '../../../Wrapper/ClickOutside/WrapperClickOutside'

interface InputSelectProps {
    options: IOption[]
    defaultOption?: IOption
    name?: string
    onClickOption?: Function,
    width?:number,
    height?:number,
    className?: string
    classNameTitle?: string
    classNameOptions?: string,
}

export function InputSelect({ 
    defaultOption,
    options,
    name,
    onClickOption,
    width = 10,
    height = 10,
    className,
    classNameTitle,
    classNameOptions
}: InputSelectProps) {
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
                <Image className={showOptions ? cl.arrowOpen : cl.arrow} src={'arrow.svg'} alt={'arrow'} width={width} height={height} />
            </button>
            <Input.List.Radio options={options} 
                                defaultOption={activeOption} 
                                name={name} 
                                onClickOption={handleOnItem} 
                                className={cls(cl.options, classNameOptions)} />
        </WrapperClickOutside>
    )
}
