import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_ButtonSort.module.scss'
import { SortIcon } from "@/shared/ui/Icon/ui/Sort/SortIcon";

interface ButtonSortProps{
    hasOutline?: boolean
    onClick?: Function
    className?: string,
}

export const ButtonSort:FC<ButtonSortProps> = ({hasOutline=false, onClick=()=>{}, className}) => {
    return (
        <button onClick={() => onClick()} className={cls(hasOutline ? cl.outline : '', className)}>
            <SortIcon width={hasOutline ? 18 : 27} height={hasOutline ? 18 : 27} />
        </button>
    )
}
