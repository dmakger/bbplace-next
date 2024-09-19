'use client'

import cl from './_CheckEmailChildrenPage.module.scss'
import { WrapperForLogInNSupportPages } from "@/shared/ui/Wrapper/ForLogInNSupportPages"
import { WrapperRectangleInput } from "@/shared/ui/Wrapper/RectangleInput"
import Input from "@/shared/ui/Input/Input"
import { EInputVariants } from "@/shared/ui/Input/model/input.model"
import { UserAPI } from "@/entities/Auth/api/auth.api"
import { FormEvent, ReactNode, useRef, useState } from "react"
import { getFormDataFromForm } from "@/shared/lib/formData.lib"
import { useRouter } from "next/navigation"
import { MAIN_PAGES } from "@/config/pages-url.config"
import { useActionCreators } from "@/storage/hooks"
import { EMAIL_VALID_RULES, isEmailValid } from "@/entities/Auth/data/telNEmail.data"
import { FILL_THE_FIELD } from "@/entities/Auth/data/errorMessages.data"
import { ButtonColor, ButtonSize, ButtonType, ButtonVariant } from "@/shared/ui/Button/model/button.model"
import { EInputTextType } from "@/shared/ui/Input/ui/Text/data/text.input.data"
import { Button } from "@/shared/ui/Button"
import { VK_SECONDARY_ICON } from "@/shared/ui/Icon/data/vk.data"
import { YANDEX_ICON } from "@/shared/ui/Icon/data/yandex.data.icon"
import { GOOGLE_ICON } from "@/shared/ui/Icon/data/google.data.icon"
import { cls } from '@/shared/lib/classes.lib'


export const CheckEmailChildrenPage = () => {

    //STATE
    const [errorMessage, setErrorMessage] = useState<string>('')

    // REF
    const formRef = useRef<HTMLFormElement>(null)

    // ROUTER
    const router = useRouter()

    // API
    const [triggerCheckEmailExists, { isLoading }] = UserAPI.useCheckEmailExistsMutation()

    //RTK
    const actionCreators = useActionCreators();

    // FUNCTIONS
    const CheckEmail = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setErrorMessage('')
        if (!formRef.current) return;
        const { email } = getFormDataFromForm(formRef.current)

        if (!email) return setErrorMessage(FILL_THE_FIELD)
        if (email && !isEmailValid(email)) return setErrorMessage(EMAIL_VALID_RULES)

        setErrorMessage('')

        try {
            const isExists = await triggerCheckEmailExists(email).unwrap()
            actionCreators.setAuth({
                UserName: email,
                UserId: "",
                FullName: "",
                LegalName: "",
                BrandName: "",
                Role: "",
                MobilePhone: "",
                Country: ""
            })
            
            isExists && router.push(MAIN_PAGES.LOGIN.path)
            
            !isExists && router.push(MAIN_PAGES.REGISTRATION.path)

        } catch (error) {
        }
    }

    //VARIABLE
    const additionalBlockButtons: ReactNode[] = [
        <Button className={cls(cl.socialButton, cl.vk)} title='ВКонтакте' variant={ButtonVariant.TONAL} color={ButtonColor.Secondary} size={ButtonSize.Medium} beforeImage={VK_SECONDARY_ICON}/>,
        <Button className={cls(cl.socialButton, cl.yandex)} title='Яндекс' variant={ButtonVariant.TONAL} color={ButtonColor.Secondary}  size={ButtonSize.Medium} beforeImage={YANDEX_ICON} />,
        <Button className={cls(cl.socialButton, cl.google)} title='Google' variant={ButtonVariant.TONAL} color={ButtonColor.Secondary} size={ButtonSize.Medium} beforeImage={GOOGLE_ICON}/>
    ]

    return (
        <WrapperForLogInNSupportPages
            pageTitle="Вход или регистрация профиля"
            onSubmitFunc={CheckEmail}
            formRef={formRef}
            // additionalBlockTitle="Через сторонние сервисы:"
            // additionalBlockButtons={additionalBlockButtons}
        >
            <WrapperRectangleInput
                labelText="Электронная почта"
                isRequired
                isDescriptionTooltip
                descriptionTooltipText="Введите адрес электронной почты, на которую был или будет зарегистрирован профиль"
                bellowButtonText="Продолжить"
                bellowButtonType={ButtonType.Submit}
                errorInputMessage={errorMessage}
                onClickBellowButton={CheckEmail}
                isLoadingBellowButton={isLoading}
            >
                <Input.Text type={EInputTextType.Email} variant={EInputVariants.RECTANGULAR} placeholder="Введите email" name="email" error={!!errorMessage} setError={setErrorMessage} required/>
            </WrapperRectangleInput>
        </WrapperForLogInNSupportPages>
    )
}
