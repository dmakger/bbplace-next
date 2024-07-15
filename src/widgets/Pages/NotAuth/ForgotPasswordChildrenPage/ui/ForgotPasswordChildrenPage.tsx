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

            if (!emailValue) setErrorMessage('Пожалуйста заполните это поле')
            await sendResetPasswordLink({ email: emailValue })

        } catch (e) {
            setErrorMessage('Введите корректный адрес электронной почты')
        }
    }

    const resetPasswordFunc = async() => {  

        if(!formRef.current) return;
        const {email, password, confirmPassword} = getFormData(formRef.current)
        if(password !== confirmPassword){
            setErrorMessage('Пароли не совпадают')
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
