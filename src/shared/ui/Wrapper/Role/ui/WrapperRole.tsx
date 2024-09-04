'use client'

import { ReactNode, useEffect } from 'react'
import { useAppSelector } from '@/storage/hooks'
import { useRouter } from 'next/navigation'
import { ECurrentLK } from '@/entities/User/model/user.model'
import OnlyForSellersPage from '@/app/(auth)/onlyForSellers/page'
import { MAIN_PAGES } from '@/config/pages-url.config'

interface IWrapperRole {
    children: ReactNode
}

export const WrapperRole = ({
    children
}: IWrapperRole) => {

    //RTK
    const { currentLK } = useAppSelector(state => state.user)

    //ROUTER
    const router = useRouter()

    useEffect(() => {
        if (currentLK !== ECurrentLK.SELLER) {
            router.push(MAIN_PAGES.ONLY_FOR_SELLERS.path)
        }
    }, [currentLK, router])

    return (
        <>
            {children}
        </>
    )
}
