"use client"

import cl from './_PublicLayout.module.scss'
import { MobileNavbar } from "@/widgets/MobileNavbar";
import { PropsWithChildren, useEffect } from "react";
import { WrapperGap } from "@/shared/ui/Wrapper/Gap/WrapperGap";
import { UserAPI } from '@/entities/Auth/api/auth.api';
import { useActionCreators, useAppSelector } from '@/storage/hooks';
import { getAccessToken, isAuth, isTokenExpired, removeFromStorage } from '@/entities/Auth/lib/auth-token.lib';
import { jwtDecode } from 'jwt-decode';
import { TopBar } from '@/features/TopBar';
import { usePathname } from 'next/navigation';
import { MAIN_PAGES } from '@/config/pages-url.config';
import { Footer } from '@/widgets/Footer';
import { ILoginResponseDecoded } from '@/entities/Auth/model/auth.model';

export default function Layout({ children }: PropsWithChildren<unknown>) {
    // API 
    const [refreshToken] = UserAPI.useRefreshTokenMutation()
    
    // RTK
    const actionCreators = useActionCreators()
    const {isAuth: isUserAuth} = useAppSelector(state => state.user)

    //PATHNAME
    const pathname = usePathname()


    useEffect(() => {
        async function initialRefresh(){
            if (isAuth()) {
                const accessToken = getAccessToken()
                if (accessToken !== null){
                    const decoded = jwtDecode(accessToken)
                    actionCreators.setAuth(decoded as ILoginResponseDecoded)
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
            {pathname === MAIN_PAGES.HOME.path && !isUserAuth && 
                <TopBar/>
            }
            <div className={cl.content}>
                {children}
                <Footer/>
            </div>
            <MobileNavbar/>
        </WrapperGap>
    )
}
