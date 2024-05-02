"use client"

import { FC, useState } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_ButtonArrow.module.scss'
import { ArrowIcon } from "../../Icon/ui/Arrow/ArrowIcon";
import { IIcon } from "../../Icon/model/model";
import { Axis } from "@/shared/model/button.model";

interface ButtonArrowProps{
    icon?: IIcon
    axis?: Axis
    onClick?: Function
    className?: string,
    classNameIcon?: string,
}

export const ButtonArrow:FC<ButtonArrowProps> = ({icon, axis, onClick, className, classNameIcon}) => {
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
            <ArrowIcon icon={icon} axis={axis} isHovered={isHovered} className={classNameIcon} classNameImage={cl.image}/>
        </button>
    )
}
