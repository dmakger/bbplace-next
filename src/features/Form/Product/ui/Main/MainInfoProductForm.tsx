"use client"

import { Dispatch, FC, FormEvent, SetStateAction, useEffect, useRef, useState } from "react";
import cl from './_MainInfoProductForm.module.scss';
import { WrapperSubblockForm } from "@/shared/ui/Wrapper/SubblockForm/ui/WrapperSubblockForm";
import { SubblockFormVariant } from "@/shared/ui/Wrapper/SubblockForm/data/subblockForm.data";
import { WrapperRectangleInput } from "@/shared/ui/Wrapper/RectangleInput";
import Input from "@/shared/ui/Input/Input";
import { EInputVariants } from "@/shared/ui/Input/model/input.model";
import { CategoryRecursiveSelect } from "@/features/CategoryRecursiveSelect";
import { IOption } from "@/shared/model/option.model";
import { READY_STATUS__PRODUCT_FORM__DATA, STATUS__PRODUCT_FORM__DATA } from "@/features/Form/Product/data/status.product.form.data";
import { ERadioVariant } from '@/shared/ui/Input/ui/Radio/model/radio.model';
import { NO_FORM__DATA, YES_FORM__DATA } from "@/shared/data/option/base.option.data";
import { CountryAPI } from "@/entities/Metrics/api/country.metrics.api";
import { countryListToOptionList } from "@/entities/Metrics/lib/option.country.metrics.lib";
import { EInputTextTypeVariants } from "@/shared/ui/Input/Text/model/text.input.model";
import { getFormDataFromForm } from "@/shared/lib/formData.lib";
import { IPropsMainInfoProductForm } from "../../model/mainInfo.product.form.model";
import { ERecursiveSelectVariant } from "@/shared/ui/Input/ui/RecursiveSelect/model/recursiveSelect.model";
import { WrapperWOSubmit } from "@/shared/ui/Wrapper/WOSubmit/ui/WrapperWOSubmit";
import { IFormInfo } from "../../model/product.form.model";
import { getEmptyFormInfo } from "../../lib/product.form.lib";


interface MainInfoProductFormProps {
    data?: IPropsMainInfoProductForm;
    setData?: Dispatch<SetStateAction<IPropsMainInfoProductForm | undefined>>;
    triggerSubmit?: (submitFn: () => Promise<IFormInfo<IPropsMainInfoProductForm>>) => void;

    isOpenForm?: boolean;
    className?: string;
}

