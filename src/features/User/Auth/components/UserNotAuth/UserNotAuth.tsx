"use client"

import React from 'react';
import { Button, ButtonVariant } from '@/shared/ui/Button';
import { useActionCreators, useAppSelector } from '@/storage/hooks';
import { UserAPI } from '@/entities/Auth/api/auth.api';
import { MAIN_PAGES } from '@/config/pages-url.config';
import { usePathname, useRouter } from 'next/navigation';

interface IUserNotAuthProps {
    className?: string;
}

export const UserNotAuth: React.FC<IUserNotAuthProps> = ({ className }) => {
    // ROUTER
    const router = useRouter()
    const pathname = usePathname()
    
    // RTK
    const {currentLK} = useAppSelector(state => state.user);
    const actionCreators = useActionCreators();

    // API
    const [userLogin] = UserAPI.useUserLoginMutation();
    
    const login = async () => {
        try {
            const data = await userLogin({
                username: 'ykropdima18@yandex.ru',
                password: '9271Admin!'
            }).unwrap();            
            if (data) {
                actionCreators.setAuth(data);
            }
        } catch (error) {
            console.error('Ошибка аутентификации:', error);
        }
    };

    const handleOnClickLogin = () => {
        actionCreators.setAuthOptional({
            prevPath: pathname,
            currentLK: currentLK
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
