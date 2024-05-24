"use client"

import { useEffect, useState } from 'react'
import { UserAuth } from '../components/UserAuth/UserAuth'
import { UserNotAuth } from '../components/UserNotAuth/UserNotAuth'
import { useAppSelector } from '@/storage/hooks'
import { isAuth } from '@/entities/Auth/lib/auth-token.lib'
import { UserAPI } from '@/entities/Auth/api/auth.api'

export const HeaderUser = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
    const { isAuth: isAuthh, id } = useAppSelector(state => state.user)    


    useEffect(() => {
        // console.log(isAuth(), isAuthh);
        setIsAuthenticated(isAuth())
    }, [isAuth()])
    
    return (
        <>
            { isAuthenticated ?
                <UserAuth /> :
                <UserNotAuth />
            }
        </>
    )
}

