'use client'

import cl from './_PersonalInfoEditProfileForm.module.scss'
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
import { ISupplier } from "@/entities/Supplier/model/supplier.model"
import { WrapperWOSubmit } from '@/shared/ui/Wrapper/WOSubmit/ui/WrapperWOSubmit'
import { TEL_VALID_RULES, isTelValid } from '@/entities/Auth/data/telNEmail.data'


interface IPersonalInfoEditProfileForm {
    setData?: Dispatch<SetStateAction<IEditProfilePersonalFormValues | undefined>>
    triggerSubmit?: (submitFn: () => void) => void,
    className?: string,
    userData: ISupplier
}

export const PersonalInfoEditProfileForm = ({
    setData,
    triggerSubmit,
    className,
    userData
}: IPersonalInfoEditProfileForm) => {

    //RTK
    const { email, fullName, phoneNumber: phoneNumberRTK } = useAppSelector(state => state.user)

    //STATE
    const [phoneNumber, setPhoneNumber] = useState<string>(phoneNumberRTK ?? '')
    const [name, setName] = useState<string>(fullName ?? '')
    const [uploadedImageList, setUploadedImageList] = useState<string[]>([])

    useEffect(() => {
        if(userData){
            userData.photoId && setUploadedImageList([userData.photoId.key])            
        }
    }, [userData])     
   
    
    const [errors, setErrors] = useState<IEditProfilePersonalFormValues>(INITIAL_PERSONAL_ERRORS);

    //REF
    const formRef = useRef<HTMLFormElement>(null)

    //HANDLE
    const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!formRef.current) return

        const newErrors = { ...INITIAL_PERSONAL_ERRORS };
        let hasError = false;

        //PHONE_NUMBER
        if(phoneNumber !== '' && !isTelValid(phoneNumber)){
            newErrors.phoneNumber = TEL_VALID_RULES;
            hasError = true;
        } 

        if (hasError) {
            setErrors(newErrors);
            return;
        }

        const formData = getFormDataFromForm(formRef.current)
        if (setData) {
            setData({
                email,
                phoneNumber: formData.phoneNumber ?? phoneNumber,
                fullName: formData.name ?? name,
                photoId: uploadedImageList[0] ? JSON.stringify({key: uploadedImageList[0]}) : ''
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

                    <WrapperRectangleInput labelText="Номер телефона" isDescriptionTooltip descriptionTooltipText='Ваш контактный номер для быстрой связи.'>
                        <Input.Text variant={EInputVariants.RECTANGULAR} name="phoneNumber" type={EInputTextType.Tel} placeholder="Введите номер" value={phoneNumber} setValue={setPhoneNumber} warning={!!errors.phoneNumber} error={!!errors.phoneNumber} />
                    </WrapperRectangleInput>

                    <WrapperRectangleInput labelText="Имя" isDescriptionTooltip descriptionTooltipText='Ваше полное ФИО для персонализации профиля.'>
                        <Input.Text variant={EInputVariants.RECTANGULAR} name="Name" value={name} setValue={setName} placeholder="Введите ФИО"  />
                    </WrapperRectangleInput>

                    <WrapperRectangleInput labelText={"Фотография"} isDescriptionTooltip descriptionTooltipText="Ваша фотография или логотип компании для узнаваемости.">
                        <Input.Image name='photo'
                            imageList={uploadedImageList} setImageList={setUploadedImageList}
                            variant={EInputVariants.RECTANGULAR} multiple={false}/>
                    </WrapperRectangleInput>
                </form>
            </WrapperSubblockForm>
        </WrapperWOSubmit>
    )
}
