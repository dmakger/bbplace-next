"use client"

import { Dispatch, FC, FormEvent, SetStateAction, useEffect, useRef, useState } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_AdditionalInfoProductForm.module.scss'
import { IPropsAdditionalInfoProductForm } from "../../model/additionalInfo.product.form.model";
import { WrapperSubblockForm } from "@/shared/ui/Wrapper/SubblockForm/ui/WrapperSubblockForm";
import { SubblockFormVariant } from "@/shared/ui/Wrapper/SubblockForm/data/subblockForm.data";
import { getFormDataFromForm } from "@/shared/lib/formData.lib";
import { WrapperRectangleInput } from "@/shared/ui/Wrapper/RectangleInput";
import Input from "@/shared/ui/Input/Input";
import { EInputVariants } from "@/shared/ui/Input/model/input.model";
import { ERadioVariant } from "@/shared/ui/Input/ui/Radio/model/radio.model";
import { GENDER__PRODUCT_FORM__DATA, UNISEX_GENDER__PRODUCT_FORM__DATA } from "../../data/gender.product.form.data copy";
import { IOption } from "@/shared/model/option.model";
import { MetricsAPI } from "@/entities/Metrics/api/metrics.metrics.api";
import { metricListToOptionList } from "@/entities/Metrics/lib/option.metric.metrics.lib";
import { EInputTextTypeVariants } from "@/shared/ui/Input/Text/model/text.input.model";
import { generateId } from "@/shared/lib/generateId.lib";
import { EInputTextType } from "@/shared/ui/Input/ui/Text/data/text.input.data";
import { Direction } from "@/shared/ui/Direction/Direction";
import { ListDirection } from "@/shared/data/list.data";
import { NO_FORM__DATA, YES_FORM__DATA } from "@/shared/data/option/base.option.data";
import { TIME_UNIT__OPTION__DATA } from "@/shared/data/option/timeUnit.option.data";
import { processDeliveryOption, processWarehousesOption, processFeaturesOption, processEquipmentOption } from "../../lib/process.additionalInfo.product.form.lib";
import { TriggerSubmitType } from "@/shared/ui/Wrapper/WOSubmit/model/woSubmit.model";
import { WrapperWOSubmit } from "@/shared/ui/Wrapper/WOSubmit/ui/WrapperWOSubmit";

interface AdditionalInfoProductFormProps{
    data?: IPropsAdditionalInfoProductForm
    setData?: Dispatch<SetStateAction<IPropsAdditionalInfoProductForm | undefined>>
    triggerSubmit?: (submitFn: () => void) => void,
    isOpenForm?: boolean
    className?: string,
}

