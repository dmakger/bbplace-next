'use client'

import { PaymentFormInfo } from '@/features/Payment'
import { IOption } from "@/shared/model/option.model"
import { ButtonType } from '@/shared/ui/Button/model/button.model'
import Input from "@/shared/ui/Input/Input"
import { EInputVariants } from "@/shared/ui/Input/model/input.model"
import { WrapperForLogInNSupportPages } from "@/shared/ui/Wrapper/ForLogInNSupportPages"
import { WrapperRectangleInput } from "@/shared/ui/Wrapper/RectangleInput"
import { useAppSelector } from '@/storage/hooks'
import { FormEvent, useEffect, useState } from "react"
import { TYPE_TARIFFS_OPTIONS_ARRAY } from "../../Tariffs"
import { TARIFFS_OPTIONS_ARRAY } from '../../Tariffs/data/tariffs.data'
import { ETTVariants } from '../../Tariffs/model/tariffs.model'
import { PAYMENT_BY_CARD_OPTION, PAYMENT_BY_PAYMENT_ACCOUNT_OPTION, PAYMENT_CURRENCY_ERRORS_MESSAGE, PAYMENT_CURRENCY_OPTIONS_ARRAY, PAYMENT_METHOD_ERRORS_MESSAGE, PAYMENT_METHOD_OPTIONS_ARRAY, TARIFFS_DURATION_ERRORS_MESSAGE, TARIFFS_TYPE_ERRORS_MESSAGE } from "../data/payment.data"
import { getSelectedTariffsInfo } from '../lib/payment.lib'
import cl from './_PaymentChildrenPage.module.scss'
import { PaymentAPI } from '@/entities/Payment/api/payment.api'
import { useRouter } from 'next/navigation'


