'use client'

import { UserAPI } from '@/entities/Auth/api/auth.api'
import cl from './_SignUpChildrenPage.module.scss'
import { SELLER_N_SUPPLIER_ROLE_ITEM_DATA, SELLER_ROLE_ITEM_DATA, SUPPLIER_ROLE_ITEM_DATA } from "@/shared/data/roles.data"
import { getFormDataFromForm } from '@/shared/lib/formData.lib'
import Input from "@/shared/ui/Input/Input"
import { EInputVariants } from "@/shared/ui/Input/model/input.model"
import { WrapperForLogInNSupportPages } from "@/shared/ui/Wrapper/ForLogInNSupportPages"
import { WrapperRectangleInput } from "@/shared/ui/Wrapper/RectangleInput"
import { ELabelPosition } from "@/shared/ui/Wrapper/RectangleInput/model/wrapperRectangleInput.model"
import { useRouter } from "next/navigation"
import { FormEvent, useEffect, useRef, useState } from "react"
import { CountryAPI } from '@/entities/Metrics/api/country.metrics.api'
import { ERadioVariant } from '@/shared/ui/Input/ui/Radio/model/radio.model'
import { PASSWORD_MATCHING_ERROR, PASSWORD_VALID_RULES, isPasswordValid } from '@/entities/Auth/data/password.data'
import { EMAIL_VALID_RULES, isEmailValid } from '@/entities/Auth/data/email.data'
import { FILL_THE_FIELD, SELECT_THE_COUNTRIES } from '@/entities/Auth/data/errorMessages.data'
import { IOption } from '@/shared/model/option.model'
import { getCountriesAsOption } from '@/features/Filter/lib/filter.lib'
import { ButtonType } from '@/shared/ui/Button/model/button.model'
import { MAIN_PAGES } from '@/config/pages-url.config'
import { useActionCreators } from '@/storage/hooks'
import { EInputTextType } from '@/shared/ui/Input/ui/Text/data/text.input.data'


