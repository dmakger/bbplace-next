"use client"

import { FC, ReactNode } from "react"
import { useAppSelector } from "@/storage/hooks";

interface WrapperAuthProps{
    children: ReactNode
}

export const WrapperAuth: FC<WrapperAuthProps> = ({ children }) => {
    // RTK
    const { isAuth } = useAppSelector(state => state.user);

    // Возвращаем null на сервере, чтобы избежать несоответствия в гидратации
    if (typeof window === 'undefined') {
        return null;
    }

    return (
        <>
            {isAuth ? (
                <>{children}</>
            ) : (
                <h2>Вы не авторизованы</h2>
            )}
        </>
    );
}
