'use client';

import { MAIN_PAGES } from "@/config/pages-url.config";
import { useAppSelector } from "@/storage/hooks";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

interface IWrapperNoEmail {
    children: ReactNode;
}

export const WrapperNoEmail = ({ children }: IWrapperNoEmail) => {
    // RTK
    const { email } = useAppSelector(state => state.user);

    // ROUTER
    const router = useRouter();

    //STATE
    const [isClient, setIsClient] = useState(false);

    //EFFECT
    useEffect(() => {
        setIsClient(true);

        if (!email) {
            router.push(MAIN_PAGES.CHECK_EMAIL.path);
        }
    }, [email]);

    // Возвращаем null на сервере, чтобы избежать несоответствия в гидратации
    if (!isClient) {
        return null;
    }

    return (
        <>
            {email ? (
                <>{children}</>
            ) : (
                <h2>Loading...</h2>
            )}
        </>
    );
};
