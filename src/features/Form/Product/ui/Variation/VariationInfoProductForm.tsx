"use client"

import { Dispatch, FC, FormEvent, SetStateAction, useEffect, useRef, useState } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_VariationInfoProductForm.module.scss'
import { IPropsVariationInfoProductForm } from "../../model/variationInfo.product.form.model";
import { MetricsAPI } from "@/entities/Metrics/api/metrics.metrics.api";
import { CurrencyAPI } from "@/entities/Metrics/api/currency.metrics.api";
import { IOption } from "@/shared/model/option.model";
import { metricListToOptionList } from "@/entities/Metrics/lib/option.metric.metrics.lib";
import { WrapperWOSubmit } from "@/shared/ui/Wrapper/WOSubmit/WrapperWOSubmit";
import { WrapperSubblockForm } from "@/shared/ui/Wrapper/SubblockForm/ui/WrapperSubblockForm";
import { SubblockFormVariant } from "@/shared/ui/Wrapper/SubblockForm/data/subblockForm.data";
import { getFormDataFromForm } from "@/shared/lib/formData.lib";
import { WrapperRectangleInput } from "@/shared/ui/Wrapper/RectangleInput";
import Input from "@/shared/ui/Input/Input";
import { EInputVariants } from "@/shared/ui/Input/model/input.model";
import { generateId } from "@/shared/lib/generateId.lib";
import { Direction } from "@/shared/ui/Direction/Direction";
import { ListDirection } from "@/shared/data/list.data";
import { EInputTextType } from "@/shared/ui/Input/ui/Text/data/text.input.data";
import { getSymbolByCodeCurrency } from "@/entities/Metrics/lib/currency/currency.metrics.lib";
import { currencyListToOptionList } from "@/entities/Metrics/lib/currency/option.currency.metrics.lib";
import { IMediaProduct } from "@/entities/Product/model/media.product.model";
import { fromOptionToType } from "@/shared/lib/option/to.option.lib";
import { ICurrency } from "@/entities/Metrics/model/currency.metrics.model";
import { IMetrics } from "@/entities/Metrics/model/metric.metrics.model";
import { IWholesale } from "@/entities/Metrics/model/wholesale.metrics.model";
import { ISize } from "@/entities/Metrics/model/size.metrics.model";

interface VariationInfoProductFormProps{
    setData?: Dispatch<SetStateAction<IPropsVariationInfoProductForm | undefined>>
    triggerSubmit?: (submitFn: () => void) => void,
    className?: string,
}

