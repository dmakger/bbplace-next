"use client"

import React from 'react';
import { Button, ButtonVariant } from '@/shared/ui/Button';
import { useActionCreators } from '@/storage/hooks';
import { MAIN_PAGES } from '@/config/pages-url.config';
import { usePathname, useRouter } from 'next/navigation';

interface IUserNotAuthProps {
    className?: string;
}

export const UserNotAuth: React.FC<IUserNotAuthProps> = ({ className }) => {
    //ROUTER
    const router = useRouter()
    const pathname = usePathname()
    
    //RTK
    const actionCreators = useActionCreators();

    //HANDLE
    const handleOnClickLogin = () => {
        actionCreators.setAuthOptional({
            prevPath: pathname,
        })
        router.push(MAIN_PAGES.CHECK_EMAIL.path)
    }

    return (
        <Button 
            variant={ButtonVariant.BORDERED_RED_WIDE} 
            title='Войти' 
            onClick={handleOnClickLogin} 
            className={className} 
        />
    );
};
