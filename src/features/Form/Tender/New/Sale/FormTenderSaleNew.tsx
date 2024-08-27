"use client"
import { FC, FormEvent, useEffect, useRef, useState } from "react"

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
import { EInputTextTypeVariants } from "@/shared/ui/Input/Text/model/text.input.model";
import { IFile } from "@/entities/File/model/file.model";
import { Button, ButtonVariant } from "@/shared/ui/Button";
import { ButtonColor, ButtonSize, ButtonType } from "@/shared/ui/Button/model/button.model";
import { ELabelPosition } from "@/shared/ui/Wrapper/RectangleInput/model/wrapperRectangleInput.model";
import { getFormDataFromForm } from "@/shared/lib/formData.lib";
import { TenderAPI } from "@/entities/Tender/api/tender.api";
import { IPropsTenderSale } from "@/entities/Tender/model/props.tender.model";
import { IResponseFile } from "@/entities/File/model/props.file.model";
import { currencyListToOptionList } from "@/entities/Metrics/lib/currency/option.currency.metrics.lib";
import { useRouter } from "next/navigation";
import { DASHBOARD_PAGES } from "@/config/pages-url.config";

interface FormTenderSaleNewProps{
    className?: string,
}

export const FormTenderSaleNew:FC<FormTenderSaleNewProps> = ({className}) => {
    // ROUTER
    const router = useRouter()

    // STATE
    const [categoryOptions, setCategoryOptions] = useState<IOption[]>([])
    const [metricOptions, setMetricOptions] = useState<IOption[]>([])
    const [currencyOptions, setCurrencyOptions] = useState<IOption[]>([])
    const [userShareContact, setUserShareContact] = useState(false)

    const [selectedCategoryOption, setSelectedCategoryOption] = useState<IOption | null>(null)
    const [selectedMinOrderOption, setSelectedMinOrderOption] = useState<IOption | null>(null)
    const [selectedCurrencyOption, setSelectedCurrencyOption] = useState<IOption | null>(null)
    const [uploadedFileList, setUploadedFileList] = useState<IFile[]>([])
    const [uploadedResponseFileList, setUploadedResponseFileList] = useState<IResponseFile[]>([])
    
    // API
    const {data: categoryList} = CategoryAPI.useGetCategoriesByIdQuery(undefined)              
    const {data: metricList} = MetricsAPI.useGetMetricsQuery()             
    const {data: currencyList} = CurrencyAPI.useGetCurrenciesQuery()
    const [createSaleTender] = TenderAPI.useCreateSaleTenderMutation()
    
    // REF
    const formRef = useRef<HTMLFormElement>(null)

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

    // ==={ HANDLE }===
    // ON SUBMIT
    const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!formRef.current) return
        
        const formData = getFormDataFromForm(formRef.current)

        const apiData: IPropsTenderSale = {
            name: formData.name,
            categoryId: selectedCategoryOption!.id,
            price: formData.price,
            currency: `${selectedCurrencyOption!.params!.code}`,
            minOrder: formData.minOrder,
            minOrderUnits: `${selectedMinOrderOption!.params!.shortName}`,
            bulkDiscounts: false,
            description: formData.description,
            shareContacts: true,
            attachments: JSON.stringify(uploadedResponseFileList),
        }
        createSaleTender(apiData).then(() => {
            router.push(DASHBOARD_PAGES.TENDERS.path)
        })
    }
    
    return (
        <form onSubmit={handleOnSubmit} ref={formRef} className={cls(cl.form, className)}>
            <WrapperRectangleInput labelText={"Наименование"} isRequired>
                <Input.Text name={'name'} placeholder="До 50 символов"
                            required variant={EInputVariants.RECTANGULAR} />
            </WrapperRectangleInput>
            <WrapperRectangleInput labelText={"Категория"} isRequired>
                <Input.TextAndSelect name={'category'} placeholder="Выберите категорию" 
                                    options={categoryOptions} onClickOption={setSelectedCategoryOption}
                                    titleModal="Категория" required variant={EInputVariants.RECTANGULAR} isActiveOptionInInput/> 
            </WrapperRectangleInput>
            <WrapperRectangleInput labelText={"Минимальный заказ"} isRequired>
                <Input.Text name={'minOrder'} placeholder="Введите число"
                            required variant={EInputVariants.RECTANGULAR} />
                <Input.TextAndSelect name={'selectMinOrder'} placeholder="Измерение" 
                                    options={metricOptions} onClickOption={setSelectedMinOrderOption}
                                    titleModal="Измерение" required variant={EInputVariants.RECTANGULAR} isActiveOptionInInput/> 
            </WrapperRectangleInput>
            <WrapperRectangleInput labelText={"Цена"}>
                <Input.Text name={'price'} placeholder="Введите число"
                            variant={EInputVariants.RECTANGULAR} />
                <Input.TextAndSelect name={'currency'} placeholder="Валюта" 
                                    options={currencyOptions} onClickOption={setSelectedCurrencyOption}
                                    titleModal="Валюта" variant={EInputVariants.RECTANGULAR} isActiveOptionInInput/> 
            </WrapperRectangleInput>
            <WrapperRectangleInput labelText={"Описание"} isRequired>
                <Input.Text name={'description'} placeholder="Начните вводить"
                            required variant={EInputVariants.RECTANGULAR} 
                            inputTypeVariant={EInputTextTypeVariants.TEXTAREA} />
            </WrapperRectangleInput>
            <WrapperRectangleInput labelText={"Файлы"} 
                                fileList={uploadedFileList} setFileList={setUploadedFileList}
                                responseFileList={uploadedResponseFileList} setResponseFileList={setUploadedResponseFileList}>
                <Input.File name={'files'} placeholder="Начните вводить" 
                            setFileList={setUploadedFileList} setResponseFileList={setUploadedResponseFileList}
                            variant={EInputVariants.RECTANGULAR}  />
            </WrapperRectangleInput>
            <WrapperRectangleInput labelText='Поделиться контактами' labelPosition={ELabelPosition.RIGHT} isRequired>
                <Input.Checkbox isChecked={userShareContact} setIsChecked={setUserShareContact} setChecked={setUserShareContact} required/>
            </WrapperRectangleInput>

            <Button variant={ButtonVariant.FILL} color={ButtonColor.Primary} size={ButtonSize.Big} 
                    type={ButtonType.Submit} disabled={!userShareContact} 
                    title="Опубликовать тендер" />
        </form>
    )
}
