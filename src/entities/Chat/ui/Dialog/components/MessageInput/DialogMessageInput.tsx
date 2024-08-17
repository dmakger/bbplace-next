import React, { ChangeEvent, FC, useRef, useState } from "react";
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

interface DialogMessageInputProps {
    className?: string;
}

export const DialogMessageInput: FC<DialogMessageInputProps> = ({ className }) => {
    // REF
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    // STATE
    const [uploadedFileList, setUploadedFileList] = useState<IFile[]>([]);
    const [uploadedResponseFileList, setUploadedResponseFileList] = useState<IResponseFile[]>([])

    // ON CHANGE
    const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const textArea = textAreaRef.current;

        if (textArea) {
            textArea.style.height = 'auto'; 
            textArea.style.height = `${Math.min(textArea.scrollHeight, 180)}px`; 
        }
    };

    console.log('qwe uploadedFileList', uploadedFileList, uploadedResponseFileList)

    return (
        <div className={cls(cl.block, className)}>
            <div className={cl.wrapperForm}>
                {uploadedFileList && uploadedFileList.length > 0 && (
                    <FileWrapList inLine={true} 
                        fileList={uploadedFileList} setFileList={setUploadedFileList} 
                        responseFileList={uploadedResponseFileList} setResponseFileList={setUploadedResponseFileList} 
                        className={cl.fileList}/>
                )}
                <form className={cl.form}>
                    <div className={cl.wrapperUpload}>
                        <Input.File view={FileInputView.Small} 
                                    setFileList={setUploadedFileList} setResponseFileList={setUploadedResponseFileList} 
                                    classNameField={cl.upload} />
                    </div>
                    <Input.Text inputTypeVariant={EInputTextTypeVariants.TEXTAREA} variant={EInputVariants.RECTANGULAR}
                                placeholder="Введите сообщение"
                                onChange={handleTextAreaChange}
                                refTextArea={textAreaRef}
                                rows={1}
                                classNameTextArea={cl.text} />
                    <div className={cl.wrapperSend}>
                        <Button type={ButtonType.Submit} variant={ButtonVariant.FILL} color={ButtonColor.Primary} size={ButtonSize.Small}
                                beforeImage={SEND__ON_PRIMARY__ICON} beforeProps={{width: 20, height: 20}} />
                    </div>
                </form>
            </div>
        </div>
    );
};
