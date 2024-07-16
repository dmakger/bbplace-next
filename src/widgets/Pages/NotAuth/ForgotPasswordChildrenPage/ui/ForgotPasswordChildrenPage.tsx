'use client'

import { WrapperNotAuthPages } from "@/shared/ui/Wrapper/NotAuthPages"
import { WrapperRectangleInput } from "@/shared/ui/Wrapper/RectangleInput"
import Input from "@/shared/ui/Input/Input"
import { EInputVariants } from "@/shared/ui/Input/model/input.model"
import { UserAPI } from "@/entities/Auth/api/auth.api"
import { FormEvent, useRef, useState } from "react"
import { getFormData } from "@/shared/lib/formData.lib"
import { useRouter, useSearchParams } from "next/navigation"
import { MAIN_PAGES } from "@/config/pages-url.config"
import { useAppSelector } from "@/storage/hooks"
import { EMAIL_VALID_RULES } from "@/entities/Auth/data/email.data"
import { PASSWORD_MATCHING_ERROR, PASSWORD_VALID_RULES, isPasswordValid } from "@/entities/Auth/data/password.data"
import { FILL_THE_FIELD } from "@/entities/Auth/data/errorMessages.data"


export const ForgotPasswordChildrenPage = () => {

    //STATE
    const [errorMessage, setErrorMessage] = useState<string>('')

    //SEARCHPARAMS
    const token = false;
    const emailFromUrl = useSearchParams()

    // const email = useSearchParams()[0].get('email')


    //REF
    const formRef = useRef<HTMLFormElement>(null)

    //ROUTER
    const router = useRouter()

    //API
    const [sendResetPasswordLink, { isError }] = UserAPI.useSendResetPasswordLinkMutation()
    const [resetPassword] = UserAPI.useResetPasswordMutation()


    //RTK
    const { email: userEmail } = useAppSelector(state => state.user)

    // FUNCTIONS
    const sendResetPasswordRequest = async (e: FormEvent) => {
        e.preventDefault()

        if (!formRef.current) return;

        try {
            const { emailValue } = getFormData(formRef?.current)

            if (!emailValue) setErrorMessage(FILL_THE_FIELD)
            await sendResetPasswordLink({ email: emailValue })

        } catch (e) {
            setErrorMessage(EMAIL_VALID_RULES)
        }
    }

    const resetPasswordFunc = async() => {  

        if(!formRef.current) return;
        const {email, password, confirmPassword} = getFormData(formRef.current)
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
        <WrapperNotAuthPages pageTitle="Восстановление пароля" onSubmitFunc={token ? sendResetPasswordRequest : resetPasswordFunc} formRef={formRef}>
            <WrapperRectangleInput
                labelText="Электронная почта"
                isRequired
                bellowButtonText={!token ? "Восстановить" : ''}
                errorInputMessage={errorMessage}
                onClickBellowButton={sendResetPasswordRequest}
            >
                <Input.Text type="email" variant={EInputVariants.RECTANGULAR} placeholder="Введите email" name="email" defaultValue={!token ? userEmail: emailFromUrl} warning={isError} error={isError} disabled={!!token} />
            </WrapperRectangleInput>

            {token && <>
                    <WrapperRectangleInput
                        labelText="Пароль"
                        isRequired
                        errorInputMessage="ПАРОЛЬ"
                    >
                        <Input.Text type="password" variant={EInputVariants.RECTANGULAR} placeholder="Введите пароль" name="password" required />
                    </WrapperRectangleInput>
                    <WrapperRectangleInput
                        labelText="Подтверждение пароля"
                        isRequired
                        errorInputMessage="ПАРОЛЬ"
                        bellowButtonText='Сменить пароль'
                        onClickBellowButton={resetPasswordFunc}
                    >
                        <Input.Text type="password" variant={EInputVariants.RECTANGULAR} placeholder="Введите пароль еще раз" name="confirmPassword" required />
                    </WrapperRectangleInput>
                </>}
        </WrapperNotAuthPages>
    )
}
