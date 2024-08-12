'use client'

import cl from './_CompanyInfoEditProfileForm.module.scss'
import { WrapperWOSubmit } from "@/shared/ui/Wrapper/WOSubmit/WrapperWOSubmit"
import { WrapperSubblockForm } from "@/shared/ui/Wrapper/SubblockForm/ui/WrapperSubblockForm"
import { SubblockFormVariant } from "@/shared/ui/Wrapper/SubblockForm/data/subblockForm.data"
import { WrapperRectangleInput } from "@/shared/ui/Wrapper/RectangleInput"
import { EInputTextType } from "@/shared/ui/Input/ui/Text/data/text.input.data"
import Input from "@/shared/ui/Input/Input"
import { EInputVariants } from "@/shared/ui/Input/model/input.model"
import { Dispatch, FormEvent, SetStateAction, useEffect, useRef, useState } from "react"
import { useAppSelector } from "@/storage/hooks"
import { CategoryRecursiveSelect } from "@/features/CategoryRecursiveSelect"
import { INITIAL_COMPANY_ERRORS } from "../../data/editProfile.data"
import { IEditProfileCompanyFormValues } from "../../model/editProfile.model"
import { getFormDataFromForm } from "@/shared/lib/formData.lib"
import { ISupplierAPI } from "@/entities/Supplier/model/supplier.model"
import { IOption } from '@/shared/model/option.model'
import { CategoryAPI } from '@/entities/Metrics/api/category.metrics.api'
import { ERecursiveSelectVariant } from '@/shared/ui/Input/ui/RecursiveSelect/model/recursiveSelect.model'

interface ICompanyInfoEditProfileForm {
    setData?: Dispatch<SetStateAction<IEditProfileCompanyFormValues | undefined>>
    triggerSubmit?: (submitFn: () => void) => void,
    className?: string,
    userData: ISupplierAPI
}

export const CompanyInfoEditProfileForm = ({ 
    className,
    setData,
    triggerSubmit,
    userData
 }: ICompanyInfoEditProfileForm) => {

    //API
    const {data: categories} = CategoryAPI.useGetCategoriesQuery()

    //RTK
    const { legalName: legalCompanyName, brandName: brandCompanyName } = useAppSelector(state => state.user)


    //STATE
    const [selectedCategoriesId, setSelectedCategoriesId] = useState<number[]>([])
    const [selectedCategoriesAsOption, setSelectedCategoriesAsOption] = useState<IOption[]>([])

    const [shortDescription, setShortDescription] = useState<string>('')
    const [fullDescription, setFullDescription] = useState<string>('')
    const [legalName, setLegalName] = useState<string>(legalCompanyName ?? '')
    const [brandName, setBrandName] = useState<string>(brandCompanyName ?? '')
    const [TIN, setTIN] = useState<string>('')

    const [errors, setErrors] = useState<IEditProfileCompanyFormValues>(INITIAL_COMPANY_ERRORS);

    //EFFECT
    useEffect(() => {
        if(userData){
            setShortDescription(userData.shortDescription)
            setFullDescription(userData.description)
            setTIN(userData.inn)
            setSelectedCategoriesId(JSON.parse(userData.category).map((it: IOption) => it.id))            
        }
    }, [userData])

    useEffect(() => {
        if(selectedCategoriesId.length && categories){
            const categoriesOption = selectedCategoriesId
            .map(it => categories.find(category => it === category.id))
            .filter((option): option is IOption => option !== undefined)
            setSelectedCategoriesAsOption(categoriesOption)
        }
            
    }, [selectedCategoriesId, categories])
       

    // REF
    const formRef = useRef<HTMLFormElement>(null)

    // HANDLE
    const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!formRef.current) return
        
        const formData = getFormDataFromForm(formRef.current)
        if (setData) {
            setData({
                categories: JSON.stringify(selectedCategoriesAsOption),
                shortDesc: formData.shortDesc,
                fullDesc: formData.fullDesc,
                legalName: formData.legalName,
                brandName: formData.brandName,
                tin: formData.tin
            } as IEditProfileCompanyFormValues)
        }
    }
    return (
        <WrapperWOSubmit formRef={formRef} triggerSubmit={triggerSubmit}>
            <WrapperSubblockForm title="Профиль компании" variant={SubblockFormVariant.Toggle} className={className}>
                <form ref={formRef} onSubmit={handleOnSubmit} className={cl.form}>
                <CategoryRecursiveSelect
                        labelText="Категория"
                        isDescriptionTooltip
                        descriptionTooltipText='Укажите категории товаров, которые вы предлагаете или заинтересованы.'
                        variant={ERecursiveSelectVariant.MULTIPLE}
                        defaultCategoriesId={selectedCategoriesId}
                        setSelectedCategoriesId={setSelectedCategoriesId} />
                    <WrapperRectangleInput labelText="Краткое описание" errorInputMessage={errors.shortDesc} isDescriptionTooltip descriptionTooltipText='Краткая информация о вашем бизнесе. Не более 60 символов.'>
                        <Input.Text variant={EInputVariants.RECTANGULAR} name="shortDesc" value={shortDescription} setValue={setShortDescription} type={EInputTextType.Text} placeholder="Кратко опишите деятельность" warning={!!errors.shortDesc} error={!!errors.shortDesc} />
                    </WrapperRectangleInput>

                    <WrapperRectangleInput labelText="Полное описание" errorInputMessage={errors.fullDesc} isDescriptionTooltip descriptionTooltipText="Подробная информация о вашей компании и предлагаемых товарах.">
                        <Input.Text variant={EInputVariants.RECTANGULAR} name="fullDesc" value={fullDescription} setValue={setFullDescription} placeholder="Начните вводить" error={!!errors.fullDesc} warning={!!errors.fullDesc} />
                    </WrapperRectangleInput>

                    <WrapperRectangleInput labelText="Юридическое наименование" errorInputMessage={errors.legalName} isDescriptionTooltip descriptionTooltipText='Официальное сокращенное название вашей компании. Пример, ООО "Бибиплейс".'>
                        <Input.Text variant={EInputVariants.RECTANGULAR} name="legalName" value={legalName} setValue={setLegalName} type={EInputTextType.Text} placeholder="Название как в документах" warning={!!errors.legalName} error={!!errors.legalName} />
                    </WrapperRectangleInput>

                    <WrapperRectangleInput labelText="Наименование бренда" errorInputMessage={errors.brandName} isDescriptionTooltip descriptionTooltipText='Название бренда, под которым вы работаете (при наличии)'>
                        <Input.Text variant={EInputVariants.RECTANGULAR} name="brandName" value={brandName} setValue={setBrandName} type={EInputTextType.Text} placeholder="Введите название" warning={!!errors.brandName} error={!!errors.brandName} />
                    </WrapperRectangleInput>

                    <WrapperRectangleInput labelText="ИНН" errorInputMessage={errors.tin} isDescriptionTooltip descriptionTooltipText='Индивидуальный налоговый номер для идентификации компании.'>
                        <Input.Text variant={EInputVariants.RECTANGULAR} name="tin" value={TIN} setValue={setTIN} type={EInputTextType.Number} placeholder="Введите номер налогоплательщика" warning={!!errors.tin} error={!!errors.tin} />
                    </WrapperRectangleInput>
                </form>
            </WrapperSubblockForm>
        </WrapperWOSubmit>
    )
}
