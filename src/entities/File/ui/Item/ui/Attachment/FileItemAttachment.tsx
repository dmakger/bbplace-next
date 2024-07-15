import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_FileItemAttachment.module.scss'
import { IFile } from "@/entities/File/model/file.model";
import { Button, ButtonVariant } from "@/shared/ui/Button";
import { getImageFile } from "@/entities/File/lib/file.lib";
import { getIcon } from "@/shared/lib/image.lib";
import { ImageSmart } from "@/shared/ui/Image/Smart/ImageSmart";
import { TRASH_NEGATIVE_TO_WHITE_ICON } from "@/shared/ui/Icon/data/trash.data.icon";
import { ButtonColor, ButtonSize } from "@/shared/ui/Button/model/button.model";

interface FileItemAttachmentProps {
    file: IFile
    onClickDelete?: Function
    className?: string,
}

export const FileItemAttachment:FC<FileItemAttachmentProps> = ({file, onClickDelete, className}) => {

    // HANDLE
    const handleOnClickDelete = () => {
        if (onClickDelete)
            onClickDelete(file)
    }

    return (
        <div className={cls(cl.block, className)}>
            <div className={cl.content}>
                <ImageSmart icon={getIcon(getImageFile(file.format), {})} width={20} height={20} />
                <span className={cl.name}>{file.name}</span>
            </div>
            <Button variant={ButtonVariant.CONTENT} 
                    color={ButtonColor.Negative} 
                    size={ButtonSize.Medium}
                    afterImage={TRASH_NEGATIVE_TO_WHITE_ICON} 
                    onClick={handleOnClickDelete}
                    className={cl.delete} />
        </div>
    )
}
