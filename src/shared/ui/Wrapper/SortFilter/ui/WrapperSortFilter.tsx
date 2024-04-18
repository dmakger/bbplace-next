import { FC, ReactNode } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_WrapperSortFilter.module.scss'
import { ECatalogVariants, SortFilterSidebar } from "@/widgets/SortFilterSidebar";

interface WrapperSortFilterProps{
    variant?: ECatalogVariants
    children: ReactNode
    className?: string,
}

export const WrapperSortFilter:FC<WrapperSortFilterProps> = ({variant=ECatalogVariants.NONE, children, className}) => {
    return (
        <div className={cls(cl.wrapper, className)}>
            {children}
            <SortFilterSidebar variant={variant} className={cl.sidebar}/>
        </div>
    )
}
