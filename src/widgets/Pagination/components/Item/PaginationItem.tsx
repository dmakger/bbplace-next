import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_PaginationItem.module.scss'

interface PaginationItemProps{
    text: string | number
    href?: string
    isActive?: boolean
    disabled?: boolean
    onClick?: Function
    className?: string,
    classNameContent?: string,
}

export const PaginationItem:FC<PaginationItemProps> = ({text, isActive, disabled=false, onClick, className, classNameContent}) => {
    const handleOnClick = () => {
        if (onClick && !disabled)
            onClick()
    } 
    
    return (
        <button onClick={handleOnClick} 
                className={cls(cl.block, isActive ? cl.active : '', disabled ? cl.disabled : '', className)}>
            <span className={cls(cl.text, classNameContent)}>{text}</span>
        </button>
    )
}
