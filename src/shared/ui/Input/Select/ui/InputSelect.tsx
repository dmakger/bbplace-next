'use client'

import Image from 'next/image'

import { IOption } from '@/shared/model/option.model'
import cl from './_InputSelect.module.scss'
import { useEffect, useRef, useState } from 'react'
import Input from '../../Input'
import { cls } from '@/shared/lib/classes.lib'
import WrapperClickOutside from '../../../Wrapper/ClickOutside/WrapperClickOutside'
import { WrapperTitleInput } from '@/shared/ui/Wrapper/Title/Input/WrapperTitleInput'
import { EInputSizes, EInputVariants } from '../../model/input.model'

interface InputSelectProps {
    variant?: EInputVariants,
    size?: EInputSizes,
    options: IOption[]
    defaultOption?: IOption
    name?: string
    onClickOption?: Function,
    width?:number,
    height?:number,
    title?: string
    className?: string
    classNameTitle?: string
    classNameOptions?: string,
    classNameButton?: string
}

export function InputSelect({ 
    variant = EInputVariants.ROUNDED,
    size = EInputSizes.NONE,
    defaultOption,
    options,
    name,
    onClickOption,
    width = 10,
    height = 10,
    title,
    className,
    classNameTitle,
    classNameOptions,
    classNameButton
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
            <WrapperTitleInput title={title}>
                <button type={'button'} onClick={handleOnTitle} className={cls(cl.button, cl[variant], cl[size], variant === EInputVariants.RECTANGULAR && showOptions ? cl.activeButton : '', classNameButton)}>
                    <span className={cls(cl.title, classNameTitle)}>{activeOption?.name}</span>
                    <div className={cls(cl.arrowContainer, showOptions ? cl.activeArrow : '')}>
                        <Image className={showOptions ? cl.arrowOpen : cl.arrow} src={'arrow.svg'} alt={'arrow'} width={width} height={height} />
                    </div>
                    
                </button>
            </WrapperTitleInput>
            <Input.List.Radio
                size={size}
                variant={variant}
                options={options}
                defaultOption={activeOption}
                name={name}
                onClickOption={handleOnItem}
                className={cls(cl.options, classNameOptions)} />
        </WrapperClickOutside>
    )
}