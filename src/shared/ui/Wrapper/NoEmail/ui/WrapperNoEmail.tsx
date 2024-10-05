'use client';

import { MAIN_PAGES } from "@/config/pages-url.config";
import { Loader } from "@/shared/ui/Loader";
import { useAppSelector } from "@/storage/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

interface IWrapperNoEmail {
    children: ReactNode;
}

/**
 * Враппер для страниц, для которых обязательно наличие email в RTK
 * @returns Страницу, если email есть в RTK или в url, если нет, то редирект на CheckEmailPage 
 */

export const WrapperNoEmail = ({ children }: IWrapperNoEmail) => {
    // RTK
    const { email } = useAppSelector(state => state.user);

    //SEARCH_PARAMS
    const emailFromUrl = useSearchParams().get('email') || undefined;

    // ROUTER
    const router = useRouter();

    //STATE
    const [isClient, setIsClient] = useState(false);

    //EFFECT
    useEffect(() => {
        setIsClient(true);        
      
        if (!email && !emailFromUrl) {
            router.push(MAIN_PAGES.CHECK_EMAIL.path); // Перенаправляем, если нет email или emailFromUrl
        }
    }, [email, emailFromUrl]);

    // Возвращаем null на сервере, чтобы избежать несоответствия в гидратации
    if (!isClient) {
        return null;
    }

    return (
        <>
            {email || emailFromUrl ? (
                <>{children}</>
            ) : (
                <Loader />
            )}
        </>
    );
};
