'use client'

import { WrapperForLogInNSupportPages } from "@/shared/ui/Wrapper/ForLogInNSupportPages"
import { WrapperRectangleInput } from "@/shared/ui/Wrapper/RectangleInput"
import Input from "@/shared/ui/Input/Input"
import { EInputVariants } from "@/shared/ui/Input/model/input.model"
import { UserAPI } from "@/entities/Auth/api/auth.api"
import { FormEvent, useRef, useState } from "react"
import { getFormDataFromForm } from "@/shared/lib/formData.lib"
import { useRouter, useSearchParams } from "next/navigation"
import { MAIN_PAGES } from "@/config/pages-url.config"
import { useAppSelector } from "@/storage/hooks"
import { EMAIL_VALID_RULES } from "@/entities/Auth/data/email.data"
import { PASSWORD_MATCHING_ERROR, PASSWORD_VALID_RULES, isPasswordValid } from "@/entities/Auth/data/password.data"
import { FILL_THE_FIELD } from "@/entities/Auth/data/errorMessages.data"
import { ButtonType } from "@/shared/ui/Button/model/button.model"


export const ForgotPasswordChildrenPage = () => {

    //STATE
    const [errorMessage, setErrorMessage] = useState<string>('')

    //SEARCH_PARAMS
    const token = true;
    // const emailFromUrl = useSearchParams()
    const emailFromUrl = ''

    // const email = useSearchParams()[0].get('email')


    //REF
    const formRef = useRef<HTMLFormElement>(null)

    //ROUTER
    const router = useRouter()

    //API
    const [sendResetPasswordLink, { isError, isLoading: isLoadingSendResetLink }] = UserAPI.useSendResetPasswordLinkMutation()
    const [resetPassword, {isLoading: isLoadingResetPassword}] = UserAPI.useResetPasswordMutation()


    //RTK
    const { email: userEmail } = useAppSelector(state => state.user)

    // FUNCTIONS
    const sendResetPasswordRequest = async (e: FormEvent) => {
        e.preventDefault()

        if (!formRef.current) return;

        try {
            const { email: emailValue } = getFormDataFromForm(formRef?.current)            

            if (!emailValue) setErrorMessage(FILL_THE_FIELD)
            await sendResetPasswordLink({ email: emailValue })

        } catch (e) {
            setErrorMessage(EMAIL_VALID_RULES)
        }
    }

    const resetPasswordFunc = async(e: FormEvent<HTMLFormElement>) => { 
        e.preventDefault();
 

        if(!formRef.current) return;
        const {email, password, confirmPassword} = getFormDataFromForm(formRef.current)

        //PASSWORD        
        if (!password || !confirmPassword) {
            setErrorMessage(FILL_THE_FIELD);
        } else if (password !== confirmPassword) {
            setErrorMessage(PASSWORD_MATCHING_ERROR);
        } else if (!isPasswordValid(password)) {
            setErrorMessage(PASSWORD_VALID_RULES);
        }
        resetPassword({
            password: password,
            token: '',
            email
        })
    }


    return (
        <WrapperForLogInNSupportPages pageTitle="Восстановление пароля" onSubmitFunc={token ? sendResetPasswordRequest : resetPasswordFunc} formRef={formRef}>
            <WrapperRectangleInput
                labelText="Электронная почта"
                isRequired
                bellowButtonText={!token ? "Восстановить" : ''}
                bellowButtonType={ButtonType.Submit}
                errorInputMessage={errorMessage}
                isLoadingBellowButton={isLoadingSendResetLink}
                onClickBellowButton={sendResetPasswordRequest}
            >
                <Input.Text type="email" variant={EInputVariants.RECTANGULAR} placeholder="Введите email" name="email" defaultValue={!token ? userEmail : emailFromUrl} warning={isError} error={isError} disabled={!!token} />
            </WrapperRectangleInput>

            {token && <>
                    <WrapperRectangleInput
                        labelText="Пароль"
                        isRequired
                        errorInputMessage={errorMessage}
                    >
                        <Input.Text type="password" variant={EInputVariants.RECTANGULAR} placeholder="Введите пароль" name="password" required />
                    </WrapperRectangleInput>
                    <WrapperRectangleInput
                        labelText="Подтверждение пароля"
                        isRequired
                        errorInputMessage={errorMessage}
                        bellowButtonType={ButtonType.Submit}
                        bellowButtonText='Сменить пароль'
                        isLoadingBellowButton={isLoadingResetPassword}
                        onClickBellowButton={resetPasswordFunc}
                    >
                        <Input.Text type="password" variant={EInputVariants.RECTANGULAR} placeholder="Введите пароль еще раз" name="confirmPassword" required />
                    </WrapperRectangleInput>
                </>}
        </WrapperForLogInNSupportPages>
    )
}