export const AdditionalInfoProductForm:FC<AdditionalInfoProductFormProps> = ({data, setData, triggerSubmit, isOpenForm, className}) => {
    // REF
    const formRef = useRef<HTMLFormElement>(null)

    // STATE
    const [metricOptions, setMetricOptions] = useState<IOption[]>([])

    const [selectedGenderOption, setSelectedGenderOption] = useState<IOption>(UNISEX_GENDER__PRODUCT_FORM__DATA)
    const [selectedExpirationDateMetricOption, setSelectedExpirationDateMetricOption] = useState<IOption | undefined>()
    const [selectedWeightMetricOption, setSelectedWeightMetricOption] = useState<IOption | undefined>()

    const [addedDeliveryOption, setAddedDeliveryOption] = useState<IOption[]>([])
    const [addedWarehousesOption, setAddedWarehousesOption] = useState<IOption[]>([])
    const [addedFeaturesOption, setAddedFeaturesOption] = useState<IOption[]>([])
    const [addedEquipmentOption, setAddedEquipmentOption] = useState<IOption[]>([])


    // API
    const {data: metricList} = MetricsAPI.useGetMetricsQuery()

    // EFFECT
    // data
    useEffect(() => {
        setSelectedGenderOption(() => data?.gender ?? UNISEX_GENDER__PRODUCT_FORM__DATA)
        setSelectedExpirationDateMetricOption(() => data?.expirationDateMetric ?? undefined)
        setSelectedWeightMetricOption(() => data?.weightMetric ?? undefined)

        setAddedDeliveryOption(() => data?.delivery ?? [])
        setAddedWarehousesOption(() => data?.warehouses ?? [])
        setAddedFeaturesOption(() => data?.features ?? [])
        setAddedEquipmentOption(() => data?.equipment ?? [])

    }, [data])

    useEffect(() => {
        if (!metricList) return
        setMetricOptions(metricListToOptionList(metricList))
    }, [metricList])

    // HANDLE
    const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!formRef.current) return
        
        const formData = getFormDataFromForm(formRef.current)
        if (setData) {
            setData({
                packageType: formData.packageType,
                delivery: addedDeliveryOption,
                paymentConditions: formData.paymentConditions,
                deliveryTime: formData.deliveryTime,

                packagingLength: +formData.packagingLength,
                packagingWidth: +formData.packagingWidth,
                packagingHeight: +formData.packagingHeight,

                vat: +formData.vat === YES_FORM__DATA.id,
                isHasTestProbe: +formData.isHasTestProbe === YES_FORM__DATA.id,
                warehouses: addedWarehousesOption,
                brand: formData.brand,
                gender: selectedGenderOption,

                expirationDate: formData.expirationDate,
                expirationDateMetric: selectedExpirationDateMetricOption,
                weight: formData.weight,
                weightMetric: selectedWeightMetricOption,
                features: addedFeaturesOption,
                composition: formData.composition,
                equipment: addedEquipmentOption,
            } as IPropsAdditionalInfoProductForm)
        }
    }

    return (
        <WrapperWOSubmit triggerSubmit={triggerSubmit} formRef={formRef}>
            <WrapperSubblockForm title="Дополнительная информация" variant={SubblockFormVariant.Toggle} isOpen={isOpenForm} className={className}>
                <form ref={formRef} onSubmit={handleOnSubmit} className={cl.form}>
                    <WrapperRectangleInput labelText={"Тип упаковки"}>
                        <Input.Text name={'packageType'} placeholder="Все возможные виды упаковки" variant={EInputVariants.RECTANGULAR} defaultValue={data?.packageType} />
                    </WrapperRectangleInput>
                    
                    <WrapperRectangleInput labelText={"Службы доставки"}>
                        <Input.Addition options={addedDeliveryOption} setOptions={setAddedDeliveryOption} process={processDeliveryOption}>
                            <Input.Text name={'delivery'} placeholder="Название организации, добавляйте по одной" variant={EInputVariants.RECTANGULAR} />
                        </Input.Addition>
                    </WrapperRectangleInput>
                    
                    <WrapperRectangleInput labelText={"Условия оплаты"}>
                        <Input.Text name={'paymentConditions'} placeholder="Частичная или полная, при каких условиях" variant={EInputVariants.RECTANGULAR} defaultValue={data?.paymentConditions} />
                    </WrapperRectangleInput>
                    <WrapperRectangleInput labelText={"Срок изготовления"}>
                        <Input.Text name={'deliveryTime'} placeholder="Когда товар будет готов к отправке" variant={EInputVariants.RECTANGULAR} defaultValue={data?.deliveryTime} />
                    </WrapperRectangleInput>
                    <WrapperRectangleInput labelText={"Размер упаковки в миллиметрах"}>
                        <Input.Text name={'packagingLength'} placeholder="Длина" type={EInputTextType.Number} variant={EInputVariants.RECTANGULAR} defaultValue={data?.packagingLength} />
                        <Input.Text name={'packagingWidth'} placeholder="Ширина" type={EInputTextType.Number} variant={EInputVariants.RECTANGULAR} defaultValue={data?.packagingWidth} />
                        <Input.Text name={'packagingHeight'} placeholder="Высота" type={EInputTextType.Number} variant={EInputVariants.RECTANGULAR} defaultValue={data?.packagingHeight} />
                    </WrapperRectangleInput>
                    <WrapperRectangleInput labelText={"Облагается НДС"}>
                        <Input.Radio name='vat' variant={EInputVariants.RECTANGULAR} variantRadio={ERadioVariant.SINGLE}
                                    option={YES_FORM__DATA} isActive={!!data?.vat} />
                        <Input.Radio name='vat' variant={EInputVariants.RECTANGULAR} variantRadio={ERadioVariant.SINGLE}
                                    option={NO_FORM__DATA} isActive={!data?.vat}/> 
                    </WrapperRectangleInput>
                    <WrapperRectangleInput labelText={"Тестовый пробник"}>
                        <Input.Radio name='isHasTestProbe' variant={EInputVariants.RECTANGULAR} variantRadio={ERadioVariant.SINGLE}
                                    option={YES_FORM__DATA} isActive={!!data?.isHasTestProbe} />
                        <Input.Radio name='isHasTestProbe' variant={EInputVariants.RECTANGULAR} variantRadio={ERadioVariant.SINGLE}
                                    option={NO_FORM__DATA} isActive={!data?.isHasTestProbe}/> 
                    </WrapperRectangleInput>

                    <WrapperRectangleInput labelText={"Склады по городам"}>
                        <Input.Addition options={addedWarehousesOption} setOptions={setAddedWarehousesOption} process={processWarehousesOption}>
                            <Input.Text name={'warehouses'} placeholder="Название города, добавляйте по одному" variant={EInputVariants.RECTANGULAR} />
                        </Input.Addition>
                    </WrapperRectangleInput>

                    <WrapperRectangleInput labelText={"Бренд"}>
                        <Input.Text name={'brand'} placeholder="Название компании изготовителя" variant={EInputVariants.RECTANGULAR} defaultValue={data?.brand} />
                    </WrapperRectangleInput>

                    <WrapperRectangleInput labelText={"Пол"}>
                        <Input.TextAndSelect name={'gender'} placeholder="Выберите из списка" defaultOption={selectedGenderOption}
                                options={GENDER__PRODUCT_FORM__DATA} onClickOption={setSelectedGenderOption}
                                titleModal="Пол" variant={EInputVariants.RECTANGULAR} /> 
                    </WrapperRectangleInput>
                    <WrapperRectangleInput labelText={"Срок годности"}>
                        <Input.Text name={'expirationDate'} placeholder="Введите число" type={EInputTextType.Number} variant={EInputVariants.RECTANGULAR} defaultValue={data?.expirationDate} />
                        <Input.TextAndSelect name={'expirationDateMetric'} placeholder="Измерение" defaultOption={selectedExpirationDateMetricOption}
                                options={TIME_UNIT__OPTION__DATA} onClickOption={setSelectedExpirationDateMetricOption}
                                titleModal="Срок годности" variant={EInputVariants.RECTANGULAR} /> 
                    </WrapperRectangleInput>
                    <WrapperRectangleInput labelText={"Вес"}>
                        <Input.Text name={'weight'} placeholder="Введите число" variant={EInputVariants.RECTANGULAR} defaultValue={data?.weight} />
                        <Input.TextAndSelect name={'weightMetric'} placeholder="Измерение" defaultOption={selectedWeightMetricOption}
                                options={metricOptions} onClickOption={setSelectedWeightMetricOption}
                                titleModal="Вес" variant={EInputVariants.RECTANGULAR} /> 
                    </WrapperRectangleInput>

                    <WrapperRectangleInput labelText={"Особенности"}>
                        <Input.Addition options={addedFeaturesOption} setOptions={setAddedFeaturesOption} process={processFeaturesOption}>
                            <Input.Text name={'features'} placeholder="Добавляйте по одной" variant={EInputVariants.RECTANGULAR} />
                        </Input.Addition>
                    </WrapperRectangleInput>

                    <WrapperRectangleInput labelText={"Состав"}>
                        <Input.Text name={'composition'} placeholder="Начните вводить" inputTypeVariant={EInputTextTypeVariants.TEXTAREA} defaultValue={data?.composition}
                                    variant={EInputVariants.RECTANGULAR}  />
                    </WrapperRectangleInput>

                    <WrapperRectangleInput labelText={"Комплектация"}>
                        <Input.Addition options={addedEquipmentOption} setOptions={setAddedEquipmentOption} process={processEquipmentOption}>
                            <Direction direction={ListDirection.Row}>
                                <Input.Text name={'equipmentText'} placeholder="Наименование" variant={EInputVariants.RECTANGULAR} />
                                <Input.Text name={'equipmentAmount'} placeholder="Количество" type={EInputTextType.Number} variant={EInputVariants.RECTANGULAR} />
                            </Direction>
                        </Input.Addition>
                    </WrapperRectangleInput>
                </form>
            </WrapperSubblockForm>
        </WrapperWOSubmit>
    )
}
