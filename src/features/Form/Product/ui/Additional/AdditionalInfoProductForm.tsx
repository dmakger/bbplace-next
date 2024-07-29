"use client"

import { Dispatch, FC, FormEvent, SetStateAction, useEffect, useRef, useState } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_AdditionalInfoProductForm.module.scss'
import { IPropsAdditionalInfoProductForm } from "../../model/additionalInfo.product.form.model";
import { WrapperWOSubmit } from "@/shared/ui/Wrapper/WOSubmit/WrapperWOSubmit";
import { WrapperSubblockForm } from "@/shared/ui/Wrapper/SubblockForm/ui/WrapperSubblockForm";
import { SubblockFormVariant } from "@/shared/ui/Wrapper/SubblockForm/data/subblockForm.data";
import { getFormDataFromForm } from "@/shared/lib/formData.lib";
import { WrapperRectangleInput } from "@/shared/ui/Wrapper/RectangleInput";
import Input from "@/shared/ui/Input/Input";
import { EInputVariants } from "@/shared/ui/Input/model/input.model";
import { ERadioVariant } from "@/shared/ui/Input/ui/Radio/model/radio.model";
import { NO_FORM__DATA, YES_FORM__DATA } from "@/shared/data/form/base.form.data";
import { GENDER__PRODUCT_FORM__DATA, UNISEX_GENDER__PRODUCT_FORM__DATA } from "../../data/gender.product.form.data copy";
import { IOption } from "@/shared/model/option.model";
import { MetricsAPI } from "@/entities/Metrics/api/metrics.metrics.api";
import { metricListToOptionList } from "@/entities/Metrics/lib/option.metric.metrics.lib";
import { EInputTextTypeVariants } from "@/shared/ui/Input/Text/model/text.input.model";

interface AdditionalInfoProductFormProps{
    setData?: Dispatch<SetStateAction<IPropsAdditionalInfoProductForm | undefined>>
    triggerSubmit?: (submitFn: () => void) => void,
    className?: string,
}

