import { FC, ReactNode } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_WrapperTitleInput.module.scss'

interface WrapperTitleInputProps{
    title?: string
    className?: string,
    children: ReactNode
}

export const WrapperTitleInput:FC<WrapperTitleInputProps> = ({title, className, children}) => {
    if (title === undefined)
        return children
    
    return (
        <div className={cls(cl.wrapper, className)}>
            <h4 className={cl.title}>{title}</h4>
            {children}
        </div>
    )
}
