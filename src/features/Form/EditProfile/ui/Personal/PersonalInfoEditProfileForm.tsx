'use client'

import cl from './_PersonalInfoEditProfileForm.module.scss'
import { WrapperWOSubmit } from "@/shared/ui/Wrapper/WOSubmit/WrapperWOSubmit"
import { Dispatch, FormEvent, SetStateAction, useEffect, useRef, useState } from "react"
import { WrapperSubblockForm } from "@/shared/ui/Wrapper/SubblockForm/ui/WrapperSubblockForm"
import { SubblockFormVariant } from "@/shared/ui/Wrapper/SubblockForm/data/subblockForm.data"
import { WrapperRectangleInput } from "@/shared/ui/Wrapper/RectangleInput"
import Input from "@/shared/ui/Input/Input"
import { EInputTextType } from "@/shared/ui/Input/ui/Text/data/text.input.data"
import { EInputVariants } from "@/shared/ui/Input/model/input.model"
import { useAppSelector } from "@/storage/hooks"
import { IEditProfilePersonalFormValues } from "../../model/editProfile.model"
import { INITIAL_PERSONAL_ERRORS } from "../../data/editProfile.data"
import { getFormDataFromForm } from "@/shared/lib/formData.lib"
import { ISupplierAPI } from "@/entities/Supplier/model/supplier.model"


interface IPersonalInfoEditProfileForm {
    setData?: Dispatch<SetStateAction<IEditProfilePersonalFormValues | undefined>>
    triggerSubmit?: (submitFn: () => void) => void,
    className?: string,
    userData: ISupplierAPI
}

export const PersonalInfoEditProfileForm = ({
    setData,
    triggerSubmit,
    className,
    userData
}: IPersonalInfoEditProfileForm) => {

    //RTK
    const { email, fullName } = useAppSelector(state => state.user)

    //STATE
    const [phoneNumber, setPhoneNumber] = useState<string>('')
    const [name, setName] = useState<string>(fullName ?? '')
    const [uploadedImageList, setUploadedImageList] = useState<string>(userData?.photoId ?? '')

    useEffect(() => {
        if(userData){
            setPhoneNumber(userData.phoneNumber)
        }
    }, [userData])
   
    
    const [errors, setErrors] = useState<IEditProfilePersonalFormValues>(INITIAL_PERSONAL_ERRORS);

    //REF
    const formRef = useRef<HTMLFormElement>(null)

    //HANDLE
    const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!formRef.current) return

        const formData = getFormDataFromForm(formRef.current)
        if (setData) {
            setData({
                email,
                phoneNumber: formData.phoneNumber ?? phoneNumber,
                fullName: formData.name ?? name,
                photoId: JSON.stringify(uploadedImageList[0])
            } as IEditProfilePersonalFormValues)
        }
    }

    return (
        <WrapperWOSubmit triggerSubmit={triggerSubmit} formRef={formRef}>
            <WrapperSubblockForm title="Личный профиль" variant={SubblockFormVariant.Toggle} className={className}>
                <form ref={formRef} onSubmit={handleOnSubmit} className={cl.form}>
                    <WrapperRectangleInput
                        labelText="Электронная почта"
                        isDescriptionTooltip
                        descriptionTooltipText="Контактный адрес для связи с вашим бизнесом."
                    >
                        <Input.Text type={EInputTextType.Email} variant={EInputVariants.RECTANGULAR} value={email} disabled />
                    </WrapperRectangleInput>

                    <WrapperRectangleInput labelText="Номер телефона" errorInputMessage={errors.phoneNumber} isDescriptionTooltip descriptionTooltipText='Ваш контактный номер для быстрой связи.'>
                        <Input.Text variant={EInputVariants.RECTANGULAR} name="phoneNumber" type={EInputTextType.Text} placeholder="Введите номер" value={phoneNumber} warning={!!errors.phoneNumber} error={!!errors.phoneNumber} />
                    </WrapperRectangleInput>

                    <WrapperRectangleInput labelText="Имя" errorInputMessage={errors.fullName} isDescriptionTooltip descriptionTooltipText='Ваше полное ФИО для персонализации профиля.'>
                        <Input.Text variant={EInputVariants.RECTANGULAR} name="Name" value={name} setValue={setName} placeholder="Введите ФИО" error={!!errors.fullName} warning={!!errors.fullName} />
                    </WrapperRectangleInput>

                    <WrapperRectangleInput labelText={"Фотография"} isDescriptionTooltip descriptionTooltipText="Ваша фотография или логотип компании для узнаваемости.">
                        <Input.Image name={'attachments'} placeholder="Начните вводить"
                            imageList={uploadedImageList} setImageList={setUploadedImageList}
                            variant={EInputVariants.RECTANGULAR} />
                    </WrapperRectangleInput>
                </form>
            </WrapperSubblockForm>
        </WrapperWOSubmit>
    )
}
