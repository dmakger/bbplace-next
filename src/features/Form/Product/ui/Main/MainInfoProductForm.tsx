"use client"

import { Dispatch, FC, FormEvent, SetStateAction, useEffect, useRef, useState } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_MainInfoProductForm.module.scss'
import { WrapperSubblockForm } from "@/shared/ui/Wrapper/SubblockForm/ui/WrapperSubblockForm";
import { SubblockFormVariant } from "@/shared/ui/Wrapper/SubblockForm/data/subblockForm.data";
import { WrapperRectangleInput } from "@/shared/ui/Wrapper/RectangleInput";
import Input from "@/shared/ui/Input/Input";
import { EInputVariants } from "@/shared/ui/Input/model/input.model";
import { CategoryRecursiveSelect } from "@/features/CategoryRecursiveSelect";
import { IOption } from "@/shared/model/option.model";
import { STATUS__PRODUCT_FORM__DATA } from "@/features/Form/Product/data/status.product.form.data";
import { ERadioVariant } from '@/shared/ui/Input/ui/Radio/model/radio.model'
import { NO_FORM__DATA, YES_FORM__DATA } from "@/shared/data/option/base.option.data";
import { CountryAPI } from "@/entities/Metrics/api/country.metrics.api";
import { countryListToOptionList } from "@/entities/Metrics/lib/option.country.metrics.lib";
import { EInputTextTypeVariants } from "@/shared/ui/Input/Text/model/text.input.model";
import { getFormDataFromForm } from "@/shared/lib/formData.lib";
import { IPropsMainInfoProductForm } from "../../model/mainInfo.product.form.model";
import { WrapperWOSubmit } from "@/shared/ui/Wrapper/WOSubmit/WrapperWOSubmit";


interface MainInfoProductFormProps {
    setData?: Dispatch<SetStateAction<IPropsMainInfoProductForm | undefined>>
    triggerSubmit?: (submitFn: () => void) => void,
    isOpenForm?: boolean
    className?: string,
}

export const MainInfoProductForm:FC<MainInfoProductFormProps> = ({setData, triggerSubmit, isOpenForm, className}) => {
    // REF
    const formRef = useRef<HTMLFormElement>(null)

    // STATE
    const [countryOptions, setCountryOptions] = useState<IOption[]>([])

    const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([])
    const [selectedStatusOption, setSelectedStatusOption] = useState<IOption>(NO_FORM__DATA)
    const [selectedCountryOption, setSelectedCountryOption] = useState<IOption | null>(null)

    // API
    const {data: countryList} = CountryAPI.useGetCountriesQuery()              

    // EFFECT
    // country
    useEffect(() => {
        if (!countryList) return
        setCountryOptions(countryListToOptionList(countryList))
    }, [countryList])

    // HANDLE
    const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!formRef.current) return
        
        const formData = getFormDataFromForm(formRef.current)
        if (setData) {
            setData({
                name: formData.name,
                categoryId: selectedCategoryIds[0],
                status: selectedStatusOption,
                hasCertificate: false,
                country: selectedCountryOption,
                description: formData.description,
            } as IPropsMainInfoProductForm)
        }
    }


    return (
        <WrapperWOSubmit triggerSubmit={triggerSubmit} formRef={formRef}>
            <WrapperSubblockForm title="Основная информация" variant={SubblockFormVariant.Toggle} isOpen={isOpenForm} className={className}>
                <form ref={formRef} onSubmit={handleOnSubmit} className={cl.form}>
                    <WrapperRectangleInput labelText={"Наименование"} isRequired={true}>
                        <Input.Text name={'name'} placeholder="До 50 символов"
                                    required={true} variant={EInputVariants.RECTANGULAR} />
                    </WrapperRectangleInput>
                    <CategoryRecursiveSelect
                        labelText="Категория"
                        isRequired
                        isDescriptionTooltip
                        descriptionTooltipText='Выберите категорию из списка'
                        setSelectedCategoriesId={setSelectedCategoryIds} />
                    <WrapperRectangleInput labelText={"Статус товара"} isRequired={true}>
                        <Input.TextAndSelect name={'statusProduct'} placeholder="Выберите статус" 
                                options={STATUS__PRODUCT_FORM__DATA} onClickOption={setSelectedStatusOption}
                                titleModal="Статус товара" required={true} variant={EInputVariants.RECTANGULAR} /> 
                    </WrapperRectangleInput>
                    <WrapperRectangleInput labelText={"Наличие сертификата"} isRequired={true}>
                        <Input.Radio name='hasCertificate' variant={EInputVariants.RECTANGULAR} variantRadio={ERadioVariant.SINGLE}
                                    option={YES_FORM__DATA} required={true} />
                        <Input.Radio name='hasCertificate' variant={EInputVariants.RECTANGULAR} variantRadio={ERadioVariant.SINGLE}
                                    option={NO_FORM__DATA} required={true} /> 
                    </WrapperRectangleInput>
                    <WrapperRectangleInput labelText={"Страна производства"} isRequired={true}>
                        <Input.TextAndSelect name={'country'} placeholder="Выберите страну" 
                                options={countryOptions} onClickOption={setSelectedCountryOption}
                                titleModal="Страна производства" required={true} variant={EInputVariants.RECTANGULAR} /> 
                    </WrapperRectangleInput>
                    <WrapperRectangleInput labelText={"Описание"} isRequired={true}>
                        <Input.Text name={'description'} placeholder="Начните вводить"
                                    required={true} variant={EInputVariants.RECTANGULAR} 
                                    inputTypeVariant={EInputTextTypeVariants.TEXTAREA} />
                    </WrapperRectangleInput>
                </form>
            </WrapperSubblockForm>
        </WrapperWOSubmit>
    )
}
