import { IAttachment } from "@/shared/model/attachment.model"
import { ALL_FORMATS, FILE_FORMAT_IMAGES, FILE_FORMAT_TO_CHILD, FileFormat } from "../data/file.data"
import { IFile } from "../model/file.model"

// Returns an array of string with a file format equal to [formatFilter]    
export const filterFilesByFormat = (files: string[] | IFile[] | IAttachment[], formatFilter: FileFormat): string[] | IFile[] => {
    if (files.length === 0)
        return []
    if (typeof files[0] === "string")
        return (files as string[]).filter(file => {
            const curFormat = getFormatFile(file)
            if (curFormat === undefined)
                return false
            return isEqualFileFormat(curFormat, formatFilter)
        })
    
    let _files: IFile[] = []
    if ('key' in files[0]) {
        _files = (files as IAttachment[]).map(it => ({name: it.name, url: it.key, format: getFormatFile(it.key)} as IFile))
    } else {
        _files = files as IFile[]
    }

    return _files.filter(file => isEqualFileFormat(file.format, formatFilter))
}

// Returns an array of [IFile] 
export const filesToFormatObject = (files: string[], ): IFile[] => {
    return files.reduce<IFile[]>((result, file) => {
        const currentFormat = getFormatFile(file)
        if (currentFormat === undefined)
            return result
        return [...result, {url: file, format: currentFormat}]
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
 * Получение всех форматов
 * @param {FileFormat} format - Format
 */
export const getAllFormatsByFileFormat = (format: FileFormat) => {
    if (!(format in FILE_FORMAT_TO_CHILD))
        return []

    const formats: FileFormat[] = []
    if (format === FileFormat.FILE)
        formats.push(...[FileFormat.WORD, FileFormat.EXCEL, FileFormat.POWER_POINT, FileFormat.PDF, FileFormat.TEXT])
    else if (format === FileFormat.IMAGE)
        formats.push(...[FileFormat.JPG, FileFormat.PNG, FileFormat.GIF, FileFormat.BMP, FileFormat.WEBP])
    else
        formats.push(format)
    return formats.flatMap(it => {
        const data = FILE_FORMAT_TO_CHILD[it]
        return Object.keys(data).map(key => data[key].value)
    })
}


/**
 * Converting a binary file to a URL
 * @param {File | ArrayBuffer} file - Binary file
 * @param {FileFormat | undefined} format - Format file 
 */
export const binaryToURL = (file: File | ArrayBuffer, format?: FileFormat) => {
    const _format = format ? format : FileFormat.FILE
    const data = FILE_FORMAT_TO_CHILD[_format]
    const key = Object.keys(data)[0]
    const type = data[key].type
    return window.URL.createObjectURL(new Blob([file], { type: type }))
}



export const getOnlyNameByFile = (file?: string) => {
    const _file = file ? file : 'null' 
    return _file.split('.').slice(0, -1).join('.')
}

export const getOnlyFormatByFile = (file?: string) => {
    const _file = file ? file : 'null.' 
    return _file.split('.').slice(-1)
}