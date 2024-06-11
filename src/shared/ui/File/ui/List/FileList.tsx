import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_FileList.module.scss'
import { IFileFormatObject } from "@/shared/model/file.model";
import { FileItem } from "../Item/FileItem";

interface FileListProps{
    files: IFileFormatObject[]
    className?: string,
}

export const FileList:FC<FileListProps> = ({files, className}) => {
    return (
        <div className={cls(className)}>
            {files.map((file, index) => (
                <FileItem file={file} key={index} />
            ))}
        </div>
    )
}
