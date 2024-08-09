"use client"

import { Dispatch, FC, FormEvent, SetStateAction, useEffect, useRef, useState } from "react"

import cl from './_VariationInfoProductForm.module.scss'
import { IPropsVariationInfoProductForm } from "../../model/variationInfo.product.form.model";
import { MetricsAPI } from "@/entities/Metrics/api/metrics.metrics.api";
import { CurrencyAPI } from "@/entities/Metrics/api/currency.metrics.api";
import { IOption } from "@/shared/model/option.model";
import { metricListToOptionList, metricToOption } from "@/entities/Metrics/lib/option.metric.metrics.lib";
import { WrapperSubblockForm } from "@/shared/ui/Wrapper/SubblockForm/ui/WrapperSubblockForm";
import { SubblockFormVariant } from "@/shared/ui/Wrapper/SubblockForm/data/subblockForm.data";
import { getFormDataFromForm } from "@/shared/lib/formData.lib";
import { WrapperRectangleInput } from "@/shared/ui/Wrapper/RectangleInput";
import Input from "@/shared/ui/Input/Input";
import { EInputVariants } from "@/shared/ui/Input/model/input.model";
import { Direction } from "@/shared/ui/Direction/Direction";
import { ListDirection } from "@/shared/data/list.data";
import { EInputTextType } from "@/shared/ui/Input/ui/Text/data/text.input.data";
import { currencyListToOptionList, currencyToOption } from "@/entities/Metrics/lib/currency/option.currency.metrics.lib";
import { IMediaProduct } from "@/entities/Product/model/media.product.model";
import { fromOptionToType } from "@/shared/lib/option/to.option.lib";
import { ICurrency } from "@/entities/Metrics/model/currency.metrics.model";
import { IMetrics } from "@/entities/Metrics/model/metric.metrics.model";
import { IWholesale } from "@/entities/Metrics/model/wholesale.metrics.model";
import { ISize } from "@/entities/Metrics/model/size.metrics.model";
import { processSizeOptionInProductForm, processWholesaleOptionInProductForm } from "../../lib/process.variation.product.lib";
import { WrapperWOSubmit } from "@/shared/ui/Wrapper/WOSubmit/ui/WrapperWOSubmit";

interface VariationInfoProductFormProps{
    data?: IPropsVariationInfoProductForm
    setData?: Dispatch<SetStateAction<IPropsVariationInfoProductForm | undefined>>
    triggerSubmit?: (submitFn: () => void) => void,
    isOpenForm?: boolean
    className?: string,
}

