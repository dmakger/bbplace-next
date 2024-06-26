"use client"

import { FC, useEffect, useState } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_ListViewButton.module.scss'
import { ListViewIcon } from "../../../Icon/ui/ListView/ListViewIcon";
import { IButtonIconProps } from "@/shared/model/button.model";
import Link from "next/link";

interface ListViewButtonProps extends IButtonIconProps {
    href: string
}


export const ListViewButton:FC<ListViewButtonProps> = ({href, isActive, isHovered, onClick, className, classNameIcon}) => {
    // STATE
    const [isActiveO, setIsActiveO] = useState(isActive)
    const [isHoveredO, setIsHoveredO] = useState(isHovered)

    useEffect(() => {
        if (isActive !== isActiveO)
            setIsActiveO(isActive)
    }, [isActive])

    // HANDLE
    const handleOnClick = () => {
        if (onClick) onClick()
            setIsActiveO(prevState => !prevState)
    }

    const handleOnMouseEnter = () => {
        setIsHoveredO(true)
    }
    const handleOnMouseLeave = () => {
        setIsHoveredO(false)
    }
    
    return (
        <Link href={href}>
            <button onClick={handleOnClick} 
                    onMouseEnter={handleOnMouseEnter}
                    onMouseLeave={handleOnMouseLeave} 
                    className={cls(cl.button, className)}>
                <ListViewIcon isActive={isActiveO} isHovered={isHoveredO} className={classNameIcon} />
            </button>
        </Link>
    )
}