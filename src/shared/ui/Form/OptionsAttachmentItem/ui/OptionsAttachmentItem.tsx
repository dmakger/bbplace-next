'use client'

import { cls } from "@/shared/lib/classes.lib"
import cl from './_OptionsAttachmentItem.module.scss'
import { EOptionsAttachmentSize, EOptionsAttachmentVariants } from "../model/optionsAttachment.model"
import { ButtonDelete } from "@/shared/ui/Button/data/Delete/ButtonDelete"
import { ImageSmart } from "@/shared/ui/Image/Smart/ImageSmart"
import { IWarningIcon } from "@/shared/ui/Icon/model/icon.model"
import { IImageSizes } from "@/shared/model/image.model"
import { useEffect, useState } from "react"

interface IOptionsAttachmentItem {
    className?: string,
    variant?: EOptionsAttachmentVariants,
    size?: EOptionsAttachmentSize
    title: string,
    handleDelete: Function,
    fileIcon?: IWarningIcon
    fileSizes?: IImageSizes
}

export const OptionsAttachmentItem = ({
    className,
    variant = EOptionsAttachmentVariants.DEFAULT,
    size = EOptionsAttachmentSize.BIG,
    title,
    handleDelete,
    fileIcon,
    fileSizes = {
        width: 20,
        height: 20
    }
}: IOptionsAttachmentItem) => {

    //STATE
    const [fileIconSizes, setFileIconSizes] = useState<IImageSizes>(fileSizes)

    //EFFECT
    useEffect(() => {
        size === EOptionsAttachmentSize.BIG && setFileIconSizes({ width: 25, height: 26 })
        size === EOptionsAttachmentSize.MEDIUM && setFileIconSizes({ width: 20, height: 20 })
        size === EOptionsAttachmentSize.SMALL && setFileIconSizes({ width: 15, height: 16 })
    }, [])

    return (
        <div className={cls(cl.OptionsAttachmentItem, cl[size], className)}>
            <div className={cl.leftContainer}>
                {variant === EOptionsAttachmentVariants.FILE && fileIcon &&
                    <ImageSmart
                        icon={fileIcon}
                        width={fileIconSizes.width}
                        height={fileIconSizes.height} 
                    />}
                
                <span className={cl.title}>
                    {title}
                </span>
            </div>

            <ButtonDelete handleDelete={() => handleDelete()} classNameButton={cl.buttonDelete} />
        </div>
    )
}
