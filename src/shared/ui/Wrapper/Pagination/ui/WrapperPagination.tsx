"use client"

import { FC, ReactNode, useEffect, useState } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_WrapperPagination.module.scss'
import { Pagination } from "@/widgets/Pagination/ui/Pagination";
import { useSearchParams } from "next/navigation";
import { PRODUCT_PARAMS } from "@/config/params/product.params.config";

interface WrapperPaginationProps{
    amount: number
    keyParam?: string
    children: ReactNode
    className?: string,
}

export const WrapperPagination:FC<WrapperPaginationProps> = ({amount, keyParam=PRODUCT_PARAMS.VIEW__KEY, children, className}) => {
    // ROUTER
    const searchParams = useSearchParams() 

    // STATE
    const [amountCore, setAmountCore] = useState(1)
    const [numberPage, setNumberPage] = useState(1)
    
    // EFFECT
    useEffect(() => {
        if (amountCore === amount)
            return
        setAmountCore(amount)
    }, [amount])

    useEffect(() => {
        setNumberPage(() => {
            const np = searchParams.get(keyParam)
            if (np !== null) {
                const inp = parseInt(np)
                if (inp > 0) return inp
            }
            return 1
        })

    }, [])

    return (
        <div className={cls(cl.block, className)}>
            {children}
            {amountCore !== 1 &&
                <Pagination amount={amountCore} active={numberPage} className={cl.pagination} />
            }
        </div>
    )
}
