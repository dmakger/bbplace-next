"use client"

import { FC, useEffect } from "react"

import { UserAPI } from '@/entities/Auth/api/auth.api';
import { useActionCreators } from '@/storage/hooks';
import { getAccessToken, isAuth, removeFromStorage } from '@/entities/Auth/lib/auth-token.lib';
import { jwtDecode } from 'jwt-decode';
import { ILoginResponseDecoded } from '@/entities/Auth/model/auth.model';


interface UpdateAuthProps{
    className?: string,
}

export const UpdateAuth:FC<UpdateAuthProps> = ({className}) => {
    // API 
    const [refreshToken] = UserAPI.useRefreshTokenMutation();
    
    // RTK
    const actionCreators = useActionCreators();

    // EFFECT
    useEffect(() => {
        async function initialRefresh() {
            if (isAuth()) {
                const accessToken = getAccessToken();
                if (accessToken !== null) {
                    const decoded = jwtDecode(accessToken);
                    actionCreators.setAuth(decoded as ILoginResponseDecoded);
                }
            }
            const data = await refreshToken().unwrap();
            if (data) {
                actionCreators.setAuth(data);
            } else {
                removeFromStorage();
            }
        }
        initialRefresh();
    }, [actionCreators, refreshToken]);


    return (
        <></>
    )
}
