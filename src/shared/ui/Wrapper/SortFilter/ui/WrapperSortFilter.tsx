import { FC, ReactNode } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_WrapperSortFilter.module.scss'
import { ECatalogVariants, SortFilterSidebar } from "@/widgets/SortFilterSidebar";
import { SuspenseL } from "../../SuspenseL/SuspenseL";

interface WrapperSortFilterProps{
    variant?: ECatalogVariants
    pageNumberKey?: string
    children: ReactNode
    className?: string,
}

export const WrapperSortFilter:FC<WrapperSortFilterProps> = ({variant=ECatalogVariants.NONE, pageNumberKey, children, className}) => {
    return (
        <div className={cls(cl.wrapper, className)}>
            <SuspenseL>
                {children}
                <SortFilterSidebar variant={variant} pageNumberKey={pageNumberKey} className={cl.sidebar}/>
            </SuspenseL>
        </div>
    )
}
