'use client'

import { WrapperNotAuthPages } from "@/shared/ui/Wrapper/NotAuthPages"
import { WrapperRectangleInput } from "@/shared/ui/Wrapper/RectangleInput"
import Input from "@/shared/ui/Input/Input"
import { EInputVariants } from "@/shared/ui/Input/model/input.model"
import { useRef } from "react"
import { useRouter } from "next/navigation"
import { useAppSelector } from "@/storage/hooks"


export const SignInChildrenPage = () => {
    // REF
    const formRef = useRef<HTMLFormElement>(null)

    // ROUTER
    const router = useRouter()

    //RTK
    const {email} = useAppSelector(state => state.user)


    //FUNCTIONS
    const LogIn = () => {

    }

    return (
        <WrapperNotAuthPages pageTitle="Вход в профиль" onSubmitFunc={LogIn} formRef={formRef} forgotPasswordButton>
            <WrapperRectangleInput
                labelText="Электронная почта"
                isRequired
                isDescriptionTooltip
                descriptionTooltipText="Введите адрес электронной почты, на которую был или будет зарегистрирован профиль"
                errorInputMessage="Введите корректный адрес электронной почты"
                
            >
                <Input.Text type="email" variant={EInputVariants.RECTANGULAR} placeholder="Введите email" name="email" defaultValue={email} success={!!email}/>
            </WrapperRectangleInput>
            <WrapperRectangleInput
                labelText="Пароль"
                isRequired
                warningTooltipText="Введите корректный пароль"
                bellowButtonText="Продолжить"
                errorInputMessage="Введите корректный пароль"
                onClickBellowButton={LogIn}
            >
                <Input.Text type="password" variant={EInputVariants.RECTANGULAR} placeholder="Введите пароль" name="password" />
            </WrapperRectangleInput>
        </WrapperNotAuthPages>
    )
}
