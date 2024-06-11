import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_FileItem.module.scss'
import { IFileFormatObject } from "@/shared/model/file.model";
import { Button } from "@/shared/ui/Button";
import { getImageFile } from "@/shared/lib/file.lib";

interface FileItemProps{
    file: IFileFormatObject
    className?: string,
}

export const FileItem:FC<FileItemProps> = ({file, className}) => {
    return (
        <Button beforeImage={getImageFile(file.format)} className={cls(className)}>
            {file.data}
            {file.format}
        </Button>
    )
}
