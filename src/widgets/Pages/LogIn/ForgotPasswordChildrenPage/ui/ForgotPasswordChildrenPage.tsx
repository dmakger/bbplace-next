'use client'

import { WrapperForLogInNSupportPages } from "@/shared/ui/Wrapper/ForLogInNSupportPages"
import { WrapperRectangleInput } from "@/shared/ui/Wrapper/RectangleInput"
import Input from "@/shared/ui/Input/Input"
import { EInputVariants } from "@/shared/ui/Input/model/input.model"
import { UserAPI } from "@/entities/Auth/api/auth.api"
import { FormEvent, ReactNode, useRef, useState } from "react"
import { getFormDataFromForm } from "@/shared/lib/formData.lib"
import { useRouter, useSearchParams } from "next/navigation"
import { MAIN_PAGES } from "@/config/pages-url.config"
import { useAppSelector } from "@/storage/hooks"
import { EMAIL_VALID_RULES } from "@/entities/Auth/data/telNEmail.data"
import { PASSWORD_MATCHING_ERROR, PASSWORD_VALID_RULES, isPasswordValid } from "@/entities/Auth/data/password.data"
import { FILL_THE_FIELD } from "@/entities/Auth/data/errorMessages.data"
import { ButtonColor, ButtonSize, ButtonType, ButtonVariant } from "@/shared/ui/Button/model/button.model"
import { EInputTextType } from "@/shared/ui/Input/ui/Text/data/text.input.data"
import { ModalAction } from "@/shared/ui/Modal/ui/Action/ModalAction"
import { EModalView } from "@/shared/data/modal.data"
import { IButton } from "@/shared/ui/Button/ui/Button"


export const ForgotPasswordChildrenPage = () => {

    //STATE
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [isOpenCheckEmailModal, setIsOpenCheckEmailModal] = useState<boolean>(false);
    const [isOpenResetPasswordModal, setIsOpenResetPasswordModal] = useState<boolean>(false);

    //SEARCH_PARAMS
    const token = useSearchParams().get('token') || undefined;
    const emailFromUrl = useSearchParams().get('email') || undefined;

    //REF
    const formRef = useRef<HTMLFormElement>(null)

    //ROUTER
    const router = useRouter()

    //API
    const [sendResetPasswordLink, { isError, isLoading: isLoadingSendResetLink }] = UserAPI.useSendResetPasswordLinkMutation()
    const [resetPassword, { isLoading: isLoadingResetPassword }] = UserAPI.useResetPasswordMutation()

    //RTK
    const { email: userEmail } = useAppSelector(state => state.user)

    //FUNCTIONS
    const sendResetPasswordRequest = async (e: FormEvent) => {
        e.preventDefault()

        if (!formRef.current) return;

        try {
            const { email: emailValue } = getFormDataFromForm(formRef?.current)

            if (!emailValue) setErrorMessage(FILL_THE_FIELD)
            await sendResetPasswordLink({ email: emailValue })
            setIsOpenCheckEmailModal(true)

        } catch (e) {
            setErrorMessage(EMAIL_VALID_RULES)
        }
    }

    const resetPasswordFunc = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formRef.current) return;
        const { password, confirmPassword } = getFormDataFromForm(formRef.current)

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
            token: token?.replaceAll(' ', '+') ?? '',
            email: emailFromUrl ?? ''
        })
        setIsOpenResetPasswordModal(true)
    }

    const navigateToCheckEmail = () => {
        router.push(MAIN_PAGES.CHECK_EMAIL.path)
        setIsOpenCheckEmailModal(false)
    }

    const goBack = () => router.back();


    //VARIABLES
    const modalActionText: string[] | ReactNode[] = [
        <>На почту «<b>{userEmail}</b>» отправлена ссылка для восстановления пароля.</>,
        'Вернитесь назад, если почта указана неверно или письма с ссылкой нет более 5 минут.'
    ]

    const propsButtonFirst: IButton = {
        variant: ButtonVariant.FILL,
        color: ButtonColor.Primary,
        size: ButtonSize.Big,
        title: 'Продолжить',
        onClick: navigateToCheckEmail
    }

    return (
        <WrapperForLogInNSupportPages pageTitle="Восстановление пароля" onSubmitFunc={token ? sendResetPasswordRequest : resetPasswordFunc} formRef={formRef}>
            <WrapperRectangleInput
                labelText="Электронная почта"
                isRequired
                bellowButtonText={token ? "" : 'Продолжить'}
                bellowButtonType={ButtonType.Submit}
                errorInputMessage={errorMessage}
                isLoadingBellowButton={isLoadingSendResetLink}
                onClickBellowButton={token ? ()=>{} : sendResetPasswordRequest}
>
                <Input.Text type={EInputTextType.Email} variant={EInputVariants.RECTANGULAR} required placeholder="Введите email" name="email" defaultValue={!token ? userEmail : emailFromUrl} warning={isError} error={isError} disabled={!!token} />
            </WrapperRectangleInput>

            {token && <>
                <WrapperRectangleInput
                    labelText="Пароль"
                    isRequired
                    errorInputMessage={errorMessage}
                >
                    <Input.Text type={EInputTextType.Password} variant={EInputVariants.RECTANGULAR} placeholder="Введите пароль" name="password" required />
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
                    <Input.Text type={EInputTextType.Password} variant={EInputVariants.RECTANGULAR} placeholder="Введите пароль еще раз" name="confirmPassword" required />
                </WrapperRectangleInput>
            </>}

            <ModalAction isOpen={isOpenResetPasswordModal} view={EModalView.CENTER}
                title={'Пароль успешно восстановлен'}
                buttonFirst={propsButtonFirst}
                onClickOverlay={() => setIsOpenResetPasswordModal(false)} />

            <ModalAction isOpen={isOpenCheckEmailModal} view={EModalView.CENTER}
                title={'Проверьте почту'}
                text={modalActionText}
                buttonFirst={propsButtonFirst}
                buttonSecond={{
                    variant: ButtonVariant.BORDER,
                    color: ButtonColor.Tertiary,
                    size: ButtonSize.Big,
                    title: 'Назад',
                    onClick: goBack
                }}
                onClickOverlay={() => setIsOpenCheckEmailModal(false)} />
        </WrapperForLogInNSupportPages>
    )
}
