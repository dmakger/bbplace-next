"use client"
import { FC, FormEvent, useEffect, useRef, useState } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_FormTenderPurchaseNew.module.scss'
import Input from "@/shared/ui/Input/Input";
import { WrapperRectangleInput } from "@/shared/ui/Wrapper/RectangleInput";
import { EInputVariants } from "@/shared/ui/Input/model/input.model";
import { CategoryAPI } from "@/entities/Metrics/api/category.metrics.api";
import { IOption } from "@/shared/model/option.model";
import { categoryListToOptionList } from "@/entities/Metrics/lib/option.category.metrics.lib";
import { MetricsAPI } from "@/entities/Metrics/api/metrics.metrics.api";
import { metricListToOptionList, metricToOption } from "@/entities/Metrics/lib/option.metric.metrics.lib";
import { CurrencyAPI } from "@/entities/Metrics/api/currency.metrics.api";
import { EInputTextTypeVariants } from "@/shared/ui/Input/Text/model/text.input.model";
import { IFile } from "@/entities/File/model/file.model";
import { Button, ButtonVariant } from "@/shared/ui/Button";
import { ButtonColor, ButtonSize, ButtonType } from "@/shared/ui/Button/model/button.model";
import { ELabelPosition } from "@/shared/ui/Wrapper/RectangleInput/model/wrapperRectangleInput.model";
import { getFormDataFromForm } from "@/shared/lib/formData.lib";
import { TenderAPI } from "@/entities/Tender/api/tender.api";
import { IPropsTenderPurchase } from "@/entities/Tender/model/props.tender.model";
import { IResponseFile } from "@/entities/File/model/props.file.model";
import { currencyListToOptionList, currencyToOption } from "@/entities/Metrics/lib/currency/option.currency.metrics.lib";
import { useRouter } from "next/navigation";
import { DASHBOARD_PAGES } from "@/config/pages-url.config";
import { useNotify } from "@/features/Notify/lib/hooks";
import { getFilteredOption } from "@/shared/lib/option/result.option.lib";
import { listToErrorText } from "@/shared/lib/notify.lib";
import { ENotifyStatus } from "@/features/Notify/data/notify.data";
import { EInputTextType } from "@/shared/ui/Input/ui/Text/data/text.input.data";



interface FormTenderPurchaseNewProps{
    className?: string,
}

export const FormTenderPurchaseNew:FC<FormTenderPurchaseNewProps> = ({className}) => {
    // ROUTER
    const router = useRouter()

    // STATE
    const [categoryOptions, setCategoryOptions] = useState<IOption[]>([])
    const [metricOptions, setMetricOptions] = useState<IOption[]>([])
    const [currencyOptions, setCurrencyOptions] = useState<IOption[]>([])
    const [userShareContact, setUserShareContact] = useState(false)

    const [selectedCategoryOption, setSelectedCategoryOption] = useState<IOption | null>(null)
    const [selectedQuantityUnitsOption, setSelectedQuantityUnitsOption] = useState<IOption | null>(null)
    const [selectedCurrencyOption, setSelectedCurrencyOption] = useState<IOption | null>(null)
    const [uploadedFileList, setUploadedFileList] = useState<IFile[]>([])
    const [uploadedResponseFileList, setUploadedResponseFileList] = useState<IResponseFile[]>([])
    
    // API
    const {data: categoryList} = CategoryAPI.useGetCategoriesByIdQuery(undefined)              
    const {data: metricList} = MetricsAPI.useGetMetricsQuery()             
    const {data: currencyList} = CurrencyAPI.useGetCurrenciesQuery()
    const [createPurchaseTender] = TenderAPI.useCreatePurchaseTenderMutation()
    
    // REF
    const formRef = useRef<HTMLFormElement>(null)

    // NOTIFY
    const {notify} = useNotify();

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
        setSelectedQuantityUnitsOption(prev => {
            if (prev || metricList.length === 0) return prev
            return metricToOption(metricList[0])
        })

    }, [metricList])
    // currency
    useEffect(() => {
        if (!currencyList) return
        setCurrencyOptions(currencyListToOptionList(currencyList))
        setSelectedCurrencyOption(prev => {
            if (prev || currencyList.length === 0) return prev
            return currencyToOption(currencyList.find(it => it.code === 'RUB') ?? currencyList[0])
        })
    }, [currencyList])

    // ==={ HANDLE }===
    // ON SUBMIT
    const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!formRef.current) return
        
        const formData = getFormDataFromForm(formRef.current)
        
        const filteredRequiredFormData = getFilteredOption([
            { name: 'Категория', option: selectedCategoryOption ?? undefined},
            { name: 'Количество', option: selectedQuantityUnitsOption ?? undefined},
        ])

        if (filteredRequiredFormData.errors.length > 0) {
            const notifyText = listToErrorText(filteredRequiredFormData.errors)
            notify({text: notifyText, status: ENotifyStatus.Error})
            return
        }

        console.log('qwe API', formData, selectedCategoryOption, selectedCurrencyOption, selectedQuantityUnitsOption, userShareContact)
        const apiData: IPropsTenderPurchase = {
            name: formData.name,
            categoryId: selectedCategoryOption!.id,
            quantity: formData.quantity,
            quantityUnits: `${selectedQuantityUnitsOption!.params!.shortname}`,
            maximumBudget: formData.maximumBudget,
            currency: `${selectedCurrencyOption!.params!.code}`,
            description: formData.description,
            shareContacts: userShareContact,
            attachments: JSON.stringify(uploadedResponseFileList),
        }
        createPurchaseTender(apiData).then(res => {
            router.push(DASHBOARD_PAGES.TENDERS(true).path)
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
            <WrapperRectangleInput labelText={"Количество"} isRequired classNameInputsContainer={cl.inputsContainer}>
                <Input.Text name={'quantity'} placeholder="Введите число" defaultValue={0}
                            type={EInputTextType.Number} variant={EInputVariants.RECTANGULAR} required={true} />
                <Input.TextAndSelect name={'quantityUnits'} placeholder="Измерение" 
                                    defaultOption={selectedQuantityUnitsOption ?? undefined}
                                    options={metricOptions} onClickOption={setSelectedQuantityUnitsOption}
                                    titleModal="Измерение" required variant={EInputVariants.RECTANGULAR} isActiveOptionInInput/> 
            </WrapperRectangleInput>
            <WrapperRectangleInput labelText={"Максимальный бюджет"} classNameInputsContainer={cl.inputsContainer}>
                <Input.Text name={'maximumBudget'} placeholder="Введите число" defaultValue={0}
                            type={EInputTextType.Number} variant={EInputVariants.RECTANGULAR} />
                <Input.TextAndSelect name={'currency'} placeholder="Валюта" 
                                    defaultOption={selectedCurrencyOption ?? undefined}
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
            <WrapperRectangleInput labelText='Поделиться контактами' labelPosition={ELabelPosition.RIGHT}>
                <Input.Checkbox isChecked={userShareContact} setIsChecked={setUserShareContact} setChecked={setUserShareContact} />
            </WrapperRectangleInput>

            <Button variant={ButtonVariant.FILL} color={ButtonColor.Primary} size={ButtonSize.Big} 
                    type={ButtonType.Submit} 
                    title="Опубликовать тендер" />
        </form>
    )
}
