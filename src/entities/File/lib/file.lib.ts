import { ALL_FORMATS, FILE_FORMAT_IMAGES, FileFormat } from "../data/file.data"
import { IFile } from "../model/file.model"

// Returns an array of string with a file format equal to [formatFilter]    
export const filterFilesByFormat = (files: string[] | IFile[], formatFilter: FileFormat): string[] | IFile[] => {
    if (files.length === 0)
        return []
    if (typeof files[0] === "string")
        return (files as string[]).filter(file => {
            const curFormat = getFormatFile(file)
            if (curFormat === undefined)
                return false
            return isEqualFileFormat(curFormat, formatFilter)
        })
    return (files as IFile[]).filter(file => isEqualFileFormat(file.format, formatFilter))
}

// Returns an array of [IFile] 
export const filesToFormatObject = (files: string[], ): IFile[] => {
    return files.reduce<IFile[]>((result, file) => {
        const currentFormat = getFormatFile(file)
        if (currentFormat === undefined)
            return result
        return [...result, {data: file, format: currentFormat}]
    }, [])
}



// Возвращает [FileFormat] если расширение файла есть в [ALL_FORMATS], 
// : в противном случае [undefined]
export const getFormatFile = (file: string) => {
    const fileFormat = file.split('.').pop()
    if (!fileFormat)
        return
    const allFormats = Object.values(ALL_FORMATS.ALL)
    for (let format of allFormats) {
        if (format.data.includes(fileFormat))
            return format.format
    }
    return FileFormat.FILE
}


// Равны ли форматы
export const isEqualFileFormat = (a?: FileFormat, b?: FileFormat) => {
    if (a === undefined || b === undefined)
        return a === b

    const aContainsB: boolean = a.includes(b);
    const bContainsA: boolean = b.includes(a);
    return aContainsB || bContainsA 
}

// Получение изображения по формату
export const getImageFile = (file?: FileFormat) => {
    return file ? FILE_FORMAT_IMAGES[file] : FILE_FORMAT_IMAGES[FileFormat.FILE]
}

/**
 * Converting a binary file to a URL
 * @param {File | ArrayBuffer} file - Binary file
 * @param {FileFormat | undefined} format - Format file 
 */
export const binaryToURL = (file: File | ArrayBuffer, format: FileFormat) => {
    
}