'use client'

import { ReactNode, useEffect } from 'react'
import { useActionCreators, useAppSelector } from '@/storage/hooks'
import { usePathname, useRouter } from 'next/navigation'
import { ECurrentLK } from '@/entities/User/model/user.model'
import { MAIN_PAGES } from '@/config/pages-url.config'
import { isAuth } from '@/entities/Auth/lib/auth-token.lib'

interface IWrapperRole {
    children: ReactNode
}

export const WrapperRole = ({
    children
}: IWrapperRole) => {

    //PATHNAME
    const pathname = usePathname();

    //RTK
    const { currentLK, photoId, email } = useAppSelector(state => state.user)
    const actionCreators = useActionCreators()

    //ROUTER
    const router = useRouter()

    useEffect(() => {
        if (currentLK === ECurrentLK.SUPPLIER) { 
            actionCreators.setAuthOptional({
                prevPath: pathname,
                photoId,
                currentLK
            })
        } else if (isAuth()) { 
            router.replace(MAIN_PAGES.ONLY_FOR_SUPPLIERS.path);
        }
    }, [currentLK])    

    return (
        <>
            {currentLK === ECurrentLK.SUPPLIER ? children : null} 
        </>
    )
}
