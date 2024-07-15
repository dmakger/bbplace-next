import { FC, useEffect, useState } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_FormTenderSaleNew.module.scss'
import Input from "@/shared/ui/Input/Input";
import { WrapperRectangleInput } from "@/shared/ui/Wrapper/RectangleInput";
import { EInputVariants } from "@/shared/ui/Input/model/input.model";
import { CategoryAPI } from "@/entities/Metrics/api/category.metrics.api";
import { IOption } from "@/shared/model/option.model";
import { categoryListToOptionList } from "@/entities/Metrics/lib/option.category.metrics.lib";
import { MetricsAPI } from "@/entities/Metrics/api/metrics.metrics.api";
import { metricListToOptionList } from "@/entities/Metrics/lib/option.metric.metrics.lib";
import { CurrencyAPI } from "@/entities/Metrics/api/currency.metrics.api";
import { currencyListToOptionList } from "@/entities/Metrics/lib/option.currency.metrics.lib";
import { EInputTextTypeVariants } from "@/shared/ui/Input/Text/model/text.input.model";
import { IFile } from "@/entities/File/model/file.model";

interface FormTenderSaleNewProps{
    className?: string,
}

export const FormTenderSaleNew:FC<FormTenderSaleNewProps> = ({className}) => {
    // STATE
    const [categoryOptions, setCategoryOptions] = useState<IOption[]>([])
    const [metricOptions, setMetricOptions] = useState<IOption[]>([])
    const [currencyOptions, setCurrencyOptions] = useState<IOption[]>([])
    const [fileList, setFileList] = useState<IFile[]>([])

    // API
    const {data: categoryList} = CategoryAPI.useGetCategoriesByIdQuery(undefined)              
    const {data: metricList} = MetricsAPI.useGetMetricsQuery()             
    const {data: currencyList} = CurrencyAPI.useGetCurrenciesQuery()             

    // EFFECT
    // category
    useEffect(() => {
        if (!categoryList) return
        setCategoryOptions(categoryListToOptionList(categoryList))
    }, [categoryList])
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
    

    return (
        <form className={cls(cl.form, className)}>
            <WrapperRectangleInput labelText={"Наименование"} isRequired={true}>
                <Input.Text name={'name'} placeholder="До 50 символов"
                            required={true} variant={EInputVariants.RECTANGULAR} />
            </WrapperRectangleInput>
            <WrapperRectangleInput labelText={"Категория"} isRequired={true}>
                <Input.Select name={'category'} placeholder="Выберите категорию" options={categoryOptions}
                              required={true} variant={EInputVariants.RECTANGULAR} />
            </WrapperRectangleInput>
            <WrapperRectangleInput labelText={"Минимальный заказ"} isRequired={true}>
                <Input.Text name={'numberMinOrder'} placeholder="Введите число"
                                required={true} variant={EInputVariants.RECTANGULAR} />
                <Input.Select name={'selectMinOrder'} placeholder="Измерение" options={metricOptions}
                              required={true} variant={EInputVariants.RECTANGULAR} />
            </WrapperRectangleInput>
            <WrapperRectangleInput labelText={"Цена"}>
                <Input.Text name={'numberPrice'} placeholder="Введите число"
                                variant={EInputVariants.RECTANGULAR} />
                <Input.Select name={'selectPrice'} placeholder="Валюта" options={currencyOptions}
                              variant={EInputVariants.RECTANGULAR} />
            </WrapperRectangleInput>
            <WrapperRectangleInput labelText={"Описание"} isRequired={true}>
                <Input.Text name={'description'} placeholder="Начните вводить"
                            required={true} variant={EInputVariants.RECTANGULAR} 
                            inputTypeVariant={EInputTextTypeVariants.TEXTAREA} />
            </WrapperRectangleInput>
            <WrapperRectangleInput labelText={"Файлы"} fileList={fileList}>
                <Input.File name={'files'} placeholder="Начните вводить"
                            variant={EInputVariants.RECTANGULAR}  />
            </WrapperRectangleInput>

        </form>
    )
}