export const SignUpChildrenPage = () => {

    //STATE
    const [error, setError] = useState<boolean>(false)
    const [errorEmail, setErrorEmail] = useState<string>('')
    const [errorCountry, setErrorCountry] = useState<string>('')
    const [errorPassword, setErrorPassword] = useState<string>('')
    const [errorFullName, setErrorFullName] = useState<string>('')
    const [errorOffert, setErrorOffert] = useState<string>('')

    const [countriesAsOption, setCountriesAsOption] = useState<IOption[]>([])

    //RTK
    const actionCreators = useActionCreators();

    //REF
    const formRef = useRef<HTMLFormElement>(null)

    //ROUTER
    const router = useRouter()

    //API
    const [userRegistration, { isLoading }] = UserAPI.useUserRegistrationMutation();
    const { data: countries } = CountryAPI.useGetCountriesQuery()

    //EFFECT
    useEffect(() => {
        if (countries)
            setCountriesAsOption(getCountriesAsOption(countries).filter(it => it.name !== 'Все страны'))
    }, [countries])

    // FUNCTIONS
    const signUp = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setError(true);
        setErrorEmail('');
        setErrorCountry('');
        setErrorPassword('');
        setErrorFullName('');
        setErrorOffert('');

        if (!formRef.current) return;

        const { email: emailValue, country, password, confirmPassword, fullName, role, emailSubscription, offert } = getFormDataFromForm(formRef?.current);

        const selectedCountryName: string = countriesAsOption.find(it => it.id == country)?.name ?? '';

        let hasError = false;

        //EMAIL
        if (!emailValue) {
            setErrorEmail(FILL_THE_FIELD);
            hasError = true;
        } else if (emailValue && !isEmailValid(emailValue)) {
            setErrorEmail(EMAIL_VALID_RULES);
            hasError = true;
        }

        //COUNTRY
        if (!country) {
            setErrorCountry(SELECT_THE_COUNTRIES);
            hasError = true;
        }

        //PASSWORD        
        if (!password || !confirmPassword) {
            setErrorPassword(FILL_THE_FIELD);
            hasError = true;
        } else if (password !== confirmPassword) {
            setErrorPassword(PASSWORD_MATCHING_ERROR);
            hasError = true;
        } else if (!isPasswordValid(password)) {
            setErrorPassword(PASSWORD_VALID_RULES);
            hasError = true;
        }

        //FULL_NAME
        if (!fullName) {
            setErrorFullName(FILL_THE_FIELD)
            hasError = true;
        }

        //OFFERT
        if (!offert) {
            setErrorOffert(' ')
            hasError = true;
        }

        if (hasError) return;

        const requestData = {
            email: emailValue,
            password: password,
            role: role,
            country: selectedCountryName,
            fullName: fullName,
            emailSubscription: emailSubscription === 'on' ? true : false,
        };


        try {
            const regData = await userRegistration(requestData).unwrap();

            if (regData) {
                actionCreators.setAuth(regData);
                router.replace(MAIN_PAGES.HOME.path)
            }
        } catch (e: any) {
            e.data.message === 'User already exists!' && setErrorEmail('Пользователь с такой почтой уже зарегистрирован')
            setError(e);
        }
    }

    return (
        <WrapperForLogInNSupportPages pageTitle="Регистрация профиля" onSubmitFunc={signUp} formRef={formRef} >
            <WrapperRectangleInput
                labelText="Электронная почта"
                isRequired
                errorInputMessage={errorEmail}
            >
                <Input.Text type={EInputTextType.Email} variant={EInputVariants.RECTANGULAR} placeholder="Введите email" name="email" error={!!errorEmail} warning={!!errorEmail} />
            </WrapperRectangleInput>
            <WrapperRectangleInput
                labelText="Страна"
                isRequired
                isDescriptionTooltip
                descriptionTooltipText={SELECT_THE_COUNTRIES}
                errorInputMessage={errorCountry}
            >
                <Input.TextAndSelect placeholder="Выберите страну" options={countriesAsOption} variant={EInputVariants.RECTANGULAR} name="country" required warning={error && !!errorCountry} error={error && !!errorCountry} arrowSizes={{ width: 16, height: 14 }} />
            </WrapperRectangleInput>
            <WrapperRectangleInput
                labelText="Пароль"
                isRequired
                errorInputMessage={errorPassword}
            >
                <Input.Text type={EInputTextType.Password} variant={EInputVariants.RECTANGULAR} placeholder="Введите пароль" name="password" required error={error && !!errorPassword} warning={error && !!errorPassword} />
            </WrapperRectangleInput>
            <WrapperRectangleInput
                labelText="Подтверждение пароля"
                isRequired
                errorInputMessage={errorPassword}
            >
                <Input.Text type={EInputTextType.Password} variant={EInputVariants.RECTANGULAR} placeholder="Введите пароль еще раз" name="confirmPassword" required warning={error && !!errorPassword} error={error && !!errorPassword} />
            </WrapperRectangleInput>

            <WrapperRectangleInput
                labelText="ФИО"
                isRequired
            >
                <Input.Text variant={EInputVariants.RECTANGULAR} placeholder="Введите ваше ФИО" name="fullName" error={!!errorFullName} warning={!!errorFullName} />
            </WrapperRectangleInput>

            <WrapperRectangleInput labelText="Роль" descriptionTooltipText="Выберите роль" isRequired classNameInputsContainer={cl.radioInputsContainer} classNameDescriptionWindow={cl.descriptionWindow}>
                <Input.Radio option={SUPPLIER_ROLE_ITEM_DATA} variant={EInputVariants.RECTANGULAR} name='role' required variantRadio={ERadioVariant.SINGLE} warning={!!error} error={!!error} />
                <Input.Radio option={SELLER_ROLE_ITEM_DATA} variant={EInputVariants.RECTANGULAR} name='role' variantRadio={ERadioVariant.SINGLE} warning={!!error} error={!!error} />
                <Input.Radio option={SELLER_N_SUPPLIER_ROLE_ITEM_DATA} variant={EInputVariants.RECTANGULAR} name='role' variantRadio={ERadioVariant.SINGLE} warning={!!error} error={!!error} />
            </WrapperRectangleInput>

            <WrapperRectangleInput
                labelText="Хочу получать новости от платформы и её партнёров"
                labelPosition={ELabelPosition.RIGHT}
                descriptionTooltipText="НОВОСТИ"
                classNameLabel={cl.labelNews}
            >
                <Input.Checkbox variant={EInputVariants.RECTANGULAR} name="emailSubscription" warning={!!error} />
            </WrapperRectangleInput>
            <WrapperRectangleInput
                labelText="Я ознакомился и принимаю оферту"
                labelPosition={ELabelPosition.RIGHT}
                isRequired
                onClickBellowButton={signUp}
                bellowButtonType={ButtonType.Submit}
                isLoadingBellowButton={isLoading}
                bellowButtonText="Зарегистрировать"
                linkText='Оферта'
                linkHref=''
            >
                <Input.Checkbox variant={EInputVariants.RECTANGULAR} name="offert" error={!!errorOffert && error} required />
            </WrapperRectangleInput>
        </WrapperForLogInNSupportPages>
    )
}
