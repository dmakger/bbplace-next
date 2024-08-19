"use client"

import { useEffect, useState } from 'react'
import { UserAuth } from '../components/UserAuth/UserAuth'
import { UserNotAuth } from '../components/UserNotAuth/UserNotAuth'
import { isAuth } from '@/entities/Auth/lib/auth-token.lib'

export const HeaderUser = () => {
    // STATE
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

    // EFFECT
    useEffect(() => {
        setIsAuthenticated(isAuth())
    }, [isAuth()])
    
    return (
        <>
            { isAuthenticated 
                ? (
                    <UserAuth /> 
                ) : (
                    <UserNotAuth />
                )
            }
        </>
    )
}

