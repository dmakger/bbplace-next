'use client'

import { UserAPI } from '@/entities/Auth/api/auth.api'
import cl from './_SignUpChildrenPage.module.scss'
import { SELLER_N_SUPPLIER_ROLE_ITEM_DATA, SELLER_ROLE_ITEM_DATA, SUPPLIER_ROLE_ITEM_DATA } from "@/shared/data/roles.data"
import { getFormData } from '@/shared/lib/formData.lib'
import Input from "@/shared/ui/Input/Input"
import { EInputVariants } from "@/shared/ui/Input/model/input.model"
import { WrapperNotAuthPages } from "@/shared/ui/Wrapper/NotAuthPages"
import { WrapperRectangleInput } from "@/shared/ui/Wrapper/RectangleInput"
import { ELabelPosition } from "@/shared/ui/Wrapper/RectangleInput/model/wrapperRectangleInput.model"
import { useRouter } from "next/navigation"
import { useRef, useState } from "react"
import { CountryAPI } from '@/entities/Metrics/api/country.metrics.api'
import { EVariantRadio } from '@/shared/ui/Input/ui/Radio/model/radio.model'


export const SignUpChildrenPage = () => {

    //STATE
    const [error, setError] = useState<number>()

    //REF
    const formRef = useRef<HTMLFormElement>(null)

    //ROUTER
    const router = useRouter()

    //API
    const [userRegistration] = UserAPI.useUserRegistrationMutation();
    const {data: countries} = CountryAPI.useGetCountriesQuery()    

    // FUNCTIONS
    const signUp = async() => {
        if (!formRef.current) return;
        const data = getFormData(formRef?.current)


        console.log(data);
        
        try{
            const regData = await userRegistration({
                email: data.email,
                password: data.password,
                role: 'Buyer',
                country: '',
                legalName: '',
                brandName: '',
                fullName: '',
                phoneNumber: '',
                emailSubscription: 'true'
            }).unwrap()

            console.log(regData);
            
            // if(data){
            //     actionCreators.setAuth(data);
            //     router.push(MAIN_PAGES.HOME)
            // }
        }
        catch(e: any){
            setError(e)
            console.log(e);
            
        }
    }

    return (
        <WrapperNotAuthPages pageTitle="Регистрация профиля" onSubmitFunc={signUp} formRef={formRef} >
            <WrapperRectangleInput
                labelText="Электронная почта"
                isRequired
                errorInputMessage="Введите корректный адрес электронной почты"
            >
                <Input.Text type="email" variant={EInputVariants.RECTANGULAR} placeholder="Введите email" name="email" error={!!error} warning={!!error}/>
            </WrapperRectangleInput>
            <WrapperRectangleInput
                labelText="Страна"
                isRequired
                isDescriptionTooltip
                descriptionTooltipText="Выберите страну из списка"
                errorInputMessage="Выберите страну из списка"
            >
                <Input.TextAndSelect placeholder="Выберите страну" listOptions={countries} variant={EInputVariants.RECTANGULAR} name="country" required warning={!!error}/>
            </WrapperRectangleInput>
            <WrapperRectangleInput
                labelText="Пароль"
                isRequired
                errorInputMessage="ПАРОЛЬ"
            >
                <Input.Text type="password" variant={EInputVariants.RECTANGULAR} placeholder="Введите пароль" name="password" required error={!!error} warning={!!error}/>
            </WrapperRectangleInput>
            <WrapperRectangleInput
                labelText="Подтверждение пароля"
                isRequired
                errorInputMessage="ПАРОЛЬ"
            >
                <Input.Text type="password" variant={EInputVariants.RECTANGULAR} placeholder="Введите пароль еще раз" name="confirmPassword" required error={!!error} warning={!!error}/>
            </WrapperRectangleInput>

            <WrapperRectangleInput labelText="Роль" descriptionTooltipText="Выберите роль" isRequired classNameDescriptionWindow={cl.descriptionWindow}>
                    <Input.Radio option={SUPPLIER_ROLE_ITEM_DATA} variant={EInputVariants.RECTANGULAR} name='role' required variantRadio={EVariantRadio.SINGLE} warning={!!error} error={!!error}/>
                    <Input.Radio option={SELLER_ROLE_ITEM_DATA} variant={EInputVariants.RECTANGULAR} name='role' variantRadio={EVariantRadio.SINGLE} warning={!!error} error={!!error}/>
                    <Input.Radio option={SELLER_N_SUPPLIER_ROLE_ITEM_DATA} variant={EInputVariants.RECTANGULAR} name='role' variantRadio={EVariantRadio.SINGLE} warning={!!error} error={!!error}/>
            </WrapperRectangleInput>

            <WrapperRectangleInput
                labelText="Хочу получать новости от платформы и её партнёров"
                labelPosition={ELabelPosition.RIGHT}
                descriptionTooltipText="НОВОСТИ"
            >
                <Input.Checkbox variant={EInputVariants.RECTANGULAR} name="news" required warning={!!error}/>
            </WrapperRectangleInput>
            <WrapperRectangleInput
                labelText="Я ознакомился и принимаю оферту"
                labelPosition={ELabelPosition.RIGHT}
                isRequired
                onClickBellowButton={signUp}
                bellowButtonText="Зарегистрировать"
                
            >
                <Input.Checkbox variant={EInputVariants.RECTANGULAR} name="offert" warning={!!error}/>
            </WrapperRectangleInput>
        </WrapperNotAuthPages>
    )
}
