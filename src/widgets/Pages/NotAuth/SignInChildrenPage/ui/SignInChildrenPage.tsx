'use client'

import { WrapperNotAuthPages } from "@/shared/ui/Wrapper/NotAuthPages"
import { WrapperRectangleInput } from "@/shared/ui/Wrapper/RectangleInput"
import Input from "@/shared/ui/Input/Input"
import { EInputVariants } from "@/shared/ui/Input/model/input.model"
import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { useActionCreators, useAppSelector } from "@/storage/hooks"
import { UserAPI } from "@/entities/Auth/api/auth.api"
import { getFormData } from "@/shared/lib/formData.lib"
import { MAIN_PAGES } from "@/config/pages-url.config"
import { EMAIL_VALID_RULES, isEmailValid } from "@/entities/Auth/data/email.data"
import { FILL_THE_FIELD, LOGIN_ERROR } from "@/entities/Auth/data/errorMessages.data"


export const SignInChildrenPage = () => {

    //STATE
    const [error, setError] = useState<number>()
    const [errorEmail, setErrorEmail] = useState<string>('')
    const [errorPassword, setErrorPassword] = useState<string>('')

    // REF
    const formRef = useRef<HTMLFormElement>(null)

    // ROUTER
    const router = useRouter()

    //API
    const [userLogin, {isLoading}] = UserAPI.useUserLoginMutation();

    //RTK
    const {email} = useAppSelector(state => state.user)
    const actionCreators = useActionCreators();

    //EFFECT
    useEffect(() => {
        
    }, [error])


    //FUNCTIONS
    const LogIn = async() => {
        setError(0)
        if (!formRef.current) return;
        const {email: emailValue, password} = getFormData(formRef?.current)

        //EMAIL
        if (!emailValue) {
            setErrorEmail(FILL_THE_FIELD);
        } else if (emailValue && !isEmailValid(emailValue)) {
            setErrorEmail(EMAIL_VALID_RULES);
        }

        //PASSWORD        
        if (!password) setErrorPassword(FILL_THE_FIELD);


        try{
            const data = await userLogin({username: emailValue, password: password}).unwrap()
            if(data){
                actionCreators.setAuth(data);
                router.replace(MAIN_PAGES.HOME)
            }
        }
        catch(e: any){
            setError(e.data.status)
            if(emailValue && password && e.data.status === 400 || e.data.status === 401){
                setErrorEmail(LOGIN_ERROR)
                setErrorPassword(LOGIN_ERROR);
            }
            
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
                <Input.Text type="email" variant={EInputVariants.RECTANGULAR} placeholder="Введите email" name="email" defaultValue={email} success={!!email} error={!!error && !!errorEmail} warning={!!error && !!errorEmail}/>
            </WrapperRectangleInput>
            <WrapperRectangleInput
                labelText="Пароль"
                isRequired
                bellowButtonText="Войти"
                errorInputMessage={errorPassword}
                isLoadingBellowButton={isLoading}
                onClickBellowButton={LogIn}
            >
                <Input.Text type="password" variant={EInputVariants.RECTANGULAR} placeholder="Введите пароль" name="password" error={!!error && !!errorPassword} warning={!!error && !!errorPassword}/>
            </WrapperRectangleInput>
        </WrapperNotAuthPages>
    )
}
