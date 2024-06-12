import Image from 'next/image'

import { cls } from "@/shared/lib/classes.lib"
import cl from './_InputRadio.module.scss'
import { IOption } from "@/shared/model/option.model"
import { EInputSizes, EInputVariants } from '../../model/input.model'

interface InputRadioProps {
    variant?: EInputVariants,
    size?: EInputSizes,
    option: IOption
    isActive?: boolean
    name?: string
    required?: boolean
    onClick?: Function
    className?: string
}

export function InputRadio({variant = EInputVariants.ROUNDED, size = EInputSizes.NONE, option, isActive=false, name, required=false, onClick, className}: InputRadioProps) {
    const handleOnClick = () => {
        if (onClick) onClick()
    }
    
    return (
        <label onClick={handleOnClick} className={cls(cl.block, cl[variant], cl[size], isActive ? cl.active : '', className)}>
            <input type="radio" name={name} value={option.value ? option.value : option.id} defaultChecked={isActive} required={required} className={cl.radio} />
            <span className={cl.text}>{option.name}</span>
            {variant === EInputVariants.ROUNDED && <Image src={'check-mark.svg'} alt={'check'} width={8} height={8} className={cl.image} />}
        </label>
    )
}
