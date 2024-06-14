import { IFileFormat, IFileFormatWType } from "../model/file.model";
import { FILE_DOC_ICON, FILE_PDF_ICON, FILE_PPT_ICON, FILE_UNKNOWN_ICON, FILE_XLS_ICON } from "../../../shared/ui/Icon/data/file.data.icon";
import { IIcon } from "../../../shared/ui/Icon/model/model";

// ========={ TYPE FILES }=========

// FORMATS FILE
export enum FileFormat {
    FILE = 'file',
    WORD = 'word__file',
    EXCEL = 'excel__file',
    POWER_POINT = 'powerPoint__file',
    PDF = 'pdf__file',
    TEXT = 'txt__file',
    
    IMAGE = 'image',
    JPG = 'jpg__image',
    PNG = 'png__image',
    GIF = 'gif__image',
    BMP = 'bmp__image',
    WEBP = 'webp__image',
}

export const FILE_FORMAT_TO_CHILD: Record<FileFormat, Record<string, IFileFormatWType>> = {
    [FileFormat.WORD]: {
        DOC: {
            value: 'doc',
            type: 'application/msword',
        } as IFileFormatWType,
        DOCX: {
            value: 'docx',
            type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        } as IFileFormatWType,
    },
    [FileFormat.EXCEL]: {
        XLS: {
            value: 'xls',
            type: 'application/vnd.ms-excel',
        } as IFileFormatWType,
        XLSX: {
            value: 'xlsx',
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        } as IFileFormatWType,
    },
    [FileFormat.POWER_POINT]: {
        PPT: {
            value: 'ppt',
            type: 'application/vnd.ms-powerpoint',
        } as IFileFormatWType,
        PPTX: {
            value: 'pptx',
            type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        } as IFileFormatWType,
    },
    [FileFormat.PDF]: {
        PDF: {
            value: 'pdf',
            type: 'application/pdf'
        } as IFileFormatWType,
    },
    [FileFormat.TEXT]: {
        TXT: {
            value: 'txt',
            type: 'text/plain'
        } as IFileFormatWType,
    },

    [FileFormat.JPG]: {
        JPG: {
            value: 'jpg',
            type: 'image/jpg'
        } as IFileFormatWType,
        JPEG: {
            value: 'jpeg',
            type: 'image/jpeg',
        } as IFileFormatWType,
    },
    [FileFormat.PNG]: {
        PNG: {
            value: 'png',
            type: 'image/png',
        } as IFileFormatWType,
    },
    [FileFormat.GIF]: {
        GIF: {
            value: 'gif',
            type: 'image/gif',
        } as IFileFormatWType,
    },
    [FileFormat.BMP]: {
        BMP: {
            value: 'bmp',
            type: 'image/bmp',
        } as IFileFormatWType,
    },
    [FileFormat.WEBP]: {
        WEBP: {
            value: 'webp',
            type: 'image/webp',
        } as IFileFormatWType,
    },
    [FileFormat.FILE]: {
        UNKNOWN: {
            value: '',
            type: 'application/octet-stream',
        } as IFileFormatWType,
    },
    [FileFormat.IMAGE]: {
        UNKNOWN: {
            value: '',
            type: 'application/octet-stream',
        } as IFileFormatWType,
    }
}


// const d = FILE_FORMAT_TO_CHILD[FileFormat.WORD].DOC

/**
 * FORMAT FILE to ICON
 */
export const FILE_FORMAT_IMAGES: Record<FileFormat, IIcon> = {
    [FileFormat.FILE]: FILE_UNKNOWN_ICON,
    [FileFormat.WORD]: FILE_DOC_ICON,
    [FileFormat.EXCEL]: FILE_XLS_ICON,
    [FileFormat.POWER_POINT]: FILE_PPT_ICON,
    [FileFormat.PDF]: FILE_PDF_ICON,
    [FileFormat.TEXT]: FILE_UNKNOWN_ICON,

    [FileFormat.IMAGE]: FILE_UNKNOWN_ICON,
    [FileFormat.JPG]: FILE_UNKNOWN_ICON,
    [FileFormat.PNG]: FILE_UNKNOWN_ICON,
    [FileFormat.GIF]: FILE_UNKNOWN_ICON,
    [FileFormat.BMP]: FILE_UNKNOWN_ICON,
    [FileFormat.WEBP]: FILE_UNKNOWN_ICON,
}

// ========={ FORMATS }=========

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



// FILES
export const WORD_FILE__FORMAT = ''
export const EXCEL_FILE__FORMAT = ''
export const POWER_POINT_FILE__FORMAT = ''
export const PDF_FILE__FORMAT = ''
export const TEXT_FILE__FORMAT = ''

// IMAGES
// export const ALL_IMAGE__FORMATS = getAllFormatsByFileFormat(FileFormat.IMAGE)



// ========={ FORMATS TO DATA }=========

// FILE FORMAT
// export const FILE__FORMATS = {
//     WORD: {
//         data: WORD_FILE__FORMAT,
//         format: FileFormat.WORD,
//     } as IFileFormat,
//     EXCEL: {
//         data: EXCEL_FILE__FORMAT,
//         format: FileFormat.EXCEL,
//     } as IFileFormat,
//     POWER_POINT: {
//         data: POWER_POINT_FILE__FORMAT,
//         format: FileFormat.POWER_POINT,
//     } as IFileFormat,
//     PDF: {
//         data: PDF_FILE__FORMAT,
//         format: FileFormat.PDF,
//     } as IFileFormat,
// }

// FORMAT IMAGE 
// export const IMAGE__FORMATS = {
//     IMAGE_ALL: {
//         data: ALL_IMAGE__FORMATS,
//         format: FileFormat.IMAGE
//     } as IFileFormat,
// }

// FORMAT ALL
// export const ALL_FORMATS = {
//     FILES: FILE__FORMATS,
//     IMAGES: IMAGE__FORMATS,
//     ALL: {...FILE__FORMATS, ...IMAGE__FORMATS},
// }


