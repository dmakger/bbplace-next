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
import { useActionCreators } from "@/storage/hooks"

export const CheckEmailChildrenPage = () => {
    // REF
    const formRef = useRef<HTMLFormElement>(null)

    // ROUTER
    const router = useRouter()

    // API
    const [triggerCheckEmailExists] = UserAPI.useLazyCheckEmailExistsQuery()

    //RTK
    const actionCreators = useActionCreators();

    // FUNCTIONS
    const CheckEmail = async () => {
        const formData = getFormData(formRef.current)
        try {
            const isExists = await triggerCheckEmailExists(formData.email).unwrap()
            
            if(isExists){
                isExists && router.push(MAIN_PAGES.LOGIN)
                actionCreators.setAuth({
                    UserName: formData.email,
                    UserId: "",
                    FullName: "",
                    LegalName: "",
                    BrandName: "",
                    Role: "",
                    MobilePhone: "",
                    Country: ""
                })
            }

            !isExists && router.push(MAIN_PAGES.REGISTRATION)
            
        } catch (error) {
            console.error('Error checking email:', error)
        }
    }

    return (
        <WrapperNotAuthPages pageTitle="Вход или регистрация профиля" onSubmitFunc={CheckEmail} formRef={formRef}>
            <WrapperRectangleInput
                labelText="Электронная почта"
                isRequired
                isDescriptionTooltip
                descriptionTooltipText="Введите адрес электронной почты, на которую был или будет зарегистрирован профиль"
                bellowButtonText="Продолжить"
                errorInputMessage="Введите корректный адрес электронной почты"
                onClickBellowButton={CheckEmail}
            >
                <Input.Text type="email" variant={EInputVariants.RECTANGULAR} placeholder="Введите email" name="email" />
            </WrapperRectangleInput>
        </WrapperNotAuthPages>
    )
}
