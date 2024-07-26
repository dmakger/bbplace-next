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
import { INITIAL_ERRORS } from '../data/supportChildrenPage.data'
export const SupportChildrenPage = () => {

    //STATE
    const [errors, setErrors] = useState<ISupportChildrenPageInitialErrors>(INITIAL_ERRORS);

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
        const { Name, CompanyName, Contact, Theme, Message } = getFormData(formRef.current)
       
        const newErrors = INITIAL_ERRORS;
        let hasError = false;

        //FULLNAME
        if (!Name) {
            newErrors.Name = FILL_THE_FIELD;
            hasError = true;
        }

        //COMPANY
        if(!CompanyName){
            newErrors.CompanyName = FILL_THE_FIELD
            hasError = true
        }

        //CONTACTS
        if (!Contact) {
            newErrors.Contact = FILL_THE_FIELD;
            hasError = true;
        }

        //THEME
        if(!Theme){
            newErrors.Theme = FILL_THE_FIELD
            hasError = true;
        }

        //MESSAGE
        if (!Message) {
            newErrors.Message = FILL_THE_FIELD;
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
            // await sendSupportMessage(formData).unwrap()
            // formRef.current.reset();

        }
        catch (e: any) {
            console.log(e);
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

        <WrapperRectangleInput labelText="Имя" isRequired errorInputMessage={errors.Name}>
            <Input.Text variant={EInputVariants.RECTANGULAR} name="Name" required defaultValue={fullName ?? ''} placeholder="Введите ФИО"  error={!!errors.Name} warning={!!errors.Name} />
        </WrapperRectangleInput>

        <WrapperRectangleInput labelText="Компания" isRequired warningTooltipText={errors.CompanyName}>
            <Input.Text variant={EInputVariants.RECTANGULAR} name="CompanyName" required defaultValue={legalName ?? ''} placeholder="Введите юридическое название"  warning={!!errors.CompanyName} error={!!errors.CompanyName}/>
        </WrapperRectangleInput>

        <WrapperRectangleInput labelText="Контакты" isRequired errorInputMessage={errors.Contact} isDescriptionTooltip descriptionTooltipText='Введите свои контакты'>
            <Input.Text variant={EInputVariants.RECTANGULAR} name="Contact" type='tel email' required defaultValue={email ?? ''} placeholder="Введите email или номер телефона" warning={!!errors.Contact} error={!!errors.Contact} />
        </WrapperRectangleInput>

        <WrapperRectangleInput labelText="Тема" isRequired warningTooltipText={errors.Theme}>
            <Input.Text variant={EInputVariants.RECTANGULAR} name="Theme" required placeholder="Введите тему обращения" warning={!!errors.Theme} error={!!errors.Theme}/>
        </WrapperRectangleInput>

        <WrapperRectangleInput labelText="Сообщение" isRequired errorInputMessage={errors.Message}>
            <Input.Text variant={EInputVariants.RECTANGULAR} name="Message" required inputTypeVariant={EInputTextTypeVariants.TEXTAREA} placeholder="Начните вводить"  warning={!!errors.Message} error={!!errors.Message} />
        </WrapperRectangleInput>

        <WrapperRectangleInput labelText="Файлы" bellowButtonText="Отправить" bellowButtonType={ButtonType.Submit} isDescriptionTooltip descriptionTooltipText='Сюда вы можете загрузить файлы'>
            <Input.File variant={EInputVariants.RECTANGULAR} setFileList={setSelectedFiles} setResponseFileList={setSelectedResponseFiles} classNameField={cl.inputFile} />
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
