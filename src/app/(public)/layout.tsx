"use client"

import cl from './_PublicLayout.module.scss'
import { Header } from "@/widgets/Header";
import { MobileNavbar } from "@/widgets/MobileNavbar";
import { PropsWithChildren, useEffect } from "react";
import { WrapperGap } from "@/shared/ui/Wrapper/Gap/WrapperGap";
import { UserAPI } from '@/entities/Auth/api/auth.api';
import { useActionCreators } from '@/storage/hooks';
import { getAccessToken, isAuth, removeFromStorage } from '@/entities/Auth/lib/auth-token.lib';
import { jwtDecode } from 'jwt-decode';

export default function Layout({ children }: PropsWithChildren<unknown>) {
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
            console.log('qwe initialRefresh', data)
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
            <Header />
            <div className={cl.content}>
                {children}
            </div>
            <MobileNavbar/>
        </WrapperGap>
    )
}
