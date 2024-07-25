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
import { useActionCreators, useAppSelector } from "@/storage/hooks"
import { useRouter } from "next/navigation"
import { FormEvent, useRef, useState } from "react"
import { IFile } from '@/entities/File/model/file.model'
import { OptionsAttachmentItem } from '@/shared/ui/Form/OptionsAttachmentItem'
import { isEqual } from 'lodash'
import { EOptionsAttachmentVariants } from '@/shared/ui/Form/OptionsAttachmentItem/model/optionsAttachment.model'
import { getImageFile } from '@/entities/File/lib/file.lib'
import { cls } from '@/shared/lib/classes.lib'

export const SupportChildrenPage = () => {

    //STATE
    const [error, setError] = useState<boolean>(false)
    const [errorFullName, setErrorFullName] = useState<string>('')
    const [errorContacts, setErrorContacts] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>('')

    const [selectedFiles, setSelectedFiles] = useState<IFile[]>([]);
    const [selectedResponseFiles, setSelectedResponseFiles] = useState<IResponseFile[]>([]);
    const [deletingFileName, setDeletingFileName] = useState<string>('')


    //API
    const [sendSupportMessage] = SupportAPI.useSendSupportLeadMutation()

    //RTK
    const actionCreators = useActionCreators();
    const {fullName, email, legalName} = useAppSelector(state => state.user)

    //REF
    const formRef = useRef<HTMLFormElement>(null)

    //ROUTER
    const router = useRouter()

    //FUNCTIONS
    const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!formRef.current) return;
        const { Name, CompanyName, Contact, Theme, Message, Files } = getFormData(formRef.current)

        setError(true);
        setErrorFullName('');
        setErrorContacts('')
        setErrorMessage('')

        let hasError = false;

        //FULLNAME
        if (!Name) {
            setErrorFullName(FILL_THE_FIELD)
            hasError = true;
        }

        //CONTACTS
        if (!Contact) {
            setErrorContacts(FILL_THE_FIELD)
            hasError = true;
        }

        //MESSAGE
        if (!Message) {
            setErrorMessage(FILL_THE_FIELD)
            hasError = true;
        }

        if (hasError) return;

        const requestData =  {Name, CompanyName, Contact, Theme, Message, Files }

        console.log(requestData);


        try {
            const data = await sendSupportMessage({Name: '123123', CompanyName, Contact, Theme, Message, Files }).unwrap()
            console.log(data);
            

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
        <WrapperForLogInNSupportPages
            pageTitle="Поддержка"
            formRef={formRef}
            onSubmitFunc={sendMessage}
        >
            <WrapperRectangleInput
                labelText="Имя"
                isRequired
                errorInputMessage={errorFullName}>
                <Input.Text variant={EInputVariants.RECTANGULAR} defaultValue={fullName ?? ''} required placeholder="Введите ФИО" name="Name" error={error && !!errorFullName} warning={error && !!errorFullName} />   
            </WrapperRectangleInput>

            <WrapperRectangleInput
                labelText="Компания">
                <Input.Text variant={EInputVariants.RECTANGULAR} defaultValue={legalName ?? ''} placeholder="Введите юридическое название" name="CompanyName" />
            </WrapperRectangleInput>

            <WrapperRectangleInput
                labelText="Контакты"
                isRequired
                isDescriptionTooltip
                descriptionTooltipText=" "
                errorInputMessage={errorContacts}>
                <Input.Text variant={EInputVariants.RECTANGULAR} defaultValue={email ?? ''} required placeholder="Введите email или номер телефона" name="Contact" warning={error && !!errorContacts} error={error && !!errorContacts} />
            </WrapperRectangleInput>

            <WrapperRectangleInput
                labelText="Тема"
            >
                <Input.Text variant={EInputVariants.RECTANGULAR} placeholder="Введите тему обращения" name="Theme" />
            </WrapperRectangleInput>

            <WrapperRectangleInput
                labelText="Сообщение"
                isRequired
                errorInputMessage={errorMessage}>
                <Input.Text variant={EInputVariants.RECTANGULAR} required inputTypeVariant={EInputTextTypeVariants.TEXTAREA} placeholder="Начните вводить" name="Message" warning={error && !!errorMessage} error={error && !!errorMessage} />
            </WrapperRectangleInput>

            <WrapperRectangleInput
                labelText="Файлы"
                isDescriptionTooltip
                descriptionTooltipText=" "
                bellowButtonText="Отправить"
                bellowButtonType={ButtonType.Submit}
            >
                <Input.File
                    variant={EInputVariants.RECTANGULAR}
                    name="Files"
                    setFileList={setSelectedFiles}
                    setResponseFileList={setSelectedResponseFiles}
                    classNameField={cl.inputFile}
                />

                {selectedFiles.length > 0 && selectedFiles.map(file => (
                    <OptionsAttachmentItem
                        fileIcon={getImageFile(file.format)}
                        key={file.name}
                        className={cls(cl.optionsAttachmentShow, deletingFileName === file.name ? cl.optionsAttachmentHide : '')}
                        title={file.name ?? ''}
                        variant={EOptionsAttachmentVariants.FILE}
                        handleDelete={() => handleDeleteItem(file)} />
                ))}
            </WrapperRectangleInput>
        </WrapperForLogInNSupportPages>
    )
}
