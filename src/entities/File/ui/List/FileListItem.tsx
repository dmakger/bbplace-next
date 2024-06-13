import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_FileList.module.scss'
import { FileItem } from "../Item/FileItem";
import { IFile } from "../../model/file.model";

interface FileListItemProps{
    files: IFile[]
    isRow?: boolean
    className?: string,
}

export const FileListItem:FC<FileListItemProps> = ({files, isRow=true, className}) => {
    return (
        <div className={cls(isRow ? cl.row : cl.column, className)}>
            {files.map((file, index) => (
                <FileItem file={file} isRow={!isRow} key={index} />
            ))}
        </div>
    )
}
