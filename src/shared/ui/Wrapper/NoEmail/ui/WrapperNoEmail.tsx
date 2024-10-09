'use client';

import { MAIN_PAGES } from "@/config/pages-url.config";
import { Loader } from "@/shared/ui/Loader";
import { useAppSelector } from "@/storage/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import { ReactNode, SetStateAction, useEffect, useState } from "react";
import SuspenseL from "../../SuspenseL/SuspenseL";

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
    
    // ROUTER
    const router = useRouter();

    //STATE
    const [emailURL, setEmailURL] = useState<string | undefined>();
    const [isClient, setIsClient] = useState(false);

    //EFFECT
    useEffect(() => {
        setIsClient(true);        
      
        if (!email && !emailURL) {
            router.push(MAIN_PAGES.CHECK_EMAIL.path); // Перенаправляем, если нет email или emailURL
        }
    }, [email, emailURL]);

    // Возвращаем null на сервере, чтобы избежать несоответствия в гидратации
    if (!isClient) {
        return null;
    }

    return (
        <SuspenseL.Any data={[
            { searchKey: 'email', set: setEmailURL}
        ]}>
            {email || emailURL ? (
                <>{children}</>
            ) : (
                <Loader />
            )}
        </SuspenseL.Any>
    );
};
