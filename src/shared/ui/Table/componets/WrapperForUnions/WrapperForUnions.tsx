import { FC, ReactNode } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_WrapperForUnions.module.scss'

interface WrapperForUnionsProps{
    className?: string,
    children?: ReactNode,
}

export const WrapperForUnions:FC<WrapperForUnionsProps> = ({className, children}) => {
    return (
        <div className={cls(cl.wrapper, className)}>
            {children}
        </div>
    )
}
