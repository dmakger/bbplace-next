'use client'

import { IResponseFile } from '@/entities/File/model/props.file.model'
import cl from './_SupportChildrenPage.module.scss'
import { FILL_THE_FIELD } from "@/entities/Auth/data/errorMessages.data"
import { SupportAPI } from "@/entities/Support"
import { getFormData } from "@/shared/lib/formData.lib"
import { ButtonType } from "@/shared/ui/Button/model/button.model"
import Input from "@/shared/ui/Input/Input"
import { EInputTextTypeVariants } from "@/shared/ui/Input/Text/model/text.input.model"
import { EInputVariants } from "@/shared/ui/Input/model/input.model"
import { WrapperForLogInNSupportPages } from "@/shared/ui/Wrapper/ForLogInNSupportPages"
import { WrapperRectangleInput } from "@/shared/ui/Wrapper/RectangleInput"
import { useAppSelector } from "@/storage/hooks"
import { FormEvent, useRef, useState } from "react"
import { IFile } from '@/entities/File/model/file.model'
import { OptionsAttachmentItem } from '@/shared/ui/Form/OptionsAttachmentItem'
import { isEqual } from 'lodash'
import { EOptionsAttachmentSize, EOptionsAttachmentVariants } from '@/shared/ui/Form/OptionsAttachmentItem/model/optionsAttachment.model'
import { getImageFile } from '@/entities/File/lib/file.lib'
import { cls } from '@/shared/lib/classes.lib'
import { ISupportChildrenPageInitialErrors } from '../model/supportChildrenPage.model'

const initialErrors = {
    fullName: '',
    contacts: '',
    message: ''
};
const contactRegex = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^\+?(7|8|375|380|998|374|995|373|993)\d{7,10}$/
};
export const SupportChildrenPage = () => {

    //STATE
    const [error, setError] = useState<boolean>(false)
    const [errors, setErrors] = useState<ISupportChildrenPageInitialErrors>(initialErrors);

    const [selectedFiles, setSelectedFiles] = useState<IFile[]>([]);
    const [selectedResponseFiles, setSelectedResponseFiles] = useState<IResponseFile[]>([]);
    const [deletingFileName, setDeletingFileName] = useState<string>('')

    //API
    const [sendSupportMessage] = SupportAPI.useSendSupportMessageMutation()

    //RTK
    const { fullName, email, legalName } = useAppSelector(state => state.user)

    //REF
    const formRef = useRef<HTMLFormElement>(null)

    //FUNCTIONS
    const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!formRef.current) return;
        const { Name, CompanyName, Contact, Theme, Message, Files } = getFormData(formRef.current)

        setErrors(initialErrors)

        console.log(errors);
        
        
        const newErrors = { ...initialErrors };
        let hasError = false;

        //FULLNAME
        if (!Name) {
            newErrors.fullName = FILL_THE_FIELD;
            hasError = true;
        }

        //CONTACTS
        if (!Contact) {
            newErrors.contacts = FILL_THE_FIELD;
            hasError = true;
        }
        else if (!contactRegex.email.test(Contact) && !contactRegex.phone.test(Contact)) {
           
            newErrors.contacts = 'Введите действительный email или номер телефона';
            hasError = true;
        }

        console.log(newErrors);
        

        //MESSAGE
        if (!Message) {
            newErrors.message = FILL_THE_FIELD;
            hasError = true;
        }

        if (hasError) return setErrors(newErrors);

        const formData = new FormData(formRef.current)

        const requestData: Record<string, any> = {};
        formData.forEach((value, key) => {
            requestData[key] = value;
        })

        console.log(requestData);

        try {
            await sendSupportMessage(formData).unwrap()
            formRef.current.reset();

        }
        catch (e: any) {
            console.log(e);
            setError(e);
        }
    }


    const handleDeleteItem = (file: IFile | IResponseFile) => {
        setDeletingFileName(file.name ?? '')
        setTimeout(() => { // Для плавной анимации добавления и удаления OptionsAttachmentItem
            const updatedSelectedFIles = selectedFiles.filter(item => !isEqual(item, file));
            const updatedSelectedResponseFiles = selectedResponseFiles.filter(item => 'key' in file && item.key !== file.key);

            setSelectedFiles(updatedSelectedFIles)
            setSelectedResponseFiles(updatedSelectedResponseFiles)

            setDeletingFileName('')
        }, 300)
    }

    return (
        <WrapperForLogInNSupportPages pageTitle="Поддержка" formRef={formRef} onSubmitFunc={sendMessage}>

        <WrapperRectangleInput labelText="Имя" isRequired errorInputMessage={errors.fullName}>
            <Input.Text variant={EInputVariants.RECTANGULAR} defaultValue={fullName ?? ''} required placeholder="Введите ФИО" name="Name" error={!!errors.fullName} warning={!!errors.fullName} />
        </WrapperRectangleInput>

        <WrapperRectangleInput labelText="Компания">
            <Input.Text variant={EInputVariants.RECTANGULAR} defaultValue={legalName ?? ''} placeholder="Введите юридическое название" name="CompanyName" />
        </WrapperRectangleInput>

        <WrapperRectangleInput labelText="Контакты" isRequired errorInputMessage={errors.contacts} isDescriptionTooltip descriptionTooltipText='Введите свои контакты'>
            <Input.Text variant={EInputVariants.RECTANGULAR} defaultValue={email ?? ''} required placeholder="Введите email или номер телефона" name="Contact" warning={!!errors.contacts} error={!!errors.contacts} />
        </WrapperRectangleInput>

        <WrapperRectangleInput labelText="Тема">
            <Input.Text variant={EInputVariants.RECTANGULAR} placeholder="Введите тему обращения" name="Theme" />
        </WrapperRectangleInput>

        <WrapperRectangleInput labelText="Сообщение" isRequired errorInputMessage={errors.message}>
            <Input.Text variant={EInputVariants.RECTANGULAR} required inputTypeVariant={EInputTextTypeVariants.TEXTAREA} placeholder="Начните вводить" name="Message" warning={!!errors.message} error={!!errors.message} />
        </WrapperRectangleInput>

        <WrapperRectangleInput labelText="Файлы" bellowButtonText="Отправить" bellowButtonType={ButtonType.Submit} isDescriptionTooltip descriptionTooltipText='Сюда вы можете загрузить файлы'>
            <Input.File variant={EInputVariants.RECTANGULAR} name="Files" setFileList={setSelectedFiles} setResponseFileList={setSelectedResponseFiles} classNameField={cl.inputFile} />
            {selectedFiles.length > 0 && (
                <div className={cl.optionsContainer}>
                    {selectedFiles.map(file => (
                        <OptionsAttachmentItem
                            key={file.name}
                            fileIcon={getImageFile(file.format)}
                            size={EOptionsAttachmentSize.MEDIUM}
                            className={cls(cl.optionsAttachmentShow, deletingFileName === file.name ? cl.optionsAttachmentHide : '')}
                            title={file.name ?? ''}
                            variant={EOptionsAttachmentVariants.FILE}
                            handleDelete={() => handleDeleteItem(file)}
                        />
                    ))}
                </div>
            )}
        </WrapperRectangleInput>
    </WrapperForLogInNSupportPages>
    )
}
