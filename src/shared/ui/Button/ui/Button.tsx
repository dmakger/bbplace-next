'use client'
import React, {ReactNode, RefObject, useEffect, useState} from 'react'
import cl from './_Button.module.scss'
import { ButtonVariant } from '..'
import Link from 'next/link'
import { IIcon } from '../../Icon/model/icon.model'
import { IIconProps } from '@/shared/model/button.model'
import { ImageSmart } from '../../Image/Smart/ImageSmart'
import { cls } from '@/shared/lib/classes.lib'
import { ButtonColor, ButtonSize, ButtonType } from '../model/button.model'
import { ButtonImageSize } from '../data/button.data'
import { getImageSizeBySize } from '../lib/button.lib'

export interface IButton {
    variant?: ButtonVariant
    color?: ButtonColor
    type?: ButtonType
    size?: ButtonSize

    ref?: RefObject<HTMLButtonElement>

    title?: string,
    href?: string,
    linkTarget?: string,

    beforeImage?: IIcon
    beforeProps?: IIconProps
    afterImage?: IIcon
    afterProps?: IIconProps
    
    active?: boolean
    success?: boolean,
    disabled?: boolean
    hovered?: boolean
    pressed?: boolean,
    loading?: boolean
    noTranslation?: boolean

    onClick?: Function
    onMouseEnter?: Function
    onMouseLeave?: Function

    children?: ReactNode
    className?: string
    classNameLink?: string
    classNameText?: string
    classNameTextHovered?: string
    classNameTextPressed?: string
    classNameTextDisabled?: string
}

export const Button = ({
    variant = ButtonVariant.BORDERED_RED_WIDE, color=ButtonColor.Primary, type = ButtonType.Button, size=ButtonSize.DefaultSize,
    ref,
    title, href, linkTarget,
    beforeImage, beforeProps, afterImage, afterProps, 
    active=false, success=false, disabled=false, hovered, pressed, loading=false, noTranslation=false,
    onClick=()=>{}, onMouseEnter=()=>{}, onMouseLeave=()=>{},
    children, className, classNameLink, 
    classNameText, classNameTextHovered, classNameTextPressed, classNameTextDisabled,
}: IButton) => {

    // STYLES
    const classes = variant.split(' ')    

    // STATE
    const [isHovered, setIsHovered] = useState<boolean>(false)
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
        setIsHovered(true)
    }
    const handleOnMouseUp = () => {
        setIsPressed(false)
        setIsHovered(true)
    }
    
    // EFFECT
    useEffect(() => {
        setSizeImage(getImageSizeBySize(size))
    }, [size])

    useEffect(() => {
        if (hovered !== undefined)
            setIsHovered(hovered)
    }, [hovered])

    useEffect(() => {
        if (pressed !== undefined)
            setIsPressed(pressed)
    }, [pressed])

    const html =  (
        <button type={type} ref={ref} disabled={disabled || loading} 
                onClick={e => onClick(e)} onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave} 
                onMouseDown={handleOnMouseDown} onMouseUp={handleOnMouseUp}
                className={cls(cl.button, cl[classes[0]], cl[color], cl[size], active ? cl.active : '', classes.length > 0 && classes[1] === 'new' ? cl.new : cl.old, className)}>
            {beforeImage &&
                <ImageSmart {...beforeProps} icon={beforeImage} 
                            width={beforeProps && beforeProps.width ? beforeProps.width: sizeImage} 
                            height={beforeProps && beforeProps.height ? beforeProps.height: sizeImage} 
                            isActive={active} isHovered={isHovered} isSuccess={success} isPressed={isPressed} isDisabled={disabled}
                            className={cls(cl.image, afterProps?.className)} />

            }
            {title && 
                <span className={cls(
                    cl.title, classNameText,
                    isHovered ? classNameTextHovered : '',
                    isPressed ? classNameTextPressed : '',
                    disabled ? classNameTextDisabled : '',
                )}>{title}</span>
            }
            {afterImage &&
                <ImageSmart {...afterProps} icon={afterImage}
                            width={afterProps && afterProps.width ? afterProps.width: sizeImage} 
                            height={afterProps && afterProps.height ? afterProps.height: sizeImage} 
                            isActive={active && !success} isHovered={isHovered} isSuccess={success} isPressed={isPressed} isDisabled={disabled}
                            className={cls(cl.image, afterProps?.className)} />
            }
            {children}
        </button>
    )

    
    if (!href)
        return html
    return (
        <Link href={href} className={classNameLink} target={linkTarget}>{html}</Link>
    )
}

Button.Variant = ButtonVariant;
Button.Type = ButtonType;
Button.Color = ButtonColor;
Button.Size = ButtonSize;