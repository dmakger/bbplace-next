import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_WrapperSidebar.module.scss'

interface WrapperSidebarProps{
    className?: string,
}

export const WrapperSidebar:FC<WrapperSidebarProps> = ({className}) => {
    return (
        <div className={cls(className)}>

        </div>
    )
}
