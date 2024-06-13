import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_FileList.module.scss'
import { FileItem } from "../Item/FileItem";
import { IFile } from "../../model/file.model";

interface FileListItemProps{
    files: IFile[]
    className?: string,
}

export const FileListItem:FC<FileListItemProps> = ({files, className}) => {
    return (
        <div className={cls(className)}>
            {files.map((file, index) => (
                <FileItem file={file} key={index} />
            ))}
        </div>
    )
}
