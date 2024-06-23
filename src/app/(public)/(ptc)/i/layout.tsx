"use client"

import { PropsWithChildren } from "react";
import { useAppSelector } from '@/storage/hooks';
import Wrapper1280 from '@/shared/ui/Wrapper/1280/Wrapper1280';

export default function Layout({ children }: PropsWithChildren<unknown>) {    
    // RTK
    const user = useAppSelector(state => state.user)

    // HTML
    if (!user.isAuth)
        return (
            <Wrapper1280>
                <h2>Вы не авторизованы</h2>
            </Wrapper1280>
        )

    return children
}
