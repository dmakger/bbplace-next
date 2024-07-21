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
import { currencyListToOptionList } from "@/entities/Metrics/lib/option.currency.metrics.lib";
import { EInputTextTypeVariants } from "@/shared/ui/Input/Text/model/text.input.model";
import { IFile } from "@/entities/File/model/file.model";
import { Button, ButtonVariant } from "@/shared/ui/Button";
import { ButtonColor, ButtonSize, ButtonType } from "@/shared/ui/Button/model/button.model";
import { ELabelPosition } from "@/shared/ui/Wrapper/RectangleInput/model/wrapperRectangleInput.model";
import { getFormData } from "@/shared/lib/formData.lib";
import { TenderAPI } from "@/entities/Tender/api/tender.api";
import { IPropsTenderSale } from "@/entities/Tender/model/props.tender.model";
import { FileAPI } from "@/entities/File/api/file.api";
import { IResponseFile } from "@/entities/File/model/props.file.model";
import { getFileItemOfServer } from "@/entities/File/lib/getter.file.lib";

interface FormTenderSaleNewProps{
    className?: string,
}

export const FormTenderSaleNew:FC<FormTenderSaleNewProps> = ({className}) => {
    // STATE
    const [categoryOptions, setCategoryOptions] = useState<IOption[]>([])
    const [metricOptions, setMetricOptions] = useState<IOption[]>([])
    const [currencyOptions, setCurrencyOptions] = useState<IOption[]>([])
    const [userShareContact, setUserShareContact] = useState(true)

    const [selectedCategoryOption, setSelectedCategoryOption] = useState<IOption | null>(null)
    const [selectedMinOrderOption, setSelectedMinOrderOption] = useState<IOption | null>(null)
    const [selectedCurrencyOption, setSelectedCurrencyOption] = useState<IOption | null>(null)
    const [uploadedFileList, setUploadedFileList] = useState<IResponseFile[]>([])
    
    // API
    const {data: categoryList} = CategoryAPI.useGetCategoriesByIdQuery(undefined)              
    const {data: metricList} = MetricsAPI.useGetMetricsQuery()             
    const {data: currencyList} = CurrencyAPI.useGetCurrenciesQuery()
    const [createSaleTender] = TenderAPI.useCreateSaleTenderMutation()
    const [getFile] = FileAPI.useGetFileMutation()
    
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
        
        const formData = getFormData(formRef.current)
        
        console.log('qwe formData', formData, selectedCategoryOption, selectedMinOrderOption, selectedCurrencyOption, uploadedFileList)
        getFileItemOfServer(uploadedFileList[0], getFile, true)
        // const fileList = uploadFileList(selectedFileList, uploadFile)
        // console.log('qwe fileList', fileList)
        // const apiData: IPropsTenderSale = {
        //     name: formData.name,
        //     categoryId: selectedCategoryOption!.id,
        //     price: formData.price,
        //     currency: `${selectedCurrencyOption!.params!.code}`,
        //     minOrder: formData.minOrder,
        //     minOrderUnits: `${selectedMinOrderOption!.params!.shortName}`,
        //     bulkDiscounts: null,
        //     description: formData.description,
        //     shareContacts: true,
        //     attachments: ""
        // }
        // createSaleTender()
    }
    
    return (
        <form onSubmit={handleOnSubmit} ref={formRef} className={cls(cl.form, className)}>
            <WrapperRectangleInput labelText={"Наименование"} isRequired={true}>
                <Input.Text name={'name'} placeholder="До 50 символов"
                            defaultValue="123"
                            required={true} variant={EInputVariants.RECTANGULAR} />
            </WrapperRectangleInput>
            <WrapperRectangleInput labelText={"Категория"} isRequired={true}>
                <Input.TextAndSelect name={'category'} placeholder="Выберите категорию" 
                                    defaultOption={categoryOptions[0]}
                                    options={categoryOptions} onClickOption={setSelectedCategoryOption}
                                    titleModal="Категория" required={true} variant={EInputVariants.RECTANGULAR} /> 
            </WrapperRectangleInput>
            <WrapperRectangleInput labelText={"Минимальный заказ"} isRequired={true}>
                <Input.Text name={'minOrder'} placeholder="Введите число"
                            defaultValue="123"
                            required={true} variant={EInputVariants.RECTANGULAR} />
                <Input.TextAndSelect name={'selectMinOrder'} placeholder="Измерение" 
                                    defaultOption={metricOptions[0]}
                                    options={metricOptions} onClickOption={setSelectedMinOrderOption}
                                    titleModal="Измерение" required={true} variant={EInputVariants.RECTANGULAR} /> 
            </WrapperRectangleInput>
            <WrapperRectangleInput labelText={"Цена"}>
                <Input.Text name={'price'} placeholder="Введите число"
                            defaultValue="123"
                            variant={EInputVariants.RECTANGULAR} />
                <Input.TextAndSelect name={'currency'} placeholder="Валюта" 
                                    defaultOption={currencyOptions[0]}
                                    options={currencyOptions} onClickOption={setSelectedCurrencyOption}
                                    titleModal="Валюта" variant={EInputVariants.RECTANGULAR} /> 
            </WrapperRectangleInput>
            <WrapperRectangleInput labelText={"Описание"} isRequired={true}>
                <Input.Text name={'description'} placeholder="Начните вводить"
                            defaultValue="123"
                            required={true} variant={EInputVariants.RECTANGULAR} 
                            inputTypeVariant={EInputTextTypeVariants.TEXTAREA} />
            </WrapperRectangleInput>
            <WrapperRectangleInput labelText={"Файлы"} fileList={uploadedFileList} setFileList={setUploadedFileList}>
                <Input.File name={'files'} placeholder="Начните вводить" setFileList={setUploadedFileList}
                            variant={EInputVariants.RECTANGULAR}  />
            </WrapperRectangleInput>
            <WrapperRectangleInput labelText='Поделиться контактами' labelPosition={ELabelPosition.RIGHT}>
                <Input.Checkbox isChecked={userShareContact} setIsChecked={setUserShareContact} setChecked={setUserShareContact}/>
            </WrapperRectangleInput>

            <Button variant={ButtonVariant.FILL} color={ButtonColor.Primary} size={ButtonSize.Big} 
                    type={ButtonType.Submit} disabled={!userShareContact} 
                    title="Опубликовать тендер" />
        </form>
    )
}
