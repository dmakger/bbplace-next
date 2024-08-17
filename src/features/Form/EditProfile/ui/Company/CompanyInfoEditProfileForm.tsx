'use client'

import cl from './_CompanyInfoEditProfileForm.module.scss'
import { WrapperSubblockForm } from "@/shared/ui/Wrapper/SubblockForm/ui/WrapperSubblockForm"
import { SubblockFormVariant } from "@/shared/ui/Wrapper/SubblockForm/data/subblockForm.data"
import { WrapperRectangleInput } from "@/shared/ui/Wrapper/RectangleInput"
import { EInputTextType } from "@/shared/ui/Input/ui/Text/data/text.input.data"
import Input from "@/shared/ui/Input/Input"
import { EInputVariants } from "@/shared/ui/Input/model/input.model"
import { Dispatch, FormEvent, SetStateAction, useEffect, useRef, useState } from "react"
import { useAppSelector } from "@/storage/hooks"
import { CategoryRecursiveSelect } from "@/features/CategoryRecursiveSelect"
import { getFormDataFromForm } from "@/shared/lib/formData.lib"
import { ISupplierAPI } from "@/entities/Supplier/model/supplier.model"
import { IOption } from '@/shared/model/option.model'
import { ERecursiveSelectVariant } from '@/shared/ui/Input/ui/RecursiveSelect/model/recursiveSelect.model'
import { WrapperWOSubmit } from '@/shared/ui/Wrapper/WOSubmit/ui/WrapperWOSubmit'
import { EInputTextTypeVariants } from '@/shared/ui/Input/Text/model/text.input.model'
import { IEditProfileCompanyFormValues } from '../../model/editProfile.model'

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
    const { legalName: legalCompanyName, brandName: brandCompanyName } = useAppSelector(state => state.user)

    //STATE
    const [defaultCategoriesId, setDefaultCategoriesId] = useState<number[]>([])
    const [selectedCategoriesAsOption, setSelectedCategoriesAsOption] = useState<IOption[]>([])

    const [shortDescription, setShortDescription] = useState<string>('')
    const [fullDescription, setFullDescription] = useState<string>('')
    const [legalName, setLegalName] = useState<string>(legalCompanyName ?? '')
    const [brandName, setBrandName] = useState<string>(brandCompanyName ?? '')
    const [TIN, setTIN] = useState<string>('')

    //EFFECT
    useEffect(() => {
        if (userData) {
            setShortDescription(userData.shortDescription)
            setFullDescription(userData.description)
            setTIN(userData.inn)
            setDefaultCategoriesId(JSON.parse(userData.category).map((it: IOption) => it.id))
        }
    }, [userData])

    console.log(userData.category);
    

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
        <WrapperWOSubmit triggerSubmit={(submitFn) => triggerSubmit?.(() => {
            const form = formRef.current;
            if (form) {
                form.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
            }
            return Promise.resolve(handleOnSubmit(new Event("submit") as unknown as FormEvent<HTMLFormElement>)); 
        })} formRef={formRef}>
            <WrapperSubblockForm title="Профиль компании" variant={SubblockFormVariant.Toggle} className={className}>
                <form ref={formRef} onSubmit={handleOnSubmit} className={cl.form}>
                    <CategoryRecursiveSelect
                        labelText="Категория"
                        isDescriptionTooltip
                        descriptionTooltipText='Укажите категории товаров, которые вы предлагаете или заинтересованы.'
                        variant={ERecursiveSelectVariant.MULTIPLE}
                        setSelectedCategoriesAsOption={setSelectedCategoriesAsOption}
                        defaultCategoriesId={defaultCategoriesId}
                    />
                    <WrapperRectangleInput labelText="Краткое описание" isDescriptionTooltip descriptionTooltipText='Краткая информация о вашем бизнесе. Не более 60 символов.'>
                        <Input.Text variant={EInputVariants.RECTANGULAR} name="shortDesc" value={shortDescription} setValue={setShortDescription} type={EInputTextType.Text} placeholder="Кратко опишите деятельность" maxLength={60}/>
                    </WrapperRectangleInput>

                    <WrapperRectangleInput labelText="Полное описание" isDescriptionTooltip descriptionTooltipText="Подробная информация о вашей компании и предлагаемых товарах.">
                        <Input.Text variant={EInputVariants.RECTANGULAR} inputTypeVariant={EInputTextTypeVariants.TEXTAREA} name="fullDesc" value={fullDescription} setValue={setFullDescription} placeholder="Начните вводить" />
                    </WrapperRectangleInput>

                    <WrapperRectangleInput labelText="Юридическое наименование" isDescriptionTooltip descriptionTooltipText='Официальное сокращенное название вашей компании. Пример, ООО "Бибиплейс".'>
                        <Input.Text variant={EInputVariants.RECTANGULAR} name="legalName" value={legalName} setValue={setLegalName} type={EInputTextType.Text} placeholder="Название как в документах" />
                    </WrapperRectangleInput>

                    <WrapperRectangleInput labelText="Наименование бренда" isDescriptionTooltip descriptionTooltipText='Название бренда, под которым вы работаете (при наличии)'>
                        <Input.Text variant={EInputVariants.RECTANGULAR} name="brandName" value={brandName} setValue={setBrandName} type={EInputTextType.Text} placeholder="Введите название" />
                    </WrapperRectangleInput>

                    <WrapperRectangleInput labelText="ИНН" isDescriptionTooltip descriptionTooltipText='Индивидуальный налоговый номер для идентификации компании.'>
                        <Input.Text variant={EInputVariants.RECTANGULAR} name="tin" value={TIN} setValue={setTIN} type={EInputTextType.Number} placeholder="Введите номер налогоплательщика"/>
                    </WrapperRectangleInput>
                </form>
            </WrapperSubblockForm>
        </WrapperWOSubmit>
    )
}
