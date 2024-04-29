"use client"

import { UserAuth } from '../components/UserAuth/UserAuth'
import { UserNotAuth } from '../components/UserNotAuth/UserNotAuth'
import { useAppSelector } from '@/storage/hooks'

export const HeaderUser = () => {

    const { isAuth } = useAppSelector(state => state.user)    

    return (
        <>
            {isAuth ?
                <UserAuth /> :
                <UserNotAuth />
            }
        </>
    )
}

