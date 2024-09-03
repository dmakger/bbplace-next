import { IFile } from "../model/file.model"
import { filesToFormatObject, getFormatFile } from "./file.lib"

/**
 * Перевод списка файлов в список {IFile}
 * @param files - Список файлов 
 * @returns 
 */
export const fileListToIFileList = (files: File[]) => {
    return files.map(file => fileToIFile(file))
}


/**
 * Перевод File в {IFile}
 * @param file - Передаваемый file типа {IFile}
 * @returns 
 */
export const fileToIFile = (file: File) => {
    return {
        name: file.name,
        format: getFormatFile(file.name),
        file,
    } as IFile
}

/**
 * @returns `File` или `null`
 */
export const getFileOfIFile = (file: IFile | File): File | null => {
    if (file instanceof File) 
        return file
    // f?.name = file.name ?? ""
    return file.file === undefined ? null : {...file.file, name: file.name} as File
}