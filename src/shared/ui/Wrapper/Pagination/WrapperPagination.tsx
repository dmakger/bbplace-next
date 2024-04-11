"use client"

import { FC, ReactNode } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_WrapperPagination.module.scss'
import { Pagination } from "@/widgets/Pagination/ui/Pagination";

interface WrapperPaginationProps{
    children: ReactNode
    className?: string,
}

export const WrapperPagination:FC<WrapperPaginationProps> = ({children, className}) => {
    return (
        <div className={cls(cl.block, className)}>
            {children}
            <Pagination amount={60} active={60} className={cl.pagination} />
        </div>
    )
}
