import { FC, ReactNode } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_Direction.module.scss'
import { ListDirection } from "@/shared/data/list.data";

interface DirectionProps{
    direction?: ListDirection
    children?: ReactNode
    className?: string,
}

export const Direction:FC<DirectionProps> = ({direction=ListDirection.Row, children, className}) => {
    return (
        <div className={cls(cl.list, cl[direction], className)}>
            {children}
        </div>
    )
}
