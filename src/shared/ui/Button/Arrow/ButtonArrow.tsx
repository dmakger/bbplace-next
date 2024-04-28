"use client"

import { FC, useState } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_ButtonArrow.module.scss'
import { ArrowIcon } from "../../Icon/ui/Arrow/ArrowIcon";

interface ButtonArrowProps{
    onClick?: Function
    className?: string,
    classNameIcon?: string,
}

export const ButtonArrow:FC<ButtonArrowProps> = ({onClick, className, classNameIcon}) => {
    // STATE
    const [isHovered, setIsHovered] = useState(false)

    // HANDLE
    const handleOnClick = () => {
        if (onClick) onClick()
        // setIsActive(prevState => !prevState)
    }

    const handleOnMouseEnter = () => {
        setIsHovered(true)
    }
    const handleOnMouseLeave = () => {
        setIsHovered(false)
    }

    return (
        <button onClick={handleOnClick} 
                onMouseEnter={handleOnMouseEnter}
                onMouseLeave={handleOnMouseLeave}
                className={cls(cl.button, className)}>
            <ArrowIcon isHovered={isHovered} className={classNameIcon} classNameImage={cl.image}/>
        </button>
    )
}
