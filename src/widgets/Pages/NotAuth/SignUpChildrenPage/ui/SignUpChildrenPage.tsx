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
import { ERadioVariant } from '@/shared/ui/Input/ui/Radio/model/radio.model'
import { PASSWORD_MATCHING_ERROR, PASSWORD_VALID_RULES, isPasswordValid } from '@/entities/Auth/data/password.data'


export const SignUpChildrenPage = () => {

    //STATE
    const [error, setError] = useState<boolean>(false)
    const [errorEmail, setErrorEmail] = useState<string>('')
    const [errorPassword, setErrorPassword] = useState<string>('')
    const [errorCountry, setErrorCountry] = useState<string>('')


    //REF
    const formRef = useRef<HTMLFormElement>(null)

    //ROUTER
    const router = useRouter()

    //API
    const [userRegistration] = UserAPI.useUserRegistrationMutation();
    const {data: countries} = CountryAPI.useGetCountriesQuery()    

    // FUNCTIONS
    const signUp = async() => {
        setError(true);
        setErrorPassword('');
        setErrorEmail('');
        setErrorCountry('');
        if (!formRef.current) return;

        const { email: emailValue, password, confirmPassword, role, news, country, offert } = getFormData(formRef?.current);

        let hasError = false;

        //EMAIL
        if (!emailValue) {
            setErrorEmail('Пожалуйста заполните поле');
            hasError = true;
        } else if (emailValue && (!emailValue.includes('@') || !emailValue.includes('.'))) {
            setErrorEmail('Введите корректный адрес электронной почты');
            hasError = true;
        }

        //PASSWORD        
        if (!password || !confirmPassword) {
            setErrorPassword('Пожалуйста заполните поле');
            hasError = true;
        } else if (password !== confirmPassword) {
            setErrorPassword(PASSWORD_MATCHING_ERROR);
            hasError = true;
        } else if (!isPasswordValid(password)) {
            setErrorPassword(PASSWORD_VALID_RULES);
            hasError = true;
        }

        //COUNTRY
        if (!country) {
            setErrorCountry('Выберите страну из списка');
            hasError = true;
        }
        

        if (hasError) return;

        try {
            const regData = await userRegistration({
                email: emailValue,
                password: password,
                role: 'Buyer',
                country: '',
                legalName: '',
                brandName: '',
                fullName: '',
                phoneNumber: '',
                emailSubscription: 'true'
            }).unwrap();
            
            // if(data){
            //     actionCreators.setAuth(data);
            //     router.push(MAIN_PAGES.HOME)
            // }
        }
        catch(e: any) {
            setError(e);           
        }
    }
    
    
    return (
        <WrapperNotAuthPages pageTitle="Регистрация профиля" onSubmitFunc={signUp} formRef={formRef} >
            <WrapperRectangleInput
                labelText="Электронная почта"
                isRequired
                errorInputMessage={errorEmail}
            >
                <Input.Text type="email" variant={EInputVariants.RECTANGULAR} placeholder="Введите email" name="email" error={!!errorEmail} warning={!!errorEmail}/>
            </WrapperRectangleInput>
            <WrapperRectangleInput
                labelText="Страна"
                isRequired
                isDescriptionTooltip
                descriptionTooltipText="Выберите страну из списка"
                errorInputMessage="Выберите страну из списка"
            >
                <Input.TextAndSelect placeholder="Выберите страну" listOptions={countries} variant={EInputVariants.RECTANGULAR} name="country" required warning={!!error} error={!!error}/>
            </WrapperRectangleInput>
            <WrapperRectangleInput
                labelText="Пароль"
                isRequired
                errorInputMessage={errorPassword}
                
            >
                <Input.Text type="password" variant={EInputVariants.RECTANGULAR} placeholder="Введите пароль" name="password" required error={error && !!errorPassword} warning={error && !!errorPassword} />
            </WrapperRectangleInput>
            <WrapperRectangleInput
                labelText="Подтверждение пароля"
                isRequired
                errorInputMessage={errorPassword}
            >
                <Input.Text type="password" variant={EInputVariants.RECTANGULAR} placeholder="Введите пароль еще раз" name="confirmPassword" required warning={error && !!errorPassword} error={error && !!errorPassword}/>
            </WrapperRectangleInput>

            <WrapperRectangleInput labelText="Роль" descriptionTooltipText="Выберите роль" isRequired classNameDescriptionWindow={cl.descriptionWindow}>
                    <Input.Radio option={SUPPLIER_ROLE_ITEM_DATA} variant={EInputVariants.RECTANGULAR} name='role' required variantRadio={ERadioVariant.SINGLE} warning={!!error} error={!!error}/>
                    <Input.Radio option={SELLER_ROLE_ITEM_DATA} variant={EInputVariants.RECTANGULAR} name='role' variantRadio={ERadioVariant.SINGLE} warning={!!error} error={!!error}/>
                    <Input.Radio option={SELLER_N_SUPPLIER_ROLE_ITEM_DATA} variant={EInputVariants.RECTANGULAR} name='role' variantRadio={ERadioVariant.SINGLE} warning={!!error} error={!!error}/>
            </WrapperRectangleInput>

            <WrapperRectangleInput
                labelText="Хочу получать новости от платформы и её партнёров"
                labelPosition={ELabelPosition.RIGHT}
                descriptionTooltipText="НОВОСТИ"
            >
                <Input.Checkbox variant={EInputVariants.RECTANGULAR} name="news" warning={!!error} />
            </WrapperRectangleInput>
            <WrapperRectangleInput
                labelText="Я ознакомился и принимаю оферту"
                labelPosition={ELabelPosition.RIGHT}
                isRequired
                onClickBellowButton={signUp}
                bellowButtonText="Зарегистрировать"
                
                
            >
                <Input.Checkbox variant={EInputVariants.RECTANGULAR} name="offert" error={error} required/>
            </WrapperRectangleInput>
        </WrapperNotAuthPages>
    )
}
