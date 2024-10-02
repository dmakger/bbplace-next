'use client'

import { UserAPI } from '@/entities/Auth/api/auth.api'
import cl from './_SignUpChildrenPage.module.scss'
import { BUYER_N_SUPPLIER_ROLE_ITEM_DATA, SUPPLIER_ROLE_ITEM_DATA } from "@/shared/data/roles.data"
import { getFormDataFromForm } from '@/shared/lib/formData.lib'
import Input from "@/shared/ui/Input/Input"
import { EInputVariants } from "@/shared/ui/Input/model/input.model"
import { WrapperForLogInNSupportPages } from "@/shared/ui/Wrapper/ForLogInNSupportPages"
import { WrapperRectangleInput } from "@/shared/ui/Wrapper/RectangleInput"
import { EInputsContainerDirection, ELabelPosition } from "@/shared/ui/Wrapper/RectangleInput/model/wrapperRectangleInput.model"
import { useRouter } from "next/navigation"
import { FormEvent, useEffect, useRef, useState } from "react"
import { CountryAPI } from '@/entities/Metrics/api/country.metrics.api'
import { ERadioVariant } from '@/shared/ui/Input/ui/Radio/model/radio.model'
import { PASSWORD_MATCHING_ERROR, PASSWORD_VALID_RULES, isPasswordValid } from '@/entities/Auth/data/password.data'
import { EMAIL_VALID_RULES, isEmailValid } from '@/entities/Auth/data/telNEmail.data'
import { FILL_THE_FIELD, SELECT_THE_COUNTRIES } from '@/entities/Auth/data/errorMessages.data'
import { IOption } from '@/shared/model/option.model'
import { getCountriesAsOption } from '@/features/Filter/lib/filter.lib'
import { ButtonType } from '@/shared/ui/Button/model/button.model'
import { MAIN_PAGES } from '@/config/pages-url.config'
import { useActionCreators, useAppSelector } from '@/storage/hooks'
import { EInputTextType } from '@/shared/ui/Input/ui/Text/data/text.input.data'
import { OFFERT_DOCUMENT } from '@/shared/data/documents.data'
import { ECurrentLK } from '@/entities/User/model/user.model'
import { saveCurrentLKTokenStorage } from '@/entities/User/lib/user-token.lib'
import { jwtDecode } from 'jwt-decode'
import { ILoginResponseDecoded } from '@/entities/Auth/model/auth.model'
import { saveTokensStorage } from '@/entities/Auth/lib/auth-token.lib'


export const SignUpChildrenPage = () => {

    //STATE
    const [error, setError] = useState<boolean>(false)
    const [errorEmail, setErrorEmail] = useState<string>('')
    const [errorCountry, setErrorCountry] = useState<string>('')
    const [errorPassword, setErrorPassword] = useState<string>('')
    const [errorFullName, setErrorFullName] = useState<string>('')
    const [errorOffert, setErrorOffert] = useState<string>('')

    const [countriesAsOption, setCountriesAsOption] = useState<IOption[]>([])
    const [selectedCountryAsOption, setSelectedCountryAsOption] = useState<IOption>();    

    //RTK
    const actionCreators = useActionCreators();
    const { prevPath, email } = useAppSelector(state => state.user)

    //REF
    const formRef = useRef<HTMLFormElement>(null)

    //ROUTER
    const router = useRouter()

    //API
    const [userRegistration, { isLoading }] = UserAPI.useUserRegistrationMutation();
    const [sendEmailConfirmation] = UserAPI.useSendEmailConfirmationMutation();
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

        const { email: emailValue, password, confirmPassword, fullName, role, emailSubscription, offert } = getFormDataFromForm(formRef?.current);

        const selectedCountryName: string = countriesAsOption.find(it => it.id == (selectedCountryAsOption)?.id)?.name ?? '';
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
        if (!selectedCountryAsOption) {
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
            const regData = await userRegistration(requestData).unwrap()
            saveTokensStorage(regData)            
            
            if (regData) {
                const userId = (jwtDecode(regData.accessToken) as ILoginResponseDecoded).UserId
                actionCreators.setAuth({
                    Country: selectedCountryName,
                    FullName: fullName,
                    UserName: fullName,
                    Role: role,
                    UserId: userId
                });
                actionCreators.setAuthOptional({
                    currentLK: ECurrentLK.BUYER
                })
                await sendEmailConfirmation(userId)
                
                saveCurrentLKTokenStorage(ECurrentLK.BUYER)
                router.replace(prevPath || MAIN_PAGES.HOME.path)
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
                <Input.Text type={EInputTextType.Email} defaultValue={email} required variant={EInputVariants.RECTANGULAR} placeholder="Введите email" name="email" error={!!errorEmail} warning={!!errorEmail} />
            </WrapperRectangleInput>
            <WrapperRectangleInput
                labelText="Страна"
                isRequired
                isDescriptionTooltip
                descriptionTooltipText={SELECT_THE_COUNTRIES}
                errorInputMessage={errorCountry}
            >
                <Input.TextAndSelect placeholder="Выберите страну" options={countriesAsOption} variant={EInputVariants.RECTANGULAR} required warning={error && !!errorCountry} error={error && !!errorCountry} arrowSizes={{ width: 16, height: 14 }} onClickOption={setSelectedCountryAsOption} isActiveOptionInInput
/>
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
                <Input.Text variant={EInputVariants.RECTANGULAR} required placeholder="Введите ваше ФИО" name="fullName" error={!!errorFullName} warning={!!errorFullName} />
            </WrapperRectangleInput>

            <WrapperRectangleInput labelText="Роль" descriptionTooltipText="Укажите, какую роль вы будете выполнять на платформе." isRequired direction={EInputsContainerDirection.ROW_WRAP}>
                <Input.Radio option={SUPPLIER_ROLE_ITEM_DATA} variant={EInputVariants.RECTANGULAR} name='role' required variantRadio={ERadioVariant.SINGLE} warning={!!error} error={!!error} />
                <Input.Radio option={SUPPLIER_ROLE_ITEM_DATA} variant={EInputVariants.RECTANGULAR} name='role' variantRadio={ERadioVariant.SINGLE} warning={!!error} error={!!error} />
                <Input.Radio option={BUYER_N_SUPPLIER_ROLE_ITEM_DATA} variant={EInputVariants.RECTANGULAR} name='role' variantRadio={ERadioVariant.SINGLE} warning={!!error} error={!!error} />
            </WrapperRectangleInput>

            <WrapperRectangleInput
                labelText="Хочу получать новости от платформы и её партнёров"
                labelPosition={ELabelPosition.RIGHT}
                descriptionTooltipText="Подтвердите для получения новостей и предложений"
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
                linkHref={MAIN_PAGES.CURRENT_DOCUMENT(OFFERT_DOCUMENT).path}
            >
                <Input.Checkbox variant={EInputVariants.RECTANGULAR} name="offert" error={!!errorOffert && error} required />
            </WrapperRectangleInput>
        </WrapperForLogInNSupportPages>
    )
}
