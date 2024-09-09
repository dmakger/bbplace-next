'use client'

import { ReactNode, useEffect } from 'react'
import { useActionCreators, useAppSelector } from '@/storage/hooks'
import { usePathname, useRouter } from 'next/navigation'
import { ECurrentLK } from '@/entities/User/model/user.model'
import { MAIN_PAGES } from '@/config/pages-url.config'

interface IWrapperRole {
    children: ReactNode
}

export const WrapperRole = ({
    children
}: IWrapperRole) => {

    //PATHNAME
    const pathname = usePathname();

    //RTK
    const { currentLK, photoId } = useAppSelector(state => state.user)
    const actionCreators = useActionCreators()

    //ROUTER
    const router = useRouter()

    useEffect(() => {
        if (currentLK !== ECurrentLK.SELLER) { 
             router.replace(MAIN_PAGES.ONLY_FOR_SELLERS.path);
        }
        if (currentLK === ECurrentLK.SELLER) { 
            actionCreators.setAuthOptional({
                prevPath: pathname,
                photoId,
                currentLK
            })
       }
    }, [currentLK])    

    return (
        <>
            {currentLK === ECurrentLK.SELLER ? children : null} 
        </>
    )
}
