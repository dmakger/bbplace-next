'use client'
import React, {ReactNode, useEffect, useState} from 'react'
import cl from './_Button.module.scss'
import { ButtonVariant } from '..'
import Link from 'next/link'
import { IIcon } from '../../Icon/model/model'
import { IIconProps } from '@/shared/model/button.model'
import { ButtonColor, ButtonSize, ButtonType } from '../model/button.model'
import { ImageSmart } from '../../Image/Smart/ImageSmart'
import { cls } from '@/shared/lib/classes.lib'
import { ButtonImageSize } from '../data/button.data'
import { getImageSizeBySize } from '../lib/button.lib'

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
    success?: boolean,
    loading?: boolean
    disabled?: boolean
    noTranslation?: boolean

    onClick?: Function
    onMouseEnter?: Function
    onMouseLeave?: Function

    children?: ReactNode
    className?: string
    classNameLink?: string
    classNameText?: string
}

export const Button = ({
    variant = ButtonVariant.BORDERED_RED_WIDE, color=ButtonColor.Primary, type = ButtonType.Button, size=ButtonSize.DefaultSize,
    title, href,
    beforeImage, beforeProps, afterImage, afterProps, 
    active=false, success=false, disabled=false, loading=false, noTranslation=false,
    onClick=()=>{}, onMouseEnter=()=>{}, onMouseLeave=()=>{},
    children, className, classNameLink, classNameText,
}: IButton) => {

    // STYLES
    const classes = variant.split(' ')    

    // STATE
    const [isHovered, setIsHovered] = useState(false)
    const [isPressed, setIsPressed] = useState<boolean>(false)
    const [sizeImage, setSizeImage] = useState<ButtonImageSize>(ButtonImageSize.DefaultSize)

    // HANDLE
    const handleOnMouseEnter = () => {
        setIsHovered(true)
        onMouseEnter()
    }
    const handleOnMouseLeave = () => {
        setIsHovered(false)
        setIsPressed(false)
        onMouseLeave()
    }
    const handleOnMouseDown = () => {
        setIsPressed(true)
        setIsHovered(false)
    }
    const handleOnMouseUp = () => {
        setIsPressed(false)
        setIsHovered(true)
    }

    // EFFECT
    useEffect(() => {
        setSizeImage(getImageSizeBySize(size))
    }, [size])
    

    const html =  (
        <button type={type} disabled={disabled}
                onClick={e => onClick(e)} 
                onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave} 
                className={cls(cl.button, cl[classes[0]], cl[color], cl[size], 
                                active ? cl.active : '', classes.length > 0 && classes[1] === 'new' ? cl.new : cl.old, 
                                !title ? cl.noTitle : '', className)}>
            {beforeImage &&
                <ImageSmart {...beforeProps} icon={beforeImage} 
                            width={beforeProps && beforeProps.width ? beforeProps.width: sizeImage} 
                            height={beforeProps && beforeProps.height ? beforeProps.height: sizeImage} 
                            // isActive={active} isHovered={isHovered} isPressed={isPressed} />                
                            isActive={active && !success} isHovered={isHovered} isSuccess={success} isPressed={isPressed}/>
            }
            {title && 
                <span className={cls(cl.title, classNameText)}>{title}</span>
            }
            {afterImage &&
                <ImageSmart {...afterProps} icon={afterImage}
                            width={afterProps && afterProps.width ? afterProps.width: sizeImage} 
                            height={afterProps && afterProps.height ? afterProps.height: sizeImage} 
                            isActive={active} isHovered={isHovered} isPressed={isPressed} isSuccess={success}/>
            }
            {children}
        </button>
    )

    
    if (!href)
        return html
    return (
        <Link href={href} className={classNameLink}>{html}</Link>
    )
}

Button.Variant = ButtonVariant;
Button.Type = ButtonType;
Button.Color = ButtonColor;
Button.Size = ButtonSize;

