import { ALL_FORMATS, FILE_FORMAT_IMAGES, FileFormat } from "../data/file.data"
import { IFileFormatObject } from "../model/file.model"

// Returns an array of string with a file format equal to [formatFilter]    
export const filterFilesByFormat = (files: string[] | IFileFormatObject[], formatFilter: FileFormat): string[] | IFileFormatObject[] => {
    if (files.length === 0)
        return []
    if (typeof files[0] === "string")
        return (files as string[]).filter(file => {
            const curFormat = getFormatFile(file)
            if (curFormat === undefined)
                return false
            return isEqualFileFormat(curFormat, formatFilter)
        })
    return (files as IFileFormatObject[]).filter(file => isEqualFileFormat(file.format, formatFilter))
}

// Returns an array of [IFileFormatObject] 
export const filesToFormatObject = (files: string[], ): IFileFormatObject[] => {
    return files.reduce<IFileFormatObject[]>((result, file) => {
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
export const isEqualFileFormat = (a: FileFormat, b: FileFormat) => {
    const aContainsB: boolean = a.includes(b);
    const bContainsA: boolean = b.includes(a);
    return aContainsB || bContainsA 
}

// Получение изображения по формату
export const getImageFile = (file?: FileFormat) => {
    return file ? FILE_FORMAT_IMAGES[file] : FILE_FORMAT_IMAGES[FileFormat.FILE]
}