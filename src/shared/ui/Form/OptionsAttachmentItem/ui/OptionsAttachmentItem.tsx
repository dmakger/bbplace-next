import { cls } from "@/shared/lib/classes.lib"
import cl from './_OptionsAttachmentItem.module.scss'
import { EOptionsAttachmentSize, EOptionsAttachmentVariants } from "../model/optionsAttachment.model"
import { ButtonDelete } from "@/shared/ui/Button/data/Delete/ButtonDelete"
import { ImageSmart } from "@/shared/ui/Image/Smart/ImageSmart"
import { IWarningIcon } from "@/shared/ui/Icon/model/icon.model"

interface IOptionsAttachmentItem {
    className?: string,
    variant?: EOptionsAttachmentVariants,
    size?: EOptionsAttachmentSize
    title: string,
    handleDelete: Function,
    fileIcon?: IWarningIcon
}

export const OptionsAttachmentItem = ({
    className,
    variant = EOptionsAttachmentVariants.DEFAULT,
    size = EOptionsAttachmentSize.BIG,
    title,
    handleDelete,
    fileIcon
}: IOptionsAttachmentItem) => {
    return (
        <div className={cls(cl.OptionsAttachmentItem, cl[size], className)}>
            <div className={cl.leftContainer}>
                {variant === EOptionsAttachmentVariants.FILE && fileIcon &&
                    <ImageSmart icon={fileIcon} />}
                <span className={cl.title}>
                    {title}
                </span>
            </div>

            <ButtonDelete handleDelete={() => handleDelete()} classNameButton={cl.buttonDelete}/>
        </div>
    )
}
