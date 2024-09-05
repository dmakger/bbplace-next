import { IFile } from "../model/file.model"
import { getFormatFile } from "./file.lib"

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
        return file;
    
    if (!file.file) return null;

    // Создаем новый объект File с новым именем
    const updatedFile = new File([file.file], file.name || file.file.name, {
        lastModified: file.file.lastModified,
    });

    return updatedFile;
}