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
import { ISupportChildrenPageFormValues, ISupportChildrenPageInitialErrors } from '../model/supportChildrenPage.model'
import { INITIAL_ERRORS } from '../data/supportChildrenPage.data'
import { isTelEmailValid } from '@/entities/Auth/data/telNEmail.data'

export const SupportChildrenPage = () => {

    //RTK
    const { fullName, email, legalName } = useAppSelector(state => state.user)

    //STATE
    const [errors, setErrors] = useState<ISupportChildrenPageInitialErrors>(INITIAL_ERRORS);

    const [selectedFiles, setSelectedFiles] = useState<IFile[]>([]);
    const [selectedResponseFiles, setSelectedResponseFiles] = useState<IResponseFile[]>([]);
    const [deletingFileName, setDeletingFileName] = useState<string>('')

    const [name, setName] = useState<string>(fullName ?? '')
    const [companyName, setCompanyName] = useState<string>(legalName ?? '')
    const [contact, setContact] = useState<string>(email ?? '')
    const [theme, setTheme] = useState<string>('')
    const [message, setMessage] = useState<string>('')

    //API
    const [sendSupportMessage] = SupportAPI.useSendSupportMessageMutation()

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
        } else if(!isTelEmailValid(Contact)){
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
        
        if (hasError) return;

        const formData = new FormData(formRef.current)

        const formValues: ISupportChildrenPageFormValues = {name, companyName, contact, theme, message}

        Object.keys(formValues).forEach(key => {
            formData.append(key, formValues[key] as string);
        });
        
        try {
            await sendSupportMessage(formData).unwrap()    
                    
            setName('')
            setCompanyName('')
            setContact('')
            setTheme('')
            setMessage('')   

            setSelectedFiles([]);
            setSelectedResponseFiles([]);
            setErrors(INITIAL_ERRORS);

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

        <WrapperRectangleInput labelText="Имя" isRequired errorInputMessage={errors.Name} >
            <Input.Text variant={EInputVariants.RECTANGULAR} name="Name" required value={name} setValue={setName} placeholder="Введите ФИО"  error={!!errors.Name} warning={!!errors.Name}/>
        </WrapperRectangleInput>

        <WrapperRectangleInput labelText="Компания" isRequired errorInputMessage={errors.CompanyName}>
            <Input.Text variant={EInputVariants.RECTANGULAR} name="CompanyName" value={companyName} setValue={setCompanyName} required  placeholder="Введите юридическое название" warning={!!errors.CompanyName} error={!!errors.CompanyName}/>
        </WrapperRectangleInput>

        <WrapperRectangleInput labelText="Контакты" isRequired errorInputMessage={errors.Contact} isDescriptionTooltip descriptionTooltipText='Укажите ваш телефон или email для обратной связи.'>
            <Input.Text variant={EInputVariants.RECTANGULAR} name="Contact" value={contact} setValue={setContact} type='tel email' required  placeholder="Введите email или номер телефона" warning={!!errors.Contact} error={!!errors.Contact} />
        </WrapperRectangleInput>

        <WrapperRectangleInput labelText="Тема" isRequired errorInputMessage={errors.Theme}>
            <Input.Text variant={EInputVariants.RECTANGULAR} name="Theme" value={theme} setValue={setTheme} required placeholder="Введите тему обращения" warning={!!errors.Theme} error={!!errors.Theme}/>
        </WrapperRectangleInput>

        <WrapperRectangleInput labelText="Сообщение" isRequired errorInputMessage={errors.Message}>
            <Input.Text variant={EInputVariants.RECTANGULAR} name="Message" value={message} setValue={setMessage} required inputTypeVariant={EInputTextTypeVariants.TEXTAREA} placeholder="Начните вводить"  warning={!!errors.Message} error={!!errors.Message} />
        </WrapperRectangleInput>

        <WrapperRectangleInput labelText="Файлы" bellowButtonText="Отправить" bellowButtonType={ButtonType.Submit} isDescriptionTooltip descriptionTooltipText='При необходимости прикрепите файлы, связанные с вашим запросом.'>
            <Input.File variant={EInputVariants.RECTANGULAR} name='Files' setFileList={setSelectedFiles} setResponseFileList={setSelectedResponseFiles} classNameField={cl.inputFile} />
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
