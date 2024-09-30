'use client'

import cl from './_PaymentChildrenPage.module.scss'
import { WrapperForLogInNSupportPages } from "@/shared/ui/Wrapper/ForLogInNSupportPages"
import { WrapperRectangleInput } from "@/shared/ui/Wrapper/RectangleInput"
import Input from "@/shared/ui/Input/Input"
import { EInputVariants } from "@/shared/ui/Input/model/input.model"
import {
    BUSINESS_TARIFF_DURATION_OPTIONS_ARRAY,
    BUSINESS_TYPE_TARIFFS_OPTION,
    PREMIUM_TARIFF_DURATION_OPTIONS_ARRAY,
    PREMIUM_TYPE_TARIFFS_OPTION,
    TYPE_TARIFFS_OPTIONS_ARRAY
} from "../../Tariffs"
import { useState } from "react"
import { IOption } from "@/shared/model/option.model"
import { PAYMENT_METHOD_OPTIONS_ARRAY } from "../data/payment.data"


export const PaymentChildrenPage = () => {

    //STATE
    const [tariffsType, setTariffsType] = useState<IOption>()

    //FUNCTION
    const getSelectedType = (it: IOption) => setTariffsType(it);

    return (
        <WrapperForLogInNSupportPages
            pageTitle="Оформление покупки"
        >
            <WrapperRectangleInput
                labelText="Тарифный план"
                isRequired
            >
                <Input.Select
                    variant={EInputVariants.RECTANGULAR}
                    className={cl.lowWidth}
                    options={TYPE_TARIFFS_OPTIONS_ARRAY}
                    required
                    placeholder="Тип"
                    onClickOption={getSelectedType}
                />
                <Input.Select
                    variant={EInputVariants.RECTANGULAR}
                    className={cl.highWidth}
                    options={tariffsType === BUSINESS_TYPE_TARIFFS_OPTION ?
                        BUSINESS_TARIFF_DURATION_OPTIONS_ARRAY :
                            PREMIUM_TARIFF_DURATION_OPTIONS_ARRAY}
                    disabled={tariffsType === undefined}
                    required
                    placeholder="Длительность"
                />

            </WrapperRectangleInput>
            <WrapperRectangleInput
                labelText="Перевод платежа"
                isRequired
                isDescriptionTooltip
                descriptionTooltipText="Введите адрес электронной почты, на которую был зарегистрирован профиль"
                bellowButtonText="Оплатить"
            >
                <Input.Select
                    variant={EInputVariants.RECTANGULAR}
                    className={cl.highWidth}
                    options={PAYMENT_METHOD_OPTIONS_ARRAY}
                    required
                    placeholder="Способ оплаты"
                />
                <Input.Select
                    variant={EInputVariants.RECTANGULAR}
                    className={cl.lowWidth}
                    options={[]}
                    placeholder="Валюта"
                    disabled
                />

            </WrapperRectangleInput>
        </WrapperForLogInNSupportPages>
    )
}