export const AdditionalInfoProductForm:FC<AdditionalInfoProductFormProps> = ({setData, triggerSubmit, className}) => {
    // REF
    const formRef = useRef<HTMLFormElement>(null)

    // STATE
    const [metricOptions, setMetricOptions] = useState<IOption[]>([])

    const [selectedGenderOption, setSelectedGenderOption] = useState<IOption>(UNISEX_GENDER__PRODUCT_FORM__DATA)
    const [addedDeliveryOption, setAddedDeliveryOption] = useState<IOption[]>([])
    const [selectedDeliveryTimeMetricOption, setSelectedDeliveryTimeMetricOption] = useState<IOption | null>(null)
    const [selectedWeightMetricOption, setSelectedWeightMetricOption] = useState<IOption | null>(null)

    // API
    const {data: metricList} = MetricsAPI.useGetMetricsQuery()             

    // EFFECT
    useEffect(() => {
        if (!metricList) return
        setMetricOptions(metricListToOptionList(metricList))
    }, [])

    // HANDLE
    const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!formRef.current) return
        
        const formData = getFormDataFromForm(formRef.current)
    }


    return (
        <WrapperWOSubmit triggerSubmit={triggerSubmit} formRef={formRef}>
            <WrapperSubblockForm title="Дополнительная информация" variant={SubblockFormVariant.Toggle} className={className}>
                <form ref={formRef} onSubmit={handleOnSubmit} className={cl.form}>
                    <WrapperRectangleInput labelText={"Тип упаковки"}>
                        <Input.Text name={'packageType'} placeholder="Все возможные виды упаковки" variant={EInputVariants.RECTANGULAR} />
                    </WrapperRectangleInput>
                    
                    <Input.Addition options={addedDeliveryOption} setOptions={setAddedDeliveryOption}>
                        <Input.Text name={'deliveryTime'} placeholder="Введите число" variant={EInputVariants.RECTANGULAR} />
                        {/* <Input.TextAndSelect name={'deliveryTimeMetric'} placeholder="Измерение" 
                                options={GENDER__PRODUCT_FORM__DATA} onClickOption={setSelectedDeliveryTimeMetricOption}
                                titleModal="Пол" variant={EInputVariants.RECTANGULAR} />  */}
                    </Input.Addition>

                    {/* =============== */}
                    {/* Службы доставки */}
                    {/* =============== */}
                    
                    <WrapperRectangleInput labelText={"Условия оплаты"}>
                        <Input.Text name={'paymentConditions'} placeholder="Частичная или полная, при каких условиях" variant={EInputVariants.RECTANGULAR} />
                    </WrapperRectangleInput>
                    <WrapperRectangleInput labelText={"Срок изготовления"}>
                        <Input.Text name={'deliveryTime'} placeholder="Когда товар будет готов к отправке" variant={EInputVariants.RECTANGULAR} />
                    </WrapperRectangleInput>
                    <WrapperRectangleInput labelText={"Размер упаковки в миллиметрах"}>
                        <Input.Text name={'packagingLength'} placeholder="Длина" variant={EInputVariants.RECTANGULAR} />
                        <Input.Text name={'packagingWidth'} placeholder="Ширина" variant={EInputVariants.RECTANGULAR} />
                        <Input.Text name={'packagingHeight'} placeholder="Высота" variant={EInputVariants.RECTANGULAR} />
                    </WrapperRectangleInput>
                    <WrapperRectangleInput labelText={"Облагается НДС"}>
                        <Input.Radio name='vat' variant={EInputVariants.RECTANGULAR} variantRadio={ERadioVariant.SINGLE}
                                    option={YES_FORM__DATA} />
                        <Input.Radio name='vat' variant={EInputVariants.RECTANGULAR} variantRadio={ERadioVariant.SINGLE}
                                    option={NO_FORM__DATA} /> 
                    </WrapperRectangleInput>
                    <WrapperRectangleInput labelText={"Тестовый пробник"}>
                        <Input.Radio name='isHasTestProbe' variant={EInputVariants.RECTANGULAR} variantRadio={ERadioVariant.SINGLE}
                                    option={YES_FORM__DATA} />
                        <Input.Radio name='isHasTestProbe' variant={EInputVariants.RECTANGULAR} variantRadio={ERadioVariant.SINGLE}
                                    option={NO_FORM__DATA} /> 
                    </WrapperRectangleInput>

                    {/* ================= */}
                    {/* Склады по городам */}
                    {/* ================= */}

                    <WrapperRectangleInput labelText={"Бренд"}>
                        <Input.Text name={'brand'} placeholder="Название компании изготовителя" variant={EInputVariants.RECTANGULAR} />
                    </WrapperRectangleInput>

                    <WrapperRectangleInput labelText={"Пол"}>
                        <Input.TextAndSelect name={'gender'} placeholder="Выберите из списка" 
                                options={GENDER__PRODUCT_FORM__DATA} onClickOption={setSelectedGenderOption}
                                titleModal="Пол" variant={EInputVariants.RECTANGULAR} /> 
                    </WrapperRectangleInput>
                    <WrapperRectangleInput labelText={"Срок годности"}>
                        <Input.Text name={'deliveryTime'} placeholder="Введите число" variant={EInputVariants.RECTANGULAR} />
                        <Input.TextAndSelect name={'deliveryTimeMetric'} placeholder="Измерение" 
                                options={GENDER__PRODUCT_FORM__DATA} onClickOption={setSelectedDeliveryTimeMetricOption}
                                titleModal="Пол" variant={EInputVariants.RECTANGULAR} /> 
                    </WrapperRectangleInput>
                    <WrapperRectangleInput labelText={"Вес"}>
                        <Input.Text name={'weight'} placeholder="Введите число" variant={EInputVariants.RECTANGULAR} />
                        <Input.TextAndSelect name={'weightMetric'} placeholder="Измерение" 
                                options={GENDER__PRODUCT_FORM__DATA} onClickOption={setSelectedWeightMetricOption}
                                titleModal="Пол" variant={EInputVariants.RECTANGULAR} /> 
                    </WrapperRectangleInput>
                    
                    {/* =========== */}
                    {/* Особенности */}
                    {/* =========== */}

                    <WrapperRectangleInput labelText={"Состав"} isRequired={true}>
                        <Input.Text name={'composition'} placeholder="Начните вводить"
                                    required={true} variant={EInputVariants.RECTANGULAR} 
                                    inputTypeVariant={EInputTextTypeVariants.TEXTAREA} />
                    </WrapperRectangleInput>

                    {/* ============ */}
                    {/* Комплектация */}
                    {/* ============ */}
                </form>
            </WrapperSubblockForm>
        </WrapperWOSubmit>
    )
}
