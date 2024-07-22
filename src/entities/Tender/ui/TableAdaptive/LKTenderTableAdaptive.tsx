import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_LKTenderTableAdaptive.module.scss'

interface LKTenderTableAdaptiveProps{
    className?: string,
}

export const LKTenderTableAdaptive:FC<LKTenderTableAdaptiveProps> = ({className}) => {
    return (
        <div className={cls(className)}>

        </div>
    )
}
