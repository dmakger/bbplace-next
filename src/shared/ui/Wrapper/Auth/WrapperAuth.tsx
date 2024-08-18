"use client"

import { FC, ReactNode, useEffect, useState } from "react"
import { useAppSelector } from "@/storage/hooks";

interface WrapperAuthProps{
    children: ReactNode
}

export const WrapperAuth: FC<WrapperAuthProps> = ({ children }) => {
    // RTK
    const { isAuth } = useAppSelector(state => state.user);
    const [isClient, setIsClient] = useState<boolean>(false);

    //EFFECT
    useEffect(() => {
        // Устанавливаем флаг клиентского рендеринга
        setIsClient(true);
    }, []);


    // Возвращаем null на сервере, чтобы избежать несоответствия в гидратации
    if (!isClient) {
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
