'use client'

import { PaymentFormInfo } from '@/features/Payment';
import { IOption } from "@/shared/model/option.model";
import { ButtonType } from '@/shared/ui/Button/model/button.model';
import Input from "@/shared/ui/Input/Input";
import { EInputVariants } from "@/shared/ui/Input/model/input.model";
import { WrapperForLogInNSupportPages } from "@/shared/ui/Wrapper/ForLogInNSupportPages";
import { WrapperRectangleInput } from "@/shared/ui/Wrapper/RectangleInput";
import { FormEvent, useEffect, useState, useCallback, useMemo } from "react";
import { TYPE_TARIFFS_OPTIONS_ARRAY } from "../../Tariffs";
import { TARIFFS_OPTIONS_ARRAY } from '../../Tariffs/data/tariffs.data';
import { ETTVariants } from '../../Tariffs/model/tariffs.model';
import {
    PAYMENT_BY_CARD_OPTION,
    PAYMENT_BY_PAYMENT_ACCOUNT_OPTION,
    PAYMENT_CURRENCY_ERRORS_MESSAGE,
    PAYMENT_CURRENCY_OPTIONS_ARRAY,
    PAYMENT_METHOD_ERRORS_MESSAGE,
    PAYMENT_METHOD_OPTIONS_ARRAY,
    TARIFFS_DURATION_ERRORS_MESSAGE,
    TARIFFS_TYPE_ERRORS_MESSAGE
} from "../data/payment.data";
import { getSelectedTariffsInfo } from '../lib/payment.lib';
import cl from './_PaymentChildrenPage.module.scss';
import { PaymentAPI } from '@/entities/Payment/api/payment.api';
import { useRouter } from 'next/navigation';
import { WrapperAuth } from '@/shared/ui/Wrapper/Auth/WrapperAuth';

export const PaymentChildrenPage = () => {

    //STATE
    const [tariffsState, setTariffsState] = useState(() => ({
        type: TARIFFS_OPTIONS_ARRAY[sessionStorage.getItem('selectedTariff') as ETTVariants]?.type ?? {} as IOption,
        duration: {} as IOption
    }));

    const tariffsDurationOptions = useMemo(
        () => TARIFFS_OPTIONS_ARRAY[tariffsState.type.value as ETTVariants]?.duration || [],
        [tariffsState.type]
    );

    const [paymentState, setPaymentState] = useState({
        method: {} as IOption,
        currency: {} as IOption
    });

    const [errors, setErrors] = useState({
        tariffs: { type: '', duration: '' },
        payments: { method: '', currency: '' }
    });

    const [selectedTariff, setSelectedTariff] = useState('');

    //API
    const { data: link, isSuccess } = PaymentAPI.useGetItemsIdQuery(selectedTariff, { skip: !selectedTariff });

    //ROUTER
    const router = useRouter();

    //EFFECT
    useEffect(() => {
        if (isSuccess && link?.link && selectedTariff) {
            router.push(link.link);
        }
    }, [selectedTariff, isSuccess, link]);

    //HANDLERS
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let hasError = false;

        const updatedErrors = {
            tariffs: { type: '', duration: '' },
            payments: { method: '', currency: '' }
        };

        //TARIFFS
        if (Object.keys(tariffsState.type).length === 0) {
            updatedErrors.tariffs.type = TARIFFS_TYPE_ERRORS_MESSAGE;
            hasError = true;
        } else if (Object.keys(tariffsState.duration).length === 0) {
            updatedErrors.tariffs.duration = TARIFFS_DURATION_ERRORS_MESSAGE;
            hasError = true;
        }

        //PAYMENTS
        if (Object.keys(paymentState.method).length === 0) {
            updatedErrors.payments.method = PAYMENT_METHOD_ERRORS_MESSAGE;
            hasError = true;
        } else if (Object.keys(paymentState.currency).length === 0 && paymentState.method !== PAYMENT_BY_CARD_OPTION) {
            updatedErrors.payments.currency = PAYMENT_CURRENCY_ERRORS_MESSAGE;
            hasError = true;
        }

        if (hasError) {
            setErrors(updatedErrors);
            return;
        }

        sessionStorage.removeItem('selectedTariff');
        setSelectedTariff('1');
    }

    const handleTariffTypeSelect = (option: IOption) => {
        if (option !== tariffsState.type) {
            setTariffsState({ type: option, duration: {} as IOption });
        }
    }

    const handleTariffDurationSelect = (option: IOption) => {
        setTariffsState(prev => ({ ...prev, duration: option }));
    }

    const handlePaymentMethodSelect = (option: IOption) => {
        setPaymentState({ method: option, currency: {} as IOption });
    }

    return (
        <WrapperAuth>
            <WrapperForLogInNSupportPages pageTitle="Оформление покупки" onSubmitFunc={handleSubmit}>
                <WrapperRectangleInput
                    labelText="Тарифный план"
                    isRequired
                    errorInputMessage={errors.tariffs.type || errors.tariffs.duration}
                >
                    <Input.Select
                        variant={EInputVariants.RECTANGULAR}
                        className={cl.lowWidth}
                        options={TYPE_TARIFFS_OPTIONS_ARRAY}
                        required
                        placeholder="Тип"
                        defaultOption={tariffsState.type}
                        onClickOption={handleTariffTypeSelect}
                        error={!!errors.tariffs.type}
                        warning={!!errors.tariffs.type}
                    />
                    <Input.Select
                        variant={EInputVariants.RECTANGULAR}
                        className={cl.highWidth}
                        options={tariffsDurationOptions}
                        disabled={!tariffsState.type.value}
                        defaultOption={tariffsState.duration}
                        required
                        placeholder="Длительность"
                        onClickOption={handleTariffDurationSelect}
                        error={!!errors.tariffs.duration}
                        warning={!!errors.tariffs.duration}
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
                            title={!tariffsState.duration.value ? 'Лучшее предложение:' : 'Итого'}
                            mainText={getSelectedTariffsInfo(tariffsState, 'mainText')}
                            footerText={getSelectedTariffsInfo(tariffsState, 'footerText')}
                            tariffsType={tariffsState.type}
                        />
                    }
                    errorInputMessage={errors.payments.method || errors.payments.currency}
                >
                    <Input.Select
                        variant={EInputVariants.RECTANGULAR}
                        className={cl.highWidth}
                        options={PAYMENT_METHOD_OPTIONS_ARRAY}
                        required
                        placeholder="Способ оплаты"
                        onClickOption={handlePaymentMethodSelect}
                        error={!!errors.payments.method}
                        warning={!!errors.payments.method}
                    />
                    <Input.Select
                        variant={EInputVariants.RECTANGULAR}
                        className={cl.lowWidth}
                        options={PAYMENT_CURRENCY_OPTIONS_ARRAY}
                        defaultOption={paymentState.currency}
                        placeholder="Валюта"
                        disabled={paymentState.method !== PAYMENT_BY_PAYMENT_ACCOUNT_OPTION}
                        error={!!errors.payments.currency}
                        warning={!!errors.payments.currency}
                    />
                </WrapperRectangleInput>
            </WrapperForLogInNSupportPages>
        </WrapperAuth>
    );
};
