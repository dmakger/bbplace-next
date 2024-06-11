import { IFileFormat } from "../model/file.model";
import { FILE_DOC_ICON, FILE_PDF_ICON, FILE_PPT_ICON, FILE_UNKNOWN_ICON, FILE_XLS_ICON } from "../ui/Icon/data/file.data.icon";
import { IIcon } from "../ui/Icon/model/model";

export enum FileFormat {
    FILE = 'file',
    WORD = 'word__file',
    EXCEL = 'excel__file',
    POWER_POINT = 'powerPoint__file',
    PDF = 'pdf__file',
    
    IMAGE = 'image',
}


export const FILE_FORMAT_IMAGES: Record<FileFormat, IIcon> = {
    [FileFormat.FILE]: FILE_UNKNOWN_ICON,
    [FileFormat.WORD]: FILE_DOC_ICON,
    [FileFormat.EXCEL]: FILE_XLS_ICON,
    [FileFormat.POWER_POINT]: FILE_PPT_ICON,
    [FileFormat.PDF]: FILE_PDF_ICON,
    
    [FileFormat.IMAGE]: FILE_UNKNOWN_ICON,
}

// FILES
export const WORD_FILE__FORMAT = ['doc', 'docx']
export const EXCEL_FILE__FORMAT = ['xls', 'xlsx']
export const POWER_POINT_FILE__FORMAT = ['ppt', 'pptx']
export const PDF_FILE__FORMAT = ['pdf']

// IMAGES
export const ALL_IMAGE__FORMATS = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];

// CORE
export const FILE__FORMATS = {
    WORD: {
        data: WORD_FILE__FORMAT,
        format: FileFormat.WORD,
    } as IFileFormat,
    EXCEL: {
        data: EXCEL_FILE__FORMAT,
        format: FileFormat.EXCEL,
    } as IFileFormat,
    POWER_POINT: {
        data: POWER_POINT_FILE__FORMAT,
        format: FileFormat.POWER_POINT,
    } as IFileFormat,
    PDF: {
        data: PDF_FILE__FORMAT,
        format: FileFormat.PDF,
    } as IFileFormat,
}

export const IMAGE__FORMATS = {
    IMAGE_ALL: {
        data: ALL_IMAGE__FORMATS,
        format: FileFormat.IMAGE
    } as IFileFormat,
}

export const ALL_FORMATS = {
    FILES: FILE__FORMATS,
    IMAGES: IMAGE__FORMATS,
    ALL: {...FILE__FORMATS, ...IMAGE__FORMATS},
}


