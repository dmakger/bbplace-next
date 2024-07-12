'use client'

import Input from "@/shared/ui/Input/Input"
import { EInputVariants } from "@/shared/ui/Input/model/input.model"
import { WrapperNotAuthPages } from "@/shared/ui/Wrapper/NotAuthPages"
import { WrapperRectangleInput } from "@/shared/ui/Wrapper/RectangleInput"
import { ELabelPosition } from "@/shared/ui/Wrapper/RectangleInput/model/wrapperRectangleInput.model"
import { useRouter } from "next/navigation"
import { useRef } from "react"


export const SignUpChildrenPage = () => {
    // REF
    const formRef = useRef<HTMLFormElement>(null)

    // ROUTER
    const router = useRouter()

    // API




    // FUNCTIONS
    const signUp = () => {

    }

    return (
        <WrapperNotAuthPages pageTitle="Регистрация профиля" onSubmitFunc={signUp} formRef={formRef}>
            <WrapperRectangleInput
                labelText="Электронная почта"
                isRequired
                errorInputMessage="Введите корректный адрес электронной почты"
            >
                <Input.Text type="email" variant={EInputVariants.RECTANGULAR} placeholder="Введите email" name="email" />
            </WrapperRectangleInput>
            <WrapperRectangleInput
                labelText="Страна"
                isRequired
                isDescriptionTooltip
                descriptionTooltipText="Выберите страну из списка"
                errorInputMessage="Выберите страну из списка"
            >
                <Input.TextAndSelect placeholder="Выберите страну" variant={EInputVariants.RECTANGULAR} name="country" />
            </WrapperRectangleInput>
            <WrapperRectangleInput
                labelText="Пароль"
                isRequired
                errorInputMessage="ПАРОЛЬ"
            >
                <Input.Text type="password" variant={EInputVariants.RECTANGULAR} placeholder="Введите пароль" name="password" />
            </WrapperRectangleInput>
            <WrapperRectangleInput
                labelText="Подтверждение пароля"
                isRequired
                errorInputMessage="ПАРОЛЬ"
            >
                <Input.Text type="password" variant={EInputVariants.RECTANGULAR} placeholder="Введите пароль еще раз" name="confirmPassword" />
            </WrapperRectangleInput>
            <WrapperRectangleInput
                labelText="Хочу получать новости от платформы и её партнёров"
                labelPosition={ELabelPosition.RIGHT}
                descriptionTooltipText="НОВОСТИ"
            >
                <Input.Checkbox variant={EInputVariants.RECTANGULAR} name="news" />
            </WrapperRectangleInput>
            <WrapperRectangleInput
                labelText="Я ознакомился и принимаю оферту"
                labelPosition={ELabelPosition.RIGHT}
                isRequired
                onClickBellowButton={signUp}
                bellowButtonText="Зарегистрировать"
            >
                <Input.Checkbox variant={EInputVariants.RECTANGULAR} name="offert" />
            </WrapperRectangleInput>
        </WrapperNotAuthPages>
    )
}
