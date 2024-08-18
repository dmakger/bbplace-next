import React from 'react';
import { Button, ButtonVariant } from '@/shared/ui/Button';
import { useActionCreators } from '@/storage/hooks';
import { UserAPI } from '@/entities/Auth/api/auth.api';
import { MAIN_PAGES } from '@/config/pages-url.config';

interface IUserNotAuthProps {
    className?: string;
}

export const UserNotAuth: React.FC<IUserNotAuthProps> = ({ className }) => {
    const [userLogin] = UserAPI.useUserLoginMutation();
    const actionCreators = useActionCreators();

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

    return (
        <Button 
            variant={ButtonVariant.BORDERED_RED_WIDE} 
            title='Войти' 
            // onClick={login} 
            href={MAIN_PAGES.LOGIN.path}
            className={className} 
        />
    );
};
