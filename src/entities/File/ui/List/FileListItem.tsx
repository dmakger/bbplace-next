import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_FileList.module.scss'
import { FileItem } from "../Item/ui/Base/FileItem";
import { IFile } from "../../model/file.model";
import { FileView } from "../../data/view.file.data";

interface FileListItemProps{
    files: IFile[]
    view?: FileView
    isRow?: boolean
    className?: string,
}

export const FileListItem:FC<FileListItemProps> = ({files, view=FileView.Default, isRow=true, className}) => {
    return (
        <div className={cls(isRow ? cl.row : cl.column, cl[view], className)}>
            {files.map((file, index) => (
                <FileItem file={file} view={view} isRow={!isRow} key={index} />
            ))}
        </div>
    )
}
