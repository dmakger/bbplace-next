import { FC, ReactNode } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_WrapperGap.module.scss'

interface WrapperGapProps{
    className?: string,
    children: ReactNode
}

export const WrapperGap:FC<WrapperGapProps> = ({className, children}) => {
    return (
        <div className={cls(cl.layout, className)}>
            {children}
        </div>
    )
}
