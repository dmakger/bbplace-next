import { UserAPI } from '@/entities/Auth/api/auth.api'
import cl from './_UserAuth.module.scss'
import { Button, ButtonVariant } from "@/shared/ui/Button"
import { useActionCreators } from '@/storage/hooks'

interface IUserNotAuth {
    className?: string,
}

export const UserNotAuth = ({ className }: IUserNotAuth) => {

    const [userLogin] = UserAPI.useUserLoginMutation()

    const actionCreators = useActionCreators()

    const login = async () => {
        try {
            const data = await userLogin({password: '9271Admin!', username: 'ykropdima18@yandex.ru'}).unwrap()
            if(data){
                actionCreators.setAuth(data)
            }
        } catch (error) {
            console.error('Ошибка аутентификации:');
            throw error;
        }
    };

    return (
        <Button variant={ButtonVariant.BORDERED_RED_WIDE} 
                title='Войти' 
                onClick={login} 
                className={className} />

    )

}


   

