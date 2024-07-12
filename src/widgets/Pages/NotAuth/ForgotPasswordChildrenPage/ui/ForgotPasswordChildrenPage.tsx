'use client'

import { WrapperNotAuthPages } from "@/shared/ui/Wrapper/NotAuthPages"
import { WrapperRectangleInput } from "@/shared/ui/Wrapper/RectangleInput"
import Input from "@/shared/ui/Input/Input"
import { EInputVariants } from "@/shared/ui/Input/model/input.model"
import { UserAPI } from "@/entities/Auth/api/auth.api"
import { useRef } from "react"
import { getFormData } from "@/shared/lib/formData.lib"
import { useRouter } from "next/navigation"
import { MAIN_PAGES } from "@/config/pages-url.config"
import { useAppSelector } from "@/storage/hooks"

export const ForgotPasswordChildrenPage = () => {
    // REF
    const formRef = useRef<HTMLFormElement>(null)

    // ROUTER
    const router = useRouter()

    // API


    //RTK
    const {email} = useAppSelector(state => state.user)


    // FUNCTIONS
    const resetPassword = () => {

    }

    return (
        <WrapperNotAuthPages pageTitle="Восстановление пароля" onSubmitFunc={resetPassword} formRef={formRef}>
            <WrapperRectangleInput
                labelText="Электронная почта"
                isRequired
                bellowButtonText="Восстановить"
                errorInputMessage="Введите корректный адрес электронной почты"
                onClickBellowButton={resetPassword}
            >
                <Input.Text type="email" variant={EInputVariants.RECTANGULAR} placeholder="Введите email" name="email" defaultValue={email}/>
            </WrapperRectangleInput>
        </WrapperNotAuthPages>
    )
}
