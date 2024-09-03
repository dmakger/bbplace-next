import { IFile } from "../model/file.model";
import { IResponseFile } from "../model/props.file.model";
import { TUploadFile } from "../model/typeHook.file.model";
import { getFileOfIFile } from "./to.file.lib";

/**
 * @param fileList - список файлов типа `IFile | File`
 * @param uploadFile - хук необходимый для загрузки файла на сервер. Реализация в `FileAPI` 
 * @returns `Promise` списка `IResponseFile | null`
 */
export const uploadFileList = async (fileList: (IFile | File)[], uploadFile: TUploadFile) => {
    const uploadPromises = fileList.map(file => uploadFileItem(file, uploadFile))
    return await Promise.all(uploadPromises)
}

/**
 * @param file - передоваемый file имеет тип `IFile | File`
 * @param uploadFile - хук необходимый для загрузки файла на сервер. Реализация в `FileAPI` 
 * @returns `Promise` файла, в случае если успешно загружен `IResponseFile`, если нет то `null`
 */
export const uploadFileItem = async (file: IFile | File, uploadFile: TUploadFile) => {
    const updatedFile = getFileOfIFile(file)
    if (!updatedFile) return null

    const formData = new FormData()
    formData.append('file', updatedFile, updatedFile.name)

    try {
        const fileData = await uploadFile(formData).unwrap()
        return {
            key: fileData.key,
            // name: fileData.name ? fileData.name : file.name
            name: file.name ?? fileData.name
        } as IResponseFile
    } catch {
        return null
    }
}

