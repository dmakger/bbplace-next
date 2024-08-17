"use client"

import { Dispatch, FC, FormEvent, SetStateAction, useEffect, useRef, useState } from "react"
import cl from './_VariationInfoProductForm.module.scss'
import { IPropsVariationInfoProductForm } from "../../model/variationInfo.product.form.model";
import { MetricsAPI } from "@/entities/Metrics/api/metrics.metrics.api";
import { CurrencyAPI } from "@/entities/Metrics/api/currency.metrics.api";
import { IOption } from "@/shared/model/option.model";
import { metricListToOptionList, metricToOption, optionToMetric } from "@/entities/Metrics/lib/option.metric.metrics.lib";
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
import { processSizeOptionInProductForm, processWholesaleOptionInProductForm } from "../../lib/process.variation.product.form.lib";
import { WrapperWOSubmit } from "@/shared/ui/Wrapper/WOSubmit/ui/WrapperWOSubmit";
import { IFormInfo } from "../../model/product.form.model";
import { getEmptyFormInfo } from "../../lib/product.form.lib";

interface VariationInfoProductFormProps {
    data?: IPropsVariationInfoProductForm
    setData?: Dispatch<SetStateAction<IPropsVariationInfoProductForm | undefined>>
    triggerSubmit?: (submitFn: () => Promise<IFormInfo<IPropsVariationInfoProductForm>>) => void;
    isOpenForm?: boolean
    className?: string,
}

export const VariationInfoProductForm: FC<VariationInfoProductFormProps> = ({data, setData, triggerSubmit, isOpenForm, className}) => {
    // REF
    const formRef = useRef<HTMLFormElement>(null);

    // STATE
    const [metricOptions, setMetricOptions] = useState<IOption[]>([]);
    const [currencyOptions, setCurrencyOptions] = useState<IOption[]>([]);

    const [selectedWholesaleCurrencyOption, setSelectedWholesaleCurrencyOption] = useState<IOption | undefined>();
    const [selectedWholesaleMetricOption, setSelectedWholesaleMetricOption] = useState<IOption | undefined>();
    const [selectedSizeMetricOption, setSelectedSizeMetricOption] = useState<IOption | undefined>();

    const [uploadedImageList, setUploadedImageList] = useState<string[]>([]);
    const [addedWholesaleOption, setAddedWholesaleOption] = useState<IOption[]>([]);
    const [addedSizesOption, setAddedSizesOption] = useState<IOption[]>([]);

    const {data: metricList} = MetricsAPI.useGetMetricsQuery();
    const {data: currencyList} = CurrencyAPI.useGetCurrenciesQuery();

    // EFFECT
    // load data
    useEffect(() => {
        if (!data) {
            setSelectedWholesaleCurrencyOption(undefined);
            setSelectedWholesaleMetricOption(undefined);
            setAddedWholesaleOption([]);
            setAddedSizesOption([]);
            setUploadedImageList([]);
            return;
        }

        const media = data.media;
        setSelectedWholesaleCurrencyOption(() => media.currency ? currencyToOption(media.currency) : undefined);
        setSelectedWholesaleMetricOption(() => media.priceUnits ? metricToOption(media.priceUnits) : undefined);

        setAddedWholesaleOption(() => {
            if (!media.currency || !media.priceUnits) return [];
            const currency = currencyToOption(media.currency);
            const priceUnits = metricToOption(media.priceUnits);
            return media.wholesalePrices.map(wp => (
                processWholesaleOptionInProductForm(wp.price, wp.quantity, currency, priceUnits)
            )).filter(it => it !== undefined) as IOption[]
        });

        setAddedSizesOption(() => { 
            return media.sizes.map(it => (
                processSizeOptionInProductForm(it.size, metricToOption(it.sizeUnit))
            )).filter(it => it !== undefined) as IOption[]
        });

        setUploadedImageList(() => data?.media.attachments ?? []);
    }, [data]);

    // load options
    useEffect(() => {
        if (metricList) setMetricOptions(metricListToOptionList(metricList));
    }, [metricList]);

    useEffect(() => {
        if (currencyList) setCurrencyOptions(currencyListToOptionList(currencyList));
    }, [currencyList]);

    // HANDLE
    // on submit
    const handleOnSubmit = (e: FormEvent<HTMLFormElement>): IFormInfo<IPropsVariationInfoProductForm> => {
        const defaultFormInfo = getEmptyFormInfo<IPropsVariationInfoProductForm>()
        if (!formRef.current) return defaultFormInfo

        const sizes = addedSizesOption.map(it => {
            const _optionsSizes = it.options
            if (!_optionsSizes || _optionsSizes.length === 0) return undefined
            return {
                size: it.params!.size,
                sizeUnit: optionToMetric(_optionsSizes[0]),
            } as ISize
        }).filter(it => it !== undefined) as ISize[]
        if (!formRef.current.checkValidity() || addedWholesaleOption.length === 0 || sizes.length === 0) {
            e.preventDefault();
            formRef.current.reportValidity();  // Вызывает встроенные сообщения браузера
            return defaultFormInfo
        }
        e.preventDefault();

        const formData = getFormDataFromForm(formRef.current!);
        const currency = fromOptionToType<ICurrency>(selectedWholesaleCurrencyOption!);
        const priceUnits = fromOptionToType<IMetrics>(selectedWholesaleMetricOption!);

        const media: IMediaProduct = {
            attachments: uploadedImageList,
            color: formData.color,
            article: formData.article,
            currency: currency,
            priceUnits: priceUnits,
            wholesalePrices: addedWholesaleOption.map(it => ({
                price: it.params!.price,
                quantity: it.params!.quantity,
                metrics: priceUnits,
                currency: currency,
            } as IWholesale)),
            sizes: sizes,
        };

        const updatedData = { media } as IPropsVariationInfoProductForm;

        if (setData) setData(updatedData);

        return {
            isValid: true,
            form: updatedData,
        };
    }

    // PROCESS
    const processWholesaleOption = (tempDataStorage: Record<string, any>) => {
        return processWholesaleOptionInProductForm(tempDataStorage.wholesalePrice, tempDataStorage.wholesaleQuantity, selectedWholesaleCurrencyOption, selectedWholesaleMetricOption);
    }

    const processSizeOption = (tempDataStorage: Record<string, any>) => {
        return processSizeOptionInProductForm(tempDataStorage.sizeValue, selectedSizeMetricOption);
    }

    return (
        <WrapperWOSubmit 
            triggerSubmit={(submitFn) => triggerSubmit?.(() => {
                const form = formRef.current;
                if (form) {
                    form.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
                }
                return Promise.resolve(handleOnSubmit(new Event("submit") as unknown as FormEvent<HTMLFormElement>));
            })} 
            formRef={formRef}
        >
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
