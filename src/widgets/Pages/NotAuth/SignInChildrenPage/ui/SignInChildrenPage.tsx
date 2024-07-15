'use client'

import { WrapperNotAuthPages } from "@/shared/ui/Wrapper/NotAuthPages"
import { WrapperRectangleInput } from "@/shared/ui/Wrapper/RectangleInput"
import Input from "@/shared/ui/Input/Input"
import { EInputVariants } from "@/shared/ui/Input/model/input.model"
import { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { useActionCreators, useAppSelector } from "@/storage/hooks"
import { UserAPI } from "@/entities/Auth/api/auth.api"
import { getFormData } from "@/shared/lib/formData.lib"
import { MAIN_PAGES } from "@/config/pages-url.config"


export const SignInChildrenPage = () => {

    //STATE
    const [error, setError] = useState<boolean>(false)
    const [errorEmail, setErrorEmail] = useState<string>('')
    const [errorPassword, setErrorPassword] = useState<string>('')

    // REF
    const formRef = useRef<HTMLFormElement>(null)

    // ROUTER
    const router = useRouter()

    //API
    const [userLogin] = UserAPI.useUserLoginMutation();

    //RTK
    const {email} = useAppSelector(state => state.user)
    const actionCreators = useActionCreators();


    //FUNCTIONS
    const LogIn = async() => {
        if (!formRef.current) return;
        const {emailValue, password} = getFormData(formRef?.current)

        
        //EMAIL
        if (!emailValue) {
            setErrorEmail('Пожалуйста заполните поле');
        } else if (emailValue && (!emailValue.includes('@') || !emailValue.includes('.'))) {
            setErrorEmail('Введите корректный адрес электронной почты');
        }

        //PASSWORD        
        if (!password) setErrorPassword('Пожалуйста заполните поле');
        
        

        try{
            const data = await userLogin({username: email, password: password}).unwrap()
            if(data){
                actionCreators.setAuth(data);
                router.push(MAIN_PAGES.HOME)
            }
        }
        catch(e: any){
            setError(e.data.status)
        }
        
    }

    return (
        <WrapperNotAuthPages pageTitle="Вход в профиль" onSubmitFunc={LogIn} formRef={formRef} forgotPasswordButton>
            <WrapperRectangleInput
                labelText="Электронная почта"
                isRequired
                isDescriptionTooltip
                descriptionTooltipText="Введите адрес электронной почты, на которую был зарегистрирован профиль"
                errorInputMessage={errorEmail}
                
            >
                <Input.Text type="email" variant={EInputVariants.RECTANGULAR} placeholder="Введите email" name="email" defaultValue={email} success={!!email} error={error && !!errorEmail} warning={error && !!errorEmail}/>
            </WrapperRectangleInput>
            <WrapperRectangleInput
                labelText="Пароль"
                isRequired
                bellowButtonText="Войти"
                errorInputMessage={errorPassword}
                onClickBellowButton={LogIn}
            >
                <Input.Text type="password" variant={EInputVariants.RECTANGULAR} placeholder="Введите пароль" name="password" error={error && !!errorPassword} warning={error && !!errorPassword}/>
            </WrapperRectangleInput>
        </WrapperNotAuthPages>
    )
}
