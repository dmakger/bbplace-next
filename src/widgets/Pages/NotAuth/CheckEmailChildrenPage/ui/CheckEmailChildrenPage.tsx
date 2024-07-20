'use client'

import { WrapperNotAuthPages } from "@/shared/ui/Wrapper/NotAuthPages"
import { WrapperRectangleInput } from "@/shared/ui/Wrapper/RectangleInput"
import Input from "@/shared/ui/Input/Input"
import { EInputVariants } from "@/shared/ui/Input/model/input.model"
import { UserAPI } from "@/entities/Auth/api/auth.api"
import { useRef, useState } from "react"
import { getFormData } from "@/shared/lib/formData.lib"
import { useRouter } from "next/navigation"
import { MAIN_PAGES } from "@/config/pages-url.config"
import { useActionCreators } from "@/storage/hooks"
import { EMAIL_VALID_RULES, isEmailValid } from "@/entities/Auth/data/email.data"
import { FILL_THE_FIELD } from "@/entities/Auth/data/errorMessages.data"

export const CheckEmailChildrenPage = () => {

    //STATE
    const [errorMessage, setErrorMessage] = useState<string>('')

    // REF
    const formRef = useRef<HTMLFormElement>(null)

    // ROUTER
    const router = useRouter()

    // API
    const [triggerCheckEmailExists, {isLoading}] = UserAPI.useLazyCheckEmailExistsQuery()

    //RTK
    const actionCreators = useActionCreators();

    // FUNCTIONS
    const CheckEmail = async () => {
        setErrorMessage('')
        if (!formRef.current) return;
        const {email} = getFormData(formRef.current)
        
        if(!email) return setErrorMessage(FILL_THE_FIELD)
        if(email && !isEmailValid(email)) return setErrorMessage(EMAIL_VALID_RULES)

        try {
            const isExists = await triggerCheckEmailExists(email).unwrap()
            
            if(isExists){
                isExists && router.push(MAIN_PAGES.LOGIN.path)
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
            }

            !isExists && router.push(MAIN_PAGES.REGISTRATION.path)
            
        } catch (error) {
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
                errorInputMessage={errorMessage}
                onClickBellowButton={CheckEmail}
                isLoadingBellowButton={isLoading}
            >
                <Input.Text type="email" variant={EInputVariants.RECTANGULAR} placeholder="Введите email" name="email" error={!!errorMessage} />
            </WrapperRectangleInput>
        </WrapperNotAuthPages>
    )
}
