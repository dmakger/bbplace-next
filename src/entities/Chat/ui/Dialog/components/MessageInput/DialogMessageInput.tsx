import React, { ChangeEvent, FC, FormEvent, useRef, useState, KeyboardEvent } from "react";
import { cls } from '@/shared/lib/classes.lib';
import cl from './_DialogMessageInput.module.scss';
import Input from "@/shared/ui/Input/Input";
import { FileInputView } from "@/shared/ui/Input/ui/File/data/file.input.data";
import { EInputTextTypeVariants } from "@/shared/ui/Input/Text/model/text.input.model";
import { EInputVariants } from "@/shared/ui/Input/model/input.model";
import { Button } from "@/shared/ui/Button";
import { ButtonColor, ButtonSize, ButtonType, ButtonVariant } from "@/shared/ui/Button/model/button.model";
import { SEND__ON_PRIMARY__ICON } from "@/shared/ui/Icon/data/send.data.icon";
import { FileWrapList } from "@/entities/File/ui/Wrap/FileWrapList";
import { IFile } from "@/entities/File/model/file.model";
import { IResponseFile } from "@/entities/File/model/props.file.model";
import { getFormDataFromForm } from "@/shared/lib/formData.lib";
import { IPropsInvokeAddMessage } from "@/entities/Chat/model/connection.chat.model";
import { useAppDispatch, useAppSelector } from "@/storage/hooks";
import { addMessageToChat } from "@/entities/Chat/connection/invoke/message.invoke.chat.connection";

interface DialogMessageInputProps {
    className?: string;
}

export const DialogMessageInput: FC<DialogMessageInputProps> = ({ className }) => {
    // RTK
    const { currentChat } = useAppSelector(state => state.chat); 
    const dispatch = useAppDispatch(); 

    // REF
    const formRef = useRef<HTMLFormElement>(null)
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    // STATE
    const [uploadedFileList, setUploadedFileList] = useState<IFile[]>([]);
    const [uploadedResponseFileList, setUploadedResponseFileList] = useState<IResponseFile[]>([])
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false); // NEW: Для блокировки повторного отправления

    // ON CHANGE
    const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const textArea = textAreaRef.current;

        if (textArea) {
            textArea.style.height = 'auto'; 
            textArea.style.height = `${Math.min(textArea.scrollHeight, 180)}px`; 
        }
    };

    // NEW: Обработка нажатия клавиш
    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault(); // Предотвратить перенос строки
            handleOnSubmit(e as any); // Вызов функции отправки сообщения
        }
    };

    const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!formRef.current || isSubmitting) return; // Блокировка, если уже идет отправка
        
        if (!textAreaRef.current || !textAreaRef.current.value || !currentChat)
            return;

        setIsSubmitting(true); // Блокировка повторного вызова
        
        const newMessage: IPropsInvokeAddMessage = {
            chatId: currentChat.id,
            text: textAreaRef.current.value,
            attachments: JSON.stringify(uploadedResponseFileList),
        }

        try {
            dispatch(addMessageToChat(newMessage))
        } finally {
            setIsSubmitting(false); // Снятие блокировки после отправки
        }

        // Очищаем форму после отправки
        textAreaRef.current.value = "";
        setUploadedFileList([]);
        setUploadedResponseFileList([]);
    }

    return (
        <div className={cls(cl.block, className)}>
            <div className={cl.wrapperForm}>
                {uploadedFileList && uploadedFileList.length > 0 && (
                    <FileWrapList inLine={true} 
                        fileList={uploadedFileList} setFileList={setUploadedFileList} 
                        responseFileList={uploadedResponseFileList} setResponseFileList={setUploadedResponseFileList} 
                        className={cl.fileList}/>
                )}
                <form ref={formRef} onSubmit={handleOnSubmit} className={cl.form}>
                    <div className={cl.wrapperUpload}>
                        <Input.File view={FileInputView.Small} 
                                    setFileList={setUploadedFileList} setResponseFileList={setUploadedResponseFileList} 
                                    classNameField={cl.upload} />
                    </div>
                    <Input.Text inputTypeVariant={EInputTextTypeVariants.TEXTAREA} variant={EInputVariants.RECTANGULAR}
                                placeholder="Введите сообщение"
                                onChange={handleTextAreaChange}
                                onKeyDown={handleKeyDown} // NEW: Обработчик события клавиатуры
                                refTextArea={textAreaRef}
                                rows={1}
                                classNameTextArea={cl.text} />
                    <div className={cl.wrapperSend}>
                        <Button type={ButtonType.Submit} variant={ButtonVariant.FILL} color={ButtonColor.Primary} size={ButtonSize.Small}
                                beforeImage={SEND__ON_PRIMARY__ICON} beforeProps={{width: 20, height: 20}} 
                                disabled={isSubmitting} // Disable button when submitting
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};
