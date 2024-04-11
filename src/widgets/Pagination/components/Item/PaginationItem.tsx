import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_PaginationItem.module.scss'

interface PaginationItemProps{
    text: string | number
    href?: string
    isActive?: boolean
    disabled?: boolean
    className?: string,
}

export const PaginationItem:FC<PaginationItemProps> = ({text, isActive, disabled=false, className}) => {
    return (
        <button className={cls(cl.block, isActive ? cl.active : '', disabled ? cl.disabled : '', className)}>
            <span className={cl.text}>{text}</span>
        </button>
    )
}
