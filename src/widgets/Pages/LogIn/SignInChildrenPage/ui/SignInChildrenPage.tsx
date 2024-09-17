'use client'

import { WrapperForLogInNSupportPages } from "@/shared/ui/Wrapper/ForLogInNSupportPages"
import { WrapperRectangleInput } from "@/shared/ui/Wrapper/RectangleInput"
import Input from "@/shared/ui/Input/Input"
import { EInputVariants } from "@/shared/ui/Input/model/input.model"
import { FormEvent, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { useActionCreators, useAppSelector } from "@/storage/hooks"
import { UserAPI } from "@/entities/Auth/api/auth.api"
import { getFormDataFromForm } from "@/shared/lib/formData.lib"
import { MAIN_PAGES } from "@/config/pages-url.config"
import { EMAIL_VALID_RULES, isEmailValid } from "@/entities/Auth/data/telNEmail.data"
import { FILL_THE_FIELD, LOGIN_ERROR } from "@/entities/Auth/data/errorMessages.data"
import { ButtonType } from "@/shared/ui/Button/model/button.model"
import { EInputTextType } from "@/shared/ui/Input/ui/Text/data/text.input.data"
import { getCurrentLKToken, saveCurrentLKTokenStorage } from "@/entities/User/lib/user-token.lib"
import { ECurrentLK } from "@/entities/User/model/user.model"


export const SignInChildrenPage = () => {

    //STATE
    const [error, setError] = useState<boolean>(false)
    const [errorEmail, setErrorEmail] = useState<string>('')
    const [errorPassword, setErrorPassword] = useState<string>('')

    //REF
    const formRef = useRef<HTMLFormElement>(null)

    //ROUTER
    const router = useRouter()

    //API
    const [userLogin, { isLoading }] = UserAPI.useUserLoginMutation();

    //RTK
    const { email, prevPath } = useAppSelector(state => state.user)
    const actionCreators = useActionCreators();

    //FUNCTIONS
    const LogIn = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setError(false)
        if (!formRef.current) return;
        const { email: emailValue, password } = getFormDataFromForm(formRef?.current)

        //EMAIL
        if (!emailValue) {
            setErrorEmail(FILL_THE_FIELD);
        } else if (emailValue && !isEmailValid(emailValue)) {
            setErrorEmail(EMAIL_VALID_RULES);
        }

        //PASSWORD        
        if (!password) setErrorPassword(FILL_THE_FIELD);

        try {
            const data = await userLogin({ username: emailValue, password: password }).unwrap()
            if (data) {
                const currentLK = getCurrentLKToken() ?? ECurrentLK.SELLER
                actionCreators.setAuth(data);
                actionCreators.setAuthOptional({ currentLK })
                router.replace(prevPath ?? MAIN_PAGES.HOME.path)
                saveCurrentLKTokenStorage(currentLK)
            }
        }
        catch (e: any) {
            setError(e.data.status)
            if (emailValue && password && e.data.status === 400 || e.data.status === 401) {
                setErrorEmail(LOGIN_ERROR)
                setErrorPassword(LOGIN_ERROR);
            }
        }
    }

    return (
        <WrapperForLogInNSupportPages pageTitle="Вход в профиль" onSubmitFunc={LogIn} formRef={formRef}>
            <WrapperRectangleInput
                labelText="Электронная почта"
                isRequired
                isDescriptionTooltip
                descriptionTooltipText="Введите адрес электронной почты, на которую был зарегистрирован профиль"
                errorInputMessage={errorEmail}

            >
                <Input.Text type={EInputTextType.Email} variant={EInputVariants.RECTANGULAR} placeholder="Введите email" name="email" defaultValue={email} success={!!email} error={error && !!errorEmail} warning={error && !!errorEmail} />
            </WrapperRectangleInput>
            <WrapperRectangleInput
                labelText="Пароль"
                isRequired
                bellowButtonText="Войти"
                bellowButtonType={ButtonType.Submit}
                errorInputMessage={errorPassword}
                isLoadingBellowButton={isLoading}
                onClickBellowButton={LogIn}
            >
                <Input.Text type={EInputTextType.Password} variant={EInputVariants.RECTANGULAR} placeholder="Введите пароль" name="password" error={error && !!errorPassword} warning={error && !!errorPassword} />
            </WrapperRectangleInput>
        </WrapperForLogInNSupportPages>
    )
}
