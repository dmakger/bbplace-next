'use client'

import cl from './_CompanyInfoEditProfileForm.module.scss'
import { WrapperWOSubmit } from "@/shared/ui/Wrapper/WOSubmit/WrapperWOSubmit"
import { WrapperSubblockForm } from "@/shared/ui/Wrapper/SubblockForm/ui/WrapperSubblockForm"
import { SubblockFormVariant } from "@/shared/ui/Wrapper/SubblockForm/data/subblockForm.data"
import { WrapperRectangleInput } from "@/shared/ui/Wrapper/RectangleInput"
import { EInputTextType } from "@/shared/ui/Input/ui/Text/data/text.input.data"
import Input from "@/shared/ui/Input/Input"
import { EInputVariants } from "@/shared/ui/Input/model/input.model"
import { Dispatch, FormEvent, SetStateAction, useRef, useState } from "react"
import { useAppSelector } from "@/storage/hooks"
import { CategoryRecursiveSelect } from "@/features/CategoryRecursiveSelect"
import { INITIAL_COMPANY_ERRORS } from "../../data/editProfile.data"
import { IEditProfileCompanyFormValues } from "../../model/editProfile.model"
import { getFormDataFromForm } from "@/shared/lib/formData.lib"
import { ISupplierAPI } from "@/entities/Supplier/model/supplier.model"

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

    //RTK
    const { legalName: legalCompanyName, brandName: brandCompanyName,  } = useAppSelector(state => state.user)


    //STATE
    const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([])
    const [shortDescription, setShortDescription] = useState<string>(userData?.shortDescription ?? '')
    const [fullDescription, setFullDescription] = useState<string>(userData?.description ?? '')
    const [legalName, setLegalName] = useState<string>(legalCompanyName ?? '')
    const [brandName, setBrandName] = useState<string>(brandCompanyName ?? '')
    const [TIN, setTIN] = useState<string>(userData?.inn ?? '')

    const [errors, setErrors] = useState<IEditProfileCompanyFormValues>(INITIAL_COMPANY_ERRORS);

    // REF
    const formRef = useRef<HTMLFormElement>(null)

    // HANDLE
    const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!formRef.current) return
        
        const formData = getFormDataFromForm(formRef.current)
        if (setData) {
            setData({
                categories: formData.categories,
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
                        setSelectedCategoriesId={setSelectedCategoryIds} />
                    <WrapperRectangleInput labelText="Краткое описание" errorInputMessage={errors.shortDesc} isDescriptionTooltip descriptionTooltipText='Краткая информация о вашем бизнесе. Не более 60 символов.'>
                        <Input.Text variant={EInputVariants.RECTANGULAR} name="shortDesc" value={shortDescription} setValue={setShortDescription} type={EInputTextType.Text} placeholder="Кратко опишите деятельность" warning={!!errors.Contact} error={!!errors.Contact} />
                    </WrapperRectangleInput>

                    <WrapperRectangleInput labelText="Полное описание" errorInputMessage={errors.fullDesc} isDescriptionTooltip descriptionTooltipText="Подробная информация о вашей компании и предлагаемых товарах.">
                        <Input.Text variant={EInputVariants.RECTANGULAR} name="fullDesc" value={fullDescription} setValue={setFullDescription} placeholder="Начните вводить" error={!!errors.Name} warning={!!errors.Name} />
                    </WrapperRectangleInput>

                    <WrapperRectangleInput labelText="Юридическое наименование" errorInputMessage={errors.legalName} isDescriptionTooltip descriptionTooltipText='Официальное сокращенное название вашей компании. Пример, ООО "Бибиплейс".'>
                        <Input.Text variant={EInputVariants.RECTANGULAR} name="legalName" value={legalName} setValue={setLegalName} type={EInputTextType.Text} placeholder="Название как в документах" warning={!!errors.Contact} error={!!errors.Contact} />
                    </WrapperRectangleInput>

                    <WrapperRectangleInput labelText="Наименование бренда" errorInputMessage={errors.brandName} isDescriptionTooltip descriptionTooltipText='Название бренда, под которым вы работаете (при наличии)'>
                        <Input.Text variant={EInputVariants.RECTANGULAR} name="brandName" value={brandName} setValue={setBrandName} type={EInputTextType.Text} placeholder="Введите название" warning={!!errors.Contact} error={!!errors.Contact} />
                    </WrapperRectangleInput>

                    <WrapperRectangleInput labelText="ИНН" errorInputMessage={errors.tin} isDescriptionTooltip descriptionTooltipText='Индивидуальный налоговый номер для идентификации компании.'>
                        <Input.Text variant={EInputVariants.RECTANGULAR} name="tin" value={userData?.inn} type={EInputTextType.Number} placeholder="Введите номер налогоплательщика" warning={!!errors.Contact} error={!!errors.Contact} />
                    </WrapperRectangleInput>
                </form>
            </WrapperSubblockForm>
        </WrapperWOSubmit>
    )
}
