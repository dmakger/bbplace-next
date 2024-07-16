import { Dispatch, FC, SetStateAction, useCallback } from "react"
import { isEqual } from "lodash";

import { cls } from '@/shared/lib/classes.lib';
import cl from './_FileWrapList.module.scss'
import { IFile } from "../../model/file.model";
import { FileItemAttachment } from "../Item/ui/Attachment/FileItemAttachment";


interface FileWrapListProps{
    fileList: IFile[]
    onClickDeleteItem?: (file: IFile) => void
    setFileList?: Dispatch<SetStateAction<IFile[]>>
    className?: string,
}

export const FileWrapList:FC<FileWrapListProps> = ({fileList, onClickDeleteItem, setFileList, className}) => {
    console.log('qwe');
    
    // HANDLE
    const onClickDelete = useCallback((file: IFile) => {
        if (onClickDeleteItem) 
            onClickDeleteItem(file)
        if (setFileList)
            setFileList(prevFileList => prevFileList.filter(it => !isEqual(it, file)))
    }, [onClickDeleteItem, setFileList])

    return (
        <div className={cls(cl.list, className)}>
            {fileList.map((file, index) => (
                <FileItemAttachment file={file} 
                                    onClickDelete={() => onClickDelete(file)}
                                    key={`${index} ${file.url} ${file.name}`} />
            ))}
        </div>
    )
}