export const VariationInfoProductForm:FC<VariationInfoProductFormProps> = ({setData, triggerSubmit, className}) => {
    // REF
    const formRef = useRef<HTMLFormElement>(null)

    // STATE
    const [metricOptions, setMetricOptions] = useState<IOption[]>([])
    const [currencyOptions, setCurrencyOptions] = useState<IOption[]>([])

    const [selectedWholesaleCurrencyOption, setSelectedWholesaleCurrencyOption] = useState<IOption | undefined>()
    const [selectedWholesaleMetricOption, setSelectedWholesaleMetricOption] = useState<IOption | null>(null)
    const [selectedSizeMetricOption, setSelectedSizeMetricOption] = useState<IOption | null>(null)
    
    const [uploadedImageList, setUploadedImageList] = useState<string[]>([])

    const [addedWholesaleOption, setAddedWholesaleOption] = useState<IOption[]>([])
    const [addedSizesOption, setAddedSizesOption] = useState<IOption[]>([])

    // API
    const {data: metricList} = MetricsAPI.useGetMetricsQuery()             
    const {data: currencyList} = CurrencyAPI.useGetCurrenciesQuery()

    console.log('qwe uploadedImageList', uploadedImageList)

    // EFFECT
    // metric
    useEffect(() => {
        if (!metricList) return
        setMetricOptions(metricListToOptionList(metricList))
    }, [metricList])
    // currency
    useEffect(() => {
        if (!currencyList) return
        setCurrencyOptions(currencyListToOptionList(currencyList))
    }, [currencyList])

    // HANDLE
    const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!formRef.current) return
        
        const formData = getFormDataFromForm(formRef.current)
        const currency = fromOptionToType<ICurrency>(selectedWholesaleCurrencyOption!)
        const priceUnits = fromOptionToType<IMetrics>(selectedWholesaleMetricOption!)
        const media: IMediaProduct = {
            attachments: uploadedImageList,
            color: formData.color,
            article: formData.article,
            currency: fromOptionToType<ICurrency>(selectedWholesaleCurrencyOption!),
            priceUnits: fromOptionToType<IMetrics>(selectedWholesaleMetricOption!),
            wholesalePrices: addedWholesaleOption.map(it => ({
                price: it.params!.price,
                quantity: it.params!.quantity,
                metrics: priceUnits,
                currency: currency,
            } as IWholesale)),
            sizes: addedSizesOption.map(it => ({
                size: it.params!.size,
                sizeUnit: it.options?.at(0),
            } as ISize)),
        }
        if (setData) {
            setData({
                media
            } as IPropsVariationInfoProductForm)
        }
    }

    // PROCESS
    // wholesale
    const processWholesaleOption = (tempDataStorage: Record<string, any>) => {
        const {wholesalePrice, wholesaleQuantity} = tempDataStorage
        return !wholesalePrice || !wholesaleQuantity || !selectedWholesaleCurrencyOption || !selectedWholesaleMetricOption
            ? undefined 
            : { 
                id: generateId(), 
                name: `${wholesalePrice} ${getSymbolByCodeCurrency(`${selectedWholesaleCurrencyOption.params?.code}`, selectedWholesaleCurrencyOption.params?.code)} от ${wholesaleQuantity} ${selectedWholesaleMetricOption.params?.shortName}.`,
                params: {
                    'price': wholesalePrice,
                    'quantity': wholesaleQuantity,
                },
                options: [
                    selectedWholesaleCurrencyOption,
                    selectedWholesaleMetricOption,
                ]
            } as IOption
    }

    // size
    const processSizeOption = (tempDataStorage: Record<string, any>) => {
        const {sizeValue} = tempDataStorage
        return !sizeValue || !selectedSizeMetricOption 
            ? undefined 
            : { 
                id: generateId(), 
                name: `${sizeValue} ${selectedSizeMetricOption.params?.shortName}.`,
                params: {
                    'size': sizeValue,
                },
                options: [
                    selectedSizeMetricOption,
                ]
            } as IOption
    }


    return (
        <WrapperWOSubmit triggerSubmit={triggerSubmit} formRef={formRef}>
            <WrapperSubblockForm title="Вариация товара" variant={SubblockFormVariant.Toggle} className={className}>
                <form ref={formRef} onSubmit={handleOnSubmit} className={cl.form}>
                    <WrapperRectangleInput labelText={"Артикулы продавца"} isRequired={true}>
                        <Input.Text name={'color'} placeholder="Тип" variant={EInputVariants.RECTANGULAR} required={true} />
                        <Input.Text name={'article'} placeholder="Артикул" variant={EInputVariants.RECTANGULAR} required={true} />
                    </WrapperRectangleInput>

                    <WrapperRectangleInput labelText={"Фотографии"}>
                        <Input.Image name={'attachments'} placeholder="Начните вводить" 
                                    imageList={uploadedImageList} setImageList={setUploadedImageList}
                                    variant={EInputVariants.RECTANGULAR}  />
                    </WrapperRectangleInput>

                    <WrapperRectangleInput labelText={"Оптовые цены"} isRequired={true}>
                        <Input.Addition options={addedWholesaleOption} setOptions={setAddedWholesaleOption} process={processWholesaleOption}>
                            <Direction direction={ListDirection.Row}>
                                <Input.Text name={'wholesalePrice'} placeholder="Цена товара" required={true} 
                                            type={EInputTextType.Number} variant={EInputVariants.RECTANGULAR} />
                                <Input.TextAndSelect name={'wholesaleCurrency'} placeholder="Валюта" required={true} disabled={addedWholesaleOption.length > 0}
                                            options={currencyOptions} onClickOption={setSelectedWholesaleCurrencyOption}
                                            titleModal="Валюта" variant={EInputVariants.RECTANGULAR} /> 
                            </Direction>
                            <Direction direction={ListDirection.Row}>
                                <Input.Text name={'wholesaleQuantity'} placeholder="При заказе от" required={true} 
                                            type={EInputTextType.Number} variant={EInputVariants.RECTANGULAR} />
                                <Input.TextAndSelect name={'wholesaleMetric'} placeholder="Измерение" required={true} disabled={addedWholesaleOption.length > 0}
                                                    options={metricOptions} onClickOption={setSelectedWholesaleMetricOption}
                                                    titleModal="Измерение" variant={EInputVariants.RECTANGULAR} /> 
                            </Direction>
                        </Input.Addition>
                    </WrapperRectangleInput>

                    <WrapperRectangleInput labelText={"Размеры"} isRequired={true}>
                        <Input.Addition options={addedSizesOption} setOptions={setAddedSizesOption} process={processSizeOption}>
                            <Direction direction={ListDirection.Row}>
                                <Input.Text name={'sizeValue'} placeholder="Значение" required={true} 
                                            type={EInputTextType.Number} variant={EInputVariants.RECTANGULAR} />
                                <Input.TextAndSelect name={'sizeMetric'} placeholder="Измерение" required={true}
                                                    options={metricOptions} onClickOption={setSelectedSizeMetricOption}
                                                    titleModal="Измерение" variant={EInputVariants.RECTANGULAR} /> 
                            </Direction>
                        </Input.Addition>
                    </WrapperRectangleInput>
                </form>
            </WrapperSubblockForm>
        </WrapperWOSubmit>
    )
}
