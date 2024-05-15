import { FC, ReactNode } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_WrapperBlock.module.scss'

interface WrapperBlockProps{
    className?: string,
    children: ReactNode
}

export const WrapperBlock:FC<WrapperBlockProps> = ({className, children}) => {
    return (
        <div className={cls(cl.layout, className)}>
            {children}
        </div>
    )
}
