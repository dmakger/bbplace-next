import { Dispatch, FC, SetStateAction, useCallback } from "react"
import { isEqual } from "lodash";

import { cls } from '@/shared/lib/classes.lib';
import cl from './_FileWrapList.module.scss'
import { IFile } from "../../model/file.model";
import { FileItemAttachment } from "../Item/ui/Attachment/FileItemAttachment";
import { IResponseFile } from "../../model/props.file.model";


interface FileWrapListProps{
    fileList: IFile[]
    setFileList?: Dispatch<SetStateAction<IFile[]>>
    responseFileList: IResponseFile[]
    setResponseFileList?: Dispatch<SetStateAction<IResponseFile[]>>
    inLine?: boolean

    onClickDeleteItem?: (file: IFile) => void
    className?: string,
}

export const FileWrapList:FC<FileWrapListProps> = ({
    fileList, setFileList, 
    responseFileList, setResponseFileList, 
    inLine=false,
    onClickDeleteItem, className
}) => {    
    // HANDLE
    const onClickDelete = useCallback((file: IFile, responseFile: IResponseFile) => {
        if (onClickDeleteItem) 
            onClickDeleteItem(file)
        if (setFileList && setResponseFileList) {
            setFileList(prev => prev.filter(it => !isEqual(it, file)))
            setResponseFileList(prev => prev.filter(it => !isEqual(it, responseFile)))
        }
    }, [onClickDeleteItem, setFileList])

    return (
        <div className={cls(cl.block, inLine ? cl.list : cl.wrap, className)}>
            {fileList.map((file, index) => (
                <FileItemAttachment file={file} 
                                    onClickDelete={() => onClickDelete(file, responseFileList[index])}
                                    key={`${index} ${file.url} ${file.name}`} />
            ))}
        </div>
    )
}
