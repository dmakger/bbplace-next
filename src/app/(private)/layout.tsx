"use client"

import cl from './_PrivateLayout.module.scss'
import { MobileNavbar } from "@/widgets/MobileNavbar";
import { PropsWithChildren, useEffect } from "react";
import { WrapperGap } from "@/shared/ui/Wrapper/Gap/WrapperGap";
import { UserAPI } from '@/entities/Auth/api/auth.api';
import { useActionCreators } from '@/storage/hooks';
import { getAccessToken, isAuth, removeFromStorage } from '@/entities/Auth/lib/auth-token.lib';
import { jwtDecode } from 'jwt-decode';
import { HeaderLK } from '@/widgets/HeaderLK';

export default function PrivateLayout({ children }: PropsWithChildren<unknown>) {
    // API 
    const [refreshToken] = UserAPI.useRefreshTokenMutation()
    
    // RTK
    const actionCreators = useActionCreators()


    useEffect(() => {
        async function initialRefresh(){
            if (isAuth()) {
                const accessToken = getAccessToken()
                if (accessToken !== null){
                    actionCreators.setAuth(jwtDecode(accessToken))
                    return
                }
            }
            const data = await refreshToken().unwrap()
            if(data){
                actionCreators.setAuth(data)
            }
            else{
                removeFromStorage()
            }
        }
        initialRefresh()
    },  [])

    return (
        <WrapperGap>
            <HeaderLK />
            <div className={cl.content}>
                {children}
            </div>
            <MobileNavbar/>
        </WrapperGap>
    )
}
