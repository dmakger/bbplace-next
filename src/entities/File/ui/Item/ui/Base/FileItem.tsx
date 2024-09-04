"use client"

import { FC, useMemo, useState } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_FileItem.module.scss'
import { Button, ButtonVariant } from "@/shared/ui/Button";
import { getImageFile, getOnlyFormatByFile, getOnlyNameByFile } from "@/entities/File/lib/file.lib";
import { IFile } from "../../../../model/file.model";
import { ImageSmart } from "@/shared/ui/Image/Smart/ImageSmart";
import { FileView } from "@/entities/File/data/view.file.data";
import { getSizeImageByView } from "@/entities/File/lib/image.file.lib";

interface FileItemProps{
    file: IFile
    view?: FileView
    isRow?: boolean
    className?: string,
}

export const FileItem:FC<FileItemProps> = ({file, view=FileView.Default, isRow=true, className}) => {
    // STATE
    const [isHovered, setIsHovered] = useState(false)

    // HANDLE
    const handleOnMouseEnter = () => {
        setIsHovered(true)
    }
    const handleOnMouseLeave = () => {
        setIsHovered(false)
    }

    const sizeImage = useMemo(() => {
        return getSizeImageByView(view)
    }, [view])

    // FUNC
    const downloadFile = () => {
        if (file.url && file.name) {
            const a = document.createElement('a')
            a.href = file.url
            a.download = file.name
            a.click()
        }
    }

    if (isRow)
        return (
            <Button variant={ButtonVariant.DEFAULT} 
                    beforeImage={getImageFile(file.format)} beforeProps={{width: sizeImage, height: sizeImage}} 
                    onClick={downloadFile} className={cls(cl.file, cl.row, cl[view], className)}>
                <span className={cl.name}>{getOnlyNameByFile(file.name)}</span>
                <div className={cl.formatBlock}>
                    <span className={cl.format}>
                        .{getOnlyFormatByFile(file.name)}
                    </span>
                </div>
            </Button>
        )
    return (
        <Button variant={ButtonVariant.DEFAULT} 
                onClick={downloadFile} onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave} 
                className={cls(cl.file, cl.column, cl[view], className)}>
            <div className={cl.top}>
                <ImageSmart icon={getImageFile(file.format)} isHovered={isHovered} 
                            width={sizeImage}
                            height={sizeImage}
                            classNameImage={cl.image} />
                <span className={cl.format}>
                    .{getOnlyFormatByFile(file.name)}
                </span>
            </div>
            <span className={cl.name}>{getOnlyNameByFile(file.name)}</span>
        </Button>
    )
}
