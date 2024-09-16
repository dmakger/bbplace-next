'use client'

import { Dispatch, FC, ReactNode, SetStateAction } from "react"

import { useSearchParams } from "next/navigation";
import { toTenderType } from "@/entities/Tender/lib/tender.lib";

interface SuspenseLTenderProps{
    searchKey?: string
    set: Dispatch<SetStateAction<any>>
    children: ReactNode
}

export const SuspenseLTender:FC<SuspenseLTenderProps> = ({searchKey='type', set, children}) => {
    const searchParams = useSearchParams();
    
    set(toTenderType(searchParams.get(searchKey) as string)?.toLocaleLowerCase())

    return children
}
