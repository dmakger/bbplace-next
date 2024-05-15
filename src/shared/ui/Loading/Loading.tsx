import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_Loading.module.scss'

interface LoadingProps{
    className?: string,
}

export const Loading:FC<LoadingProps> = ({className}) => {
    return (
        <div className={cls(className)}>
            Loading...
        </div>
    )
}
