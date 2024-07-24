'use client'

import { ISuspenseLItem } from "@/shared/model/suspenseL.model"
import { useSearchParams } from "next/navigation"
import { Dispatch, FC, ReactNode, SetStateAction, useEffect } from "react"

interface SuspenseLAnyProps{
    data: ISuspenseLItem[]
    children: ReactNode
}

export const SuspenseLAny:FC<SuspenseLAnyProps> = ({data, children}) => {
    const searchParams = useSearchParams();

    useEffect(() => {
        data.forEach(({searchKey, set, defaultValue}) => {
            const value = searchParams.get(searchKey) ?? defaultValue ?? null
            set(value)
        })
    }, [data])

    
    return children
}