export const VariationInfoProductForm:FC<VariationInfoProductFormProps> = ({data, setData, triggerSubmit, isOpenForm, className}) => {
    // REF
    const formRef = useRef<HTMLFormElement>(null)

    // STATE
    const [metricOptions, setMetricOptions] = useState<IOption[]>([])
    const [currencyOptions, setCurrencyOptions] = useState<IOption[]>([])

    const [selectedWholesaleCurrencyOption, setSelectedWholesaleCurrencyOption] = useState<IOption | undefined>()
    const [selectedWholesaleMetricOption, setSelectedWholesaleMetricOption] = useState<IOption | undefined>()
    const [selectedSizeMetricOption, setSelectedSizeMetricOption] = useState<IOption | undefined>()
    
    const [uploadedImageList, setUploadedImageList] = useState<string[]>([])

    const [addedWholesaleOption, setAddedWholesaleOption] = useState<IOption[]>([])
    const [addedSizesOption, setAddedSizesOption] = useState<IOption[]>([])

    // API
    const {data: metricList} = MetricsAPI.useGetMetricsQuery()             
    const {data: currencyList} = CurrencyAPI.useGetCurrenciesQuery()

    // EFFECT
    // data
    useEffect(() => {
        if (!data) {
            setSelectedWholesaleCurrencyOption(undefined)
            setSelectedWholesaleMetricOption(undefined)
            setAddedWholesaleOption([])
            setAddedSizesOption([])
            setUploadedImageList([])
            return
        }
        const media = data.media
        setSelectedWholesaleCurrencyOption(() => media.currency ?? undefined)
        setSelectedWholesaleMetricOption(() => media.priceUnits ?? undefined)
        setAddedWholesaleOption(() => {
            if (!media.currency || !media.priceUnits) return []

            const currency = currencyToOption(media.currency)
            const priceUnits = metricToOption(media.priceUnits)
            return media.wholesalePrices.map(wp => (
                processWholesaleOptionInProductForm(wp.price, wp.quantity, currency, priceUnits)
            )).filter(it => it !== undefined)
        })
        setAddedSizesOption(() => { 
            return media.sizes.map(it => (
                processSizeOptionInProductForm(it.size, metricToOption(it.sizeUnit))
            )).filter(it => it !== undefined)
        })
        setUploadedImageList(() => data?.media.attachments ?? [])
    }, [data])

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
        return processWholesaleOptionInProductForm(tempDataStorage.wholesalePrice, tempDataStorage.wholesaleQuantity, selectedWholesaleCurrencyOption, selectedWholesaleMetricOption)
    }

    // size
    const processSizeOption = (tempDataStorage: Record<string, any>) => {
        return processSizeOptionInProductForm(tempDataStorage.sizeValue, selectedSizeMetricOption)
    }


    return (
        <WrapperWOSubmit triggerSubmit={triggerSubmit} formRef={formRef}>
            <WrapperSubblockForm title="Вариация товара" variant={SubblockFormVariant.Toggle} isOpen={isOpenForm} className={className}>
                <form ref={formRef} onSubmit={handleOnSubmit} className={cl.form}>
                    <WrapperRectangleInput labelText={"Артикулы продавца"} isRequired={true}>
                        <Input.Text name={'color'} placeholder="Тип" variant={EInputVariants.RECTANGULAR} required={true} defaultValue={data?.media.color} />
                        <Input.Text name={'article'} placeholder="Артикул" variant={EInputVariants.RECTANGULAR} required={true} defaultValue={data?.media.article} />
                    </WrapperRectangleInput>

                    <WrapperRectangleInput labelText={"Фотографии"}>
                        <Input.Image name={'attachments'} placeholder="Начните вводить" 
                                    imageList={uploadedImageList} setImageList={setUploadedImageList}
                                    variant={EInputVariants.RECTANGULAR}  />
                    </WrapperRectangleInput>

                    <WrapperRectangleInput labelText={"Оптовые цены"} isRequired={true}>
                        <Input.Addition options={addedWholesaleOption} setOptions={setAddedWholesaleOption} process={processWholesaleOption}>
                            <Direction direction={ListDirection.Row}>
                                <Input.Text name={'wholesalePrice'} placeholder="Цена товара" 
                                            type={EInputTextType.Number} variant={EInputVariants.RECTANGULAR} />
                                <Input.TextAndSelect name={'wholesaleCurrency'} placeholder="Валюта" disabled={addedWholesaleOption.length > 0}
                                            options={currencyOptions} onClickOption={setSelectedWholesaleCurrencyOption} defaultOption={selectedWholesaleCurrencyOption}
                                            titleModal="Валюта" variant={EInputVariants.RECTANGULAR} /> 
                            </Direction>
                            <Direction direction={ListDirection.Row}>
                                <Input.Text name={'wholesaleQuantity'} placeholder="При заказе от" 
                                            type={EInputTextType.Number} variant={EInputVariants.RECTANGULAR} />
                                <Input.TextAndSelect name={'wholesaleMetric'} placeholder="Измерение" disabled={addedWholesaleOption.length > 0}
                                                    options={metricOptions} onClickOption={setSelectedWholesaleMetricOption} defaultOption={selectedWholesaleMetricOption}
                                                    titleModal="Измерение" variant={EInputVariants.RECTANGULAR} /> 
                            </Direction>
                        </Input.Addition>
                    </WrapperRectangleInput>

                    <WrapperRectangleInput labelText={"Размеры"} isRequired={true}>
                        <Input.Addition options={addedSizesOption} setOptions={setAddedSizesOption} process={processSizeOption}>
                            <Direction direction={ListDirection.Row}>
                                <Input.Text name={'sizeValue'} placeholder="Значение" 
                                            variant={EInputVariants.RECTANGULAR} />
                                <Input.TextAndSelect name={'sizeMetric'} placeholder="Измерение"
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