export const MainInfoProductForm: FC<MainInfoProductFormProps> = ({ data, setData, triggerSubmit, isOpenForm, className }) => {
    // REF
    const formRef = useRef<HTMLFormElement>(null);

    // STATE
    const [countryOptions, setCountryOptions] = useState<IOption[]>([]);
    const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);
    const [selectedStatusOption, setSelectedStatusOption] = useState<IOption>(READY_STATUS__PRODUCT_FORM__DATA);
    const [selectedCountryOption, setSelectedCountryOption] = useState<IOption | undefined>();
    // const [defaultCategoriesId, setDefaultCategoriesId] = useState<number[]>([335, 2413, 1655])
    const [defaultCategoriesId, setDefaultCategoriesId] = useState<number[]>([])

    // API
    const { data: countryList } = CountryAPI.useGetCountriesQuery();

    // EFFECT
    useEffect(() => {
        setSelectedCategoryIds(data?.categoryId ? [data.categoryId] : []);
        setSelectedStatusOption(data?.status ?? READY_STATUS__PRODUCT_FORM__DATA);
        setSelectedCountryOption(data?.country ?? undefined);
    }, [data]);

    useEffect(() => {
        if (countryList) {
            setCountryOptions(countryListToOptionList(countryList));
        }
    }, [countryList]);

    // HANDLE
    const handleOnSubmit = (e: FormEvent<HTMLFormElement>): IFormInfo<IPropsMainInfoProductForm> => {
        const defaultFormInfo = getEmptyFormInfo<IPropsMainInfoProductForm>()
        if (!formRef.current) 
            return defaultFormInfo

        if (!formRef.current.checkValidity() || selectedCategoryIds.length === 0 || !selectedCountryOption) {
            e.preventDefault();
            formRef.current.reportValidity();  // Вызывает встроенные сообщения браузера
            return defaultFormInfo
        }
        
        console.log('qwe main', 2)
        e.preventDefault();

        const formData = getFormDataFromForm(formRef.current);

        const updatedData = {
            name: formData.name,
            categoryId: selectedCategoryIds[0],
            status: selectedStatusOption,
            hasCertificate: formData.hasCertificate === YES_FORM__DATA.value,
            country: selectedCountryOption,
            description: formData.description,
        } as IPropsMainInfoProductForm;

        if (setData) {
            setData(updatedData);
        }

        return {
            isValid: true,
            form: updatedData,
        };
    }

    return (
        <WrapperWOSubmit triggerSubmit={(submitFn) => triggerSubmit?.(() => {
            const form = formRef.current;
            if (form) {
                form.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
            }
            return Promise.resolve(handleOnSubmit(new Event("submit") as unknown as FormEvent<HTMLFormElement>)); // Изменено
        })} formRef={formRef}>
            <WrapperSubblockForm title="Основная информация" variant={SubblockFormVariant.Toggle} isOpen={isOpenForm} className={className}>
                <form ref={formRef} onSubmit={handleOnSubmit} className={cl.form}>
                    <WrapperRectangleInput labelText={"Наименование"} isRequired={true}>
                        <Input.Text name={'name'} placeholder="До 50 символов" defaultValue={data?.name}
                            required={true} variant={EInputVariants.RECTANGULAR} />
                    </WrapperRectangleInput>
                    <CategoryRecursiveSelect
                        labelText="Категория"
                        isRequired
                        isDescriptionTooltip
                        descriptionTooltipText='Выберите категорию из списка'
                        setSelectedCategoriesId={setSelectedCategoryIds}
                        defaultCategoriesId={defaultCategoriesId}
                        variant={ERecursiveSelectVariant.SINGLE}
                         />
                    <WrapperRectangleInput labelText={"Статус товара"} isRequired={true}>
                        <Input.TextAndSelect name={'statusProduct'} placeholder="Выберите статус" defaultOption={selectedStatusOption}
                            options={STATUS__PRODUCT_FORM__DATA} onClickOption={setSelectedStatusOption}
                            titleModal="Статус товара" required={true} variant={EInputVariants.RECTANGULAR} />
                    </WrapperRectangleInput>
                    <WrapperRectangleInput labelText={"Наличие сертификата"} isRequired={true}>
                        <Input.Radio name='hasCertificate' variant={EInputVariants.RECTANGULAR} variantRadio={ERadioVariant.SINGLE}
                            option={YES_FORM__DATA} required={true} isActive={!!data?.hasCertificate} />
                        <Input.Radio name='hasCertificate' variant={EInputVariants.RECTANGULAR} variantRadio={ERadioVariant.SINGLE}
                            option={NO_FORM__DATA} required={true} isActive={!data?.hasCertificate} />
                    </WrapperRectangleInput>
                    <WrapperRectangleInput labelText={"Страна производства"} isRequired={true}>
                        <Input.TextAndSelect name={'country'} placeholder="Выберите страну" defaultOption={selectedCountryOption}
                            options={countryOptions} onClickOption={setSelectedCountryOption}
                            titleModal="Страна производства" required={true} variant={EInputVariants.RECTANGULAR} />
                    </WrapperRectangleInput>
                    <WrapperRectangleInput labelText={"Описание"} isRequired={true}>
                        <Input.Text name={'description'} placeholder="Начните вводить" defaultValue={data?.description}
                            required={true} variant={EInputVariants.RECTANGULAR}
                            inputTypeVariant={EInputTextTypeVariants.TEXTAREA} />
                    </WrapperRectangleInput>
                </form>
            </WrapperSubblockForm>
        </WrapperWOSubmit>
    )
}
