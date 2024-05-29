'use client'
import React, {ReactNode, useState} from 'react'
import cl from './_Button.module.scss'
import { ButtonVariant } from '..'
import Link from 'next/link'
import { IIcon } from '../../Icon/model/model'
import { IIconProps } from '@/shared/model/button.model'
import { ButtonColor, ButtonSize, ButtonType } from '../model/model'
import { ImageSmart } from '../../Image/Smart/ImageSmart'
import { cls } from '@/shared/lib/classes.lib'

export interface IButton {
    variant?: ButtonVariant
    color?: ButtonColor
    type?: ButtonType
    size?: ButtonSize

    title?: string,
    href?: string

    beforeImage?: IIcon
    beforeProps?: IIconProps
    afterImage?: IIcon
    afterProps?: IIconProps
    
    active?: boolean
    loading?: boolean
    disabled?: boolean
    noTranslation?: boolean

    onClick?: Function
    onMouseEnter?: Function
    onMouseLeave?: Function

    children?: ReactNode
    className?: string
    classNameText?: string
}

export const Button = ({
    variant = ButtonVariant.BORDERED_RED_WIDE, color=ButtonColor.Primary, type = ButtonType.Button, size=ButtonSize.DefaultSize,
    title, href,
    beforeImage, beforeProps, afterImage, afterProps, 
    active=false, disabled=false, loading=false, noTranslation=false,
    onClick=()=>{}, onMouseEnter=()=>{}, onMouseLeave=()=>{},
    children, className, classNameText,
}: IButton) => {
    // STATE
    const [isHovered, setIsHovered] = useState(false)

    // HANDLE
    const handleOnMouseEnter = () => {
        setIsHovered(true)
        onMouseEnter()
    }
    const handleOnMouseLeave = () => {
        setIsHovered(false)
        onMouseLeave()
    }

    const html =  (
        <button type={type} disabled={disabled}
                onClick={e => onClick(e)} onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave} 
                className={cls(cl.button, cl[variant], cl[color], cl[size], active ? cl.active : '', className)}>
            {beforeImage &&
                <ImageSmart {...beforeProps} icon={beforeImage} 
                            width={beforeProps && beforeProps.width ? beforeProps.width: 20} 
                            height={beforeProps && beforeProps.height ? beforeProps.height: 20} 
                            isActive={active} isHovered={isHovered} />
            }
            {title && 
                <span className={cls(cl.title, classNameText)}>{title}</span>
            }
            {afterImage &&
                <ImageSmart {...afterProps} icon={afterImage} 
                            width={afterProps && afterProps.width ? afterProps.width: 20} 
                            height={afterProps && afterProps.height ? afterProps.height: 20} 
                            isActive={active} isHovered={isHovered} />
            }
            {children}
        </button>
    )

    
    if (!href)
        return html
    return (
        <Link href={href}>{html}</Link>
    )
}

Button.Variant = ButtonVariant;
Button.Type = ButtonType;
Button.Color = ButtonColor;
Button.Size = ButtonSize;

