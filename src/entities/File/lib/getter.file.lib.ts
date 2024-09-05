import { IFile } from "../model/file.model";
import { IResponseFile } from "../model/props.file.model";
import { TGetFile } from "../model/typeHook.file.model";


/**
 * 
 * @param fileList - список файлов типа `IResponseFile`
 * @param getFile - хук необходимый для получения файлов с сервера. Реализация в `FileAPI` 
 * @param toFile - если `true`, то вернет `IFile`, в противном случае `File` 
 * @returns `Promise` списка `IResponseFile | null`
 */
export const getFileListOfServer = async (fileList: IResponseFile[], getFile: TGetFile, toFile: boolean=false) => {
    const getterFileList = fileList.map(file => getFileItemOfServer(file, getFile, toFile))
    return await Promise.all(getterFileList)
}


/**
 * 
 * @param file - передоваемый file имеет тип `IResponseFile`
 * @param getFile - хук необходимый для получения файлов с сервера. Реализация в `FileAPI` 
 * @param toFile - если `true`, то вернет `IFile`, в противном случае `File` 
 * @returns `Promise` файла, в случае если успешно загружен `File | IFile`, если нет то `null`
 */
export const getFileItemOfServer = async (file: IResponseFile, getFile: TGetFile, toFile: boolean=false) => {
    try {
        return await getFile({fileId: file.key, toFile, name: file.name}).unwrap()
    } catch {
        return null
    }
}

/**
 * 
 * @param uploadedFileList 
 * @param getFile 
 * @returns 
 */
export const responseFileListToFileList = async (uploadedFileList: (IResponseFile | null)[], getFile: TGetFile) => {
    const newFileList: IFile[] = []
    const newResponseFileList: IResponseFile[] = []

    const filePromises = uploadedFileList.map(async it => {
        if (it === null) return

        const result = await getFileItemOfServer(it, getFile, true)
        if (result !== null) {
            newFileList.push(result as IFile)
            newResponseFileList.push(it)
        }
    })

    await Promise.all(filePromises)

    return {
        newFileList,
        newResponseFileList
    }
}