export const PaymentChildrenPage = () => {

    //RTK
    const { tariffsType: tariffsVariant } = useAppSelector(state => state.payment)

    //STATE
    const [tariffsState, setTariffsState] = useState<{ type: IOption, duration: IOption }>({
        type: TARIFFS_OPTIONS_ARRAY[tariffsVariant]?.type ?? {} as IOption,
        duration: {} as IOption
    })
    const [tariffsDurationOptions, setTariffsDurationOptions] = useState<IOption[]>(TARIFFS_OPTIONS_ARRAY[tariffsState.type.value as ETTVariants]?.duration || [])

    const [paymentState, setPaymentState] = useState<{ method: IOption, currency: IOption }>({
        method: {} as IOption,
        currency: {} as IOption
    })
    const [error, setError] = useState<boolean>(false)
    const [errorTariffsState, setErrorTariffsState] = useState<{ type?: string, duration?: string }>({
        type: '',
        duration: ''
    })

    const [errorPaymentsState, setErrorPaymentsState] = useState<{ method?: string, currency?: string }>({
        method: '',
        currency: ''
    })
    const [selectedTariff, setSelectedTariff] = useState<string>('')

    //API
    const { data: link, isSuccess } = PaymentAPI.useGetItemsIdQuery(selectedTariff, { skip: !selectedTariff });

    //ROUTER
    const router = useRouter();

    //EFFECT

    useEffect(() => {
        if(isSuccess && link.link && selectedTariff){
            router.push(link.link)
        }
    },[selectedTariff, isSuccess, link])


    //FUNCTION

    const submit = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setError(true);
        setErrorTariffsState({
            type: '',
            duration: ''
        });
        setErrorPaymentsState({
            method: '',
            currency: ''
        });

        let hasError = false;

        //TARIFFS
        if (Object.keys(tariffsState.type).length === 0) {
            setErrorTariffsState({
                type: TARIFFS_TYPE_ERRORS_MESSAGE,
            });
            hasError = true;
        }
        else if (Object.keys(tariffsState.duration).length === 0) {
            setErrorTariffsState({
                duration: TARIFFS_DURATION_ERRORS_MESSAGE
            });
            hasError = true;
        }
        //PAYMENT
        if (Object.keys(paymentState.method).length === 0) {
            setErrorPaymentsState({
                method: PAYMENT_METHOD_ERRORS_MESSAGE,
            });
            hasError = true;
        }
        else if (Object.keys(paymentState.currency).length === 0  && paymentState.method !== PAYMENT_BY_CARD_OPTION) {
            setErrorPaymentsState({
                currency: PAYMENT_CURRENCY_ERRORS_MESSAGE
            });
            hasError = true;
        }
        if (hasError) return;

        setSelectedTariff('1')


    }

    const getSelectedType = (option: IOption) => {
        if (option !== tariffsState.type) {
            setTariffsState({ type: option, duration: {} as IOption });
            setTariffsDurationOptions([])
            const key = option?.value as ETTVariants;
            setTariffsDurationOptions(TARIFFS_OPTIONS_ARRAY[key]?.duration || [])
        }
    }

    const getSelectedTypeDuration = (option: IOption) => {
        setTariffsState(prev => ({ ...prev, duration: option }));
    };

    const getSelectedPaymentMethod = (option: IOption) => {
        if (option.name === PAYMENT_BY_CARD_OPTION.name) {
            return setPaymentState({ method: option, currency: {} as IOption })
        }
        setPaymentState({ method: option, currency: {} as IOption })
    }    

    return (
        <WrapperForLogInNSupportPages
            pageTitle="Оформление покупки"
            onSubmitFunc={submit}
        >
            <WrapperRectangleInput
                labelText="Тарифный план"
                isRequired
                errorInputMessage={errorTariffsState.type || errorTariffsState.duration}
            >
                <Input.Select
                    variant={EInputVariants.RECTANGULAR}
                    className={cl.lowWidth}
                    options={TYPE_TARIFFS_OPTIONS_ARRAY}
                    required
                    placeholder="Тип"
                    defaultOption={tariffsState.type}
                    onClickOption={getSelectedType}
                    error={error && !!errorTariffsState.type}
                    warning={error && !!errorTariffsState.type}
                />
                <Input.Select
                    variant={EInputVariants.RECTANGULAR}
                    className={cl.highWidth}
                    options={tariffsDurationOptions}
                    disabled={Object.keys(tariffsState.type).length === 0}
                    defaultOption={tariffsState.duration}
                    required
                    placeholder="Длительность"
                    onClickOption={getSelectedTypeDuration}
                    error={error && !!errorTariffsState.duration}
                    warning={error && !!errorTariffsState.duration}
                />

            </WrapperRectangleInput>
            <WrapperRectangleInput
                labelText="Перевод платежа"
                isRequired
                isDescriptionTooltip
                descriptionTooltipText="Реквизиты расчетного счета будут отправлены на электронную почту."
                bellowButtonText="Оплатить"
                bellowButtonType={ButtonType.Submit}
                infoChildren={
                    <PaymentFormInfo
                        title={!Object.keys(tariffsState.duration).length ? 'Лучшее предложение:' : 'Итого'}
                        mainText={getSelectedTariffsInfo(tariffsState, 'mainText')}
                        footerText={getSelectedTariffsInfo(tariffsState, 'footerText')}
                        tariffsType={tariffsState.type}
                    />}
                errorInputMessage={errorPaymentsState.method || errorPaymentsState.currency}

            >
                <Input.Select
                    variant={EInputVariants.RECTANGULAR}
                    className={cl.highWidth}
                    options={PAYMENT_METHOD_OPTIONS_ARRAY}
                    required
                    placeholder="Способ оплаты"
                    onClickOption={getSelectedPaymentMethod}
                    error={error && !!errorPaymentsState.method}
                    warning={error && !!errorPaymentsState.method}
                />
                <Input.Select
                    variant={EInputVariants.RECTANGULAR}
                    className={cl.lowWidth}
                    options={PAYMENT_CURRENCY_OPTIONS_ARRAY}
                    defaultOption={paymentState.currency}
                    placeholder="Валюта"
                    disabled={paymentState.method !== PAYMENT_BY_PAYMENT_ACCOUNT_OPTION}
                    error={error && !!errorPaymentsState.currency}
                    warning={error && !!errorPaymentsState.currency}
                />

            </WrapperRectangleInput>
        </WrapperForLogInNSupportPages>
    )
}
